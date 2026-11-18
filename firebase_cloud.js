/**
 * ELNA DIGITAL — Real Google Sign-In & Firebase Cloud Firestore Engine
 * 
 * Provides:
 * 1. Native Google Sign-In (OAuth popup & redirect).
 * 2. Real-Time 2-Way Cloud Synchronization using Firestore onSnapshot listeners.
 * 3. Changes made on Phone instantly reflect on PC (and vice-versa) in real-time.
 * 4. Persistent cloud database in Google Cloud Firestore (users/{uid}).
 */

const firebaseConfig = {
    apiKey: "AIzaSyD0c7BEmgRmJB1BUxOLSa6Y5f31LTXxO7Q",
    authDomain: "elna-digital.firebaseapp.com",
    projectId: "elna-digital",
    storageBucket: "elna-digital.firebasestorage.app",
    messagingSenderId: "369253523897",
    appId: "1:369253523897:web:d3b8fdca41901cb1b31668",
    measurementId: "G-YS5SK3V4P0"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        console.log("✓ Firebase initialized for project:", firebaseConfig.projectId);
    } catch (e) {
        console.error("Firebase init error:", e);
    }
}

window.firebaseAuth = typeof firebase !== 'undefined' ? firebase.auth() : null;
window.firebaseDb = typeof firebase !== 'undefined' ? firebase.firestore() : null;

// Global Google user
window.googleUser = null;
let _cloudSyncTimeout = null;
let _isApplyingCloudState = false;
let _unsubscribeSnapshot = null;

// 1. Google Sign-In Handler
window.signInWithGoogle = function() {
    if (!window.firebaseAuth) {
        alert("Firebase is still loading. Please check your connection and try again.");
        return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({ prompt: 'select_account' });

    window.updateSyncBadgeStatus('syncing', 'Opening Google...');

    window.firebaseAuth.signInWithPopup(provider)
        .then(result => {
            console.log("✓ Google Sign-In successful:", result.user.email);
            if (typeof confetti === 'function') {
                confetti({ particleCount: 50, spread: 70, origin: { y: 0.15 } });
            }
        })
        .catch(error => {
            console.warn("Popup blocked or closed, checking redirect:", error);
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                window.firebaseAuth.signInWithRedirect(provider);
            } else if (error.code !== 'auth/popup-closed-by-user') {
                console.error("Sign in error:", error);
                alert("Sign-In error: " + error.message);
                window.updateSyncBadgeStatus('error', 'Auth Failed');
            } else {
                window.updateSyncBadgeStatus('offline', 'Local Mode');
            }
        });
};

// 2. Google Sign-Out Handler
window.signOutGoogle = function() {
    if (!window.firebaseAuth) return;
    if (_unsubscribeSnapshot) {
        _unsubscribeSnapshot();
        _unsubscribeSnapshot = null;
    }
    window.firebaseAuth.signOut().then(() => {
        window.googleUser = null;
        localStorage.removeItem('elna_google_user');
        if (typeof renderProfile === 'function') renderProfile();
        window.updateSyncBadgeStatus('offline', 'Local Mode');
        if (typeof showToast === 'function') showToast("Signed out of Google account");
    }).catch(err => {
        console.error("Sign out error:", err);
    });
};

window.switchGoogleAccount = function() {
    window.signInWithGoogle();
};

// 3. Cloud Synchronization: Fast save to Firestore
window.syncToCloud = function(immediate = false) {
    if (!window.googleUser || !window.googleUser.uid || !window.firebaseDb || _isApplyingCloudState) return;

    window.updateSyncBadgeStatus('syncing', 'Saving to Cloud...');

    clearTimeout(_cloudSyncTimeout);
    const delay = immediate ? 50 : 400;

    _cloudSyncTimeout = setTimeout(async () => {
        try {
            const uid = window.googleUser.uid;
            const currentAppState = (typeof window.getAppState === 'function') ? window.getAppState() : window.appState;
            const currentClientProjects = window.clientProjectsState || null;

            const payload = {
                uid: uid,
                userEmail: window.googleUser.email,
                userName: window.googleUser.name,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                clientProjectsState: currentClientProjects,
                appState: currentAppState || null
            };

            await window.firebaseDb.collection("users").doc(uid).set(payload, { merge: true });
            console.log("✓ Cloud sync complete in Firestore for user", uid);
            window.updateSyncBadgeStatus('synced', 'Cloud Synced ✓');
        } catch (err) {
            console.error("Firestore sync error:", err);
            if (err.code === 'permission-denied') {
                window.updateSyncBadgeStatus('error', 'Rules Need Setup');
            } else if (err.code === 'not-found' || err.code === 'failed-precondition') {
                window.updateSyncBadgeStatus('error', 'Create Firestore DB');
            } else {
                window.updateSyncBadgeStatus('error', 'Sync Failed');
            }
        }
    }, delay);
};

// 4. Update the Cloud Sync Status Pill in UI
window.updateSyncBadgeStatus = function(status, label) {
    const badge = document.getElementById('cloud-sync-badge');
    const text = document.getElementById('cloud-sync-text');
    const icon = document.getElementById('cloud-sync-icon');
    if (!badge || !text) return;

    badge.classList.remove('hidden');

    if (status === 'synced') {
        badge.className = "hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 transition-all";
        if (icon) icon.className = "fas fa-check-circle text-[10px] text-emerald-500";
        text.textContent = label || "Cloud Synced ✓";
    } else if (status === 'syncing') {
        badge.className = "hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30 transition-all";
        if (icon) icon.className = "fas fa-sync-alt fa-spin text-[10px] text-amber-500";
        text.textContent = label || "Saving...";
    } else if (status === 'error') {
        badge.className = "hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30 transition-all cursor-pointer";
        if (icon) icon.className = "fas fa-exclamation-triangle text-[10px] text-rose-500";
        text.textContent = label || "Sync Alert";
    } else {
        // offline / local
        badge.className = "hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20 transition-all";
        if (icon) icon.className = "fas fa-hdd text-[10px] text-slate-400";
        text.textContent = label || "Local Mode";
    }
};

// 5. Auth State Observer & Real-Time Firestore onSnapshot Listener
if (window.firebaseAuth) {
    window.firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
            window.googleUser = {
                uid: user.uid,
                name: user.displayName || user.email.split('@')[0],
                email: user.email,
                photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.displayName || user.email)}`,
                signedInAt: new Date().toISOString()
            };
            localStorage.setItem('elna_google_user', JSON.stringify(window.googleUser));
            if (typeof renderProfile === 'function') renderProfile();
            window.updateSyncBadgeStatus('syncing', 'Connecting Real-Time Sync...');

            // Connect Real-Time Firestore onSnapshot Listener
            if (window.firebaseDb) {
                try {
                    const docRef = window.firebaseDb.collection("users").doc(user.uid);

                    // Cancel any previous snapshot listener
                    if (_unsubscribeSnapshot) {
                        _unsubscribeSnapshot();
                        _unsubscribeSnapshot = null;
                    }

                    // Attach real-time listener: fires on every remote change (phone -> PC or PC -> phone)
                    _unsubscribeSnapshot = docRef.onSnapshot((docSnap) => {
                        // Skip if the change was made by this local browser's pending write
                        if (docSnap.metadata && docSnap.metadata.hasPendingWrites) {
                            return;
                        }

                        if (docSnap.exists) {
                            const cloudData = docSnap.data();
                            console.log("⚡ Real-Time Cloud update received from Firestore:", cloudData);
                            _isApplyingCloudState = true;

                            if (cloudData.clientProjectsState) {
                                window.clientProjectsState = cloudData.clientProjectsState;
                                localStorage.setItem('elna_client_projects_v1', JSON.stringify(window.clientProjectsState));
                            }
                            if (cloudData.appState && cloudData.appState.phases && Array.isArray(cloudData.appState.phases)) {
                                if (typeof window.setAppState === 'function') {
                                    window.setAppState(cloudData.appState);
                                } else {
                                    window.appState = cloudData.appState;
                                    localStorage.setItem('elna_digital_v4', JSON.stringify(window.appState));
                                }
                            } else if (!cloudData.appState && (window.appState || (typeof window.getAppState === 'function' && window.getAppState()))) {
                                // Cloud has no appState yet; push current state up
                                window.syncToCloud(true);
                            }

                            _isApplyingCloudState = false;

                            // Re-render UI views immediately on screen
                            window.refreshAllTrackerViews();
                            window.updateSyncBadgeStatus('synced', 'Cloud Synced ✓');
                        } else {
                            console.log("First sign-in with this Google account. Uploading local data to Firestore...");
                            window.syncToCloud(true);
                            if (typeof showToast === 'function') {
                                showToast("Google connected! Cloud storage is active forever.");
                            }
                        }
                    }, (err) => {
                        console.error("Firestore onSnapshot error:", err);
                        if (err.code === 'permission-denied') {
                            window.updateSyncBadgeStatus('error', 'Rules Need Setup');
                        } else if (err.code === 'not-found' || err.code === 'failed-precondition') {
                            window.updateSyncBadgeStatus('error', 'Create Firestore DB');
                        } else {
                            window.updateSyncBadgeStatus('error', 'Sync Alert');
                        }
                    });

                } catch (err) {
                    console.error("Firestore listener setup error:", err);
                    window.updateSyncBadgeStatus('error', 'Sync Alert');
                }
            }
        } else {
            if (_unsubscribeSnapshot) {
                _unsubscribeSnapshot();
                _unsubscribeSnapshot = null;
            }
            window.googleUser = null;
            localStorage.removeItem('elna_google_user');
            if (typeof renderProfile === 'function') renderProfile();
            window.updateSyncBadgeStatus('offline', 'Local Mode');
        }
    });
}

// 6. Helper to refresh all modules after real-time cloud sync
window.refreshAllTrackerViews = function() {
    try { if (typeof updateStats === 'function') updateStats(); } catch(e){}
    try { if (typeof updateSidebarCurrentPhase === 'function') updateSidebarCurrentPhase(); } catch(e){}
    try { if (typeof renderActiveTrackerView === 'function') renderActiveTrackerView(); } catch(e){}
    try { if (typeof renderRoadmap === 'function') renderRoadmap(); } catch(e){}
    try { if (typeof renderOverview === 'function') renderOverview(); } catch(e){}
    try { if (typeof renderCalendar === 'function') renderCalendar(); } catch(e){}
    try { if (typeof renderCRM === 'function') renderCRM(); } catch(e){}
    try { if (typeof renderBillingDashboard === 'function') renderBillingDashboard(); } catch(e){}
    try { if (typeof renderProjectsList === 'function') renderProjectsList(); } catch(e){}
    try { if (typeof renderVault === 'function') renderVault(); } catch(e){}
    try { if (typeof renderFeedback === 'function') renderFeedback(); } catch(e){}
    try { if (typeof renderGoals === 'function') renderGoals(); } catch(e){}
    try { if (typeof renderAnalytics === 'function') renderAnalytics(); } catch(e){}
    try {
        const stepDetailView = document.getElementById('view-step-detail');
        if (stepDetailView && stepDetailView.classList.contains('active')) {
            if (typeof renderStepDetailPage === 'function') renderStepDetailPage();
        }
    } catch(e){}
};

// 7. Auto-intercept saveState & saveClientProjectsState to trigger immediate cloud sync
(function hookSaveOperations() {
    if (typeof window.saveState === 'function') {
        const originalSaveState = window.saveState;
        window.saveState = function() {
            originalSaveState.apply(this, arguments);
            if (typeof window.syncToCloud === 'function') window.syncToCloud(true);
        };
    }
})();
