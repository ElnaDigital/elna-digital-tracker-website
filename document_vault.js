/**
 * ELNA DIGITAL — DOCUMENT & FILE MANAGEMENT VAULT (document_vault.js)
 * Enterprise document storage with drag-and-drop file upload,
 * base64 persistent storage, category filters, folders, preview,
 * download, and deep linkage to clients & projects.
 */

(function () {
    'use strict';

    let _docSearchQuery = '';
    let _docCategoryFilter = 'ALL';
    let _docFolderFilter = 'ALL';
    let _docClientFilter = 'ALL';
    let _activePreviewDocId = null;

    const DOCUMENT_CATEGORIES = [
        'Client Agreements',
        'Quotations',
        'Invoices',
        'Payment Receipts',
        'Client Logos',
        'Images and Media',
        'Project Deliverables',
        'Business Documents',
        'Other Files'
    ];

    const DEFAULT_FOLDERS = [
        'Contracts',
        'Assets',
        'Financials',
        'Deliverables',
        'Corporate',
        'General'
    ];

    function formatShortDate(dateStr) {
        if (!dateStr) return '';
        return dateStr;
    }

    function formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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

    function getFilteredDocuments() {
        const state = getState();
        const docs = state.documents || [];

        return docs.filter(d => {
            if (_docSearchQuery) {
                const q = _docSearchQuery.toLowerCase();
                const mTitle = (d.title || '').toLowerCase().includes(q);
                const mFile = (d.fileName || '').toLowerCase().includes(q);
                const mDesc = (d.description || '').toLowerCase().includes(q);
                if (!mTitle && !mFile && !mDesc) return false;
            }

            if (_docCategoryFilter !== 'ALL' && d.category !== _docCategoryFilter) return false;
            if (_docFolderFilter !== 'ALL' && (d.folder || 'General') !== _docFolderFilter) return false;
            if (_docClientFilter !== 'ALL' && d.clientId !== _docClientFilter) return false;

            return true;
        });
    }

    // =========================================================================
    // MAIN RENDER FUNCTION
    // =========================================================================
    window.renderDocumentVault = function () {
        const root = document.getElementById('document-vault-root');
        if (!root) return;

        const state = getState();
        const allDocs = state.documents || [];
        const filteredDocs = getFilteredDocuments();
        const clients = state.clients || [];

        // Estimate localStorage used
        let totalStorageBytes = 0;
        try {
            const raw = localStorage.getItem('elna_client_projects_v1') || '';
            totalStorageBytes = raw.length * 2; // rough UTF-16
        } catch (e) {}

        const storageMB = (totalStorageBytes / (1024 * 1024)).toFixed(2);
        const storageLimitMB = 5.0;
        const storagePct = Math.min(100, Math.round((storageMB / storageLimitMB) * 100));

        root.innerHTML = `
            <div class="space-y-6 pb-16">
                <!-- Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 text-xs font-bold text-[#a06438] dark:text-[#e6993a] uppercase tracking-wider mb-1">
                            <i class="fas fa-folder-open"></i>
                            <span>ELNA DIGITAL Asset Vault</span>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">Document & File Management</h1>
                        <p class="text-xs text-[var(--text-muted)] mt-1">Centralized digital vault for signed agreements, client vector logos, quotations, invoices, and deliverables.</p>
                    </div>

                    <div class="flex items-center gap-2.5">
                        <button onclick="window.openUploadDocumentModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] hover:bg-[#d8892a] text-black text-xs font-extrabold shadow-sm transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                            <i class="fas fa-cloud-upload-alt text-xs"></i>
                            <span>Upload Document</span>
                        </button>
                    </div>
                </div>

                <!-- Storage & Quota Health Bar -->
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] space-y-2">
                    <div class="flex items-center justify-between text-xs">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-database text-[#e6993a]"></i>
                            <span class="font-bold text-[var(--text-main)]">Persistent Storage Health</span>
                            <span class="text-[10px] text-[var(--text-muted)]">(${storageMB} MB of ~${storageLimitMB} MB safe quota)</span>
                        </div>
                        <span class="font-black text-xs ${storagePct > 80 ? 'text-rose-500' : 'text-[#e6993a]'}">${storagePct}%</span>
                    </div>
                    <div class="w-full bg-[var(--subtle-bg)] rounded-full h-1.5 overflow-hidden">
                        <div class="h-1.5 rounded-full transition-all duration-300 ${storagePct > 80 ? 'bg-rose-500' : 'bg-[#e6993a]'}" style="width: ${storagePct}%;"></div>
                    </div>
                </div>

                <!-- 9 Category Pills Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
                    <button onclick="window.setDocCategoryFilter('ALL')" class="p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${_docCategoryFilter === 'ALL' ? 'bg-[#e6993a] text-black border-[#e6993a] font-black' : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-main)] hover:border-[#e6993a]'}">
                        <span>All Documents</span>
                        <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 font-bold">${allDocs.length}</span>
                    </button>
                    ${DOCUMENT_CATEGORIES.map(cat => {
                        const count = allDocs.filter(d => d.category === cat).length;
                        return `
                            <button onclick="window.setDocCategoryFilter('${cat}')" class="p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${_docCategoryFilter === cat ? 'bg-[#e6993a] text-black border-[#e6993a] font-black' : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-main)] hover:border-[#e6993a]'}">
                                <span class="truncate pr-1">${cat}</span>
                                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 font-bold shrink-0">${count}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                <!-- Search and Filters Bar -->
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                    <div class="flex-1 relative w-full">
                        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        <input type="text" value="${_docSearchQuery}" oninput="window.setDocSearchQuery(this.value)" placeholder="Search files by title, filename, or description..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] placeholder-slate-400 focus:outline-none focus:border-[#e6993a]">
                    </div>

                    <div class="flex items-center gap-2 flex-wrap w-full md:w-auto">
                        <!-- Folder Filter -->
                        <select onchange="window.setDocFolderFilter(this.value)" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none">
                            <option value="ALL" ${_docFolderFilter === 'ALL' ? 'selected' : ''}>All Folders</option>
                            ${DEFAULT_FOLDERS.map(f => `<option value="${f}" ${_docFolderFilter === f ? 'selected' : ''}>📁 ${f}</option>`).join('')}
                        </select>

                        <!-- Client Filter -->
                        <select onchange="window.setDocClientFilter(this.value)" class="py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none max-w-[180px]">
                            <option value="ALL" ${_docClientFilter === 'ALL' ? 'selected' : ''}>All Clients</option>
                            ${clients.map(c => `<option value="${c.id}" ${_docClientFilter === c.id ? 'selected' : ''}>${c.businessName}</option>`).join('')}
                        </select>

                        ${(_docSearchQuery || _docCategoryFilter !== 'ALL' || _docFolderFilter !== 'ALL' || _docClientFilter !== 'ALL') ? `
                            <button onclick="window.resetDocFilters()" class="py-2 px-3 rounded-xl text-rose-500 hover:bg-rose-500/10 font-bold transition cursor-pointer">
                                Reset
                            </button>
                        ` : ''}
                    </div>
                </div>

                <!-- Documents Grid List -->
                ${filteredDocs.length === 0 ? `
                    <div class="ui-card p-12 text-center rounded-2xl border border-[var(--card-border)] space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center mx-auto text-xl">
                            <i class="fas fa-folder-plus"></i>
                        </div>
                        <h3 class="text-base font-bold text-[var(--text-main)]">No documents in this view</h3>
                        <p class="text-xs text-[var(--text-muted)] max-w-sm mx-auto">Upload an agreement, client logo, invoice PDF, or deliverable asset.</p>
                        <button onclick="window.openUploadDocumentModal()" class="py-2 px-4 rounded-xl bg-[#e6993a] text-black text-xs font-bold">
                            Upload File Now
                        </button>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${filteredDocs.map(doc => {
                            const client = clients.find(c => c.id === doc.clientId);
                            const isImage = doc.fileType && doc.fileType.startsWith('image/');
                            const isPDF = doc.fileType === 'application/pdf' || (doc.fileName || '').endsWith('.pdf');

                            return `
                                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] hover:border-[#e6993a]/50 transition group flex flex-col justify-between space-y-3 shadow-xs">
                                    <div class="flex items-start justify-between gap-3">
                                        <div class="flex items-center gap-3 min-w-0">
                                            <div class="w-10 h-10 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-lg flex items-center justify-center shrink-0">
                                                <i class="fas ${isImage ? 'fa-image text-emerald-500' : isPDF ? 'fa-file-pdf text-rose-500' : 'fa-file-alt text-[#e6993a]'}"></i>
                                            </div>
                                            <div class="min-w-0">
                                                <h4 class="font-black text-xs sm:text-sm text-[var(--text-main)] truncate" title="${doc.title || doc.fileName}">
                                                    ${doc.title || doc.fileName}
                                                </h4>
                                                <span class="text-[10px] text-[var(--text-muted)] block truncate font-mono">
                                                    ${doc.fileName} (${formatBytes(doc.fileSize)})
                                                </span>
                                            </div>
                                        </div>
                                        <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-[#e6993a] font-bold shrink-0">
                                            ${doc.folder || 'Files'}
                                        </span>
                                    </div>

                                    ${doc.description ? `
                                        <p class="text-[11px] text-[var(--text-muted)] line-clamp-2 italic">${doc.description}</p>
                                    ` : ''}

                                    <!-- Tags & Associated Client -->
                                    <div class="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--card-border)]">
                                        <span class="truncate font-semibold">
                                            ${client ? `<i class="fas fa-building text-[9px] mr-1"></i>${client.businessName}` : '<i class="fas fa-lock text-[9px] mr-1"></i>Internal Document'}
                                        </span>
                                        <span class="shrink-0">${doc.uploadDate || ''}</span>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="flex items-center justify-between pt-1 text-xs">
                                        <span class="text-[10px] px-2 py-0.5 rounded-md bg-[var(--subtle-bg)] text-[var(--text-muted)] font-bold">
                                            ${doc.category || 'General'}
                                        </span>

                                        <div class="flex items-center gap-1.5">
                                            ${doc.data ? `
                                                <button onclick="window.previewDocument('${doc.id}')" class="py-1 px-2 rounded-lg bg-[var(--subtle-bg)] hover:bg-emerald-500/15 text-emerald-600 dark:text-[#4bd39a] font-bold transition cursor-pointer" title="Preview file">
                                                    <i class="fas fa-eye text-xs"></i>
                                                </button>
                                                <button onclick="window.downloadDocument('${doc.id}')" class="py-1 px-2 rounded-lg bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[#e6993a] font-bold transition cursor-pointer" title="Download file">
                                                    <i class="fas fa-download text-xs"></i>
                                                </button>
                                            ` : ''}
                                            <button onclick="window.deleteDocument('${doc.id}')" class="py-1 px-2 rounded-lg bg-[var(--subtle-bg)] hover:bg-rose-500/15 text-slate-400 hover:text-rose-500 font-bold transition cursor-pointer" title="Delete document">
                                                <i class="fas fa-trash-alt text-xs"></i>
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
    // UPLOAD & FILE ACTIONS
    // =========================================================================
    window.setDocCategoryFilter = function (c) {
        _docCategoryFilter = c;
        window.renderDocumentVault();
    };

    window.setDocFolderFilter = function (f) {
        _docFolderFilter = f;
        window.renderDocumentVault();
    };

    window.setDocClientFilter = function (cl) {
        _docClientFilter = cl;
        window.renderDocumentVault();
    };

    window.setDocSearchQuery = function (q) {
        _docSearchQuery = q;
        window.renderDocumentVault();
    };

    window.resetDocFilters = function () {
        _docSearchQuery = '';
        _docCategoryFilter = 'ALL';
        _docFolderFilter = 'ALL';
        _docClientFilter = 'ALL';
        window.renderDocumentVault();
    };

    window.openUploadDocumentModal = function (presetProjectId = null, presetClientId = null) {
        let modal = document.getElementById('doc-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'doc-modal-root';
            document.body.appendChild(modal);
        }

        const state = getState();
        const clients = state.clients || [];
        const projects = state.projects || [];

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                <div class="ui-card w-full max-w-xl rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-6 space-y-4 my-8 animate-fade-in" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-xl bg-[#e6993a]/15 text-[#e6993a] flex items-center justify-center font-bold">
                                <i class="fas fa-cloud-upload-alt text-sm"></i>
                            </span>
                            <h3 class="text-base font-black text-[var(--text-main)]">Upload Document / File</h3>
                        </div>
                        <button onclick="window.closeDocModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form id="upload-doc-form" onsubmit="window.saveNewDocument(event)" class="space-y-4 text-xs">
                        <!-- File Dropzone -->
                        <div class="border-2 border-dashed border-[var(--card-border)] hover:border-[#e6993a] rounded-2xl p-6 text-center cursor-pointer transition bg-[var(--subtle-bg)]" onclick="document.getElementById('doc-file-input').click()">
                            <i class="fas fa-file-upload text-3xl text-[#e6993a] mb-2 block"></i>
                            <span class="font-extrabold text-[var(--text-main)] block text-sm" id="file-chosen-label">Choose a file or click to browse</span>
                            <span class="text-[10px] text-[var(--text-muted)] mt-1 block">Supports PDF, PNG, JPG, SVG, DOCX (Max safe file size: 2.5 MB)</span>
                            <input type="file" id="doc-file-input" required class="hidden" onchange="window.handleFileInputChange(event)">
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Document Title *</label>
                            <input type="text" id="doc-title" required placeholder="e.g. Master Services Agreement 2026" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Category *</label>
                                <select id="doc-category" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    ${DOCUMENT_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Folder</label>
                                <select id="doc-folder" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    ${DEFAULT_FOLDERS.map(f => `<option value="${f}">${f}</option>`).join('')}
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Link to Client (Optional)</label>
                                <select id="doc-client-id" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="">None / Corporate Document</option>
                                    ${clients.map(c => `<option value="${c.id}" ${presetClientId === c.id ? 'selected' : ''}>${c.businessName}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold text-[var(--text-main)] mb-1">Link to Project (Optional)</label>
                                <select id="doc-project-id" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none">
                                    <option value="">None / Not Project Specific</option>
                                    ${projects.map(p => `<option value="${p.id}" ${presetProjectId === p.id ? 'selected' : ''}>${p.name || p.clientName}</option>`).join('')}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-[var(--text-main)] mb-1">Description & Key Notes</label>
                            <textarea id="doc-desc" rows="2" placeholder="Summary of contents, version number, or signers..." class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"></textarea>
                        </div>

                        <div class="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                            <button type="button" onclick="window.closeDocModal()" class="py-2 px-4 rounded-xl text-slate-500 hover:bg-[var(--subtle-bg)] font-bold transition">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl bg-[#e6993a] text-black font-black hover:bg-[#d8892a] transition shadow-sm">
                                Upload & Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    let _stagedFileData = null;
    let _stagedFileName = '';
    let _stagedFileSize = 0;
    let _stagedFileType = '';

    window.handleFileInputChange = function (e) {
        const file = e.target.files[0];
        if (!file) return;

        // Size check (2.5MB maximum)
        if (file.size > 2.5 * 1024 * 1024) {
            alert('File exceeds safe local storage limit of 2.5 MB. Please choose a smaller file or compress it first.');
            e.target.value = '';
            return;
        }

        const label = document.getElementById('file-chosen-label');
        if (label) label.textContent = `${file.name} (${formatBytes(file.size)})`;

        const titleInput = document.getElementById('doc-title');
        if (titleInput && !titleInput.value) {
            titleInput.value = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        }

        const reader = new FileReader();
        reader.onload = function (evt) {
            _stagedFileData = evt.target.result;
            _stagedFileName = file.name;
            _stagedFileSize = file.size;
            _stagedFileType = file.type || 'application/octet-stream';
        };
        reader.readAsDataURL(file);
    };

    window.saveNewDocument = function (e) {
        e.preventDefault();
        const state = getState();
        if (!state.documents) state.documents = [];

        const title = document.getElementById('doc-title').value.trim();
        const category = document.getElementById('doc-category').value;
        const folder = document.getElementById('doc-folder').value;
        const clientId = document.getElementById('doc-client-id').value || null;
        const projectId = document.getElementById('doc-project-id').value || null;
        const desc = document.getElementById('doc-desc').value.trim();

        const now = new Date();
        const uploadDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newDoc = {
            id: 'doc-' + Date.now(),
            title: title,
            category: category,
            folder: folder,
            fileName: _stagedFileName || `${title}.pdf`,
            fileSize: _stagedFileSize || 120000,
            fileType: _stagedFileType || 'application/pdf',
            uploadDate: uploadDateStr,
            clientId: clientId,
            projectId: projectId,
            description: desc,
            data: _stagedFileData
        };

        state.documents.unshift(newDoc);
        saveState();
        window.closeDocModal();
        showToast(`Document "${newDoc.title}" stored securely in vault`);

        // If inside project workspace or detail view, trigger refresh
        if (window.renderProjectWorkspaceContent) {
            const container = document.getElementById('project-workspace-container');
            if (container && !container.classList.contains('hidden')) {
                window.renderProjectWorkspaceContent();
            }
        }
        window.renderDocumentVault();
    };

    window.previewDocument = function (docId) {
        const state = getState();
        const doc = (state.documents || []).find(d => d.id === docId);
        if (!doc) return;

        let modal = document.getElementById('doc-preview-modal-root');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'doc-preview-modal-root';
            document.body.appendChild(modal);
        }

        const isImage = doc.fileType && doc.fileType.startsWith('image/');
        const isPDF = doc.fileType === 'application/pdf' || (doc.fileName || '').endsWith('.pdf');

        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
                <div class="ui-card w-full max-w-3xl rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl p-5 space-y-4 my-8 animate-fade-in flex flex-col max-h-[90vh]">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div>
                            <h3 class="font-black text-base text-[var(--text-main)]">${doc.title || doc.fileName}</h3>
                            <span class="text-xs text-[var(--text-muted)]">${doc.category} · ${doc.fileName} (${formatBytes(doc.fileSize)})</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="window.downloadDocument('${doc.id}')" class="py-1 px-3 rounded-xl bg-[#e6993a] text-black font-extrabold text-xs">
                                <i class="fas fa-download mr-1"></i> Download
                            </button>
                            <button onclick="window.closeDocPreviewModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center">
                                <i class="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex-1 overflow-auto rounded-xl bg-slate-900/50 flex items-center justify-center p-4 min-h-[350px]">
                        ${doc.data && isImage ? `
                            <img src="${doc.data}" alt="${doc.fileName}" class="max-w-full max-h-[60vh] rounded-lg shadow-lg object-contain">
                        ` : doc.data && isPDF ? `
                            <iframe src="${doc.data}" class="w-full h-[60vh] rounded-lg border-0 bg-white"></iframe>
                        ` : `
                            <div class="text-center p-8 text-slate-400 space-y-2">
                                <i class="fas fa-file-alt text-4xl mb-2"></i>
                                <p class="text-xs">Preview is not directly displayable for this file type.</p>
                                <button onclick="window.downloadDocument('${doc.id}')" class="py-1.5 px-3 rounded-lg bg-[#e6993a] text-black text-xs font-bold mt-2">
                                    Download to Open
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    };

    window.closeDocPreviewModal = function () {
        const modal = document.getElementById('doc-preview-modal-root');
        if (modal) modal.remove();
    };

    window.downloadDocument = function (docId) {
        const state = getState();
        const doc = (state.documents || []).find(d => d.id === docId);
        if (!doc) return;

        if (doc.data) {
            const a = document.createElement('a');
            a.href = doc.data;
            a.download = doc.fileName || `${doc.title}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast(`Downloading "${doc.fileName}"...`);
        } else {
            alert('File data is stored as a reference record. No base64 content attached.');
        }
    };

    window.deleteDocument = function (docId) {
        const state = getState();
        const doc = (state.documents || []).find(d => d.id === docId);
        if (!doc) return;

        if (confirm(`Are you sure you want to delete "${doc.title || doc.fileName}"? This cannot be undone.`)) {
            state.documents = state.documents.filter(d => d.id !== docId);
            saveState();
            showToast('Document deleted');
            window.renderDocumentVault();
        }
    };

    window.closeDocModal = function () {
        const modal = document.getElementById('doc-modal-root');
        if (modal) modal.remove();
    };

})();
