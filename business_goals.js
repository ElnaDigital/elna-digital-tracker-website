/**
 * ELNA DIGITAL — BUSINESS GOALS & MILESTONES MODULE (business_goals.js)
 * Real-time goal tracking connected to payments, expenses, clients,
 * and project completion, with milestone celebrations and historical records.
 */

(function () {
    'use strict';

    let _goalCategoryFilter = 'ALL';
    let _goalStatusFilter = 'ALL';
    let _goalTab = 'active'; // 'active' | 'history'

    const GOAL_CATEGORIES = [
        'Revenue Goals',
        'Profit Goals',
        'Client Acquisition',
        'Project Completion',
        'Service Growth',
        'Package Sales',
        'Business Development',
        'Personal Business Milestones'
    ];

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

    function calculateGoalValue(goal) {
        const state = getState();
        const payments = state.payments || [];
        const expenses = state.expenses || [];
        const clients = state.clients || [];
        const projects = state.projects || [];

        switch (goal.dataSource) {
            case 'revenue':
                return payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

            case 'profit':
                const rev = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
                const exp = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
                return Math.max(0, rev - exp);

            case 'clients':
                return clients.length;

            case 'completed_projects':
                return projects.filter(p => p.status === 'Completed').length;

            case 'packages':
                return projects.length;

            case 'manual':
            default:
                return Number(goal.currentValue) || 0;
        }
    }

    // =========================================================================
    // MAIN RENDER FUNCTION
    // =========================================================================
    window.renderBusinessGoals = function () {
        const root = document.getElementById('business-goals-root');
        if (!root) return;

        const state = getState();
        const goals = state.businessGoals || [];
        const today = getTodayStr();

        // Update current values and detect new milestone celebrations
        let hasNewAchievements = false;
        goals.forEach(g => {
            const current = calculateGoalValue(g);
            g.currentValue = current;

            // Check if goal reached 100%
            if (current >= g.target && g.target > 0) {
                if (g.status !== 'completed') {
                    g.status = 'completed';
                    g.achievedDate = g.achievedDate || today;
                }

                // Check celebration flag
                if (!g._celebrated) {
                    g._celebrated = true;
                    hasNewAchievements = true;
                    setTimeout(() => {
                        if (window.confetti) window.confetti({ particleCount: 100, spread: 80 });
                        showToast(`🏆 Milestone Achieved: "${g.name}" target reached!`);
                    }, 300);
                }
            } else if (g.deadline && g.deadline < today && g.status !== 'completed') {
                g.status = 'overdue';
            } else if (g.status !== 'completed') {
                g.status = 'active';
            }
        });

        if (hasNewAchievements) {
            saveState();
        }

        const activeGoals = goals.filter(g => g.status !== 'completed');
        const completedGoals = goals.filter(g => g.status === 'completed');
        const overdueGoals = goals.filter(g => g.status === 'overdue');
        const inProgressGoals = goals.filter(g => g.status === 'active');

        // Overall achievement rate
        const totalTarget = goals.reduce((s, g) => s + (Number(g.target) || 0), 0);
        const totalCurrent = goals.reduce((s, g) => s + (Number(g.currentValue) || 0), 0);
        const overallRate = totalTarget > 0 ? Math.min(100, Math.round((totalCurrent / totalTarget) * 100)) : 0;

        const displayList = _goalTab === 'active' ? activeGoals : completedGoals;

        root.innerHTML = `
            <div class="space-y-6 pb-16">
                <!-- Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 text-xs font-bold text-[#a06438] dark:text-[#e6993a] uppercase tracking-wider mb-1">
                            <i class="fas fa-bullseye"></i>
                            <span>ELNA DIGITAL Business Targets</span>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">Business Goals & Milestones</h1>
                        <p class="text-xs text-[var(--text-muted)] mt-1">Set and track real growth milestones automatically connected to live revenue, profit, clients, and project deliveries.</p>
                    </div>

                    <div class="flex items-center gap-2.5">
                        <button onclick="window.openNewGoalModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] hover:bg-[#d8892a] text-black text-xs font-extrabold shadow-sm transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                            <i class="fas fa-plus text-xs"></i>
                            <span>Create New Goal</span>
                        </button>
                    </div>
                </div>

                <!-- KPI Metric Cards -->
                <div class="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Total Active</span>
                        <div class="text-2xl font-black text-[var(--text-main)]">${activeGoals.length}</div>
                        <span class="text-[10px] text-slate-500 font-semibold">${inProgressGoals.length} on track</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Completed</span>
                        <div class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a]">${completedGoals.length}</div>
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Trophies earned</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Overdue Targets</span>
                        <div class="text-2xl font-black ${overdueGoals.length > 0 ? 'text-rose-500' : 'text-slate-400'}">${overdueGoals.length}</div>
                        <span class="text-[10px] ${overdueGoals.length > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}">Needs deadline push</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Achievement Rate</span>
                        <div class="text-2xl font-black text-[#e6993a]">${overallRate}%</div>
                        <span class="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">Portfolio progress</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Goal Categories</span>
                        <div class="text-2xl font-black text-purple-600 dark:text-purple-400">8</div>
                        <span class="text-[10px] text-purple-700 dark:text-purple-300 font-semibold">Tracked dimensions</span>
                    </div>
                </div>

                <!-- Sub-tabs: Active Targets vs Milestone Achievement History -->
                <div class="flex items-center gap-2 border-b border-[var(--card-border)] pb-2 text-xs font-bold">
                    <button onclick="window.setGoalTab('active')" class="py-2 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${_goalTab === 'active' ? 'bg-[#e6993a] text-black font-extrabold shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                        <i class="fas fa-crosshairs"></i>
                        <span>Active Targets (${activeGoals.length})</span>
                    </button>
                    <button onclick="window.setGoalTab('history')" class="py-2 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${_goalTab === 'history' ? 'bg-[#e6993a] text-black font-extrabold shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                        <i class="fas fa-trophy"></i>
                        <span>Achievement History (${completedGoals.length})</span>
                    </button>
                </div>

                <!-- Goals Cards Grid -->
                ${displayList.length === 0 ? `
                    <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center mx-auto text-xl">
                            <i class="fas fa-bullseye"></i>
                        </div>
                        <h3 class="text-base font-bold text-[var(--text-main)]">No ${_goalTab === 'active' ? 'active' : 'completed'} goals found</h3>
                        <p class="text-xs text-[var(--text-muted)] max-w-sm mx-auto">Set measurable growth targets for revenue, client onboarding, or project deliveries.</p>
                        <button onclick="window.openNewGoalModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] text-black text-xs font-bold">
                            Create First Goal
                        </button>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${displayList.map(goal => {
                            const isETB = goal.unit === 'ETB';
                            const targetStr = isETB ? formatETB(goal.target) : `${goal.target} ${goal.unit}`;
                            const currentStr = isETB ? formatETB(goal.currentValue) : `${goal.currentValue} ${goal.unit}`;
                            const pct = goal.target > 0 ? Math.min(100, Math.round((goal.currentValue / goal.target) * 100)) : 0;
                            const isCompleted = goal.status === 'completed' || pct >= 100;
                            const isOverdue = goal.status === 'overdue' && !isCompleted;

                            // Calculate remaining
                            const remaining = Math.max(0, goal.target - goal.currentValue);
                            const remainingStr = isETB ? formatETB(remaining) : `${remaining} ${goal.unit}`;

                            // Calculate days remaining
                            let daysLeftStr = 'No deadline';
                            if (goal.deadline) {
                                const diff = Math.ceil((new Date(goal.deadline) - new Date(today)) / (1000 * 60 * 60 * 24));
                                daysLeftStr = diff > 0 ? `${diff} days left` : diff === 0 ? 'Due Today' : `${Math.abs(diff)} days overdue`;
                            }

                            return `
                                <div class="ui-card p-5 rounded-2xl border ${isCompleted ? 'border-emerald-500/40 bg-emerald-500/5' : isOverdue ? 'border-rose-500/40' : 'border-[var(--card-border)]'} hover:border-[#e6993a]/50 transition space-y-3.5 shadow-xs flex flex-col justify-between">
                                    <div class="space-y-2.5">
                                        <!-- Top Row: Category Pill & Priority / Status Badge -->
                                        <div class="flex items-center justify-between gap-2">
                                            <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[var(--subtle-bg)] text-[#a06438] dark:text-[#e6993a] border border-[var(--card-border)]">
                                                ${goal.category}
                                            </span>
                                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : isOverdue ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                                                ${isCompleted ? '🏆 Achieved' : isOverdue ? '⚠️ Overdue' : goal.priority + ' Priority'}
                                            </span>
                                        </div>

                                        <div>
                                            <h4 class="font-black text-sm text-[var(--text-main)] leading-snug">${goal.name}</h4>
                                            <p class="text-[11px] text-[var(--text-muted)] mt-1 line-clamp-2">${goal.description || ''}</p>
                                        </div>

                                        <!-- Progress Bar & Values -->
                                        <div class="space-y-1.5 pt-1">
                                            <div class="flex items-baseline justify-between text-xs">
                                                <span class="font-black text-base text-[var(--text-main)]">${currentStr}</span>
                                                <span class="text-[11px] text-[var(--text-muted)] font-semibold">Target: <strong class="text-[var(--text-main)]">${targetStr}</strong></span>
                                            </div>

                                            <div class="w-full bg-[var(--subtle-bg)] rounded-full h-2 overflow-hidden border border-[var(--card-border)]/40">
                                                <div class="h-2 rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : isOverdue ? 'bg-rose-500' : 'bg-[#e6993a]'}" style="width: ${pct}%;"></div>
                                            </div>

                                            <div class="flex items-center justify-between text-[10px] font-bold">
                                                <span class="${isCompleted ? 'text-emerald-600' : 'text-[#e6993a]'}">${pct}% Completed</span>
                                                <span class="text-[var(--text-muted)]">${isCompleted ? 'Goal Hit!' : `${remainingStr} remaining`}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Bottom Info & Action -->
                                    <div class="pt-2 border-t border-[var(--card-border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                                        <div class="flex items-center gap-1.5 font-semibold">
                                            <i class="far fa-calendar-alt text-[#e6993a]"></i>
                                            <span class="${isOverdue ? 'text-rose-500 font-bold' : ''}">${daysLeftStr}</span>
                                        </div>

                                        <div class="flex items-center gap-1.5">
                                            ${goal.dataSource === 'manual' ? `
                                                <button onclick="window.updateManualGoalProgress('${goal.id}')" class="py-1 px-2 rounded-lg bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[#e6993a] font-bold text-xs transition cursor-pointer" title="Update current progress">
                                                    Update
                                                </button>
                                            ` : `
                                                <span class="text-[9px] px-1.5 py-0.5 rounded bg-[var(--subtle-bg)] font-bold text-slate-500" title="Connected to ${goal.dataSource}">
                                                    ⚡ Auto
                                                </span>
                                            `}
                                            <button onclick="window.deleteGoal('${goal.id}')" class="w-7 h-7 rounded-lg bg-[var(--subtle-bg)] hover:bg-rose-500/15 text-slate-400 hover:text-rose-500 flex items-center justify-center transition cursor-pointer" title="Delete Goal">
                                                <i class="fas fa-trash-alt text-[10px]"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            </div>
        `;
    };

    // =========================================================================
    // MODALS & ACTIONS
    // =========================================================================
    window.setGoalTab = function (tab) {
        _goalTab = tab;
        window.renderBusinessGoals();
    };

    window.openNewGoalModal = function () {
        let modal = document.getElementById('goals-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'goals-modal-root';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-lg rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-xl bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center font-bold">
                                <i class="fas fa-bullseye text-sm"></i>
                            </span>
                            <h3 class="text-base font-black text-[var(--text-main)]">Set Business Target Goal</h3>
                        </div>
                        <button onclick="window.closeGoalModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form id="new-goal-form" onsubmit="window.saveNewGoal(event)" class="space-y-3.5 text-xs">
                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Goal Name *</label>
                            <input type="text" id="goal-name" required placeholder="e.g. Q1 2027 Revenue Milestone / 15 Client Retainers" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-bold focus:outline-none">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Category</label>
                                <select id="goal-cat" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                                    ${GOAL_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Priority</label>
                                <select id="goal-priority" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="High" selected>High Priority</option>
                                    <option value="Medium">Medium Priority</option>
                                    <option value="Low">Low Priority</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Target Number / Amount *</label>
                                <input type="number" id="goal-target" required value="100000" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-black text-[#e6993a] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Unit</label>
                                <select id="goal-unit" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="ETB" selected>ETB (Currency)</option>
                                    <option value="clients">Clients</option>
                                    <option value="projects">Projects</option>
                                    <option value="%">% Percentage</option>
                                    <option value="units">Units</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Automated Data Connection</label>
                            <select id="goal-datasource" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                                <option value="revenue" selected>💰 Actual Earned Revenue (from payments)</option>
                                <option value="profit">📈 Net Profit (revenue minus expenses)</option>
                                <option value="clients">👥 Registered Clients Count</option>
                                <option value="completed_projects">🏁 Completed Projects Count</option>
                                <option value="packages">📦 Total Active Packages/Projects</option>
                                <option value="manual">✍️ Manual Progress Updates</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Start Date</label>
                                <input type="date" id="goal-start-date" value="${getTodayStr()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Deadline Date</label>
                                <input type="date" id="goal-deadline" value="${(() => {
                                    const d = new Date();
                                    d.setDate(d.getDate() + 60);
                                    return d.toISOString().split('T')[0];
                                })()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Description & Strategy Notes</label>
                            <textarea id="goal-desc" rows="2" placeholder="Key initiatives, campaigns, or strategic milestones to hit this goal..." class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"></textarea>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeGoalModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-[#e6993a] text-black font-black hover:bg-[#d8892a] transition shadow-sm">
                                Launch Goal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    window.saveNewGoal = function (e) {
        e.preventDefault();
        const state = getState();
        if (!state.businessGoals) state.businessGoals = [];

        const newGoal = {
            id: 'goal-' + Date.now(),
            name: document.getElementById('goal-name').value.trim(),
            category: document.getElementById('goal-cat').value,
            priority: document.getElementById('goal-priority').value,
            target: Number(document.getElementById('goal-target').value) || 1,
            startValue: 0,
            currentValue: 0,
            unit: document.getElementById('goal-unit').value,
            dataSource: document.getElementById('goal-datasource').value,
            startDate: document.getElementById('goal-start-date').value,
            deadline: document.getElementById('goal-deadline').value,
            description: document.getElementById('goal-desc').value.trim(),
            status: 'active',
            achievedDate: null,
            _celebrated: false
        };

        state.businessGoals.unshift(newGoal);
        saveState();
        window.closeGoalModal();
        showToast(`Goal "${newGoal.name}" activated!`);
        window.renderBusinessGoals();
    };

    window.updateManualGoalProgress = function (id) {
        const state = getState();
        const g = (state.businessGoals || []).find(goal => goal.id === id);
        if (!g) return;

        const val = prompt(`Update current progress for "${g.name}" (Target: ${g.target} ${g.unit}):`, g.currentValue);
        if (val !== null && !isNaN(val)) {
            g.currentValue = Number(val);
            if (g.currentValue >= g.target && g.status !== 'completed') {
                g.status = 'completed';
                g.achievedDate = getTodayStr();
                if (!g._celebrated) {
                    g._celebrated = true;
                    if (window.confetti) window.confetti({ particleCount: 100, spread: 80 });
                    showToast(`🏆 Congratulations! Milestone achieved: "${g.name}"`);
                }
            }
            saveState();
            window.renderBusinessGoals();
        }
    };

    window.deleteGoal = function (id) {
        const state = getState();
        if (confirm('Delete this business target goal?')) {
            state.businessGoals = (state.businessGoals || []).filter(g => g.id !== id);
            saveState();
            showToast('Goal removed');
            window.renderBusinessGoals();
        }
    };

    window.closeGoalModal = function () {
        const modal = document.getElementById('goals-modal-root');
        if (modal) modal.remove();
    };

})();
