/**
 * ELNA DIGITAL — TASKS, CALENDAR & REMINDERS MODULE (calendar_engine.js)
 * Fully unified central scheduling & task execution workspace:
 * integrates roadmap tasks, project deadlines, client meetings, payment due dates,
 * lead follow-ups, business goal milestones, and custom reminders.
 */

(function () {
    'use strict';

    let _calendarViewMode = 'month'; // 'month' | 'week' | 'day' | 'list' | 'tasks'
    let _calendarCurrentDate = new Date(); // anchor date
    let _calendarFilterType = 'ALL'; // 'ALL' | 'Task' | 'Deadline' | 'Payment' | 'Follow-up' | 'Meeting' | 'Milestone' | 'Custom'
    let _tasksFilterStatus = 'pending'; // 'all' | 'pending' | 'completed'

    function getTodayStr() {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function formatShortDate(dateStr) {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length < 3) return dateStr;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const mIdx = parseInt(parts[1], 10) - 1;
        return `${months[mIdx] || parts[1]} ${parseInt(parts[2], 10)}, ${parts[0]}`;
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

    // Collect all unified tasks, deadlines, and events across the entire platform
    function getAllUnifiedEvents() {
        const state = getState();
        const unified = [];

        // 1. Operational & Roadmap Tasks (from window.appState.tasks)
        if (window.appState && Array.isArray(window.appState.tasks)) {
            window.appState.tasks.forEach(t => {
                unified.push({
                    id: `app-task-${t.id}`,
                    appTaskId: t.id,
                    title: t.title,
                    date: t.date || getTodayStr(),
                    time: '09:00',
                    type: 'Task',
                    description: t.description || 'Roadmap operational task',
                    priority: t.priority || 'Medium',
                    clientId: null,
                    projectId: null,
                    completed: !!t.done,
                    isManual: true,
                    isAppTask: true,
                    badgeClass: t.done ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300'
                });
            });
        }

        // 2. Manual Custom Events & Reminders
        (state.calendarEvents || []).forEach(evt => {
            unified.push({
                id: evt.id,
                title: evt.title,
                date: evt.date,
                time: evt.time || '10:00',
                type: evt.type || 'Custom',
                description: evt.description || '',
                priority: evt.priority || 'Medium',
                clientId: evt.clientId || null,
                projectId: evt.projectId || null,
                completed: !!evt.completed,
                isManual: true,
                isAppTask: false,
                badgeClass: evt.priority === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
            });
        });

        // 3. Project Delivery Deadlines
        (state.projects || []).forEach(p => {
            if (p.deadline) {
                unified.push({
                    id: `p-dl-${p.id}`,
                    title: `Delivery Deadline: ${p.name || p.clientName}`,
                    date: p.deadline,
                    time: '18:00',
                    type: 'Deadline',
                    description: `Final deliverable handover for agreed price ${Math.round(p.finalPrice || 0).toLocaleString()} ETB. Status: ${p.status}`,
                    priority: 'High',
                    clientId: p.clientId,
                    projectId: p.id,
                    completed: p.status === 'Completed',
                    isManual: false,
                    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                });
            }

            // Payment Due Date (if project has pending balance and is near or past start date)
            const paid = (state.payments || []).filter(pay => pay.projectId === p.id).reduce((s, pay) => s + (Number(pay.amount) || 0), 0);
            const balance = (Number(p.finalPrice) || 0) - paid;
            if (balance > 0 && p.deadline) {
                unified.push({
                    id: `p-pay-${p.id}`,
                    title: `Payment Due (${Math.round(balance).toLocaleString()} ETB): ${p.clientName}`,
                    date: p.deadline,
                    time: '12:00',
                    type: 'Payment',
                    description: `Outstanding balance of ${Math.round(balance).toLocaleString()} ETB for project "${p.name}".`,
                    priority: 'High',
                    clientId: p.clientId,
                    projectId: p.id,
                    completed: false,
                    isManual: false,
                    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300'
                });
            }
        });

        // 4. Lead Follow-Ups
        (state.leads || []).forEach(l => {
            if (l.nextFollowUpDate && l.status !== 'Converted' && l.status !== 'Lost') {
                unified.push({
                    id: `lead-fu-${l.id}`,
                    title: `Lead Follow-Up: ${l.businessName}`,
                    date: l.nextFollowUpDate,
                    time: '11:00',
                    type: 'Follow-up',
                    description: `Scheduled follow-up with ${l.ownerName || 'Contact'} (${l.phone}). Stage: ${l.status}. Value: ${Math.round(l.estimatedValue || 0).toLocaleString()} ETB.`,
                    priority: 'Medium',
                    clientId: null,
                    projectId: null,
                    leadId: l.id,
                    completed: false,
                    isManual: false,
                    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300'
                });
            }
        });

        // 5. Business Goals & Milestone Deadlines
        (state.businessGoals || []).forEach(g => {
            if (g.deadline && g.status !== 'completed') {
                unified.push({
                    id: `goal-dl-${g.id}`,
                    title: `Milestone Target: ${g.name}`,
                    date: g.deadline,
                    time: '23:59',
                    type: 'Milestone',
                    description: `Target: ${g.target} ${g.unit}. Category: ${g.category}.`,
                    priority: g.priority || 'Medium',
                    clientId: null,
                    projectId: null,
                    goalId: g.id,
                    completed: false,
                    isManual: false,
                    badgeClass: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300'
                });
            }
        });

        return unified;
    }

    // =========================================================================
    // MAIN RENDER FUNCTION
    // =========================================================================
    window.renderCalendarReminders = function () {
        const root = document.getElementById('calendar-reminders-root');
        if (!root) return;

        const allEvents = getAllUnifiedEvents();
        const today = getTodayStr();

        // Calculate KPI summary
        const overdueEvents = allEvents.filter(e => !e.completed && e.date < today);
        const todayEvents = allEvents.filter(e => !e.completed && e.date === today);
        const upcomingEvents = allEvents.filter(e => !e.completed && e.date > today);
        const completedEvents = allEvents.filter(e => e.completed);
        const pendingTasksCount = allEvents.filter(e => !e.completed).length;

        root.innerHTML = `
            <div class="space-y-6 pb-16">
                <!-- Top Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 text-xs font-bold text-[#a06438] dark:text-[#e6993a] uppercase tracking-wider mb-1">
                            <i class="fas fa-calendar-check"></i>
                            <span>ELNA DIGITAL Master Tasks & Execution Hub</span>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">Tasks, Calendar & Reminders</h1>
                        <p class="text-xs text-[var(--text-muted)] mt-1">Unified command center combining daily operational tasks, interactive calendar views, project deadlines, and follow-up alerts.</p>
                    </div>

                    <div class="flex items-center gap-2.5 flex-wrap">
                        <!-- View Selector (Tasks Checklist | Month | Week | Day | Agenda) -->
                        <div class="p-1 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center">
                            <button onclick="window.setCalendarViewMode('tasks')" class="py-1 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${_calendarViewMode === 'tasks' ? 'bg-[#e6993a] text-black shadow-xs font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                                <i class="fas fa-check-square mr-1"></i>Tasks (${pendingTasksCount})
                            </button>
                            <button onclick="window.setCalendarViewMode('month')" class="py-1 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${_calendarViewMode === 'month' ? 'bg-[#e6993a] text-black shadow-xs font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                                Month
                            </button>
                            <button onclick="window.setCalendarViewMode('week')" class="py-1 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${_calendarViewMode === 'week' ? 'bg-[#e6993a] text-black shadow-xs font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                                Week
                            </button>
                            <button onclick="window.setCalendarViewMode('day')" class="py-1 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${_calendarViewMode === 'day' ? 'bg-[#e6993a] text-black shadow-xs font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                                Day
                            </button>
                            <button onclick="window.setCalendarViewMode('list')" class="py-1 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${_calendarViewMode === 'list' ? 'bg-[#e6993a] text-black shadow-xs font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                                Agenda
                            </button>
                        </div>

                        <!-- Add Actions -->
                        <button onclick="window.openAddEventModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] hover:bg-[#d8892a] text-black text-xs font-extrabold shadow-sm transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                            <i class="fas fa-plus text-xs"></i>
                            <span>Add Event / Task</span>
                        </button>
                    </div>
                </div>

                <!-- Overdue Alert Banner -->
                ${overdueEvents.length > 0 ? `
                    <div class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-800 dark:text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                <i class="fas fa-bell"></i>
                            </span>
                            <div>
                                <span class="font-black text-sm block">Action Required: ${overdueEvents.length} Overdue Items Pending!</span>
                                <span class="text-[11px] opacity-90">${overdueEvents.map(e => e.title).slice(0, 2).join(' · ')}${overdueEvents.length > 2 ? ` and ${overdueEvents.length - 2} more` : ''}</span>
                            </div>
                        </div>
                        <button onclick="window.setCalendarViewMode('tasks')" class="py-1.5 px-3 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition cursor-pointer shrink-0">
                            View Tasks List
                        </button>
                    </div>
                ` : ''}

                <!-- KPI Metric Strip -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1 cursor-pointer hover:border-[#e6993a] transition" onclick="window.setCalendarViewMode('tasks')">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Pending Tasks</span>
                        <div class="text-2xl font-black text-amber-600 dark:text-[#e6993a]">${pendingTasksCount}</div>
                        <span class="text-[10px] text-slate-500 font-semibold">${todayEvents.length} scheduled today</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Upcoming Milestones</span>
                        <div class="text-2xl font-black text-blue-600 dark:text-blue-400">${upcomingEvents.length}</div>
                        <span class="text-[10px] text-blue-700 dark:text-blue-300 font-semibold">Next 30 days</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Overdue Alerts</span>
                        <div class="text-2xl font-black ${overdueEvents.length > 0 ? 'text-rose-500' : 'text-slate-400'}">${overdueEvents.length}</div>
                        <span class="text-[10px] ${overdueEvents.length > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}">Needs action</span>
                    </div>

                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Completed</span>
                        <div class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a]">${completedEvents.length}</div>
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Accomplished items</span>
                    </div>
                </div>

                <!-- Main Active View: Tasks Checklist OR Calendar Views -->
                ${_calendarViewMode === 'tasks' ? renderTasksChecklistView(allEvents, today) : `
                    <!-- Calendar View Nav Controls -->
                    <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                        <div class="flex items-center gap-3">
                            <button onclick="window.calendarShiftDate(-1)" class="w-8 h-8 rounded-xl bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-main)] flex items-center justify-center transition border border-[var(--card-border)] cursor-pointer">
                                <i class="fas fa-chevron-left text-xs"></i>
                            </button>
                            <h2 class="text-base sm:text-lg font-black text-[var(--text-main)] min-w-[180px] text-center">
                                ${formatMonthYearHeader(_calendarCurrentDate)}
                            </h2>
                            <button onclick="window.calendarShiftDate(1)" class="w-8 h-8 rounded-xl bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-main)] flex items-center justify-center transition border border-[var(--card-border)] cursor-pointer">
                                <i class="fas fa-chevron-right text-xs"></i>
                            </button>
                            <button onclick="window.calendarJumpToday()" class="py-1 px-3 rounded-xl bg-[var(--subtle-bg)] text-xs font-bold text-[var(--text-main)] border border-[var(--card-border)] hover:border-[#e6993a] transition cursor-pointer">
                                Today
                            </button>
                        </div>

                        <!-- Type Filter -->
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[11px] font-bold text-[var(--text-muted)]">Filter:</span>
                            <select onchange="window.setCalendarFilterType(this.value)" class="py-1.5 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                                <option value="ALL" ${_calendarFilterType === 'ALL' ? 'selected' : ''}>All Events & Tasks</option>
                                <option value="Task" ${_calendarFilterType === 'Task' ? 'selected' : ''}>📋 Operational Tasks</option>
                                <option value="Deadline" ${_calendarFilterType === 'Deadline' ? 'selected' : ''}>🏁 Project Deadlines</option>
                                <option value="Payment" ${_calendarFilterType === 'Payment' ? 'selected' : ''}>💰 Payment Dues</option>
                                <option value="Follow-up" ${_calendarFilterType === 'Follow-up' ? 'selected' : ''}>📞 Lead Follow-ups</option>
                                <option value="Meeting" ${_calendarFilterType === 'Meeting' ? 'selected' : ''}>🤝 Client Meetings</option>
                                <option value="Milestone" ${_calendarFilterType === 'Milestone' ? 'selected' : ''}>🎯 Business Goals</option>
                                <option value="Custom" ${_calendarFilterType === 'Custom' ? 'selected' : ''}>📝 Custom Reminders</option>
                            </select>
                        </div>
                    </div>

                    <!-- Selected Calendar Mode Grid -->
                    ${_calendarViewMode === 'month' ? renderMonthGrid(allEvents, today) :
                      _calendarViewMode === 'week' ? renderWeekView(allEvents, today) :
                      _calendarViewMode === 'day' ? renderDayView(allEvents, today) :
                      renderAgendaListView(allEvents, today)}
                `}
            </div>
        `;
    };

    function formatMonthYearHeader(d) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    // =========================================================================
    // TASKS CHECKLIST VIEW (COMBINING TASKS & REMINDERS)
    // =========================================================================
    function renderTasksChecklistView(allEvents, today) {
        let tasksList = allEvents;

        if (_tasksFilterStatus === 'pending') {
            tasksList = tasksList.filter(e => !e.completed);
        } else if (_tasksFilterStatus === 'completed') {
            tasksList = tasksList.filter(e => e.completed);
        }

        tasksList = tasksList.sort((a, b) => a.date.localeCompare(b.date));

        return `
            <div class="space-y-4">
                <!-- Quick Add Task Bar -->
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xs">
                    <form onsubmit="window.quickAddNewTask(event)" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-xs">
                        <div class="flex-1 relative">
                            <i class="fas fa-plus text-[#e6993a] absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"></i>
                            <input type="text" id="quick-task-title" required placeholder="Add a new task or execution reminder..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] placeholder-slate-400 focus:outline-none focus:border-[#e6993a]">
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="date" id="quick-task-date" value="${today}" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            <select id="quick-task-priority" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                                <option value="Medium">Medium Priority</option>
                                <option value="High">High Priority</option>
                                <option value="Low">Low Priority</option>
                            </select>
                            <button type="submit" class="py-2 px-4 rounded-xl bg-[#e6993a] hover:bg-[#d8892a] text-black font-extrabold transition cursor-pointer shrink-0 shadow-xs">
                                + Add Task
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Sub-filters: Pending / Completed / All -->
                <div class="flex items-center justify-between gap-3 text-xs">
                    <div class="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)]">
                        <button onclick="window.setTasksFilterStatus('pending')" class="py-1 px-3 rounded-lg font-bold transition cursor-pointer ${_tasksFilterStatus === 'pending' ? 'bg-[#e6993a] text-black shadow-xs font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                            Pending Tasks (${allEvents.filter(e => !e.completed).length})
                        </button>
                        <button onclick="window.setTasksFilterStatus('completed')" class="py-1 px-3 rounded-lg font-bold transition cursor-pointer ${_tasksFilterStatus === 'completed' ? 'bg-[#e6993a] text-black shadow-xs font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                            Completed (${allEvents.filter(e => e.completed).length})
                        </button>
                        <button onclick="window.setTasksFilterStatus('all')" class="py-1 px-3 rounded-lg font-bold transition cursor-pointer ${_tasksFilterStatus === 'all' ? 'bg-[#e6993a] text-black shadow-xs font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                            All (${allEvents.length})
                        </button>
                    </div>

                    <span class="text-xs text-[var(--text-muted)] font-semibold">
                        Showing ${tasksList.length} items
                    </span>
                </div>

                <!-- Tasks List -->
                ${tasksList.length === 0 ? `
                    <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-2">
                        <i class="fas fa-check-circle text-4xl text-emerald-500 mb-1"></i>
                        <h3 class="text-base font-bold text-[var(--text-main)]">All caught up!</h3>
                        <p class="text-xs text-[var(--text-muted)]">No pending tasks or deadlines found in this filter.</p>
                    </div>
                ` : `
                    <div class="ui-card rounded-2xl border border-[var(--card-border)] overflow-hidden divide-y divide-[var(--card-border)] shadow-xs">
                        ${tasksList.map(t => {
                            const isOverdue = !t.completed && t.date < today;
                            const isToday = t.date === today;

                            return `
                                <div class="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-[var(--subtle-bg)]/60 transition group">
                                    <div class="flex items-center gap-3 flex-1 min-w-0">
                                        <!-- Custom Checkbox -->
                                        <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="window.toggleCalendarEventDone('${t.id}')" class="w-4 h-4 rounded-md accent-[#e6993a] cursor-pointer shrink-0">

                                        <div class="min-w-0 flex-1">
                                            <div class="flex items-center gap-2 flex-wrap">
                                                <span class="text-xs sm:text-sm font-bold block leading-snug ${t.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-main)]'}">
                                                    ${t.title}
                                                </span>
                                                <span class="text-[9px] px-2 py-0.5 rounded-full font-bold ${t.badgeClass}">
                                                    ${t.type}
                                                </span>
                                                ${isOverdue ? '<span class="text-[9px] px-2 py-0.5 rounded-full font-black bg-rose-500 text-white animate-pulse">OVERDUE</span>' : ''}
                                                ${isToday ? '<span class="text-[9px] px-2 py-0.5 rounded-full font-black bg-amber-500 text-black">TODAY</span>' : ''}
                                            </div>
                                            ${t.description ? `<p class="text-[11px] text-[var(--text-muted)] mt-0.5 truncate">${t.description}</p>` : ''}
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-3 shrink-0">
                                        <div class="text-right">
                                            <span class="text-[11px] font-bold block ${isOverdue ? 'text-rose-600' : isToday ? 'text-amber-600' : 'text-[var(--text-muted)]'}">
                                                ${formatShortDate(t.date)}
                                            </span>
                                            <span class="text-[9px] font-semibold text-slate-400 block">${t.priority} Priority</span>
                                        </div>

                                        <div class="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
                                            ${t.isManual ? `
                                                <button onclick="window.rescheduleCalendarEvent('${t.id}')" class="p-1.5 text-slate-400 hover:text-[#e6993a] transition" title="Reschedule Date">
                                                    <i class="far fa-calendar-alt text-xs"></i>
                                                </button>
                                                <button onclick="window.deleteCalendarEvent('${t.id}')" class="p-1.5 text-slate-400 hover:text-rose-500 transition" title="Delete Task">
                                                    <i class="fas fa-trash-alt text-xs"></i>
                                                </button>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            </div>
        `;
    }

    // =========================================================================
    // MONTH GRID VIEW
    // =========================================================================
    function renderMonthGrid(allEvents, today) {
        const y = _calendarCurrentDate.getFullYear();
        const m = _calendarCurrentDate.getMonth();

        const firstDayOfMonth = new Date(y, m, 1);
        const startDayIndex = firstDayOfMonth.getDay();
        const daysInMonth = new Date(y, m + 1, 0).getDate();

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const events = _calendarFilterType === 'ALL' ? allEvents : allEvents.filter(e => e.type === _calendarFilterType);

        let cellsHTML = '';

        for (let i = 0; i < startDayIndex; i++) {
            cellsHTML += `<div class="min-h-[90px] sm:min-h-[110px] p-2 bg-[var(--subtle-bg)]/40 border border-[var(--card-border)]/50 rounded-xl opacity-40"></div>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateStr === today;
            const dayEvents = events.filter(e => e.date === dateStr);

            cellsHTML += `
                <div class="min-h-[90px] sm:min-h-[110px] p-2 bg-[var(--card-bg)] border ${isToday ? 'border-[#e6993a] ring-2 ring-[#e6993a]/30' : 'border-[var(--card-border)]'} rounded-xl flex flex-col justify-between hover:border-[#e6993a]/60 transition group cursor-pointer" onclick="window.openDayDetailModal('${dateStr}')">
                    <div class="flex items-center justify-between mb-1.5">
                        <span class="text-xs font-black ${isToday ? 'w-6 h-6 rounded-full bg-[#e6993a] text-black flex items-center justify-center font-black' : 'text-[var(--text-main)]'}">
                            ${day}
                        </span>
                        ${dayEvents.length > 0 ? `
                            <span class="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)]">
                                ${dayEvents.length}
                            </span>
                        ` : ''}
                    </div>

                    <div class="space-y-1 overflow-hidden flex-1">
                        ${dayEvents.slice(0, 3).map(e => `
                            <div class="text-[10px] font-bold px-1.5 py-0.5 rounded truncate ${e.badgeClass}" title="${e.title} (${e.time})">
                                ${e.time ? `${e.time} ` : ''}${e.title}
                            </div>
                        `).join('')}
                        ${dayEvents.length > 3 ? `
                            <div class="text-[9px] font-extrabold text-[#e6993a] pl-1">
                                +${dayEvents.length - 3} more
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        return `
            <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-3 shadow-xs">
                <div class="grid grid-cols-7 gap-2 text-center text-[11px] font-black uppercase text-[var(--text-muted)] tracking-wider pb-2 border-b border-[var(--card-border)]">
                    ${weekdays.map(w => `<div>${w}</div>`).join('')}
                </div>
                <div class="grid grid-cols-7 gap-2">
                    ${cellsHTML}
                </div>
            </div>
        `;
    }

    // =========================================================================
    // AGENDA LIST VIEW
    // =========================================================================
    function renderAgendaListView(allEvents, today) {
        let events = _calendarFilterType === 'ALL' ? allEvents : allEvents.filter(e => e.type === _calendarFilterType);
        events = events.sort((a, b) => a.date.localeCompare(b.date));

        if (events.length === 0) {
            return `
                <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-3">
                    <div class="w-12 h-12 rounded-full bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center mx-auto text-xl">
                        <i class="far fa-calendar-check"></i>
                    </div>
                    <h3 class="text-base font-bold text-[var(--text-main)]">No events match your filter</h3>
                    <p class="text-xs text-[var(--text-muted)]">Add a custom event or check back when upcoming milestones approach.</p>
                </div>
            `;
        }

        return `
            <div class="ui-card rounded-2xl border border-[var(--card-border)] overflow-hidden divide-y divide-[var(--card-border)] shadow-xs">
                ${events.map(e => {
                    const isOverdue = !e.completed && e.date < today;
                    const isToday = e.date === today;

                    return `
                        <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--subtle-bg)]/50 transition">
                            <div class="flex items-start gap-3.5">
                                <span class="w-10 h-10 rounded-2xl ${e.badgeClass} flex items-center justify-center shrink-0 text-sm mt-0.5 shadow-xs">
                                    <i class="fas ${e.type === 'Deadline' ? 'fa-flag-checkered' : e.type === 'Payment' ? 'fa-coins' : e.type === 'Follow-up' ? 'fa-phone' : e.type === 'Meeting' ? 'fa-handshake' : e.type === 'Milestone' ? 'fa-bullseye' : 'fa-check'}"></i>
                                </span>
                                <div>
                                    <div class="flex items-center gap-2 flex-wrap">
                                        <h4 class="font-black text-sm text-[var(--text-main)]">${e.title}</h4>
                                        <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${e.badgeClass}">
                                            ${e.type}
                                        </span>
                                        ${isOverdue ? '<span class="text-[10px] px-2 py-0.5 rounded-full font-black bg-rose-500 text-white animate-pulse">OVERDUE</span>' : ''}
                                        ${isToday ? '<span class="text-[10px] px-2 py-0.5 rounded-full font-black bg-amber-500 text-black">TODAY</span>' : ''}
                                    </div>
                                    <p class="text-xs text-[var(--text-muted)] mt-1">${e.description}</p>
                                    <div class="flex items-center gap-3 text-[11px] text-[var(--text-muted)] font-semibold mt-1.5">
                                        <span><i class="far fa-calendar text-[#e6993a] mr-1"></i>${formatShortDate(e.date)}</span>
                                        <span><i class="far fa-clock text-[#e6993a] mr-1"></i>${e.time}</span>
                                        <span>Priority: <strong class="${e.priority === 'High' ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300'}">${e.priority}</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                ${e.isManual ? `
                                    <button onclick="window.toggleCalendarEventDone('${e.id}')" class="py-1.5 px-3 rounded-xl ${e.completed ? 'bg-emerald-600 text-white' : 'bg-[var(--subtle-bg)] text-[var(--text-main)]'} border border-[var(--card-border)] text-xs font-bold transition cursor-pointer">
                                        <i class="fas ${e.completed ? 'fa-check-circle' : 'fa-circle'} mr-1"></i>
                                        <span>${e.completed ? 'Done' : 'Mark Done'}</span>
                                    </button>
                                    <button onclick="window.rescheduleCalendarEvent('${e.id}')" class="py-1.5 px-3 rounded-xl bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-main)] border border-[var(--card-border)] text-xs font-bold transition cursor-pointer">
                                        Reschedule
                                    </button>
                                    <button onclick="window.deleteCalendarEvent('${e.id}')" class="w-8 h-8 rounded-xl bg-[var(--subtle-bg)] hover:bg-rose-500/15 text-slate-400 hover:text-rose-500 flex items-center justify-center transition cursor-pointer">
                                        <i class="fas fa-trash-alt text-xs"></i>
                                    </button>
                                ` : `
                                    <span class="text-[11px] text-[var(--text-muted)] font-semibold italic">
                                        Auto-synced
                                    </span>
                                `}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // =========================================================================
    // WEEK & DAY VIEWS
    // =========================================================================
    function renderWeekView(allEvents, today) {
        const curr = new Date(_calendarCurrentDate);
        const first = curr.getDate() - curr.getDay();
        const weekDays = [];

        for (let i = 0; i < 7; i++) {
            const next = new Date(curr.getTime());
            next.setDate(first + i);
            const dateStr = next.toISOString().split('T')[0];
            weekDays.push({
                date: dateStr,
                dayName: next.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNum: next.getDate()
            });
        }

        const events = _calendarFilterType === 'ALL' ? allEvents : allEvents.filter(e => e.type === _calendarFilterType);

        return `
            <div class="grid grid-cols-1 md:grid-cols-7 gap-3">
                ${weekDays.map(d => {
                    const isToday = d.date === today;
                    const dayEvents = events.filter(e => e.date === d.date);

                    return `
                        <div class="ui-card rounded-2xl border ${isToday ? 'border-[#e6993a] ring-2 ring-[#e6993a]/30' : 'border-[var(--card-border)]'} p-3.5 space-y-3 min-h-[220px]">
                            <div class="flex items-center justify-between pb-2 border-b border-[var(--card-border)]">
                                <div>
                                    <span class="text-[10px] uppercase font-bold text-[var(--text-muted)] block">${d.dayName}</span>
                                    <span class="text-lg font-black ${isToday ? 'text-[#e6993a]' : 'text-[var(--text-main)]'}">${d.dayNum}</span>
                                </div>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)]">
                                    ${dayEvents.length} items
                                </span>
                            </div>

                            <div class="space-y-2">
                                ${dayEvents.length === 0 ? `
                                    <p class="text-[11px] text-[var(--text-muted)] text-center py-4">No events</p>
                                ` : dayEvents.map(e => `
                                    <div class="p-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs space-y-1">
                                        <div class="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                                            <span>${e.time}</span>
                                            <span class="font-bold ${e.badgeClass} px-1.5 py-0.2 rounded">${e.type}</span>
                                        </div>
                                        <h5 class="font-bold text-[var(--text-main)] truncate">${e.title}</h5>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    function renderDayView(allEvents, today) {
        const dateStr = _calendarCurrentDate.toISOString().split('T')[0];
        const dayEvents = allEvents.filter(e => e.date === dateStr);

        return `
            <div class="ui-card p-6 rounded-2xl border border-[var(--card-border)] space-y-4 max-w-3xl mx-auto shadow-xs">
                <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                    <div>
                        <span class="text-[10px] uppercase font-bold text-[#a06438] dark:text-[#e6993a] block">DAILY SCHEDULE</span>
                        <h3 class="text-xl font-black text-[var(--text-main)]">${formatShortDate(dateStr)}</h3>
                    </div>
                    <button onclick="window.openAddEventModal('${dateStr}')" class="py-1.5 px-3 rounded-xl bg-[#e6993a] text-black text-xs font-bold hover:bg-[#d8892a] transition">
                        + Add To This Day
                    </button>
                </div>

                ${dayEvents.length === 0 ? `
                    <div class="text-center py-12 space-y-2">
                        <i class="far fa-calendar-check text-4xl text-slate-300"></i>
                        <p class="text-xs text-[var(--text-muted)]">No scheduled deadlines, payments, or meetings for this date.</p>
                    </div>
                ` : `
                    <div class="space-y-3">
                        ${dayEvents.map(e => `
                            <div class="p-4 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-start justify-between gap-3 text-xs">
                                <div class="space-y-1 flex-1">
                                    <div class="flex items-center gap-2">
                                        <span class="font-black text-sm text-[var(--text-main)]">${e.title}</span>
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${e.badgeClass}">${e.type}</span>
                                    </div>
                                    <p class="text-[var(--text-muted)]">${e.description}</p>
                                    <span class="text-[11px] font-semibold text-[#e6993a] block"><i class="far fa-clock mr-1"></i>${e.time}</span>
                                </div>
                                ${e.isManual ? `
                                    <button onclick="window.deleteCalendarEvent('${e.id}')" class="text-slate-400 hover:text-rose-500 transition">
                                        <i class="fas fa-trash-alt text-xs"></i>
                                    </button>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    }

    // =========================================================================
    // EVENT ACTIONS & MODALS
    // =========================================================================
    window.setCalendarViewMode = function (mode) {
        _calendarViewMode = mode;
        window.renderCalendarReminders();
    };

    window.setTasksFilterStatus = function (status) {
        _tasksFilterStatus = status;
        window.renderCalendarReminders();
    };

    window.setCalendarFilterType = function (type) {
        _calendarFilterType = type;
        window.renderCalendarReminders();
    };

    window.calendarShiftDate = function (dir) {
        if (_calendarViewMode === 'month') {
            _calendarCurrentDate.setMonth(_calendarCurrentDate.getMonth() + dir);
        } else if (_calendarViewMode === 'week') {
            _calendarCurrentDate.setDate(_calendarCurrentDate.getDate() + dir * 7);
        } else {
            _calendarCurrentDate.setDate(_calendarCurrentDate.getDate() + dir);
        }
        window.renderCalendarReminders();
    };

    window.calendarJumpToday = function () {
        _calendarCurrentDate = new Date();
        window.renderCalendarReminders();
    };

    window.quickAddNewTask = function (e) {
        e.preventDefault();
        const title = document.getElementById('quick-task-title').value.trim();
        const date = document.getElementById('quick-task-date').value || getTodayStr();
        const priority = document.getElementById('quick-task-priority').value || 'Medium';
        if (!title) return;

        if (window.appState && Array.isArray(window.appState.tasks)) {
            const newTask = {
                id: Date.now(),
                title: title,
                date: date,
                done: false,
                priority: priority
            };
            window.appState.tasks.unshift(newTask);
            try {
                localStorage.setItem('elna_digital_v4', JSON.stringify(window.appState));
            } catch (err) {}
            if (window.updateStats) window.updateStats();
        } else {
            const state = getState();
            if (!state.calendarEvents) state.calendarEvents = [];
            state.calendarEvents.unshift({
                id: 'evt-' + Date.now(),
                title: title,
                date: date,
                time: '09:00',
                type: 'Task',
                priority: priority,
                completed: false,
                description: 'Operational Task'
            });
            saveState();
        }

        showToast(`Task "${title}" added!`);
        window.renderCalendarReminders();
    };

    window.openAddEventModal = function (presetDate = null) {
        let modal = document.getElementById('calendar-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'calendar-modal-root';
            document.body.appendChild(modal);
        }

        const state = getState();
        const clients = state.clients || [];
        const projects = state.projects || [];

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-lg rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-xl bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center font-bold">
                                <i class="fas fa-calendar-plus text-sm"></i>
                            </span>
                            <h3 class="text-base font-black text-[var(--text-main)]">Schedule Event, Task or Reminder</h3>
                        </div>
                        <button onclick="window.closeCalendarModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form id="add-event-form" onsubmit="window.saveNewCalendarEvent(event)" class="space-y-3.5 text-xs">
                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Title *</label>
                            <input type="text" id="evt-title" required placeholder="e.g. Client Feedback Meeting / Domain Renewal / Prepare Pitch" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Date *</label>
                                <input type="date" id="evt-date" required value="${presetDate || getTodayStr()}" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Time</label>
                                <input type="time" id="evt-time" value="10:00" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Category</label>
                                <select id="evt-type" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="Task" selected>📋 Operational Task</option>
                                    <option value="Meeting">🤝 Client Meeting</option>
                                    <option value="Deadline">🏁 Project Deadline</option>
                                    <option value="Follow-up">📞 Follow-up</option>
                                    <option value="Payment">💰 Payment</option>
                                    <option value="Custom">📝 Custom Reminder</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Priority</label>
                                <select id="evt-priority" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="High">🔴 High Priority</option>
                                    <option value="Medium" selected>🟡 Medium Priority</option>
                                    <option value="Low">🟢 Low Priority</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Related Client (Optional)</label>
                                <select id="evt-client-id" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="">None / Internal</option>
                                    ${clients.map(c => `<option value="${c.id}">${c.businessName}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Reminder Alert</label>
                                <select id="evt-reminder" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="At time of event">At time of event</option>
                                    <option value="15 min before">15 min before</option>
                                    <option value="1 hour before" selected>1 hour before</option>
                                    <option value="1 day before">1 day before</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Description / Notes</label>
                            <textarea id="evt-desc" rows="3" placeholder="Action checklist or notes..." class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"></textarea>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeCalendarModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-[#e6993a] text-black font-black hover:bg-[#d8892a] transition shadow-sm">
                                Save Task / Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    window.saveNewCalendarEvent = function (e) {
        e.preventDefault();
        const type = document.getElementById('evt-type').value;
        const title = document.getElementById('evt-title').value.trim();
        const date = document.getElementById('evt-date').value;
        const priority = document.getElementById('evt-priority').value;

        if (type === 'Task' && window.appState && Array.isArray(window.appState.tasks)) {
            const newTask = {
                id: Date.now(),
                title: title,
                date: date,
                done: false,
                priority: priority,
                description: document.getElementById('evt-desc').value.trim()
            };
            window.appState.tasks.unshift(newTask);
            try {
                localStorage.setItem('elna_digital_v4', JSON.stringify(window.appState));
            } catch (err) {}
            if (window.updateStats) window.updateStats();
        } else {
            const state = getState();
            if (!state.calendarEvents) state.calendarEvents = [];

            const newEvt = {
                id: 'evt-' + Date.now(),
                title: title,
                date: date,
                time: document.getElementById('evt-time').value || '10:00',
                type: type,
                priority: priority,
                clientId: document.getElementById('evt-client-id').value || null,
                reminderTime: document.getElementById('evt-reminder').value,
                description: document.getElementById('evt-desc').value.trim(),
                completed: false
            };

            state.calendarEvents.push(newEvt);
            saveState();
        }

        window.closeCalendarModal();
        showToast(`"${title}" scheduled successfully`);
        window.renderCalendarReminders();
    };

    window.toggleCalendarEventDone = function (id) {
        if (id.startsWith('app-task-')) {
            const taskId = parseInt(id.replace('app-task-', ''), 10);
            if (window.appState && Array.isArray(window.appState.tasks)) {
                const t = window.appState.tasks.find(x => x.id === taskId);
                if (t) {
                    t.done = !t.done;
                    try {
                        localStorage.setItem('elna_digital_v4', JSON.stringify(window.appState));
                    } catch (e) {}
                    if (window.updateStats) window.updateStats();
                    showToast(t.done ? 'Task marked completed' : 'Task marked pending');
                    window.renderCalendarReminders();
                    return;
                }
            }
        }

        const state = getState();
        const evt = (state.calendarEvents || []).find(e => e.id === id);
        if (evt) {
            evt.completed = !evt.completed;
            saveState();
            showToast(evt.completed ? 'Marked completed' : 'Marked active');
            window.renderCalendarReminders();
        }
    };

    window.rescheduleCalendarEvent = function (id) {
        let currentEventDate = getTodayStr();

        if (id.startsWith('app-task-')) {
            const taskId = parseInt(id.replace('app-task-', ''), 10);
            if (window.appState && Array.isArray(window.appState.tasks)) {
                const t = window.appState.tasks.find(x => x.id === taskId);
                if (t) currentEventDate = t.date || getTodayStr();
                const newDate = prompt(`Reschedule task. Enter new date (YYYY-MM-DD):`, currentEventDate);
                if (newDate && /^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
                    if (t) t.date = newDate;
                    try {
                        localStorage.setItem('elna_digital_v4', JSON.stringify(window.appState));
                    } catch (e) {}
                    showToast(`Rescheduled to ${newDate}`);
                    window.renderCalendarReminders();
                }
                return;
            }
        }

        const state = getState();
        const evt = (state.calendarEvents || []).find(e => e.id === id);
        if (!evt) return;

        const newDate = prompt(`Reschedule event "${evt.title}". Enter new date (YYYY-MM-DD):`, evt.date);
        if (newDate && /^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
            evt.date = newDate;
            saveState();
            showToast(`Rescheduled to ${newDate}`);
            window.renderCalendarReminders();
        }
    };

    window.deleteCalendarEvent = function (id) {
        if (id.startsWith('app-task-')) {
            const taskId = parseInt(id.replace('app-task-', ''), 10);
            if (window.appState && Array.isArray(window.appState.tasks)) {
                if (confirm('Delete this task?')) {
                    window.appState.tasks = window.appState.tasks.filter(x => x.id !== taskId);
                    try {
                        localStorage.setItem('elna_digital_v4', JSON.stringify(window.appState));
                    } catch (e) {}
                    if (window.updateStats) window.updateStats();
                    showToast('Task removed');
                    window.renderCalendarReminders();
                }
                return;
            }
        }

        const state = getState();
        if (confirm('Delete this event / reminder?')) {
            state.calendarEvents = (state.calendarEvents || []).filter(e => e.id !== id);
            saveState();
            showToast('Event removed');
            window.renderCalendarReminders();
        }
    };

    window.openDayDetailModal = function (dateStr) {
        _calendarCurrentDate = new Date(dateStr);
        _calendarViewMode = 'day';
        window.renderCalendarReminders();
    };

    window.closeCalendarModal = function () {
        const modal = document.getElementById('calendar-modal-root');
        if (modal) modal.remove();
    };

})();
