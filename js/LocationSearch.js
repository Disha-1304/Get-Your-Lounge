/**
 * LocationSearch — Airport Autocomplete Component
 * Self-contained. Accepts an `airports` array as the sole data source.
 *
 * Airport entry shape:
 *   { city, country, iataCode, airportName }
 *
 * Usage:
 *   new LocationSearch({
 *     containerId: 'location-search-root',
 *     airports: [...],
 *     initialValue: '',          // optional pre-fill
 *     onSelect: (airport) => {}, // optional override; default navigates to /search.php?q=iataCode
 *   });
 */
class LocationSearch {
  constructor({ containerId, airports = [], initialValue = '', onSelect = null }) {
    this.airports = airports;
    this.initialValue = initialValue;
    this.onSelect = onSelect || ((a) => {
      window.location.href = '/search.php?q=' + encodeURIComponent(a.iataCode);
    });

    this._debounceTimer = null;
    this._activeIndex = -1;
    this._matches = [];
    this._isOpen = false;

    this._root = document.getElementById(containerId);
    if (!this._root) {
      console.error(`[LocationSearch] No element found with id="${containerId}"`);
      return;
    }

    this._render();
    this._attachEvents();

    if (this.initialValue) {
      this._input.value = this.initialValue;
    }
  }

  // ─── Render shell ────────────────────────────────────────────────────────────

  _render() {
    this._root.style.position = 'relative';
    this._root.innerHTML = `
      <div class="lsa-wrap" id="lsa-wrap">
        <div class="lsa-input-row" role="combobox" aria-haspopup="listbox" aria-expanded="false">
          <svg class="lsa-icon-pin" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>

          <input
            id="lsa-input"
            class="lsa-input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="City, airport or lounge..."
            aria-label="Search airports and cities"
            aria-autocomplete="list"
            aria-controls="lsa-dropdown"
            aria-activedescendant=""
          >

          <button class="lsa-search-btn" id="lsa-btn" type="button" aria-label="Search">
            Search
          </button>
        </div>

        <ul
          id="lsa-dropdown"
          class="lsa-dropdown"
          role="listbox"
          aria-label="Airport suggestions"
        ></ul>
      </div>
    `;

    this._input = this._root.querySelector('#lsa-input');
    this._dropdown = this._root.querySelector('#lsa-dropdown');
    this._btn = this._root.querySelector('#lsa-btn');
    this._wrap = this._root.querySelector('#lsa-wrap');
  }

  // ─── Events ──────────────────────────────────────────────────────────────────

  _attachEvents() {
    this._input.addEventListener('input', () => {
      clearTimeout(this._debounceTimer);
      const q = this._input.value.trim();
      if (q.length < 2) { this._close(); return; }
      this._debounceTimer = setTimeout(() => this._search(q), 250);
    });

    this._input.addEventListener('keydown', (e) => this._handleKeydown(e));
    this._btn.addEventListener('click', () => this._submit());

    document.addEventListener('mousedown', (e) => {
      if (!this._root.contains(e.target)) this._close();
    });
  }

  _handleKeydown(e) {
    if (!this._isOpen) {
      if (e.key === 'Enter') this._submit();
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._moveFocus(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._moveFocus(-1);
        break;
      case 'Enter':
        e.preventDefault();
        if (this._activeIndex >= 0 && this._matches[this._activeIndex]) {
          this._select(this._matches[this._activeIndex]);
        } else {
          this._submit();
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._close();
        this._input.focus();
        break;
    }
  }

  _moveFocus(delta) {
    const count = this._matches.length;
    if (count === 0) return;
    this._activeIndex = (this._activeIndex + delta + count) % count;
    this._renderItems();
    this._input.setAttribute('aria-activedescendant', `lsa-option-${this._activeIndex}`);
    const active = this._dropdown.querySelector('.lsa-item--active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  // ─── Search ──────────────────────────────────────────────────────────────────

  _search(q) {
    const lower = q.toLowerCase();
    this._matches = this.airports.filter(a =>
      a.city.toLowerCase().includes(lower) ||
      a.iataCode.toLowerCase().includes(lower) ||
      a.airportName.toLowerCase().includes(lower)
    ).slice(0, 8);

    this._activeIndex = -1;
    this._open();
    this._renderItems();
  }

  // ─── Render Items ─────────────────────────────────────────────────────────────

  _renderItems() {
    const q = this._input.value.trim();

    if (this._matches.length === 0) {
      this._dropdown.innerHTML = `
        <li class="lsa-item lsa-item--empty" role="option" aria-disabled="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          No airports found — try a city name or 3-letter airport code
        </li>`;
      return;
    }

    this._dropdown.innerHTML = this._matches.map((a, i) => {
      const label = `${a.airportName} — ${a.city}, ${a.country} (${a.iataCode})`;
      const highlighted = this._highlight(label, q);
      const isActive = i === this._activeIndex;
      return `
        <li
          id="lsa-option-${i}"
          class="lsa-item${isActive ? ' lsa-item--active' : ''}"
          role="option"
          aria-selected="${isActive}"
          data-index="${i}"
        >
          <span class="lsa-item-icon" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </span>
          <span class="lsa-item-text">${highlighted}</span>
          <span class="lsa-item-iata">${this._escapeHtml(a.iataCode)}</span>
        </li>`;
    }).join('');

    this._dropdown.querySelectorAll('.lsa-item[data-index]').forEach(el => {
      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const idx = parseInt(el.getAttribute('data-index'), 10);
        this._select(this._matches[idx]);
      });
      el.addEventListener('mouseenter', () => {
        this._activeIndex = parseInt(el.getAttribute('data-index'), 10);
        this._renderItems();
      });
    });
  }

  _highlight(label, query) {
    const safeLabel = this._escapeHtml(label);
    if (!query) return safeLabel;
    const escaped = this._escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return safeLabel.replace(regex, '<mark class="lsa-mark">$1</mark>');
  }

  _escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─── Open / Close ─────────────────────────────────────────────────────────────

  _open() {
    this._isOpen = true;
    this._dropdown.classList.add('lsa-dropdown--open');
    this._wrap.querySelector('.lsa-input-row').setAttribute('aria-expanded', 'true');
  }

  _close() {
    this._isOpen = false;
    this._activeIndex = -1;
    this._matches = [];
    this._dropdown.classList.remove('lsa-dropdown--open');
    this._wrap.querySelector('.lsa-input-row').setAttribute('aria-expanded', 'false');
    this._input.removeAttribute('aria-activedescendant');
  }

  // ─── Select / Submit ──────────────────────────────────────────────────────────

  _select(airport) {
    this._input.value = `${airport.airportName} (${airport.iataCode})`;
    this._close();
    this.onSelect(airport);
  }

  _submit() {
    const q = this._input.value.trim();
    if (!q) return;
    this.onSelect({ iataCode: q, city: q, country: '', airportName: q });
  }
}
