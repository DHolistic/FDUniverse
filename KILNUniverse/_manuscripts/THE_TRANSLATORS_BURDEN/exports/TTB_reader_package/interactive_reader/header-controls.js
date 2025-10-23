/* header-controls.js
   Provides standardized header behaviors across story pages:
   - Home Mode button: navigates back to title screen (consciousness-codex-title.html)
   - Fullscreen toggle
   - Updates #currentScene based on URL params or sessionStorage
*/

(function(){
  'use strict';

  function $(sel){ return document.querySelector(sel); }

  // Navigate to title screen (explicit path used across project)
  function goHome(){
    // If there is a target set in sessionStorage, prefer it
    const preferred = sessionStorage.getItem('preferredHome') || 'consciousness-codex-title.html';
    window.location.href = preferred;
  }

  // Toggle fullscreen for the documentElement
  function toggleFullscreen(){
    const doc = document.documentElement;
    if (!document.fullscreenElement) {
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      } else if (doc.webkitRequestFullscreen) {
        doc.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  // Read scene label from URL (?story=...&chapter=...) or from sessionStorage
  function resolveSceneLabel(){
    // Always return DB - story titles not displayed in header
    return 'DB';
  }

  // Wire up DOM if present
  document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = $('#kilnUniverseBtn');
    const fsBtn = $('#fullscreenBtn');
    const sceneLabel = $('#currentScene');
    if (homeBtn) homeBtn.addEventListener('click', goHome);
    if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);

    if (sceneLabel) {
      sceneLabel.textContent = resolveSceneLabel();
    }

    // ACCOUNT: inject account button/menu if not present and wire sign-in/out
    function createAccountUI(){
      // Find progress indicator to append into, fallback to .controls
      const progress = document.querySelector('.progress-indicator');
      const controls = document.querySelector('.controls');
      const target = progress || controls;

      if (!target) {
        console.warn('header-controls.js: No .progress-indicator or .controls found, cannot create account UI');
        return null;
      }

      // If account button exists, return its elements
      let accountBtn = document.getElementById('accountBtn');
      let accountMenu = document.getElementById('accountMenu');
      if (accountBtn && accountMenu) return {accountBtn, accountMenu};

      // Create button
      accountBtn = document.createElement('button');
      accountBtn.id = 'accountBtn';
      accountBtn.type = 'button';
      accountBtn.className = 'control-btn account-btn';
      accountBtn.setAttribute('aria-haspopup', 'true');
      accountBtn.setAttribute('aria-expanded', 'false');
      accountBtn.innerHTML = '<span class="account-icon">👤</span>';

      // Create menu
      accountMenu = document.createElement('div');
      accountMenu.id = 'accountMenu';
      accountMenu.className = 'account-menu';
      accountMenu.setAttribute('role', 'menu');
      accountMenu.setAttribute('aria-hidden', 'true');
      accountMenu.innerHTML = `
        <div id="accountGreeting" class="account-greeting">Not signed in</div>
        <button id="signInBtn" class="account-action">Sign in</button>
        <button id="signOutBtn" class="account-action" style="display:none;">Sign out</button>
      `;

      target.appendChild(accountBtn);
      target.appendChild(accountMenu);

      return {accountBtn, accountMenu};
    }

    const acc = createAccountUI();
    if (acc) {
      const {accountBtn, accountMenu} = acc;
      const signInBtn = accountMenu.querySelector('#signInBtn');
      const signOutBtn = accountMenu.querySelector('#signOutBtn');
      const accountGreeting = accountMenu.querySelector('#accountGreeting');

      // Ensure a persistent top-right badge exists (shows displayName)
      let userBadge = document.getElementById('userBadge');
      if (!userBadge) {
        const target = document.querySelector('.progress-indicator') || document.querySelector('.controls');
        if (target) {
          userBadge = document.createElement('span');
          userBadge.id = 'userBadge';
          userBadge.className = 'user-badge';
          userBadge.textContent = '';
          // keep badge visually separated
          userBadge.style.marginLeft = '0.5rem';
          target.appendChild(userBadge);
        }
      }

      function updateAccountUI(){
        const username = sessionStorage.getItem('username');
        const displayName = sessionStorage.getItem('displayName');
        const shown = displayName || username;
        if (shown) {
          accountGreeting.textContent = `Hello, ${shown}`;
          signInBtn.style.display = 'none';
          signOutBtn.style.display = '';
          accountBtn.setAttribute('aria-label', `Account: ${shown}`);
        } else {
          accountGreeting.textContent = 'Not signed in';
          signInBtn.style.display = '';
          signOutBtn.style.display = 'none';
          accountBtn.setAttribute('aria-label', 'Account: not signed in');
        }

        if (userBadge) userBadge.textContent = shown || '';
      }

      function openAccountMenu(){
        accountMenu.style.display = 'block';
        accountMenu.setAttribute('aria-hidden', 'false');
        accountBtn.setAttribute('aria-expanded', 'true');
      }

      function closeAccountMenu(){
        accountMenu.style.display = 'none';
        accountMenu.setAttribute('aria-hidden', 'true');
        accountBtn.setAttribute('aria-expanded', 'false');
      }

      accountBtn.addEventListener('click', (e) => {
        const expanded = accountBtn.getAttribute('aria-expanded') === 'true';
        if (expanded) closeAccountMenu(); else openAccountMenu();
      });

      signInBtn.addEventListener('click', () => {
        // Ask for display name first, then optional username
        const displayName = window.prompt('Sign in - display name (what you want shown):', '');
        if (!displayName || !displayName.trim()) return;
        const suggested = displayName.trim().toLowerCase().replace(/[^a-z0-9\-_.]/g, '') || displayName.trim();
        const username = window.prompt('Optional: choose a short username (for storage/id). Leave blank to auto-generate:', suggested) || suggested;

        sessionStorage.setItem('username', username.trim());
        sessionStorage.setItem('displayName', displayName.trim());
        updateAccountUI();
        if (userBadge) userBadge.textContent = displayName.trim();
        closeAccountMenu();
      });

      signOutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('displayName');
        updateAccountUI();
        closeAccountMenu();
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!accountMenu.contains(e.target) && !accountBtn.contains(e.target)){
          closeAccountMenu();
        }
      });

      // Initialize UI state
      updateAccountUI();
    }

    // Keep label updated if sessionStorage changes (another page sets it)
    window.addEventListener('storage', (e) => {
      if (e.key === 'selectedChapter' || e.key === 'selectedStory'){
        if (sceneLabel) sceneLabel.textContent = resolveSceneLabel();
      }
      if (e.key === 'username'){
        // update account UI across tabs
        const accountGreeting = document.getElementById('accountGreeting');
        if (accountGreeting){
          const name = sessionStorage.getItem('username');
          accountGreeting.textContent = name ? `Hello, ${name}` : 'Not signed in';
        }
      }
    });
  });

})();
