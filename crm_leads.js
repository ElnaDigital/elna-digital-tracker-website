/**
 * ELNA DIGITAL — LEADS & SALES CRM MODULE (crm_leads.js)
 * Enterprise CRM with Kanban, Table View, Interaction Logs,
 * Overdue Follow-ups, and Seamless "Convert to Client" workflow.
 */

(function () {
    'use strict';

    let _crmViewMode = 'kanban'; // 'kanban' | 'table'
    let _crmSearchQuery = '';
    let _crmStatusFilter = 'ALL';
    let _crmCategoryFilter = 'ALL';
    let _crmFollowUpFilter = 'ALL'; // 'ALL' | 'OVERDUE' | 'TODAY' | 'UPCOMING'
    let _activeDetailLeadId = null;

    const PIPELINE_STAGES = [
        { id: 'New Lead', name: 'New Lead', color: 'slate', icon: 'fa-sparkles', badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
        { id: 'Contacted', name: 'Contacted', color: 'blue', icon: 'fa-phone', badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300' },
        { id: 'Interested', name: 'Interested', color: 'indigo', icon: 'fa-thumbs-up', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300' },
        { id: 'Meeting Scheduled', name: 'Meeting Scheduled', color: 'purple', icon: 'fa-calendar-check', badge: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300' },
        { id: 'Proposal Sent', name: 'Proposal Sent', color: 'amber', icon: 'fa-file-invoice', badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300' },
        { id: 'Negotiation', name: 'Negotiation', color: 'orange', icon: 'fa-comments-dollar', badge: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300' },
        { id: 'Converted', name: 'Converted', color: 'emerald', icon: 'fa-check-circle', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' },
        { id: 'Lost', name: 'Lost', color: 'rose', icon: 'fa-times-circle', badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300' }
    ];

    const BUSINESS_CATEGORIES = [
        'Restaurant & Cafe',
        'Retail & Shopping',
        'Hotel & Tourism',
        'Health & Wellness',
        'Corporate & B2B',
        'Education',
        'Entertainment',
        'Real Estate',
        'Other'
    ];

    const LEAD_SOURCES = [
        'Referral',
        'Social Media',
        'Direct Outreach',
        'Cold Call',
        'Walk-in',
        'Website Inquiry',
        'Google Maps',
        'Other'
    ];

    function getTodayStr() {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function formatETB(amt) {
        return Math.round(Number(amt) || 0).toLocaleString() + ' ETB';
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

    function getFilteredLeads() {
        const state = getState();
        const leads = state.leads || [];
        const today = getTodayStr();

        return leads.filter(l => {
            // Search query
            if (_crmSearchQuery) {
                const q = _crmSearchQuery.toLowerCase();
                const matchName = (l.businessName || '').toLowerCase().includes(q);
                const matchOwner = (l.ownerName || '').toLowerCase().includes(q);
                const matchPhone = (l.phone || '').toLowerCase().includes(q);
                const matchLoc = (l.location || '').toLowerCase().includes(q);
                const matchNotes = (l.notes || '').toLowerCase().includes(q);
                if (!matchName && !matchOwner && !matchPhone && !matchLoc && !matchNotes) return false;
            }

            // Status filter
            if (_crmStatusFilter !== 'ALL' && l.status !== _crmStatusFilter) {
                return false;
            }

            // Category filter
            if (_crmCategoryFilter !== 'ALL' && l.category !== _crmCategoryFilter) {
                return false;
            }

            // Follow-up filter
            if (_crmFollowUpFilter === 'OVERDUE') {
                if (!l.nextFollowUpDate || l.nextFollowUpDate >= today || l.status === 'Converted' || l.status === 'Lost') {
                    return false;
                }
            } else if (_crmFollowUpFilter === 'TODAY') {
                if (l.nextFollowUpDate !== today || l.status === 'Converted' || l.status === 'Lost') {
                    return false;
                }
            } else if (_crmFollowUpFilter === 'UPCOMING') {
                if (!l.nextFollowUpDate || l.nextFollowUpDate <= today || l.status === 'Converted' || l.status === 'Lost') {
                    return false;
                }
            }

            return true;
        });
    }

    // =========================================================================
    // RENDER MAIN VIEW
    // =========================================================================
    window.renderLeadsCRM = function () {
        const root = document.getElementById('leads-crm-root');
        if (!root) return;

        const state = getState();
        const allLeads = state.leads || [];
        const filteredLeads = getFilteredLeads();
        const today = getTodayStr();

        // Calculate KPI Metrics
        const totalLeads = allLeads.length;
        const activeLeads = allLeads.filter(l => l.status !== 'Converted' && l.status !== 'Lost').length;
        const convertedLeads = allLeads.filter(l => l.status === 'Converted').length;
        const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
        const totalPipelineValue = allLeads
            .filter(l => l.status !== 'Lost')
            .reduce((sum, l) => sum + (Number(l.estimatedValue) || 0), 0);
        const overdueCount = allLeads.filter(l => l.nextFollowUpDate && l.nextFollowUpDate < today && l.status !== 'Converted' && l.status !== 'Lost').length;
        const todayFollowUps = allLeads.filter(l => l.nextFollowUpDate === today && l.status !== 'Converted' && l.status !== 'Lost').length;

        root.innerHTML = `
            <div class="space-y-6 pb-16">
                <!-- Top Breadcrumb & Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 text-xs font-bold text-[#a06438] dark:text-[#e6993a] uppercase tracking-wider mb-1">
                            <i class="fas fa-funnel-dollar"></i>
                            <span>ELNA DIGITAL CRM & Pipeline</span>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">Leads & Sales Management</h1>
                        <p class="text-xs text-[var(--text-muted)] mt-1">Acquire prospective businesses, track pipeline stages, schedule follow-ups, and convert them to live projects.</p>
                    </div>

                    <div class="flex items-center gap-2.5 flex-wrap">
                        <!-- View Toggle -->
                        <div class="p-1 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center">
                            <button onclick="window.setCRMViewMode('kanban')" class="py-1 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${_crmViewMode === 'kanban' ? 'bg-[#e6993a] text-black shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                                <i class="fas fa-columns"></i>
                                <span>Kanban</span>
                            </button>
                            <button onclick="window.setCRMViewMode('table')" class="py-1 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${_crmViewMode === 'table' ? 'bg-[#e6993a] text-black shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                                <i class="fas fa-table"></i>
                                <span>Table</span>
                            </button>
                        </div>

                        <!-- Add Lead Button -->
                        <button onclick="window.openAddLeadModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] hover:bg-[#d8892a] text-black text-xs font-extrabold shadow-sm transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                            <i class="fas fa-user-plus text-xs"></i>
                            <span>Add New Lead</span>
                        </button>
                    </div>
                </div>

                <!-- KPI Cards Grid -->
                <div class="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Total Leads</span>
                        <div class="text-2xl font-black text-[var(--text-main)]">${totalLeads}</div>
                        <span class="text-[10px] text-slate-500 font-semibold">${activeLeads} currently active</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Pipeline Value</span>
                        <div class="text-2xl font-black text-[#e6993a]">${formatETB(totalPipelineValue)}</div>
                        <span class="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">Active prospective revenue</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Converted Clients</span>
                        <div class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a]">${convertedLeads}</div>
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">${conversionRate}% conversion rate</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1 cursor-pointer hover:border-amber-400 transition" onclick="window.setCRMFollowUpFilter('TODAY')">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Follow-ups Today</span>
                        <div class="text-2xl font-black text-blue-600 dark:text-blue-400">${todayFollowUps}</div>
                        <span class="text-[10px] text-blue-600 font-semibold">Due today</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1 cursor-pointer hover:border-rose-400 transition" onclick="window.setCRMFollowUpFilter('OVERDUE')">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Overdue Follow-ups</span>
                        <div class="text-2xl font-black ${overdueCount > 0 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}">${overdueCount}</div>
                        <span class="text-[10px] ${overdueCount > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}">Needs urgent action</span>
                    </div>
                </div>

                <!-- Search & Filter Controls -->
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
                    <div class="flex-1 relative">
                        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        <input type="text" value="${_crmSearchQuery}" oninput="window.setCRMSearchQuery(this.value)" placeholder="Search leads by business name, owner, phone, location..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] placeholder-slate-400 focus:outline-none focus:border-[#e6993a]">
                    </div>

                    <div class="flex items-center gap-2 flex-wrap">
                        <!-- Status Filter -->
                        <select onchange="window.setCRMStatusFilter(this.value)" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                            <option value="ALL" ${_crmStatusFilter === 'ALL' ? 'selected' : ''}>All Stages (${allLeads.length})</option>
                            ${PIPELINE_STAGES.map(s => `
                                <option value="${s.id}" ${_crmStatusFilter === s.id ? 'selected' : ''}>
                                    ${s.name} (${allLeads.filter(l => l.status === s.id).length})
                                </option>
                            `).join('')}
                        </select>

                        <!-- Category Filter -->
                        <select onchange="window.setCRMCategoryFilter(this.value)" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                            <option value="ALL" ${_crmCategoryFilter === 'ALL' ? 'selected' : ''}>All Categories</option>
                            ${BUSINESS_CATEGORIES.map(c => `
                                <option value="${c}" ${_crmCategoryFilter === c ? 'selected' : ''}>${c}</option>
                            `).join('')}
                        </select>

                        <!-- Follow-up Quick Filter -->
                        <select onchange="window.setCRMFollowUpFilter(this.value)" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                            <option value="ALL" ${_crmFollowUpFilter === 'ALL' ? 'selected' : ''}>All Schedules</option>
                            <option value="OVERDUE" ${_crmFollowUpFilter === 'OVERDUE' ? 'selected' : ''}>⚠️ Overdue Follow-ups</option>
                            <option value="TODAY" ${_crmFollowUpFilter === 'TODAY' ? 'selected' : ''}>📅 Due Today</option>
                            <option value="UPCOMING" ${_crmFollowUpFilter === 'UPCOMING' ? 'selected' : ''}>⏳ Upcoming</option>
                        </select>

                        ${(_crmSearchQuery || _crmStatusFilter !== 'ALL' || _crmCategoryFilter !== 'ALL' || _crmFollowUpFilter !== 'ALL') ? `
                            <button onclick="window.resetCRMFilters()" class="py-2 px-3 rounded-xl text-rose-500 hover:bg-rose-500/10 font-bold transition cursor-pointer flex items-center gap-1">
                                <i class="fas fa-undo text-[10px]"></i>
                                <span>Reset</span>
                            </button>
                        ` : ''}
                    </div>
                </div>

                <!-- Main Content Area: Kanban or Table -->
                ${_crmViewMode === 'kanban' ? renderKanbanView(filteredLeads, today) : renderTableView(filteredLeads, today)}
            </div>
        `;
    };

    // =========================================================================
    // KANBAN VIEW
    // =========================================================================
    function renderKanbanView(leads, today) {
        return `
            <div class="overflow-x-auto pb-4">
                <div class="flex gap-4 min-w-[1550px] items-start">
                    ${PIPELINE_STAGES.map(stage => {
                        const stageLeads = leads.filter(l => l.status === stage.id);
                        const stageValue = stageLeads.reduce((s, l) => s + (Number(l.estimatedValue) || 0), 0);

                        return `
                            <div class="w-[280px] shrink-0 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-3.5 flex flex-col space-y-3 shadow-xs">
                                <!-- Column Header -->
                                <div class="flex items-center justify-between pb-2 border-b border-[var(--card-border)]">
                                    <div class="flex items-center gap-2">
                                        <span class="w-6 h-6 rounded-lg ${stage.badge} flex items-center justify-center text-xs">
                                            <i class="fas ${stage.icon}"></i>
                                        </span>
                                        <span class="font-extrabold text-xs text-[var(--text-main)]">${stage.name}</span>
                                    </div>
                                    <span class="text-xs px-2 py-0.5 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] font-black">
                                        ${stageLeads.length}
                                    </span>
                                </div>

                                <div class="text-[10px] text-[var(--text-muted)] font-semibold flex justify-between">
                                    <span>Stage Value:</span>
                                    <span class="font-bold text-[var(--text-main)]">${formatETB(stageValue)}</span>
                                </div>

                                <!-- Cards List -->
                                <div class="space-y-2.5 min-h-[350px]">
                                    ${stageLeads.length === 0 ? `
                                        <div class="h-36 rounded-xl border border-dashed border-[var(--card-border)] flex items-center justify-center text-center p-3 text-[11px] text-[var(--text-muted)]">
                                            No leads in this stage
                                        </div>
                                    ` : stageLeads.map(lead => {
                                        const isOverdue = lead.nextFollowUpDate && lead.nextFollowUpDate < today && lead.status !== 'Converted' && lead.status !== 'Lost';
                                        const isToday = lead.nextFollowUpDate === today;

                                        return `
                                            <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border ${isOverdue ? 'border-rose-400 dark:border-rose-700 bg-rose-500/5' : 'border-[var(--card-border)]'} hover:border-[#e6993a]/60 transition shadow-xs space-y-2.5 group cursor-pointer" onclick="window.openLeadDetailModal('${lead.id}')">
                                                <div class="flex items-start justify-between gap-2">
                                                    <div class="min-w-0">
                                                        <h4 class="font-black text-xs text-[var(--text-main)] truncate group-hover:text-[#e6993a] transition" title="${lead.businessName}">
                                                            ${lead.businessName}
                                                        </h4>
                                                        <span class="text-[10px] text-[var(--text-muted)] block truncate">${lead.ownerName || 'Contact'} · ${lead.category || 'Business'}</span>
                                                    </div>
                                                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 text-[#e6993a] font-black shrink-0">
                                                        ${formatETB(lead.estimatedValue)}
                                                    </span>
                                                </div>

                                                <!-- Package & Services -->
                                                <div class="flex items-center gap-1.5 flex-wrap">
                                                    <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-slate-600 dark:text-slate-300">
                                                        ${lead.interestedPackage || 'Standard'}
                                                    </span>
                                                    <span class="text-[9px] text-[var(--text-muted)]">
                                                        ${lead.source ? `via ${lead.source}` : ''}
                                                    </span>
                                                </div>

                                                <!-- Follow-up Alert -->
                                                ${lead.nextFollowUpDate ? `
                                                    <div class="flex items-center justify-between text-[10px] pt-1 border-t border-[var(--card-border)]/60 ${isOverdue ? 'text-rose-600 dark:text-rose-400 font-black' : isToday ? 'text-amber-600 font-bold' : 'text-[var(--text-muted)]'}">
                                                        <span class="flex items-center gap-1">
                                                            <i class="far fa-calendar-alt"></i>
                                                            <span>${isOverdue ? 'Overdue: ' : isToday ? 'Today: ' : 'Follow-up: '}${lead.nextFollowUpDate}</span>
                                                        </span>
                                                        ${lead.interactionHistory && lead.interactionHistory.length > 0 ? `
                                                            <span title="${lead.interactionHistory.length} interactions logged"><i class="fas fa-comment-alt text-[9px]"></i> ${lead.interactionHistory.length}</span>
                                                        ` : ''}
                                                    </div>
                                                ` : ''}

                                                <!-- Quick Actions Row -->
                                                <div class="flex items-center justify-between pt-1 text-[11px]" onclick="event.stopPropagation()">
                                                    <!-- Stage Changer Dropdown -->
                                                    <select onchange="window.updateLeadStage('${lead.id}', this.value)" class="text-[10px] py-1 px-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none cursor-pointer">
                                                        ${PIPELINE_STAGES.map(s => `
                                                            <option value="${s.id}" ${s.id === lead.status ? 'selected' : ''}>Move: ${s.name}</option>
                                                        `).join('')}
                                                    </select>

                                                    ${lead.status !== 'Converted' ? `
                                                        <button onclick="window.openConvertToClientModal('${lead.id}')" class="py-1 px-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 font-extrabold text-[10px] transition flex items-center gap-1 shadow-xs cursor-pointer" title="Convert Lead to Registered Client & Project">
                                                            <i class="fas fa-magic text-[9px]"></i>
                                                            <span>Convert</span>
                                                        </button>
                                                    ` : `
                                                        <span class="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                                            <i class="fas fa-check"></i> Client
                                                        </span>
                                                    `}
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // =========================================================================
    // TABLE VIEW
    // =========================================================================
    function renderTableView(leads, today) {
        if (leads.length === 0) {
            return `
                <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-3">
                    <div class="w-12 h-12 rounded-full bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center mx-auto text-xl">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 class="text-base font-bold text-[var(--text-main)]">No matching leads found</h3>
                    <p class="text-xs text-[var(--text-muted)] max-w-sm mx-auto">Try adjusting your search criteria or add a new business lead to your sales pipeline.</p>
                    <button onclick="window.openAddLeadModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] text-black text-xs font-bold transition">
                        Add New Lead
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
                                <th class="py-3 px-4">Business & Contact</th>
                                <th class="py-3 px-3">Stage</th>
                                <th class="py-3 px-3">Category</th>
                                <th class="py-3 px-3">Package / Est. Value</th>
                                <th class="py-3 px-3">Next Follow-Up</th>
                                <th class="py-3 px-3">Lead Source</th>
                                <th class="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[var(--card-border)]">
                            ${leads.map(lead => {
                                const stageObj = PIPELINE_STAGES.find(s => s.id === lead.status) || PIPELINE_STAGES[0];
                                const isOverdue = lead.nextFollowUpDate && lead.nextFollowUpDate < today && lead.status !== 'Converted' && lead.status !== 'Lost';
                                const isToday = lead.nextFollowUpDate === today;

                                return `
                                    <tr class="hover:bg-[var(--subtle-bg)]/60 transition cursor-pointer" onclick="window.openLeadDetailModal('${lead.id}')">
                                        <td class="py-3.5 px-4">
                                            <div class="font-extrabold text-[var(--text-main)] text-sm flex items-center gap-1.5">
                                                <span>${lead.businessName}</span>
                                                ${lead.status === 'Converted' ? '<i class="fas fa-check-circle text-emerald-500 text-xs" title="Converted to Client"></i>' : ''}
                                            </div>
                                            <div class="text-[11px] text-[var(--text-muted)] mt-0.5">
                                                ${lead.ownerName || 'Contact'} · <span class="font-mono">${lead.phone}</span>
                                            </div>
                                            <div class="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                                                <i class="fas fa-map-marker-alt text-[9px] mr-1"></i>${lead.location || 'Addis Ababa'}
                                            </div>
                                        </td>
                                        <td class="py-3.5 px-3">
                                            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1.5 ${stageObj.badge}">
                                                <i class="fas ${stageObj.icon} text-[9px]"></i>
                                                ${lead.status}
                                            </span>
                                        </td>
                                        <td class="py-3.5 px-3 text-[var(--text-main)] font-medium">
                                            ${lead.category || 'General'}
                                        </td>
                                        <td class="py-3.5 px-3">
                                            <span class="font-black text-[#e6993a] block text-xs">${formatETB(lead.estimatedValue)}</span>
                                            <span class="text-[10px] text-[var(--text-muted)]">${lead.interestedPackage || 'Standard'}</span>
                                        </td>
                                        <td class="py-3.5 px-3">
                                            ${lead.nextFollowUpDate ? `
                                                <span class="inline-flex items-center gap-1 text-[11px] font-bold ${isOverdue ? 'text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-md' : isToday ? 'text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md' : 'text-[var(--text-main)]'}">
                                                    <i class="far fa-calendar-alt text-[10px]"></i>
                                                    ${lead.nextFollowUpDate}
                                                    ${isOverdue ? ' (Overdue)' : isToday ? ' (Today)' : ''}
                                                </span>
                                            ` : '<span class="text-slate-400">Not set</span>'}
                                        </td>
                                        <td class="py-3.5 px-3 text-[var(--text-muted)] font-medium text-[11px]">
                                            ${lead.source || 'Direct'}
                                        </td>
                                        <td class="py-3.5 px-4 text-right" onclick="event.stopPropagation()">
                                            <div class="flex items-center justify-end gap-1.5">
                                                ${lead.status !== 'Converted' ? `
                                                    <button onclick="window.openConvertToClientModal('${lead.id}')" class="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] transition cursor-pointer flex items-center gap-1">
                                                        <i class="fas fa-magic text-[9px]"></i>
                                                        <span>Convert</span>
                                                    </button>
                                                ` : ''}
                                                <button onclick="window.openEditLeadModal('${lead.id}')" class="w-7 h-7 rounded-lg bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-muted)] hover:text-[#e6993a] flex items-center justify-center transition cursor-pointer" title="Edit Lead">
                                                    <i class="fas fa-pen text-[10px]"></i>
                                                </button>
                                                <button onclick="window.deleteLead('${lead.id}')" class="w-7 h-7 rounded-lg bg-[var(--subtle-bg)] hover:bg-rose-500/15 text-[var(--text-muted)] hover:text-rose-500 flex items-center justify-center transition cursor-pointer" title="Delete Lead">
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
    // MODALS & ACTIONS
    // =========================================================================
    window.setCRMViewMode = function (mode) {
        _crmViewMode = mode;
        window.renderLeadsCRM();
    };

    window.setCRMSearchQuery = function (q) {
        _crmSearchQuery = q;
        window.renderLeadsCRM();
    };

    window.setCRMStatusFilter = function (s) {
        _crmStatusFilter = s;
        window.renderLeadsCRM();
    };

    window.setCRMCategoryFilter = function (c) {
        _crmCategoryFilter = c;
        window.renderLeadsCRM();
    };

    window.setCRMFollowUpFilter = function (f) {
        _crmFollowUpFilter = f;
        window.renderLeadsCRM();
    };

    window.resetCRMFilters = function () {
        _crmSearchQuery = '';
        _crmStatusFilter = 'ALL';
        _crmCategoryFilter = 'ALL';
        _crmFollowUpFilter = 'ALL';
        window.renderLeadsCRM();
    };

    window.updateLeadStage = function (leadId, newStage) {
        const state = getState();
        const lead = (state.leads || []).find(l => l.id === leadId);
        if (!lead) return;

        const oldStage = lead.status;
        lead.status = newStage;

        if (!lead.interactionHistory) lead.interactionHistory = [];
        lead.interactionHistory.unshift({
            id: 'int-' + Date.now(),
            date: getTodayStr(),
            type: 'Note',
            note: `Pipeline stage moved from "${oldStage}" to "${newStage}".`
        });

        saveState();
        showToast(`Lead stage updated to ${newStage}`);
        window.renderLeadsCRM();
    };

    // --- ADD LEAD MODAL ---
    window.openAddLeadModal = function () {
        let modal = document.getElementById('crm-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'crm-modal-root';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-2xl rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2.5">
                            <span class="w-8 h-8 rounded-xl bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center font-bold">
                                <i class="fas fa-user-plus text-sm"></i>
                            </span>
                            <div>
                                <h3 class="text-base font-black text-[var(--text-main)]">Add Prospective Business Lead</h3>
                                <p class="text-[11px] text-[var(--text-muted)]">Track a potential digital marketing client into your sales funnel</p>
                            </div>
                        </div>
                        <button onclick="window.closeCRMModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form id="add-lead-form" onsubmit="window.saveNewLead(event)" class="space-y-4 text-xs">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Business Name *</label>
                                <input type="text" id="lead-biz-name" required placeholder="e.g. Entoto Mountain Lodge" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Owner / Contact Person *</label>
                                <input type="text" id="lead-owner-name" required placeholder="e.g. Almaz Bekele" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Phone Number *</label>
                                <input type="text" id="lead-phone" required placeholder="e.g. +251 91 234 5678" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Email Address (Optional)</label>
                                <input type="email" id="lead-email" placeholder="contact@business.et" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Business Location</label>
                                <input type="text" id="lead-location" placeholder="e.g. Bole, Addis Ababa" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Business Category</label>
                                <select id="lead-category" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    ${BUSINESS_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                                </select>
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Interested Package</label>
                                <select id="lead-package" onchange="window.onLeadPackageChange(this.value)" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="Small" data-price="5000">Small Package (5,000 ETB)</option>
                                    <option value="Basic" data-price="10000">Basic Package (10,000 ETB)</option>
                                    <option value="Advanced" data-price="15000" selected>Advanced Package (15,000 ETB)</option>
                                    <option value="Premium" data-price="30000">Premium Package (30,000 ETB)</option>
                                    <option value="Custom" data-price="0">Custom Engagement</option>
                                </select>
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Estimated Value (ETB)</label>
                                <input type="number" id="lead-value" value="15000" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold text-[#e6993a] focus:outline-none focus:border-[#e6993a]">
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Lead Source</label>
                                <select id="lead-source" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    ${LEAD_SOURCES.map(s => `<option value="${s}">${s}</option>`).join('')}
                                </select>
                            </div>

                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Next Follow-Up Date</label>
                                <input type="date" id="lead-followup-date" value="${getTodayStr()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Notes & Client Requirements</label>
                            <textarea id="lead-notes" rows="3" placeholder="Key goals, pain points, budget expectations, or discussion summary..." class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]"></textarea>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeCRMModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-[#e6993a] text-black font-black hover:bg-[#d8892a] transition shadow-sm">
                                Save Lead to Pipeline
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    window.onLeadPackageChange = function (val) {
        const sel = document.getElementById('lead-package');
        const opt = sel.options[sel.selectedIndex];
        const price = opt.getAttribute('data-price');
        if (price && Number(price) > 0) {
            const valInput = document.getElementById('lead-value');
            if (valInput) valInput.value = price;
        }
    };

    window.saveNewLead = function (e) {
        e.preventDefault();
        const state = getState();
        if (!state.leads) state.leads = [];

        const newLead = {
            id: 'lead-' + Date.now(),
            businessName: document.getElementById('lead-biz-name').value.trim(),
            ownerName: document.getElementById('lead-owner-name').value.trim(),
            phone: document.getElementById('lead-phone').value.trim(),
            email: document.getElementById('lead-email').value.trim(),
            location: document.getElementById('lead-location').value.trim() || 'Addis Ababa',
            category: document.getElementById('lead-category').value,
            interestedServices: [],
            interestedPackage: document.getElementById('lead-package').value,
            estimatedValue: Number(document.getElementById('lead-value').value) || 0,
            dateAdded: getTodayStr(),
            nextFollowUpDate: document.getElementById('lead-followup-date').value || null,
            notes: document.getElementById('lead-notes').value.trim(),
            source: document.getElementById('lead-source').value,
            status: 'New Lead',
            interactionHistory: [
                {
                    id: 'int-' + Date.now(),
                    date: getTodayStr(),
                    type: 'Note',
                    note: 'Lead created and registered into sales pipeline.'
                }
            ]
        };

        state.leads.unshift(newLead);
        saveState();
        window.closeCRMModal();
        showToast(`Lead "${newLead.businessName}" added successfully!`);
        window.renderLeadsCRM();
    };

    window.closeCRMModal = function () {
        const modal = document.getElementById('crm-modal-root');
        if (modal) modal.remove();
    };

    // --- LEAD DETAIL & INTERACTION MODAL ---
    window.openLeadDetailModal = function (leadId) {
        _activeDetailLeadId = leadId;
        const state = getState();
        const lead = (state.leads || []).find(l => l.id === leadId);
        if (!lead) return;

        let modal = document.getElementById('crm-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'crm-modal-root';
            document.body.appendChild(modal);
        }

        const stageObj = PIPELINE_STAGES.find(s => s.id === lead.status) || PIPELINE_STAGES[0];

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-2xl rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div class="flex items-start justify-between pb-3 border-b border-[var(--card-border)]">
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="text-lg font-black text-[var(--text-main)]">${lead.businessName}</h3>
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${stageObj.badge}">
                                    ${lead.status}
                                </span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] mt-0.5">${lead.ownerName || 'Contact'} · ${lead.category} · ${lead.location || 'Addis Ababa'}</p>
                        </div>
                        <button onclick="window.closeCRMModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <!-- Details Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)]">
                            <span class="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Phone</span>
                            <span class="font-bold text-[var(--text-main)]">${lead.phone}</span>
                        </div>
                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)]">
                            <span class="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Package</span>
                            <span class="font-bold text-[var(--text-main)]">${lead.interestedPackage || 'Standard'}</span>
                        </div>
                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)]">
                            <span class="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Est. Value</span>
                            <span class="font-black text-[#e6993a]">${formatETB(lead.estimatedValue)}</span>
                        </div>
                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)]">
                            <span class="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Next Follow-up</span>
                            <span class="font-bold text-amber-600">${lead.nextFollowUpDate || 'None'}</span>
                        </div>
                    </div>

                    ${lead.notes ? `
                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] border border-[var(--card-border)]">
                            <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">Notes</span>
                            <p class="leading-relaxed whitespace-pre-line">${lead.notes}</p>
                        </div>
                    ` : ''}

                    <!-- Interaction History & Log New Note -->
                    <div class="space-y-3 pt-2">
                        <h4 class="font-extrabold text-xs text-[var(--text-main)] flex items-center gap-1.5">
                            <i class="fas fa-history text-[#e6993a]"></i>
                            <span>Interaction History & Meeting Notes</span>
                        </h4>

                        <!-- Add Note Box -->
                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-2">
                            <div class="flex items-center gap-2">
                                <select id="new-int-type" class="text-xs py-1.5 px-2.5 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold">
                                    <option value="Call">📞 Phone Call</option>
                                    <option value="Meeting">🤝 In-Person Meeting</option>
                                    <option value="Proposal">📄 Proposal Sent</option>
                                    <option value="Note">📝 General Note</option>
                                </select>
                                <input type="text" id="new-int-note" placeholder="Log meeting discussion, response, or agreement..." class="flex-1 text-xs py-1.5 px-3 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                                <button onclick="window.addLeadInteraction('${lead.id}')" class="py-1.5 px-3 rounded-lg bg-[#e6993a] text-black font-extrabold text-xs hover:bg-[#d8892a] transition cursor-pointer">
                                    Log
                                </button>
                            </div>
                        </div>

                        <!-- Logs List -->
                        <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                            ${(!lead.interactionHistory || lead.interactionHistory.length === 0) ? `
                                <p class="text-center text-xs text-[var(--text-muted)] py-3">No interaction history recorded yet.</p>
                            ` : lead.interactionHistory.map(int => `
                                <div class="p-2.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-start gap-2.5 text-xs">
                                    <span class="w-6 h-6 rounded-lg bg-amber-500/10 text-[#e6993a] flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                                        <i class="fas ${int.type === 'Call' ? 'fa-phone' : int.type === 'Meeting' ? 'fa-handshake' : int.type === 'Proposal' ? 'fa-file-invoice' : 'fa-sticky-note'}"></i>
                                    </span>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                                            <span class="font-bold text-[var(--text-main)]">${int.type || 'Note'}</span>
                                            <span>${int.date}</span>
                                        </div>
                                        <p class="text-[var(--text-main)] mt-0.5">${int.note}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Bottom Action Buttons -->
                    <div class="flex items-center justify-between pt-3 border-t border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <button onclick="window.openEditLeadModal('${lead.id}')" class="py-1.5 px-3 rounded-xl bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-main)] text-xs font-bold transition">
                                Edit Details
                            </button>
                            <button onclick="window.deleteLead('${lead.id}')" class="py-1.5 px-3 rounded-xl text-rose-500 hover:bg-rose-500/10 text-xs font-bold transition">
                                Delete
                            </button>
                        </div>

                        ${lead.status !== 'Converted' ? `
                            <button onclick="window.openConvertToClientModal('${lead.id}')" class="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm">
                                <i class="fas fa-magic text-xs"></i>
                                <span>Convert to Client & Project</span>
                            </button>
                        ` : `
                            <span class="text-xs font-bold text-emerald-600">✓ Converted to Client</span>
                        `}
                    </div>
                </div>
            </div>
        `;
    };

    window.addLeadInteraction = function (leadId) {
        const type = document.getElementById('new-int-type').value;
        const note = document.getElementById('new-int-note').value.trim();
        if (!note) return;

        const state = getState();
        const lead = (state.leads || []).find(l => l.id === leadId);
        if (!lead) return;

        if (!lead.interactionHistory) lead.interactionHistory = [];
        lead.interactionHistory.unshift({
            id: 'int-' + Date.now(),
            date: getTodayStr(),
            type: type,
            note: note
        });

        saveState();
        showToast('Interaction logged successfully');
        window.openLeadDetailModal(leadId);
        window.renderLeadsCRM();
    };

    // --- CONVERT TO CLIENT MODAL ---
    window.openConvertToClientModal = function (leadId) {
        const state = getState();
        const lead = (state.leads || []).find(l => l.id === leadId);
        if (!lead) return;

        let modal = document.getElementById('crm-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'crm-modal-root';
            document.body.appendChild(modal);
        }

        // Check for duplicates
        const existingClient = (state.clients || []).find(c => 
            c.phone === lead.phone || 
            c.businessName.toLowerCase() === lead.businessName.toLowerCase()
        );

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-lg rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2.5">
                            <span class="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-[#4bd39a] flex items-center justify-center font-bold">
                                <i class="fas fa-magic text-sm"></i>
                            </span>
                            <div>
                                <h3 class="text-base font-black text-[var(--text-main)]">Convert Lead to Client</h3>
                                <p class="text-[11px] text-[var(--text-muted)]">Seamlessly onboard ${lead.businessName} into Client Projects</p>
                            </div>
                        </div>
                        <button onclick="window.closeCRMModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    ${existingClient ? `
                        <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                            <i class="fas fa-exclamation-triangle mt-0.5 text-amber-500"></i>
                            <div>
                                <strong>Duplicate Detected:</strong> A client named "<strong>${existingClient.businessName}</strong>" with phone <strong>${existingClient.phone}</strong> already exists. Converting will link this new project to that existing client.
                            </div>
                        </div>
                    ` : ''}

                    <form id="convert-lead-form" onsubmit="window.executeLeadConversion(event, '${lead.id}')" class="space-y-3.5 text-xs">
                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Client Business Name</label>
                            <input type="text" id="conv-biz-name" required value="${lead.businessName}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Contact Person</label>
                                <input type="text" id="conv-contact-person" required value="${lead.ownerName || ''}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Phone Number</label>
                                <input type="text" id="conv-phone" required value="${lead.phone || ''}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Select Agreed Package *</label>
                            <select id="conv-package-id" onchange="window.onConvPackageChange(this.value)" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                                ${(state.packages || []).map(pkg => `
                                    <option value="${pkg.id}" data-price="${pkg.price}" ${pkg.name.toLowerCase().includes((lead.interestedPackage || '').toLowerCase()) ? 'selected' : ''}>
                                        ${pkg.name} (${formatETB(pkg.price)}) — ${pkg.phases ? pkg.phases.length : 3} Phases
                                    </option>
                                `).join('')}
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Agreed Project Price (ETB) *</label>
                                <input type="number" id="conv-price" required value="${lead.estimatedValue || 15000}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-black text-[#e6993a] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Client Classification</label>
                                <select id="conv-classification" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="GOLD" selected>👑 GOLD</option>
                                    <option value="SILVER">🥈 SILVER</option>
                                    <option value="BRONZE">🥉 BRONZE</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Project Start Date</label>
                                <input type="date" id="conv-start-date" value="${getTodayStr()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Delivery Deadline</label>
                                <input type="date" id="conv-deadline" value="${(() => {
                                    const d = new Date();
                                    d.setDate(d.getDate() + 30);
                                    return d.toISOString().split('T')[0];
                                })()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeCRMModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black transition shadow-sm flex items-center gap-1.5">
                                <i class="fas fa-check"></i>
                                <span>Create Client & Launch Project</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    window.onConvPackageChange = function (pkgId) {
        const state = getState();
        const pkg = (state.packages || []).find(p => p.id === pkgId);
        if (pkg) {
            const input = document.getElementById('conv-price');
            if (input) input.value = pkg.price;
        }
    };

    window.executeLeadConversion = function (e, leadId) {
        e.preventDefault();
        const state = getState();
        const lead = (state.leads || []).find(l => l.id === leadId);
        if (!lead) return;

        const bizName = document.getElementById('conv-biz-name').value.trim();
        const contactPerson = document.getElementById('conv-contact-person').value.trim();
        const phone = document.getElementById('conv-phone').value.trim();
        const pkgId = document.getElementById('conv-package-id').value;
        const price = Number(document.getElementById('conv-price').value) || 10000;
        const classification = document.getElementById('conv-classification').value;
        const startDate = document.getElementById('conv-start-date').value;
        const deadline = document.getElementById('conv-deadline').value;

        const selectedPkg = (state.packages || []).find(p => p.id === pkgId) || (state.packages && state.packages[0]);

        // 1. Find or create Client
        if (!state.clients) state.clients = [];
        let client = state.clients.find(c => c.phone === phone || c.businessName.toLowerCase() === bizName.toLowerCase());

        if (!client) {
            client = {
                id: 'c-' + Date.now(),
                businessName: bizName,
                contactPerson: contactPerson,
                phone: phone,
                email: lead.email || '',
                location: lead.location || 'Addis Ababa',
                category: lead.category || 'Business',
                classification: classification,
                createdAt: getTodayStr()
            };
            state.clients.unshift(client);
        }

        // 2. Build default phases & tasks from Package
        const tasks = [];
        let taskIdCounter = 1;
        if (selectedPkg && Array.isArray(selectedPkg.phases)) {
            selectedPkg.phases.forEach((ph, pIdx) => {
                const phaseNum = pIdx + 1;
                const phaseName = ph.name || `Phase ${phaseNum}`;
                (ph.tasks || []).forEach(tText => {
                    tasks.push({
                        id: `t-${Date.now()}-${taskIdCounter++}`,
                        phase: phaseNum,
                        phaseName: phaseName,
                        text: tText,
                        done: false
                    });
                });
            });
        }

        // Ensure 50% advance task
        if (tasks.length > 0) {
            tasks[0].isAdvance = true;
            tasks[tasks.length - 1].isFinalPayment = true;
        }

        // 3. Create Project
        if (!state.projects) state.projects = [];
        const newProject = {
            id: 'p-' + Date.now(),
            clientId: client.id,
            clientName: client.businessName,
            name: `${client.businessName} — ${selectedPkg ? selectedPkg.name : 'Digital Execution'}`,
            packageId: pkgId,
            finalPrice: price,
            subtotal: price,
            startDate: startDate,
            deadline: deadline,
            status: 'Not Started',
            clientApproved: false,
            _completionCelebrated: false,
            _fullPaymentCelebrated: false,
            pricingSnapshot: {
                packageName: selectedPkg ? selectedPkg.name : 'Custom',
                packageId: pkgId,
                agreedPrice: price,
                basePrice: price,
                advancePercentage: selectedPkg ? selectedPkg.advancePercentage || 50 : 50,
                createdAt: startDate
            },
            tasks: tasks
        };

        state.projects.unshift(newProject);

        // 4. Mark Lead as Converted
        lead.status = 'Converted';
        lead.convertedClientId = client.id;
        lead.convertedProjectId = newProject.id;
        if (!lead.interactionHistory) lead.interactionHistory = [];
        lead.interactionHistory.unshift({
            id: 'int-' + Date.now(),
            date: getTodayStr(),
            type: 'Note',
            note: `Converted to registered client (${client.businessName}) and launched project (${newProject.name}) for ${formatETB(price)}.`
        });

        // 5. Save & Celebrate
        saveState();
        window.closeCRMModal();
        if (window.confetti) window.confetti({ particleCount: 70, spread: 60 });
        showToast(`🎉 Successfully converted lead to client "${client.businessName}"! Project created.`);
        window.renderLeadsCRM();

        // If client projects has openProjectWorkspace, offer to jump there
        setTimeout(() => {
            if (confirm(`Would you like to open the new project workspace for "${client.businessName}" right now?`)) {
                if (window.navigate) {
                    window.navigate('projects');
                    setTimeout(() => {
                        if (window.openProjectWorkspace) window.openProjectWorkspace(newProject.id);
                    }, 100);
                }
            }
        }, 300);
    };

    // --- DELETE LEAD ---
    window.deleteLead = function (leadId) {
        const state = getState();
        const lead = (state.leads || []).find(l => l.id === leadId);
        if (!lead) return;

        if (confirm(`Are you sure you want to delete lead "${lead.businessName}"? This action cannot be undone.`)) {
            state.leads = state.leads.filter(l => l.id !== leadId);
            saveState();
            window.closeCRMModal();
            showToast(`Lead "${lead.businessName}" deleted`);
            window.renderLeadsCRM();
        }
    };

    // --- EDIT LEAD MODAL ---
    window.openEditLeadModal = function (leadId) {
        const state = getState();
        const lead = (state.leads || []).find(l => l.id === leadId);
        if (!lead) return;

        let modal = document.getElementById('crm-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'crm-modal-root';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-2xl rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)]">Edit Lead: ${lead.businessName}</h3>
                            <p class="text-[11px] text-[var(--text-muted)]">Update lead information and scheduled dates</p>
                        </div>
                        <button onclick="window.closeCRMModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form id="edit-lead-form" onsubmit="window.saveEditedLead(event, '${lead.id}')" class="space-y-4 text-xs">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Business Name *</label>
                                <input type="text" id="edit-lead-biz-name" required value="${lead.businessName}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Owner / Contact Person *</label>
                                <input type="text" id="edit-lead-owner-name" required value="${lead.ownerName || ''}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Phone Number *</label>
                                <input type="text" id="edit-lead-phone" required value="${lead.phone}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Email</label>
                                <input type="email" id="edit-lead-email" value="${lead.email || ''}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Location</label>
                                <input type="text" id="edit-lead-location" value="${lead.location || ''}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Category</label>
                                <select id="edit-lead-category" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    ${BUSINESS_CATEGORIES.map(c => `<option value="${c}" ${c === lead.category ? 'selected' : ''}>${c}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Pipeline Stage</label>
                                <select id="edit-lead-status" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none">
                                    ${PIPELINE_STAGES.map(s => `<option value="${s.id}" ${s.id === lead.status ? 'selected' : ''}>${s.name}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Estimated Value (ETB)</label>
                                <input type="number" id="edit-lead-value" value="${lead.estimatedValue || 0}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-black text-[#e6993a] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Lead Source</label>
                                <select id="edit-lead-source" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    ${LEAD_SOURCES.map(s => `<option value="${s}" ${s === lead.source ? 'selected' : ''}>${s}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Next Follow-Up Date</label>
                                <input type="date" id="edit-lead-followup-date" value="${lead.nextFollowUpDate || ''}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Notes</label>
                            <textarea id="edit-lead-notes" rows="3" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">${lead.notes || ''}</textarea>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeCRMModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-[#e6993a] text-black font-black hover:bg-[#d8892a] transition shadow-sm">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    window.saveEditedLead = function (e, leadId) {
        e.preventDefault();
        const state = getState();
        const lead = (state.leads || []).find(l => l.id === leadId);
        if (!lead) return;

        lead.businessName = document.getElementById('edit-lead-biz-name').value.trim();
        lead.ownerName = document.getElementById('edit-lead-owner-name').value.trim();
        lead.phone = document.getElementById('edit-lead-phone').value.trim();
        lead.email = document.getElementById('edit-lead-email').value.trim();
        lead.location = document.getElementById('edit-lead-location').value.trim();
        lead.category = document.getElementById('edit-lead-category').value;
        lead.status = document.getElementById('edit-lead-status').value;
        lead.estimatedValue = Number(document.getElementById('edit-lead-value').value) || 0;
        lead.source = document.getElementById('edit-lead-source').value;
        lead.nextFollowUpDate = document.getElementById('edit-lead-followup-date').value || null;
        lead.notes = document.getElementById('edit-lead-notes').value.trim();

        saveState();
        window.closeCRMModal();
        showToast('Lead details updated');
        window.renderLeadsCRM();
    };

})();
