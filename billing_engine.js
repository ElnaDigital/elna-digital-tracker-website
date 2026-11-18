/**
 * ELNA DIGITAL — INVOICE & QUOTATION MANAGEMENT (billing_engine.js)
 * Enterprise Quotations, Invoices, and Payment Receipts with printable
 * PDF view, dynamic balance synchronization from actual payments,
 * and strict revenue separation (invoices != revenue).
 */

(function () {
    'use strict';

    let _billingActiveTab = 'invoices'; // 'invoices' | 'quotations' | 'receipts'
    let _billingSearchQuery = '';
    let _billingStatusFilter = 'ALL';

    const COMPANY_DETAILS = {
        name: 'ELNA DIGITAL',
        tagline: 'Enterprise Digital Growth & Software Systems',
        address: 'Bole Medhanialem, Addis Ababa, Ethiopia',
        phone: '+251 91 123 4567 / +251 92 987 6543',
        email: 'billing@elnadigital.et / contact@elnadigital.et',
        cbeAccount: 'Commercial Bank of Ethiopia: 1000 2839 21029',
        telebirr: 'Telebirr SuperApp: 0911 234 567'
    };

    function formatETB(amt) {
        return Math.round(Number(amt) || 0).toLocaleString() + ' ETB';
    }

    function getTodayStr() {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function getState() {
        return window.clientProjectsState || {};
    }

    function saveState() {
        if (window.saveClientProjectsStateDirect) {
            window.saveClientProjectsStateDirect(window.clientProjectsState);
        } else {
            try {
                localStorage.setItem('elna_client_projects_v1', JSON.stringify(window.clientProjectsState));
            } catch (e) {
                console.error(e);
            }
        }
    }

    function showToast(msg) {
        if (window.showToast) window.showToast(msg);
        else console.log('Toast:', msg);
    }

    // Helper: calculate actual paid amount for a project
    function getProjectActualPaid(projectId) {
        const state = getState();
        return (state.payments || [])
            .filter(p => p.projectId === projectId)
            .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    }

    // =========================================================================
    // MAIN RENDER FUNCTION
    // =========================================================================
    window.renderBillingManagement = function () {
        const root = document.getElementById('billing-management-root');
        if (!root) return;

        const state = getState();
        const invoices = state.invoices || [];
        const quotations = state.quotations || [];
        const receipts = state.receipts || [];
        const payments = state.payments || [];

        // Financial Metrics strictly calculated
        const totalInvoicedValue = invoices.reduce((sum, inv) => sum + (Number(inv.agreedPrice) || 0), 0);
        // Actual payments received (from real payment records)
        const totalActualPayments = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
        const outstandingDue = Math.max(0, totalInvoicedValue - totalActualPayments);

        root.innerHTML = `
            <div class="space-y-6 pb-16">
                <!-- Top Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 text-xs font-bold text-[#a06438] dark:text-[#e6993a] uppercase tracking-wider mb-1">
                            <i class="fas fa-file-invoice-dollar"></i>
                            <span>ELNA DIGITAL Billing & Invoicing</span>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">Invoice & Quotation Management</h1>
                        <p class="text-xs text-[var(--text-muted)] mt-1">Issue branded quotations, generate verified invoices, and produce payment receipts with PDF print export.</p>
                    </div>

                    <div class="flex items-center gap-2.5 flex-wrap">
                        <button onclick="window.openNewQuotationModal()" class="py-2 px-3.5 rounded-xl bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-main)] hover:text-[#e6993a] border border-[var(--card-border)] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-file-contract text-xs text-[#e6993a]"></i>
                            <span>Create Quotation</span>
                        </button>

                        <button onclick="window.openNewInvoiceModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] hover:bg-[#d8892a] text-black text-xs font-extrabold shadow-sm transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                            <i class="fas fa-plus text-xs"></i>
                            <span>Create Invoice</span>
                        </button>
                    </div>
                </div>

                <!-- CRITICAL REVENUE NOTICE CALLOUT -->
                <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                    <i class="fas fa-shield-alt text-[#e6993a] text-base mt-0.5 shrink-0"></i>
                    <div>
                        <strong>Financial Rule Enforced:</strong> Creating an invoice records client accounts receivable, but does <strong>NOT</strong> count as received revenue. Only actual payments logged in the system count toward earned revenue in Earn Management.
                    </div>
                </div>

                <!-- KPI Cards -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Total Invoiced</span>
                        <div class="text-2xl font-black text-[var(--text-main)]">${formatETB(totalInvoicedValue)}</div>
                        <span class="text-[10px] text-slate-500 font-semibold">${invoices.length} invoices issued</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Actual Revenue Paid</span>
                        <div class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(totalActualPayments)}</div>
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Verified bank & telebirr</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Outstanding Receivables</span>
                        <div class="text-2xl font-black text-[#e6993a]">${formatETB(outstandingDue)}</div>
                        <span class="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">Pending client payments</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Active Quotations</span>
                        <div class="text-2xl font-black text-blue-600 dark:text-blue-400">${quotations.length}</div>
                        <span class="text-[10px] text-blue-700 dark:text-blue-300 font-semibold">${receipts.length} receipts generated</span>
                    </div>
                </div>

                <!-- Sub-tab Navigation (Invoices | Quotations | Receipts) -->
                <div class="flex items-center gap-2 border-b border-[var(--card-border)] pb-2 text-xs font-bold">
                    <button onclick="window.setBillingSubTab('invoices')" class="py-2 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${_billingActiveTab === 'invoices' ? 'bg-[#e6993a] text-black font-extrabold shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                        <i class="fas fa-file-invoice"></i>
                        <span>Invoices (${invoices.length})</span>
                    </button>
                    <button onclick="window.setBillingSubTab('quotations')" class="py-2 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${_billingActiveTab === 'quotations' ? 'bg-[#e6993a] text-black font-extrabold shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                        <i class="fas fa-file-signature"></i>
                        <span>Quotations (${quotations.length})</span>
                    </button>
                    <button onclick="window.setBillingSubTab('receipts')" class="py-2 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${_billingActiveTab === 'receipts' ? 'bg-[#e6993a] text-black font-extrabold shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                        <i class="fas fa-receipt"></i>
                        <span>Payment Receipts (${receipts.length})</span>
                    </button>
                </div>

                <!-- Sub-Tab Content -->
                ${_billingActiveTab === 'invoices' ? renderInvoicesTab(invoices, state.clients || [], state.projects || []) :
                  _billingActiveTab === 'quotations' ? renderQuotationsTab(quotations, state.clients || []) :
                  renderReceiptsTab(receipts, state.clients || [], state.projects || [])}
            </div>
        `;
    };

    // =========================================================================
    // INVOICES SUB-TAB
    // =========================================================================
    function renderInvoicesTab(invoices, clients, projects) {
        if (invoices.length === 0) {
            return `
                <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-3">
                    <i class="fas fa-file-invoice text-4xl text-slate-300"></i>
                    <h3 class="text-base font-bold text-[var(--text-main)]">No invoices created yet</h3>
                    <p class="text-xs text-[var(--text-muted)]">Generate an invoice for any active project with agreed terms.</p>
                    <button onclick="window.openNewInvoiceModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] text-black text-xs font-bold">
                        Create First Invoice
                    </button>
                </div>
            `;
        }

        return `
            <div class="ui-card rounded-2xl border border-[var(--card-border)] overflow-hidden shadow-xs">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] text-[10px] uppercase font-black tracking-wider">
                                <th class="py-3 px-4">Invoice #</th>
                                <th class="py-3 px-3">Client & Project</th>
                                <th class="py-3 px-3">Issue / Due Date</th>
                                <th class="py-3 px-3">Agreed Price</th>
                                <th class="py-3 px-3">Paid / Remaining</th>
                                <th class="py-3 px-3">Status</th>
                                <th class="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[var(--card-border)]">
                            ${invoices.map(inv => {
                                const client = clients.find(c => c.id === inv.clientId) || { businessName: 'Client' };
                                const project = projects.find(p => p.id === inv.projectId) || { name: 'Digital Project' };
                                const paid = getProjectActualPaid(inv.projectId);
                                const balance = Math.max(0, (Number(inv.agreedPrice) || 0) - paid);

                                // Auto calculate real status
                                let realStatus = inv.status;
                                if (paid >= inv.agreedPrice && inv.agreedPrice > 0) {
                                    realStatus = 'Paid';
                                } else if (paid > 0) {
                                    realStatus = 'Partially Paid';
                                } else if (inv.dueDate && inv.dueDate < getTodayStr()) {
                                    realStatus = 'Overdue';
                                }

                                const badgeClass = realStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' :
                                                  realStatus === 'Partially Paid' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300' :
                                                  realStatus === 'Overdue' ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300' :
                                                  'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';

                                return `
                                    <tr class="hover:bg-[var(--subtle-bg)]/50 transition">
                                        <td class="py-3.5 px-4 font-mono font-bold text-[var(--text-main)]">
                                            ${inv.invoiceNumber}
                                        </td>
                                        <td class="py-3.5 px-3">
                                            <span class="font-bold text-[var(--text-main)] block">${client.businessName}</span>
                                            <span class="text-[10px] text-[var(--text-muted)] truncate block max-w-xs">${project.name}</span>
                                        </td>
                                        <td class="py-3.5 px-3 text-[11px] text-[var(--text-muted)]">
                                            <div>Issued: ${inv.issueDate}</div>
                                            <div class="font-bold ${realStatus === 'Overdue' ? 'text-rose-500' : 'text-slate-500'}">Due: ${inv.dueDate}</div>
                                        </td>
                                        <td class="py-3.5 px-3 font-black text-sm text-[var(--text-main)]">
                                            ${formatETB(inv.agreedPrice)}
                                        </td>
                                        <td class="py-3.5 px-3">
                                            <span class="text-emerald-600 dark:text-[#4bd39a] font-bold block">${formatETB(paid)} paid</span>
                                            <span class="text-[10px] ${balance > 0 ? 'text-[#e6993a] font-bold' : 'text-slate-400'}">${formatETB(balance)} due</span>
                                        </td>
                                        <td class="py-3.5 px-3">
                                            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block ${badgeClass}">
                                                ${realStatus}
                                            </span>
                                        </td>
                                        <td class="py-3.5 px-4 text-right">
                                            <div class="flex items-center justify-end gap-1.5">
                                                <button onclick="window.viewPrintInvoice('${inv.id}')" class="py-1 px-2.5 rounded-lg bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[#e6993a] font-bold text-xs transition cursor-pointer flex items-center gap-1" title="View / Print PDF">
                                                    <i class="fas fa-print text-xs"></i>
                                                    <span>Print / PDF</span>
                                                </button>
                                                ${balance > 0 ? `
                                                    <button onclick="if(window.openRecordPaymentModal) window.openRecordPaymentModal('${inv.projectId}')" class="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition cursor-pointer" title="Record Payment">
                                                        Log Pay
                                                    </button>
                                                ` : ''}
                                                <button onclick="window.deleteInvoice('${inv.id}')" class="w-7 h-7 rounded-lg bg-[var(--subtle-bg)] hover:bg-rose-500/15 text-slate-400 hover:text-rose-500 flex items-center justify-center transition cursor-pointer">
                                                    <i class="fas fa-trash-alt text-[10px]"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // QUOTATIONS SUB-TAB
    // =========================================================================
    function renderQuotationsTab(quotations, clients) {
        if (quotations.length === 0) {
            return `
                <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-3">
                    <i class="fas fa-file-contract text-4xl text-slate-300"></i>
                    <h3 class="text-base font-bold text-[var(--text-main)]">No quotations generated yet</h3>
                    <p class="text-xs text-[var(--text-muted)]">Draft a formal proposal quotation for prospective or returning clients.</p>
                    <button onclick="window.openNewQuotationModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] text-black text-xs font-bold">
                        Draft New Quotation
                    </button>
                </div>
            `;
        }

        return `
            <div class="ui-card rounded-2xl border border-[var(--card-border)] overflow-hidden shadow-xs">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] text-[10px] uppercase font-black tracking-wider">
                                <th class="py-3 px-4">Quotation #</th>
                                <th class="py-3 px-3">Client Information</th>
                                <th class="py-3 px-3">Package / Scope</th>
                                <th class="py-3 px-3">Total Amount</th>
                                <th class="py-3 px-3">Dates</th>
                                <th class="py-3 px-3">Status</th>
                                <th class="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[var(--card-border)]">
                            ${quotations.map(q => `
                                <tr class="hover:bg-[var(--subtle-bg)]/50 transition">
                                    <td class="py-3.5 px-4 font-mono font-bold text-[var(--text-main)]">
                                        ${q.quotationNumber}
                                    </td>
                                    <td class="py-3.5 px-3">
                                        <span class="font-bold text-[var(--text-main)] block">${q.clientName}</span>
                                        <span class="text-[10px] text-[var(--text-muted)]">${q.clientPhone || ''}</span>
                                    </td>
                                    <td class="py-3.5 px-3">
                                        <span class="font-bold text-[var(--text-main)]">${q.selectedPackage || 'Custom Scope'}</span>
                                        <span class="text-[10px] text-[var(--text-muted)] block">${(q.items || []).length} items</span>
                                    </td>
                                    <td class="py-3.5 px-3 font-black text-sm text-[#e6993a]">
                                        ${formatETB(q.totalAmount)}
                                    </td>
                                    <td class="py-3.5 px-3 text-[11px] text-[var(--text-muted)]">
                                        <div>Date: ${q.quotationDate}</div>
                                        <div>Expires: ${q.expiryDate}</div>
                                    </td>
                                    <td class="py-3.5 px-3">
                                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block ${q.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}">
                                            ${q.status || 'Sent'}
                                        </span>
                                    </td>
                                    <td class="py-3.5 px-4 text-right">
                                        <div class="flex items-center justify-end gap-1.5">
                                            <button onclick="window.viewPrintQuotation('${q.id}')" class="py-1 px-2.5 rounded-lg bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[#e6993a] font-bold text-xs transition cursor-pointer flex items-center gap-1">
                                                <i class="fas fa-print text-xs"></i>
                                                <span>Print / PDF</span>
                                            </button>
                                            <button onclick="window.deleteQuotation('${q.id}')" class="w-7 h-7 rounded-lg bg-[var(--subtle-bg)] hover:bg-rose-500/15 text-slate-400 hover:text-rose-500 flex items-center justify-center transition cursor-pointer">
                                                <i class="fas fa-trash-alt text-[10px]"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // RECEIPTS SUB-TAB
    // =========================================================================
    function renderReceiptsTab(receipts, clients, projects) {
        if (receipts.length === 0) {
            return `
                <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-3">
                    <i class="fas fa-receipt text-4xl text-slate-300"></i>
                    <h3 class="text-base font-bold text-[var(--text-main)]">No receipts generated yet</h3>
                    <p class="text-xs text-[var(--text-muted)]">Receipts are automatically created whenever actual payments are logged.</p>
                </div>
            `;
        }

        return `
            <div class="ui-card rounded-2xl border border-[var(--card-border)] overflow-hidden shadow-xs">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] text-[10px] uppercase font-black tracking-wider">
                                <th class="py-3 px-4">Receipt #</th>
                                <th class="py-3 px-3">Client & Project</th>
                                <th class="py-3 px-3">Payment Date</th>
                                <th class="py-3 px-3">Payment Method</th>
                                <th class="py-3 px-3">Amount Received</th>
                                <th class="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[var(--card-border)]">
                            ${receipts.map(rec => {
                                const client = clients.find(c => c.id === rec.clientId) || { businessName: 'Client' };
                                const project = projects.find(p => p.id === rec.projectId) || { name: 'Project' };

                                return `
                                    <tr class="hover:bg-[var(--subtle-bg)]/50 transition">
                                        <td class="py-3.5 px-4 font-mono font-bold text-[var(--text-main)]">
                                            ${rec.receiptNumber}
                                        </td>
                                        <td class="py-3.5 px-3">
                                            <span class="font-bold text-[var(--text-main)] block">${client.businessName}</span>
                                            <span class="text-[10px] text-[var(--text-muted)]">${project.name}</span>
                                        </td>
                                        <td class="py-3.5 px-3 text-[var(--text-muted)] font-semibold">
                                            ${rec.date}
                                        </td>
                                        <td class="py-3.5 px-3 font-semibold text-[var(--text-main)]">
                                            ${rec.method || 'Bank Transfer'}
                                        </td>
                                        <td class="py-3.5 px-3 font-black text-sm text-emerald-600 dark:text-[#4bd39a]">
                                            ${formatETB(rec.amount)}
                                        </td>
                                        <td class="py-3.5 px-4 text-right">
                                            <button onclick="window.viewPrintReceipt('${rec.id}')" class="py-1 px-3 rounded-lg bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[#e6993a] font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ml-auto">
                                                <i class="fas fa-print text-xs"></i>
                                                <span>Print Receipt</span>
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // ACTIONS & MODALS
    // =========================================================================
    window.setBillingSubTab = function (tab) {
        _billingActiveTab = tab;
        window.renderBillingManagement();
    };

    // --- CREATE NEW INVOICE MODAL ---
    window.openNewInvoiceModal = function () {
        let modal = document.getElementById('billing-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'billing-modal-root';
            document.body.appendChild(modal);
        }

        const state = getState();
        const projects = state.projects || [];
        const clients = state.clients || [];

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-xl rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-xl bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center font-bold">
                                <i class="fas fa-file-invoice text-sm"></i>
                            </span>
                            <h3 class="text-base font-black text-[var(--text-main)]">Generate Commercial Invoice</h3>
                        </div>
                        <button onclick="window.closeBillingModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form id="new-invoice-form" onsubmit="window.saveNewInvoice(event)" class="space-y-3.5 text-xs">
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Invoice Number *</label>
                                <input type="text" id="inv-num" required value="INV-2026-${String((state.invoices || []).length + 1).padStart(3, '0')}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] font-mono font-bold text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Issue Date</label>
                                <input type="date" id="inv-issue-date" value="${getTodayStr()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Select Client Project *</label>
                            <select id="inv-project-id" onchange="window.onInvoiceProjectSelect(this.value)" required class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                                <option value="">-- Choose Project --</option>
                                ${projects.map(p => {
                                    const client = clients.find(c => c.id === p.clientId) || { businessName: p.clientName };
                                    return `<option value="${p.id}" data-client="${p.clientId}" data-price="${p.finalPrice}">${client.businessName} — ${p.name} (${formatETB(p.finalPrice)})</option>`;
                                }).join('')}
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Agreed Total Price (ETB) *</label>
                                <input type="number" id="inv-price" required value="15000" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[#e6993a] font-black focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Payment Due Date</label>
                                <input type="date" id="inv-due-date" value="${(() => {
                                    const d = new Date();
                                    d.setDate(d.getDate() + 14);
                                    return d.toISOString().split('T')[0];
                                })()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Payment Instructions & Bank Details</label>
                            <textarea id="inv-instructions" rows="2" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">${COMPANY_DETAILS.cbeAccount} (ELNA DIGITAL) / ${COMPANY_DETAILS.telebirr}</textarea>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Notes & Terms</label>
                            <textarea id="inv-notes" rows="2" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">Thank you for partnering with ELNA DIGITAL. Official e-receipt will be issued upon transfer confirmation.</textarea>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeBillingModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-[#e6993a] text-black font-black hover:bg-[#d8892a] transition shadow-sm">
                                Create Invoice
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    window.onInvoiceProjectSelect = function (projId) {
        const state = getState();
        const p = (state.projects || []).find(x => x.id === projId);
        if (p) {
            const priceInput = document.getElementById('inv-price');
            if (priceInput) priceInput.value = p.finalPrice || 10000;
        }
    };

    window.saveNewInvoice = function (e) {
        e.preventDefault();
        const state = getState();
        if (!state.invoices) state.invoices = [];

        const projId = document.getElementById('inv-project-id').value;
        const project = (state.projects || []).find(p => p.id === projId);
        const clientId = project ? project.clientId : null;

        const newInv = {
            id: 'inv-' + Date.now(),
            invoiceNumber: document.getElementById('inv-num').value.trim(),
            clientId: clientId,
            projectId: projId,
            issueDate: document.getElementById('inv-issue-date').value,
            dueDate: document.getElementById('inv-due-date').value,
            agreedPrice: Number(document.getElementById('inv-price').value) || 0,
            paymentInstructions: document.getElementById('inv-instructions').value.trim(),
            notes: document.getElementById('inv-notes').value.trim(),
            status: 'Sent'
        };

        state.invoices.unshift(newInv);
        saveState();
        window.closeBillingModal();
        showToast(`Invoice "${newInv.invoiceNumber}" issued successfully!`);
        window.renderBillingManagement();
    };

    // --- CREATE NEW QUOTATION MODAL ---
    window.openNewQuotationModal = function () {
        let modal = document.getElementById('billing-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'billing-modal-root';
            document.body.appendChild(modal);
        }

        const state = getState();
        const packages = state.packages || [];
        const clients = state.clients || [];

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-xl rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-xl bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center font-bold">
                                <i class="fas fa-file-signature text-sm"></i>
                            </span>
                            <h3 class="text-base font-black text-[var(--text-main)]">Draft Service Quotation</h3>
                        </div>
                        <button onclick="window.closeBillingModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form id="new-quote-form" onsubmit="window.saveNewQuotation(event)" class="space-y-3.5 text-xs">
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Quotation # *</label>
                                <input type="text" id="qte-num" required value="QTE-2026-${String((state.quotations || []).length + 1).padStart(3, '0')}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] font-mono font-bold text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Client Business Name *</label>
                                <input type="text" id="qte-client-name" required placeholder="e.g. Abyssinia Specialty Roasters" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Contact Phone</label>
                                <input type="text" id="qte-client-phone" placeholder="+251 91 ..." class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Contact Email</label>
                                <input type="email" id="qte-client-email" placeholder="client@domain.et" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Package Selection</label>
                                <select id="qte-package" onchange="window.onQuotationPackageSelect(this.value)" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                                    ${packages.map(p => `<option value="${p.name}" data-price="${p.price}">${p.name} (${formatETB(p.price)})</option>`).join('')}
                                    <option value="Custom Scope" data-price="15000">Custom Scope</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Total Agreed Price (ETB) *</label>
                                <input type="number" id="qte-price" required value="15000" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[#e6993a] font-black focus:outline-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Quotation Date</label>
                                <input type="date" id="qte-date" value="${getTodayStr()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Validity (Expiry Date)</label>
                                <input type="date" id="qte-expiry" value="${(() => {
                                    const d = new Date();
                                    d.setDate(d.getDate() + 30);
                                    return d.toISOString().split('T')[0];
                                })()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Payment Terms</label>
                            <input type="text" id="qte-terms" value="50% Advance on project kickoff, 50% upon final signoff and delivery." class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Notes & Scope Description</label>
                            <textarea id="qte-notes" rows="2" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">Includes full development, setup, domain integration, and 30-day technical support warranty.</textarea>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeBillingModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-[#e6993a] text-black font-black hover:bg-[#d8892a] transition shadow-sm">
                                Save Quotation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    window.onQuotationPackageSelect = function (pkgName) {
        const sel = document.getElementById('qte-package');
        const opt = sel.options[sel.selectedIndex];
        const price = opt.getAttribute('data-price');
        if (price) {
            const priceInput = document.getElementById('qte-price');
            if (priceInput) priceInput.value = price;
        }
    };

    window.saveNewQuotation = function (e) {
        e.preventDefault();
        const state = getState();
        if (!state.quotations) state.quotations = [];

        const newQte = {
            id: 'qte-' + Date.now(),
            quotationNumber: document.getElementById('qte-num').value.trim(),
            clientName: document.getElementById('qte-client-name').value.trim(),
            clientPhone: document.getElementById('qte-client-phone').value.trim(),
            clientEmail: document.getElementById('qte-client-email').value.trim(),
            selectedPackage: document.getElementById('qte-package').value,
            totalAmount: Number(document.getElementById('qte-price').value) || 0,
            quotationDate: document.getElementById('qte-date').value,
            expiryDate: document.getElementById('qte-expiry').value,
            paymentTerms: document.getElementById('qte-terms').value.trim(),
            notes: document.getElementById('qte-notes').value.trim(),
            status: 'Sent',
            items: [
                {
                    description: document.getElementById('qte-package').value + ' — Complete Digital Delivery',
                    quantity: 1,
                    unitPrice: Number(document.getElementById('qte-price').value) || 0,
                    amount: Number(document.getElementById('qte-price').value) || 0
                }
            ]
        };

        state.quotations.unshift(newQte);
        saveState();
        window.closeBillingModal();
        showToast(`Quotation "${newQte.quotationNumber}" drafted successfully!`);
        window.renderBillingManagement();
    };

    // --- VIEW / PRINT INVOICE MODAL ---
    window.viewPrintInvoice = function (invId) {
        const state = getState();
        const inv = (state.invoices || []).find(i => i.id === invId);
        if (!inv) return;

        const client = (state.clients || []).find(c => c.id === inv.clientId) || { businessName: 'Client Business', phone: '', email: '', location: 'Addis Ababa' };
        const project = (state.projects || []).find(p => p.id === inv.projectId) || { name: 'Digital Service Project' };
        const paid = getProjectActualPaid(inv.projectId);
        const balance = Math.max(0, (Number(inv.agreedPrice) || 0) - paid);

        let modal = document.getElementById('billing-print-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'billing-print-modal-root';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
                <div class="w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl p-8 space-y-6 my-8 animate-fade-in relative print:p-0 print:shadow-none print:w-full print:m-0" id="printable-invoice-sheet" onclick="event.stopPropagation()">
                    <!-- Top Actions Bar -->
                    <div class="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Invoice Preview</span>
                        <div class="flex items-center gap-2">
                            <button onclick="window.print()" class="py-1.5 px-4 rounded-xl bg-[#e6993a] text-black font-extrabold text-xs shadow-sm hover:bg-[#d8892a] transition flex items-center gap-1.5 cursor-pointer">
                                <i class="fas fa-print"></i>
                                <span>Print / Save as PDF</span>
                            </button>
                            <button onclick="window.closeBillingPrintModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition">
                                <i class="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Header Letterhead -->
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-slate-900">
                        <div>
                            <div class="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                                <span class="w-8 h-8 rounded-lg bg-[#e6993a] text-black flex items-center justify-center font-black text-sm">EL</span>
                                <span>${COMPANY_DETAILS.name}</span>
                            </div>
                            <p class="text-xs font-bold text-amber-700 uppercase tracking-widest mt-1">${COMPANY_DETAILS.tagline}</p>
                            <p class="text-xs text-slate-500 mt-1">${COMPANY_DETAILS.address}<br>${COMPANY_DETAILS.phone} · ${COMPANY_DETAILS.email}</p>
                        </div>
                        <div class="text-right">
                            <h2 class="text-3xl font-black text-slate-900 tracking-tight">COMMERCIAL INVOICE</h2>
                            <p class="text-sm font-mono font-bold text-[#e6993a] mt-1">${inv.invoiceNumber}</p>
                            <p class="text-xs text-slate-500 mt-1">Issue Date: <strong>${inv.issueDate}</strong><br>Due Date: <strong>${inv.dueDate}</strong></p>
                        </div>
                    </div>

                    <!-- Bill To & Project Details -->
                    <div class="grid grid-cols-2 gap-6 text-xs">
                        <div>
                            <span class="text-[10px] font-black uppercase text-slate-400 block mb-1">BILLED TO:</span>
                            <h4 class="font-black text-base text-slate-900">${client.businessName}</h4>
                            <p class="text-slate-600 mt-0.5">${client.contactPerson || 'Attention: Management'}<br>${client.phone || ''} ${client.email ? '· ' + client.email : ''}<br>${client.location || 'Addis Ababa, Ethiopia'}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] font-black uppercase text-slate-400 block mb-1">PROJECT REFERENCE:</span>
                            <h4 class="font-black text-sm text-slate-900">${project.name}</h4>
                            <p class="text-slate-600 mt-0.5">Project ID: <span class="font-mono">${inv.projectId}</span></p>
                        </div>
                    </div>

                    <!-- Line Items Table -->
                    <div class="border border-slate-200 rounded-xl overflow-hidden">
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="bg-slate-100 text-slate-700 font-black uppercase text-[10px] border-b border-slate-200">
                                    <th class="py-3 px-4">Item Description</th>
                                    <th class="py-3 px-3 text-center">Qty</th>
                                    <th class="py-3 px-3 text-right">Unit Price</th>
                                    <th class="py-3 px-4 text-right">Line Total</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="py-3 px-4">
                                        <div class="font-bold text-slate-900">${project.name}</div>
                                        <div class="text-[10px] text-slate-500">Full execution & multi-phase deliverables as contracted.</div>
                                    </td>
                                    <td class="py-3 px-3 text-center font-bold">1</td>
                                    <td class="py-3 px-3 text-right font-bold">${formatETB(inv.agreedPrice)}</td>
                                    <td class="py-3 px-4 text-right font-black text-slate-900">${formatETB(inv.agreedPrice)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Totals & Balance Strip -->
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-2">
                        <div class="text-xs space-y-1.5 max-w-sm">
                            <span class="text-[10px] font-black uppercase text-slate-400 block">PAYMENT INSTRUCTIONS:</span>
                            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-mono text-[11px]">
                                ${inv.paymentInstructions || COMPANY_DETAILS.cbeAccount}
                            </div>
                        </div>

                        <div class="w-full sm:w-64 space-y-2 text-xs">
                            <div class="flex justify-between py-1 border-b border-slate-100">
                                <span class="text-slate-500">Subtotal:</span>
                                <span class="font-bold">${formatETB(inv.agreedPrice)}</span>
                            </div>
                            <div class="flex justify-between py-1 border-b border-slate-100">
                                <span class="text-slate-500">Amount Paid to Date:</span>
                                <span class="font-black text-emerald-600">${formatETB(paid)}</span>
                            </div>
                            <div class="flex justify-between py-2 border-b-2 border-slate-900 text-sm">
                                <span class="font-black text-slate-900">Remaining Balance:</span>
                                <span class="font-black text-[#e6993a]">${formatETB(balance)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Notes & Authorization Signature -->
                    <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-xs text-slate-500">
                        <div>
                            <span class="font-bold text-slate-700 block mb-0.5">Terms & Conditions:</span>
                            <p class="text-[11px] max-w-md">${inv.notes || 'Payments strictly in ETB. Thank you for choosing ELNA DIGITAL.'}</p>
                        </div>
                        <div class="text-center sm:text-right shrink-0">
                            <div class="w-40 border-b border-slate-400 mb-1 ml-auto"></div>
                            <span class="text-[10px] font-bold text-slate-600 uppercase">Authorized Signature & Seal</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // --- VIEW / PRINT QUOTATION MODAL ---
    window.viewPrintQuotation = function (qteId) {
        const state = getState();
        const q = (state.quotations || []).find(item => item.id === qteId);
        if (!q) return;

        let modal = document.getElementById('billing-print-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'billing-print-modal-root';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
                <div class="w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl p-8 space-y-6 my-8 animate-fade-in relative print:p-0 print:shadow-none print:w-full print:m-0" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Quotation Preview</span>
                        <div class="flex items-center gap-2">
                            <button onclick="window.print()" class="py-1.5 px-4 rounded-xl bg-[#e6993a] text-black font-extrabold text-xs shadow-sm hover:bg-[#d8892a] transition flex items-center gap-1.5 cursor-pointer">
                                <i class="fas fa-print"></i>
                                <span>Print / Save as PDF</span>
                            </button>
                            <button onclick="window.closeBillingPrintModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition">
                                <i class="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Header -->
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-slate-900">
                        <div>
                            <div class="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                                <span class="w-8 h-8 rounded-lg bg-[#e6993a] text-black flex items-center justify-center font-black text-sm">EL</span>
                                <span>${COMPANY_DETAILS.name}</span>
                            </div>
                            <p class="text-xs font-bold text-amber-700 uppercase tracking-widest mt-1">${COMPANY_DETAILS.tagline}</p>
                            <p class="text-xs text-slate-500 mt-1">${COMPANY_DETAILS.address}<br>${COMPANY_DETAILS.phone} · ${COMPANY_DETAILS.email}</p>
                        </div>
                        <div class="text-right">
                            <h2 class="text-3xl font-black text-slate-900 tracking-tight">SERVICE QUOTATION</h2>
                            <p class="text-sm font-mono font-bold text-[#e6993a] mt-1">${q.quotationNumber}</p>
                            <p class="text-xs text-slate-500 mt-1">Date: <strong>${q.quotationDate}</strong><br>Valid Until: <strong>${q.expiryDate}</strong></p>
                        </div>
                    </div>

                    <!-- Client Info -->
                    <div class="text-xs">
                        <span class="text-[10px] font-black uppercase text-slate-400 block mb-1">PROPOSAL PREPARED FOR:</span>
                        <h4 class="font-black text-base text-slate-900">${q.clientName}</h4>
                        <p class="text-slate-600 mt-0.5">${q.clientPhone} ${q.clientEmail ? '· ' + q.clientEmail : ''}</p>
                    </div>

                    <!-- Items -->
                    <div class="border border-slate-200 rounded-xl overflow-hidden">
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="bg-slate-100 text-slate-700 font-black uppercase text-[10px] border-b border-slate-200">
                                    <th class="py-3 px-4">Scope & Service Deliverables</th>
                                    <th class="py-3 px-3 text-center">Qty</th>
                                    <th class="py-3 px-4 text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${(q.items || []).map(it => `
                                    <tr>
                                        <td class="py-3 px-4">
                                            <span class="font-bold text-slate-900 block">${it.description}</span>
                                        </td>
                                        <td class="py-3 px-3 text-center font-bold">${it.quantity || 1}</td>
                                        <td class="py-3 px-4 text-right font-black text-slate-900">${formatETB(it.amount)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Total & Terms -->
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-2 text-xs">
                        <div class="space-y-1.5 max-w-sm">
                            <span class="text-[10px] font-black uppercase text-slate-400 block">PAYMENT TERMS:</span>
                            <p class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">${q.paymentTerms}</p>
                        </div>
                        <div class="w-full sm:w-64 space-y-2">
                            <div class="flex justify-between py-2 border-b-2 border-slate-900 text-base">
                                <span class="font-black text-slate-900">Total Quotation:</span>
                                <span class="font-black text-[#e6993a]">${formatETB(q.totalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-xs text-slate-500">
                        <p class="text-[11px] max-w-md">${q.notes}</p>
                        <div class="text-center sm:text-right shrink-0">
                            <div class="w-40 border-b border-slate-400 mb-1 ml-auto"></div>
                            <span class="text-[10px] font-bold text-slate-600 uppercase">Authorized Signature</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // --- VIEW / PRINT RECEIPT MODAL ---
    window.viewPrintReceipt = function (recId) {
        const state = getState();
        const rec = (state.receipts || []).find(r => r.id === recId);
        if (!rec) return;

        const client = (state.clients || []).find(c => c.id === rec.clientId) || { businessName: 'Client Business' };
        const project = (state.projects || []).find(p => p.id === rec.projectId) || { name: 'Digital Project', finalPrice: rec.amount };
        const paid = getProjectActualPaid(rec.projectId);
        const remaining = Math.max(0, (Number(project.finalPrice) || 0) - paid);

        let modal = document.getElementById('billing-print-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'billing-print-modal-root';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
                <div class="w-full max-w-xl bg-white text-slate-900 rounded-2xl shadow-2xl p-8 space-y-6 my-8 animate-fade-in relative print:p-0 print:shadow-none print:w-full print:m-0" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Payment Receipt</span>
                        <div class="flex items-center gap-2">
                            <button onclick="window.print()" class="py-1.5 px-4 rounded-xl bg-[#e6993a] text-black font-extrabold text-xs shadow-sm hover:bg-[#d8892a] transition flex items-center gap-1.5 cursor-pointer">
                                <i class="fas fa-print"></i>
                                <span>Print / Save as PDF</span>
                            </button>
                            <button onclick="window.closeBillingPrintModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition">
                                <i class="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-start justify-between pb-4 border-b-2 border-slate-900">
                        <div>
                            <div class="text-xl font-black text-slate-900 flex items-center gap-2">
                                <span class="w-7 h-7 rounded-lg bg-[#e6993a] text-black flex items-center justify-center font-black text-xs">EL</span>
                                <span>${COMPANY_DETAILS.name}</span>
                            </div>
                            <p class="text-[11px] text-slate-500 mt-1">${COMPANY_DETAILS.address}<br>${COMPANY_DETAILS.phone}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-xs font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mb-1">
                                ✓ PAYMENT CONFIRMED
                            </span>
                            <p class="font-mono font-black text-sm text-slate-900">${rec.receiptNumber}</p>
                            <p class="text-xs text-slate-500 mt-0.5">Date: <strong>${rec.date}</strong></p>
                        </div>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <div class="flex justify-between">
                            <span class="text-slate-500">Received From:</span>
                            <span class="font-bold text-slate-900">${client.businessName}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-500">Project:</span>
                            <span class="font-bold text-slate-900">${project.name}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-500">Payment Method:</span>
                            <span class="font-bold text-slate-900">${rec.method || 'Bank Transfer'}</span>
                        </div>
                        <div class="flex justify-between pt-2 border-t border-slate-200 text-sm">
                            <span class="font-black text-slate-900">Amount Received:</span>
                            <span class="font-black text-emerald-600">${formatETB(rec.amount)}</span>
                        </div>
                        <div class="flex justify-between text-[11px] text-slate-500 pt-1">
                            <span>Remaining Outstanding Balance:</span>
                            <span class="font-bold text-[#e6993a]">${formatETB(remaining)}</span>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-slate-200 text-[10px] text-slate-400 text-center">
                        This is an official computer-generated receipt from ELNA DIGITAL. All payments are non-refundable after service execution.
                    </div>
                </div>
            </div>
        `;
    };

    window.deleteInvoice = function (id) {
        const state = getState();
        if (confirm('Delete this invoice record? (Note: actual payments recorded in the project will remain safe).')) {
            state.invoices = (state.invoices || []).filter(i => i.id !== id);
            saveState();
            showToast('Invoice deleted');
            window.renderBillingManagement();
        }
    };

    window.deleteQuotation = function (id) {
        const state = getState();
        if (confirm('Delete this quotation?')) {
            state.quotations = (state.quotations || []).filter(q => q.id !== id);
            saveState();
            showToast('Quotation deleted');
            window.renderBillingManagement();
        }
    };

    window.closeBillingModal = function () {
        const modal = document.getElementById('billing-modal-root');
        if (modal) modal.remove();
    };

    window.closeBillingPrintModal = function () {
        const modal = document.getElementById('billing-print-modal-root');
        if (modal) modal.remove();
    };

})();
