/**
 * ELNA DIGITAL — CLIENT FEEDBACK & REVIEWS MODULE (feedback_reviews.js)
 * Measures authentic client satisfaction across 4 metrics (Overall, Quality,
 * Communication, Delivery), testimonials showcase, improvement feedback,
 * and seamless real-time integration into Analytics Control Center.
 */

(function () {
    'use strict';

    let _feedbackSearchQuery = '';
    let _feedbackRatingFilter = 'ALL'; // 'ALL' | '5' | '4' | '3' | '2' | '1'
    let _feedbackStatusFilter = 'ALL'; // 'ALL' | 'Received' | 'Requested' | 'Not Requested'
    let _feedbackTab = 'all'; // 'all' | 'testimonials' | 'improvements'

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

    function renderStarRating(rating) {
        const fullStars = Math.floor(rating || 0);
        let html = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                html += '<i class="fas fa-star text-amber-400"></i>';
            } else {
                html += '<i class="far fa-star text-slate-300 dark:text-slate-600"></i>';
            }
        }
        return `<span class="inline-flex gap-0.5 text-xs">${html}</span>`;
    }

    // Exported function for Analytics Engine to read authentic feedback statistics
    window.getClientFeedbackStats = function () {
        const state = getState();
        const allFeedback = (state.feedback || []).filter(f => f.status === 'Received');
        if (allFeedback.length === 0) {
            return {
                averageOverall: 5.0,
                averageQuality: 5.0,
                averageComm: 5.0,
                averageDelivery: 5.0,
                satisfactionPct: '100.0',
                totalReceived: 0,
                satisfiedPct: 100,
                hasRealFeedback: false
            };
        }

        const sumOverall = allFeedback.reduce((s, f) => s + (Number(f.overallRating) || 5), 0);
        const sumQuality = allFeedback.reduce((s, f) => s + (Number(f.qualityRating) || 5), 0);
        const sumComm = allFeedback.reduce((s, f) => s + (Number(f.communicationRating) || 5), 0);
        const sumDelivery = allFeedback.reduce((s, f) => s + (Number(f.deliveryRating) || 5), 0);

        const avgOverall = sumOverall / allFeedback.length;
        const avgQuality = sumQuality / allFeedback.length;
        const avgComm = sumComm / allFeedback.length;
        const avgDelivery = sumDelivery / allFeedback.length;

        const satisfactionPct = ((avgOverall / 5) * 100).toFixed(1);
        const satisfiedCount = allFeedback.filter(f => (f.overallRating || 0) >= 4).length;
        const satisfiedPct = Math.round((satisfiedCount / allFeedback.length) * 100);

        return {
            averageOverall: avgOverall.toFixed(1),
            averageQuality: avgQuality.toFixed(1),
            averageComm: avgComm.toFixed(1),
            averageDelivery: avgDelivery.toFixed(1),
            satisfactionPct: satisfactionPct,
            totalReceived: allFeedback.length,
            satisfiedPct: satisfiedPct,
            hasRealFeedback: true
        };
    };

    function getFilteredFeedback() {
        const state = getState();
        const list = state.feedback || [];

        return list.filter(f => {
            if (_feedbackSearchQuery) {
                const q = _feedbackSearchQuery.toLowerCase();
                const mClient = (f.clientName || '').toLowerCase().includes(q);
                const mProject = (f.projectName || '').toLowerCase().includes(q);
                const mComments = (f.comments || '').toLowerCase().includes(q);
                if (!mClient && !mProject && !mComments) return false;
            }

            if (_feedbackRatingFilter !== 'ALL' && Math.round(f.overallRating) !== Number(_feedbackRatingFilter)) {
                return false;
            }

            if (_feedbackStatusFilter !== 'ALL' && f.status !== _feedbackStatusFilter) {
                return false;
            }

            if (_feedbackTab === 'testimonials' && !f.isTestimonial) return false;
            if (_feedbackTab === 'improvements' && !f.suggestions) return false;

            return true;
        });
    }

    // =========================================================================
    // MAIN RENDER FUNCTION
    // =========================================================================
    window.renderClientFeedback = function () {
        const root = document.getElementById('client-feedback-root');
        if (!root) return;

        const state = getState();
        const allFeedback = state.feedback || [];
        const filtered = getFilteredFeedback();
        const stats = window.getClientFeedbackStats();
        const testimonialsCount = allFeedback.filter(f => f.isTestimonial).length;

        root.innerHTML = `
            <div class="space-y-6 pb-16">
                <!-- Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 text-xs font-bold text-[#a06438] dark:text-[#e6993a] uppercase tracking-wider mb-1">
                            <i class="fas fa-star"></i>
                            <span>ELNA DIGITAL Quality Assurance</span>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">Client Feedback & Reviews</h1>
                        <p class="text-xs text-[var(--text-muted)] mt-1">Authentic client satisfaction ratings, service delivery reviews, and public testimonials.</p>
                    </div>

                    <div class="flex items-center gap-2.5">
                        <button onclick="window.openAddFeedbackModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] hover:bg-[#d8892a] text-black text-xs font-extrabold shadow-sm transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                            <i class="fas fa-star text-xs"></i>
                            <span>Record Client Feedback</span>
                        </button>
                    </div>
                </div>

                <!-- KPI Metric Strip -->
                <div class="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Satisfaction Score</span>
                        <div class="text-2xl font-black text-[#e6993a] flex items-baseline gap-1">
                            <span>${stats.satisfactionPct}%</span>
                            <span class="text-xs font-bold text-slate-500">(${stats.averageOverall} / 5)</span>
                        </div>
                        <div class="flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                            ${renderStarRating(Number(stats.averageOverall))}
                        </div>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Total Reviews</span>
                        <div class="text-2xl font-black text-[var(--text-main)]">${stats.totalReceived}</div>
                        <span class="text-[10px] text-slate-500 font-semibold">${allFeedback.length} total requests</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Satisfied Ratio</span>
                        <div class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a]">${stats.satisfiedPct}%</div>
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">4★ and 5★ ratings</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Service Quality</span>
                        <div class="text-2xl font-black text-blue-600 dark:text-blue-400">${stats.averageQuality} <span class="text-xs">/ 5</span></div>
                        <span class="text-[10px] text-blue-700 dark:text-blue-300 font-semibold">Engineering & Design</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Testimonials</span>
                        <div class="text-2xl font-black text-purple-600 dark:text-purple-400">${testimonialsCount}</div>
                        <span class="text-[10px] text-purple-700 dark:text-purple-300 font-semibold">Approved for marketing</span>
                    </div>
                </div>

                <!-- Sub-tabs (All Feedback | Testimonials | Improvement Areas) -->
                <div class="flex items-center gap-2 border-b border-[var(--card-border)] pb-2 text-xs font-bold">
                    <button onclick="window.setFeedbackTab('all')" class="py-2 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${_feedbackTab === 'all' ? 'bg-[#e6993a] text-black font-extrabold shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                        <i class="fas fa-list-ul"></i>
                        <span>All Reviews (${allFeedback.length})</span>
                    </button>
                    <button onclick="window.setFeedbackTab('testimonials')" class="py-2 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${_feedbackTab === 'testimonials' ? 'bg-[#e6993a] text-black font-extrabold shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                        <i class="fas fa-quote-left"></i>
                        <span>Client Testimonials (${testimonialsCount})</span>
                    </button>
                    <button onclick="window.setFeedbackTab('improvements')" class="py-2 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${_feedbackTab === 'improvements' ? 'bg-[#e6993a] text-black font-extrabold shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                        <i class="fas fa-lightbulb"></i>
                        <span>Suggestions & Complaints</span>
                    </button>
                </div>

                <!-- Search and Filters -->
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                    <div class="flex-1 relative w-full">
                        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        <input type="text" value="${_feedbackSearchQuery}" oninput="window.setFeedbackSearchQuery(this.value)" placeholder="Search client name, project, or review feedback..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] placeholder-slate-400 focus:outline-none focus:border-[#e6993a]">
                    </div>

                    <div class="flex items-center gap-2 flex-wrap w-full md:w-auto">
                        <select onchange="window.setFeedbackRatingFilter(this.value)" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                            <option value="ALL" ${_feedbackRatingFilter === 'ALL' ? 'selected' : ''}>All Star Ratings</option>
                            <option value="5" ${_feedbackRatingFilter === '5' ? 'selected' : ''}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                            <option value="4" ${_feedbackRatingFilter === '4' ? 'selected' : ''}>⭐⭐⭐⭐ (4 Stars)</option>
                            <option value="3" ${_feedbackRatingFilter === '3' ? 'selected' : ''}>⭐⭐⭐ (3 Stars)</option>
                            <option value="2" ${_feedbackRatingFilter === '2' ? 'selected' : ''}>⭐⭐ (2 Stars)</option>
                            <option value="1" ${_feedbackRatingFilter === '1' ? 'selected' : ''}>⭐ (1 Star)</option>
                        </select>

                        <select onchange="window.setFeedbackStatusFilter(this.value)" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                            <option value="ALL" ${_feedbackStatusFilter === 'ALL' ? 'selected' : ''}>All Statuses</option>
                            <option value="Received" ${_feedbackStatusFilter === 'Received' ? 'selected' : ''}>Received</option>
                            <option value="Requested" ${_feedbackStatusFilter === 'Requested' ? 'selected' : ''}>Requested</option>
                            <option value="Not Requested" ${_feedbackStatusFilter === 'Not Requested' ? 'selected' : ''}>Not Requested</option>
                        </select>

                        ${(_feedbackSearchQuery || _feedbackRatingFilter !== 'ALL' || _feedbackStatusFilter !== 'ALL') ? `
                            <button onclick="window.resetFeedbackFilters()" class="py-2 px-3 rounded-xl text-rose-500 hover:bg-rose-500/10 font-bold transition cursor-pointer">
                                Reset
                            </button>
                        ` : ''}
                    </div>
                </div>

                <!-- Feedback Cards Grid -->
                ${filtered.length === 0 ? `
                    <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center mx-auto text-xl">
                            <i class="far fa-star"></i>
                        </div>
                        <h3 class="text-base font-bold text-[var(--text-main)]">No feedback found</h3>
                        <p class="text-xs text-[var(--text-muted)] max-w-sm mx-auto">Collect ratings from clients after project completion to track authentic satisfaction.</p>
                        <button onclick="window.openAddFeedbackModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] text-black text-xs font-bold">
                            Record Feedback
                        </button>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${filtered.map(fb => `
                            <div class="ui-card p-5 rounded-2xl border border-[var(--card-border)] hover:border-[#e6993a]/50 transition space-y-3 shadow-xs flex flex-col justify-between">
                                <div class="space-y-2">
                                    <div class="flex items-start justify-between gap-3">
                                        <div>
                                            <h4 class="font-black text-sm text-[var(--text-main)]">${fb.clientName}</h4>
                                            <span class="text-[10px] text-[var(--text-muted)]">${fb.projectName} · ${fb.date}</span>
                                        </div>
                                        <div class="text-right">
                                            <div class="flex items-center gap-1">
                                                ${renderStarRating(fb.overallRating)}
                                            </div>
                                            <span class="text-[9px] font-black uppercase text-amber-600 block mt-0.5">${fb.overallRating} / 5 Rating</span>
                                        </div>
                                    </div>

                                    <!-- 4 Breakdown Sub-ratings -->
                                    <div class="grid grid-cols-3 gap-2 py-2 border-y border-[var(--card-border)] text-[10px] text-[var(--text-muted)]">
                                        <div>Quality: <strong class="text-[var(--text-main)]">${fb.qualityRating || 5}/5</strong></div>
                                        <div>Communication: <strong class="text-[var(--text-main)]">${fb.communicationRating || 5}/5</strong></div>
                                        <div>Delivery: <strong class="text-[var(--text-main)]">${fb.deliveryRating || 5}/5</strong></div>
                                    </div>

                                    ${fb.comments ? `
                                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] italic leading-relaxed">
                                            "${fb.comments}"
                                        </div>
                                    ` : ''}

                                    ${fb.suggestions ? `
                                        <div class="p-2.5 rounded-xl bg-blue-500/10 text-xs text-blue-800 dark:text-blue-200 space-y-0.5">
                                            <span class="text-[10px] font-bold uppercase tracking-wider block text-blue-600 dark:text-blue-400">
                                                <i class="fas fa-lightbulb mr-1"></i>Client Suggestion / Improvement:
                                            </span>
                                            <p>${fb.suggestions}</p>
                                        </div>
                                    ` : ''}
                                </div>

                                <!-- Actions & Testimonial Switch -->
                                <div class="flex items-center justify-between pt-2 border-t border-[var(--card-border)] text-xs">
                                    <label class="flex items-center gap-2 cursor-pointer text-[11px] font-bold text-[var(--text-muted)] hover:text-[var(--text-main)]">
                                        <input type="checkbox" ${fb.isTestimonial ? 'checked' : ''} onchange="window.toggleTestimonial('${fb.id}', this.checked)" class="accent-[#e6993a] w-3.5 h-3.5 rounded cursor-pointer">
                                        <span>Showcase Testimonial</span>
                                    </label>

                                    <button onclick="window.deleteFeedback('${fb.id}')" class="text-slate-400 hover:text-rose-500 transition cursor-pointer p-1">
                                        <i class="fas fa-trash-alt text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    };

    // =========================================================================
    // MODALS & ACTIONS
    // =========================================================================
    window.setFeedbackTab = function (tab) {
        _feedbackTab = tab;
        window.renderClientFeedback();
    };

    window.setFeedbackSearchQuery = function (q) {
        _feedbackSearchQuery = q;
        window.renderClientFeedback();
    };

    window.setFeedbackRatingFilter = function (r) {
        _feedbackRatingFilter = r;
        window.renderClientFeedback();
    };

    window.setFeedbackStatusFilter = function (s) {
        _feedbackStatusFilter = s;
        window.renderClientFeedback();
    };

    window.resetFeedbackFilters = function () {
        _feedbackSearchQuery = '';
        _feedbackRatingFilter = 'ALL';
        _feedbackStatusFilter = 'ALL';
        window.renderClientFeedback();
    };

    window.toggleTestimonial = function (id, checked) {
        const state = getState();
        const fb = (state.feedback || []).find(f => f.id === id);
        if (fb) {
            fb.isTestimonial = checked;
            saveState();
            showToast(checked ? 'Testimonial marked for public showcase' : 'Removed from showcase');
            window.renderClientFeedback();
        }
    };

    window.openAddFeedbackModal = function () {
        let modal = document.getElementById('feedback-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'feedback-modal-root';
            document.body.appendChild(modal);
        }

        const state = getState();
        const projects = state.projects || [];
        const clients = state.clients || [];

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-lg rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-xl bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center font-bold">
                                <i class="fas fa-star text-sm"></i>
                            </span>
                            <h3 class="text-base font-black text-[var(--text-main)]">Record Authentic Client Feedback</h3>
                        </div>
                        <button onclick="window.closeFeedbackModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form id="add-feedback-form" onsubmit="window.saveNewFeedback(event)" class="space-y-3.5 text-xs">
                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Select Project *</label>
                            <select id="fb-project-id" onchange="window.onFeedbackProjectChange(this.value)" required class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                                <option value="">-- Choose Project --</option>
                                ${projects.map(p => {
                                    const client = clients.find(c => c.id === p.clientId) || { businessName: p.clientName };
                                    return `<option value="${p.id}" data-client="${p.clientId}" data-clientname="${client.businessName}" data-projname="${p.name}">${client.businessName} — ${p.name}</option>`;
                                }).join('')}
                            </select>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Overall (1-5)</label>
                                <select id="fb-overall" class="w-full py-2 px-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none">
                                    <option value="5" selected>5 ★★★★★</option>
                                    <option value="4">4 ★★★★</option>
                                    <option value="3">3 ★★★</option>
                                    <option value="2">2 ★★</option>
                                    <option value="1">1 ★</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Quality</label>
                                <select id="fb-quality" class="w-full py-2 px-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none">
                                    <option value="5" selected>5 / 5</option>
                                    <option value="4">4 / 5</option>
                                    <option value="3">3 / 5</option>
                                    <option value="2">2 / 5</option>
                                    <option value="1">1 / 5</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Comm.</label>
                                <select id="fb-comm" class="w-full py-2 px-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none">
                                    <option value="5" selected>5 / 5</option>
                                    <option value="4">4 / 5</option>
                                    <option value="3">3 / 5</option>
                                    <option value="2">2 / 5</option>
                                    <option value="1">1 / 5</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Delivery</label>
                                <select id="fb-delivery" class="w-full py-2 px-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none">
                                    <option value="5" selected>5 / 5</option>
                                    <option value="4">4 / 5</option>
                                    <option value="3">3 / 5</option>
                                    <option value="2">2 / 5</option>
                                    <option value="1">1 / 5</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Client Comments & Feedback</label>
                            <textarea id="fb-comments" rows="3" required placeholder="What did the client say about our execution and service delivery?" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"></textarea>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Client Suggestions for Improvement</label>
                            <textarea id="fb-suggestions" rows="2" placeholder="Any pain points or requested improvements?" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"></textarea>
                        </div>

                        <div class="flex items-center justify-between pt-2">
                            <label class="flex items-center gap-2 cursor-pointer font-bold text-[var(--text-main)]">
                                <input type="checkbox" id="fb-is-testimonial" checked class="accent-[#e6993a] w-4 h-4 rounded">
                                <span>Approved for Public Testimonials</span>
                            </label>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeFeedbackModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-[#e6993a] text-black font-black hover:bg-[#d8892a] transition shadow-sm">
                                Save Feedback Record
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    window.saveNewFeedback = function (e) {
        e.preventDefault();
        const state = getState();
        if (!state.feedback) state.feedback = [];

        const sel = document.getElementById('fb-project-id');
        const opt = sel.options[sel.selectedIndex];
        const projId = sel.value;
        const clientId = opt.getAttribute('data-client');
        const clientName = opt.getAttribute('data-clientname') || 'Client';
        const projName = opt.getAttribute('data-projname') || 'Project';

        const newFb = {
            id: 'fb-' + Date.now(),
            clientId: clientId,
            projectId: projId,
            clientName: clientName,
            projectName: projName,
            overallRating: Number(document.getElementById('fb-overall').value) || 5,
            qualityRating: Number(document.getElementById('fb-quality').value) || 5,
            communicationRating: Number(document.getElementById('fb-comm').value) || 5,
            deliveryRating: Number(document.getElementById('fb-delivery').value) || 5,
            comments: document.getElementById('fb-comments').value.trim(),
            suggestions: document.getElementById('fb-suggestions').value.trim(),
            date: getTodayStr(),
            status: 'Received',
            isTestimonial: document.getElementById('fb-is-testimonial').checked
        };

        state.feedback.unshift(newFb);
        saveState();
        window.closeFeedbackModal();
        showToast('Client feedback recorded & synchronized with Analytics');
        window.renderClientFeedback();
    };

    window.deleteFeedback = function (id) {
        const state = getState();
        if (confirm('Delete this feedback entry?')) {
            state.feedback = (state.feedback || []).filter(f => f.id !== id);
            saveState();
            showToast('Feedback removed');
            window.renderClientFeedback();
        }
    };

    window.closeFeedbackModal = function () {
        const modal = document.getElementById('feedback-modal-root');
        if (modal) modal.remove();
    };

})();
