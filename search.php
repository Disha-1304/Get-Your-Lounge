<?php
// search.php — LoungePair International Search Results
require_once __DIR__ . '/data/loungesData.php';
require __DIR__ . '/data/globalLoungesData.php';

$query = isset($_GET['q']) ? trim($_GET['q']) : '';
$directId = isset($_GET['id']) ? trim($_GET['id']) : '';

// Filter lounges by query
if ($query === '') {
    $results = $GLOBAL_LOUNGES;
} else {
    $q = strtolower($query);
    $results = array_filter($GLOBAL_LOUNGES, function($l) use ($q) {
        return
            str_contains(strtolower($l['city']), $q) ||
            str_contains(strtolower($l['airportCode']), $q) ||
            str_contains(strtolower($l['airportName']), $q) ||
            str_contains(strtolower($l['outletName']), $q) ||
            str_contains(strtolower($l['country']), $q) ||
            str_contains(strtolower($l['region']), $q) ||
            array_reduce($l['terminals'], fn($carry, $t) => $carry || str_contains(strtolower($t), $q), false);
    });
}
$results = array_values($results);
$count = count($results);

// Collect all unique amenities across results for sidebar filter
$allAmenities = [];
foreach ($results as $l) {
    foreach ($l['amenities'] as $a) {
        if (!in_array($a, $allAmenities)) $allAmenities[] = $a;
    }
}
sort($allAmenities);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($query ?: 'All Lounges') ?> — Airport Lounges | LoungePair International</title>
  <meta name="description" content="Browse and book premium airport lounges<?= $query ? ' near ' . htmlspecialchars($query) : '' ?>. Guaranteed access with no membership required.">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

<style>
/* ─── Design Tokens (matches main site) ─── */
:root {
  --accent: #E61E38;
  --accent-hover: #C8102E;
  --navy: #0A192F;
  --navy-mid: #162C46;
  --text-main: #0A192F;
  --text-muted: #334155;
  --text-light: #64748b;
  --bg: #FFFFFF;
  --bg-secondary: #F8F9FB;
  --border: #e2e8f0;
  --card-shadow: 0 2px 16px rgba(10,25,47,0.07);
  --card-shadow-hover: 0 20px 50px rgba(10,25,47,0.16), 0 0 0 1.5px rgba(230,30,56,0.3);
  --radius: 16px;
  --radius-lg: 20px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
  background: var(--bg-secondary);
  color: var(--text-main);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ─── STICKY HEADER ─── */
.sr-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--navy);
  border-bottom: 1px solid rgba(230,30,56,0.3);
  box-shadow: 0 4px 24px rgba(10,25,47,0.35);
}
.sr-header-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.sr-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.sr-logo img { height: 52px; width: auto; }
.sr-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
.sr-logo-name {
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #FFFFFF;
  text-transform: uppercase;
}
.sr-logo-name span { color: var(--accent); }
.sr-logo-sub {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: rgba(255,255,255,0.55);
  text-transform: uppercase;
}

/* ─── LocationSearch Component ─── */
#location-search-root {
  flex: 1;
  max-width: 600px;
  position: relative;
}
.lsa-wrap { position: relative; }

/* Pill wrapper — matches existing navy header style */
.lsa-input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.10);
  border: 1.5px solid rgba(230,30,56,0.35);
  border-radius: 999px;
  padding: 8px 8px 8px 20px;
  transition: border-color 0.2s, background 0.2s;
}
.lsa-input-row:focus-within {
  border-color: var(--accent);
  background: rgba(255,255,255,0.15);
}
.lsa-icon-pin { flex-shrink: 0; }
.lsa-input {
  flex: 1;
  border: none;
  background: transparent;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-width: 0;
}
.lsa-input::placeholder { color: rgba(255,255,255,0.5); }

/* Search button */
.lsa-search-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 9px 22px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.lsa-search-btn:hover { background: var(--accent-hover); }

/* Dropdown */
.lsa-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-radius: 14px;
  box-shadow: 0 16px 48px rgba(10,25,47,0.22), 0 0 0 1px rgba(230,30,56,0.12);
  list-style: none;
  overflow-y: auto;   /* scrollable — no overflow:hidden which would conflict */
  z-index: 2000;
  max-height: 360px;

  /* Animation initial closed state */
  opacity: 0;
  transform: translateY(6px);
  visibility: hidden;
  pointer-events: none;

  /* Transition for closing (fade out slightly faster) */
  transition: opacity 120ms ease-in, transform 120ms ease-in, visibility 120ms;
}

/* Open state transition triggers */
.lsa-dropdown.lsa-dropdown--open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  pointer-events: auto;

  /* Transition for opening (fade in + slide up) */
  transition: opacity 180ms ease-out, transform 180ms ease-out, visibility 0s;
}

/* Respect user's reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  .lsa-dropdown {
    transition: none !important;
  }
}
.lsa-dropdown::-webkit-scrollbar { width: 4px; }
.lsa-dropdown::-webkit-scrollbar-thumb { background: rgba(10,25,47,0.15); border-radius: 2px; }

/* Dropdown items */
.lsa-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.13s;
  border-bottom: 1px solid rgba(10,25,47,0.04);
  font-size: 13.5px;
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.lsa-item:last-child { border-bottom: none; }
.lsa-item:hover, .lsa-item--active {
  background: rgba(230,30,56,0.06);
}
.lsa-item--active .lsa-item-iata {
  background: var(--accent);
  color: #fff;
}
.lsa-item--empty {
  cursor: default;
  color: var(--text-light);
  font-style: italic;
  gap: 8px;
  font-size: 13px;
}
.lsa-item--empty:hover { background: transparent; }

.lsa-item-icon {
  color: var(--text-light);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.lsa-item-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lsa-item-iata {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  background: rgba(10,25,47,0.07);
  color: var(--navy);
  padding: 3px 8px;
  border-radius: 6px;
  transition: background 0.13s, color 0.13s;
}

/* Bold highlight */
.lsa-mark {
  background: transparent;
  color: var(--accent);
  font-weight: 800;
  text-decoration: underline;
  text-decoration-color: rgba(230,30,56,0.35);
  text-underline-offset: 2px;
}

/* Currency selector */
.sr-currency-select {
  background: rgba(10,25,47,0.6);
  color: #FFFFFF;
  border: 1.5px solid rgba(230,30,56,0.4);
  padding: 8px 16px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  flex-shrink: 0;
}

.sr-home-link {
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
}
.sr-home-link:hover { color: #fff; }

/* ─── BREADCRUMB ─── */
.sr-breadcrumb {
  background: #FFFFFF;
  border-bottom: 1px solid var(--border);
  padding: 10px 24px;
}
.sr-breadcrumb-inner {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-light);
}
.sr-breadcrumb a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}
.sr-breadcrumb-sep { color: #cbd5e1; }
.sr-breadcrumb-current { font-weight: 700; color: var(--text-main); }

/* ─── MAIN LAYOUT ─── */
.sr-body {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 24px 80px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}

/* ─── HERO DESTINATION BANNER ─── */
.sr-hero-banner {
  background: linear-gradient(135deg, var(--navy) 0%, #162C46 60%, #1e3a5f 100%);
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(230,30,56,0.2);
}
.sr-hero-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 50%, rgba(230,30,56,0.15) 0%, transparent 60%);
  pointer-events: none;
}
.sr-hero-banner::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='rgba(230,30,56,0.12)' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='28' fill='none' stroke='rgba(230,30,56,0.08)' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='16' fill='none' stroke='rgba(230,30,56,0.06)' stroke-width='1'/%3E%3C/svg%3E") center/contain no-repeat;
  pointer-events: none;
  opacity: 0.5;
}
.sr-hero-banner-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.sr-hero-banner-pill {
  background: rgba(230,30,56,0.25);
  border: 1px solid rgba(230,30,56,0.4);
  color: rgba(255,255,255,0.9);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 3px 12px;
  border-radius: 99px;
}
.sr-hero-banner-heading {
  font-family: 'Outfit', sans-serif;
  font-size: 26px;
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: -0.3px;
  line-height: 1.15;
  margin-bottom: 10px;
}
.sr-hero-banner-heading span { color: var(--accent); }
.sr-hero-banner-stats {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.sr-hero-stat {
  display: flex;
  align-items: center;
  gap: 7px;
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  font-weight: 600;
}
.sr-hero-stat-val {
  color: #FFFFFF;
  font-weight: 800;
  font-size: 13px;
}
.sr-hero-stat-icon {
  width: 22px;
  height: 22px;
  background: rgba(230,30,56,0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ─── FILTER SIDEBAR ─── */
.sr-sidebar {
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  position: sticky;
  top: 88px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
.sr-sidebar::-webkit-scrollbar { width: 4px; }
.sr-sidebar::-webkit-scrollbar-track { background: transparent; }
.sr-sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

.sr-sidebar-header {
  background: var(--navy);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 2;
}
.sr-sidebar-header h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 7px;
}
.sr-sidebar-clear {
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.65);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.sr-sidebar-clear:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.4); }

/* Filter sections */
.sr-filter-section {
  padding: 16px 18px;
  border-bottom: 1px solid var(--border);
}
.sr-filter-section:last-child { border-bottom: none; }

/* Section label */
.sr-filter-label {
  font-size: 10px;
  font-weight: 800;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 1.4px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.sr-filter-label svg { color: var(--accent); flex-shrink: 0; }

/* Price Range */
.sr-price-range { display: flex; gap: 8px; align-items: center; margin-bottom: 10px; }
.sr-price-input {
  width: 100%;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 7px 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
  outline: none;
  background: var(--bg-secondary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: border-color 0.2s;
  text-align: center;
}
.sr-price-input:focus { border-color: var(--accent); background: #fff; }
.sr-price-sep { color: var(--text-light); font-weight: 700; font-size: 13px; flex-shrink: 0; }
.sr-range {
  width: 100%;
  accent-color: var(--accent);
  height: 4px;
  cursor: pointer;
}

/* Custom checkboxes */
.sr-check-list { display: flex; flex-direction: column; gap: 2px; }
.sr-check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 7px 8px;
  border-radius: 8px;
  transition: background 0.15s;
  user-select: none;
}
.sr-check-item:hover { background: var(--bg-secondary); }
.sr-check-item input[type="checkbox"] { display: none; }
.sr-custom-check {
  width: 16px;
  height: 16px;
  border: 1.5px solid #cbd5e1;
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  background: #fff;
}
.sr-check-item input:checked ~ .sr-custom-check {
  background: var(--accent);
  border-color: var(--accent);
}
.sr-custom-check::after {
  content: '';
  width: 9px;
  height: 5px;
  border-left: 1.5px solid #fff;
  border-bottom: 1.5px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
  display: none;
}
.sr-check-item input:checked ~ .sr-custom-check::after { display: block; }
.sr-check-item span.sr-check-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  flex: 1;
  transition: color 0.15s;
}
.sr-check-item input:checked ~ .sr-custom-check + span.sr-check-label,
.sr-check-item:has(input:checked) .sr-check-label { color: var(--text-main); font-weight: 600; }
.sr-check-count {
  font-size: 10px;
  font-weight: 700;
  background: var(--bg-secondary);
  color: var(--text-light);
  padding: 2px 6px;
  border-radius: 99px;
  border: 1px solid var(--border);
}

/* Availability status dots */
.sr-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.sr-status-dot.quiet    { background: #10b981; }
.sr-status-dot.moderate { background: #3b82f6; }
.sr-status-dot.busy     { background: #f59e0b; }

/* Star rating filter — button style */
.sr-rating-list { display: flex; flex-direction: column; gap: 2px; }
.sr-rating-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  user-select: none;
}
.sr-rating-item:hover { background: var(--bg-secondary); }
.sr-rating-item input[type="radio"] { display: none; }
.sr-custom-radio {
  width: 16px;
  height: 16px;
  border: 1.5px solid #cbd5e1;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  background: #fff;
}
.sr-rating-item input:checked ~ .sr-custom-radio {
  border-color: var(--accent);
  border-width: 5px;
}
.sr-rating-stars {
  display: flex;
  gap: 2px;
}
.sr-rating-stars svg { fill: #f59e0b; }
.sr-rating-stars svg.empty { fill: #e2e8f0; }
.sr-rating-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-light);
  margin-left: auto;
}

/* Active filter chips */
.sr-active-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px 20px;
  background: #FDECEF;
  border-bottom: 1px solid rgba(230,30,56,0.12);
  min-height: 0;
}
.sr-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #FFFFFF;
  border: 1px solid rgba(230,30,56,0.4);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 99px;
  cursor: pointer;
  transition: all 0.2s;
}
.sr-chip:hover { background: var(--accent); color: #fff; }
.sr-chip-x { font-size: 13px; line-height: 1; }

/* ─── RESULTS AREA ─── */
.sr-results { }

/* Results header bar */
.sr-results-header {
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
  padding: 16px 22px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.sr-results-count h2 {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: var(--navy);
}
.sr-results-count h2 span { color: var(--accent); }
.sr-results-count p {
  font-size: 13px;
  color: var(--text-light);
  margin-top: 2px;
}
.sr-results-sort {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sr-sort-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-light);
  white-space: nowrap;
}
.sr-sort-select {
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-main);
  outline: none;
  cursor: pointer;
  background: var(--bg-secondary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: border-color 0.2s;
}
.sr-sort-select:focus { border-color: var(--accent); }

/* View mode toggle */
.sr-view-toggle {
  display: flex;
  gap: 4px;
  background: var(--bg-secondary);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--border);
}
.sr-view-btn {
  background: none;
  border: none;
  padding: 6px 10px;
  border-radius: 7px;
  cursor: pointer;
  color: var(--text-light);
  transition: all 0.2s;
  display: flex;
  align-items: center;
}
.sr-view-btn.active {
  background: #FFFFFF;
  color: var(--accent);
  box-shadow: 0 1px 6px rgba(10,25,47,0.1);
}

/* ─── LOUNGE CARDS (Horizontal — 99acres style) ─── */
.sr-card-list { display: flex; flex-direction: column; gap: 16px; }

.sr-card {
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
  display: flex;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
  cursor: default;
  position: relative;
}
.sr-card:hover {
  box-shadow: 0 16px 40px rgba(10,25,47,0.14), 0 0 0 1.5px rgba(230,30,56,0.35);
  transform: translateY(-3px);
}

/* Card Image Side */
.sr-card-img-wrap {
  position: relative;
  width: 260px;
  min-width: 260px;
  flex-shrink: 0;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}
.sr-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
}
.sr-card:hover .sr-card-img { transform: scale(1.07); }

/* Heart / Favourite */
.sr-heart-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  z-index: 5;
  box-shadow: 0 2px 8px rgba(10,25,47,0.15);
}
.sr-heart-btn:hover { transform: scale(1.15); background: #fff; }
.sr-heart-btn.liked { background: #FDECEF; }
.sr-heart-btn.liked svg path { fill: var(--accent); stroke: var(--accent); }

/* Trending badge */
.sr-trending-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #ff6b35, #E61E38);
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 99px;
  margin-left: 6px;
  vertical-align: middle;
  animation: trendingPulse 2s ease-in-out infinite;
}
@keyframes trendingPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.sr-card-badge-premium {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--navy);
  color: #FFFFFF;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 99px;
  border: 1px solid rgba(230,30,56,0.5);
}
.sr-card-badge-tour {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(10,25,47,0.8);
  backdrop-filter: blur(6px);
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: background 0.2s;
}
.sr-card-badge-tour:hover { background: var(--accent); }

/* Card Body Side */
.sr-card-body {
  flex: 1;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.sr-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.sr-card-title-wrap { flex: 1; min-width: 0; }
.sr-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 17px;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s;
}
.sr-card:hover .sr-card-title { color: var(--accent); }
.sr-card-subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.sr-card-iata {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 3px 9px;
  border-radius: 6px;
}
.sr-card-region {
  color: var(--text-light);
  font-size: 12px;
  font-weight: 600;
}

/* Availability badge */
.sr-avail-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 99px;
  flex-shrink: 0;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
}
.sr-avail-quiet  { background: #d1fae5; color: #059669; }
.sr-avail-moderate { background: #dbeafe; color: #1d4ed8; }
.sr-avail-busy   { background: #fef3c7; color: #d97706; }

/* Rating row */
.sr-card-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sr-stars-row { color: #f59e0b; font-size: 14px; letter-spacing: 1px; }
.sr-rating-num {
  font-size: 14px;
  font-weight: 800;
  color: var(--navy);
}
.sr-reviews {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

/* Terminal list */
.sr-terminals {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.sr-terminal-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #F1F5F9;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 7px;
  border: 1px solid var(--border);
}
.sr-terminal-chip svg { flex-shrink: 0; }

/* Tier badges styling */
.sr-tier-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 99px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.tier-gold { background: #fef3c7; color: #b45309; border: 1px solid rgba(180, 83, 9, 0.2); }
.tier-platinum { background: #f1f5f9; color: #475569; border: 1px solid rgba(71, 85, 105, 0.2); }
.tier-elite { background: #fde2e4; color: #e61e38; border: 1px solid rgba(230, 30, 86, 0.2); }
.sr-amenity-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #FDECEF;
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 99px;
  border: 1px solid rgba(230,30,56,0.15);
}

/* Card footer (price + buttons) */
.sr-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}
.sr-price-block { }
.sr-price-label {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.sr-price-val {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
}
.sr-price-per { font-size: 12px; color: var(--text-light); font-weight: 600; }
.sr-price-original {
  font-size: 12px;
  color: var(--text-light);
  text-decoration: line-through;
  margin-right: 4px;
}
.sr-price-save {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 99px;
  letter-spacing: 0.3px;
}
.sr-price-tag {
  font-size: 10px;
  color: #059669;
  font-weight: 700;
  background: #d1fae5;
  padding: 2px 8px;
  border-radius: 99px;
  margin-top: 3px;
  display: inline-block;
}

.sr-card-btns { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

.sr-btn-tour {
  background: #FFFFFF;
  color: var(--navy);
  border: 1.5px solid var(--border);
  border-radius: 99px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.sr-btn-tour:hover {
  border-color: var(--navy);
  background: var(--bg-secondary);
}

.sr-btn-book {
  background: var(--accent);
  color: #FFFFFF;
  border: none;
  border-radius: 99px;
  padding: 11px 24px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  box-shadow: 0 6px 18px rgba(230,30,56,0.3);
  display: flex;
  align-items: center;
  gap: 7px;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}
.sr-btn-book::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: translateX(-150%) skewX(-25deg);
  animation: shimmer 3.5s infinite ease-in-out;
}
@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(-25deg); }
  100% { transform: translateX(300%) skewX(-25deg); }
}
.sr-btn-book:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(230,30,56,0.4);
}
.sr-btn-book:hover .sr-btn-arrow {
  transform: translateX(4px);
}
.sr-btn-arrow {
  transition: transform 0.25s ease;
  display: inline-flex;
}

/* ─── NO RESULTS STATE ─── */
.sr-empty {
  text-align: center;
  padding: 72px 24px;
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px dashed var(--border);
}
.sr-empty-icon { font-size: 56px; margin-bottom: 16px; display: block; }
.sr-empty h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 8px;
}
.sr-empty p {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 24px;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}
.sr-empty-suggestions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}
.sr-empty-suggestion {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 99px;
  text-decoration: none;
  transition: all 0.2s;
}
.sr-empty-suggestion:hover {
  background: #FDECEF;
  border-color: rgba(230,30,56,0.3);
  color: var(--accent);
}

/* ─── TRUST STRIP (slim single row) ─── */
.sr-trust-strip {
  background: var(--navy);
  border-radius: 12px;
  padding: 10px 20px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
  flex-wrap: wrap;
  border: 1px solid rgba(230,30,56,0.2);
}
.sr-trust-item {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #FFFFFF;
}
.sr-trust-icon {
  width: 26px;
  height: 26px;
  background: rgba(230,30,56,0.2);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sr-trust-title { font-size: 12px; font-weight: 800; }
.sr-trust-sub { font-size: 10px; color: rgba(255,255,255,0.55); font-weight: 500; }
.sr-trust-sep {
  width: 1px;
  height: 24px;
  background: rgba(255,255,255,0.12);
  flex-shrink: 0;
}

/* ─── ACTIVE CHIPS (above results) ─── */
.sr-active-bar {
  display: none;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  background: #FFFFFF;
  border: 1px solid rgba(230,30,56,0.2);
  border-radius: 12px;
  padding: 10px 16px;
  margin-bottom: 12px;
}
.sr-active-bar.visible { display: flex; }
.sr-active-bar-label {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ─── MODALS (reused from main site) ─── */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(10, 25, 47, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: fadeIn 0.25s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.btn-primary {
  background: #E61E38;
  color: #FFFFFF;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  border: 1px solid #E61E38;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 10px 25px rgba(230,30,56,0.25);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
}
.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 16px 32px rgba(230,30,56,0.4);
  background: #C8102E;
}

/* Amenity modal image */
#amenity-modal-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 16px;
}

/* FOOTER */
footer {
  background: #0A192F;
  color: #FFFFFF;
  border-top: 1px solid rgba(255,255,255,0.15);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  .sr-body { grid-template-columns: 240px 1fr; }
  .sr-card-img-wrap { width: 220px; min-width: 220px; }
}
@media (max-width: 860px) {
  .sr-body { grid-template-columns: 1fr; }
  .sr-sidebar {
    position: static;
    display: none;
    max-height: none;
    overflow-y: unset;
  }
  .sr-sidebar.mobile-open { display: block; }
  .sr-card { flex-direction: column; }
  .sr-card-img-wrap { width: 100%; min-width: unset; height: 200px; max-height: 200px; }
  .sr-header-search { display: none; }
}

/* Mobile filter button */
.sr-mobile-filter-btn {
  display: none;
  background: var(--navy);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  gap: 7px;
  align-items: center;
}
@media (max-width: 860px) {
  .sr-mobile-filter-btn { display: flex; }
}

/* Skeleton loading shimmer */
@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Result count flip animation */
@keyframes countFlip {
  0%   { transform: translateY(-8px); opacity: 0; }
  100% { transform: translateY(0);    opacity: 1; }
}
.sr-count-animate {
  display: inline-block;
  animation: countFlip 0.4s cubic-bezier(0.16,1,0.3,1);
}

/* Sidebar filter count badge */
.sr-filter-count-badge {
  margin-left: auto;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-light);
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 99px;
  flex-shrink: 0;
}
.sr-filter-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Pagination controls */
.sr-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}
.sr-page-btn {
  min-width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text-main);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  user-select: none;
}
.sr-page-btn:hover:not(:disabled) {
  background: var(--bg-secondary);
  border-color: var(--text-light);
}
.sr-page-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(230,30,56,0.25);
}
.sr-page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.sr-page-dots {
  color: var(--text-light);
  font-weight: 700;
  padding: 0 4px;
  font-size: 13px;
}

/* Inline image slider style rules */
.sr-img-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(10, 25, 47, 0.1);
  color: var(--navy);
  font-size: 15px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
  box-shadow: 0 4px 10px rgba(10, 25, 47, 0.15);
  user-select: none;
  line-height: 1;
}
.sr-img-nav-btn:hover {
  background: #FFFFFF;
  color: var(--accent);
  transform: translateY(-50%) scale(1.08);
}
.sr-img-nav-btn.prev {
  left: 10px;
}
.sr-img-nav-btn.next {
  right: 10px;
}
.sr-card-img-wrap:hover .sr-img-nav-btn {
  opacity: 1;
}
.sr-img-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 10;
  pointer-events: none;
}
.sr-img-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease-in-out;
}
.sr-img-dot.active {
  background: #FFFFFF;
  width: 14px;
  border-radius: 3px;
}
</style>
</head>
<body>

<!-- ═══════════════════════════════════════════
     STICKY HEADER
════════════════════════════════════════════ -->
<header class="sr-header">
  <div class="sr-header-inner">

    <!-- Logo -->
    <a href="/" class="sr-logo">
      <img src="/logo.png" alt="LoungePair Logo">
      <div class="sr-logo-text">
        <div class="sr-logo-name">Lounge<span>Pair</span></div>
        <div class="sr-logo-sub">International</div>
      </div>
    </a>

    <!-- Location Autocomplete Search -->
    <div id="location-search-root"></div>

    <!-- Spacer -->
    <div style="flex:1;"></div>

    <!-- Home link -->
    <a href="/" class="sr-home-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      Home
    </a>

    <!-- Currency -->
    <select id="currency-select" class="sr-currency-select" onchange="changeCurrency(this.value)">
      <?php foreach ($CURRENCIES as $code => $info): ?>
        <option value="<?= $code ?>"><?= $info['name'] ?></option>
      <?php endforeach; ?>
    </select>

  </div>
</header>

<!-- ═══════════════════════════════════════════
     BREADCRUMB
════════════════════════════════════════════ -->
<nav class="sr-breadcrumb" aria-label="breadcrumb">
  <div class="sr-breadcrumb-inner">
    <a href="/">Home</a>
    <span class="sr-breadcrumb-sep">›</span>
    <a href="/search.php">All Lounges</a>
    <?php if ($query): ?>
      <span class="sr-breadcrumb-sep">›</span>
      <span class="sr-breadcrumb-current"><?= htmlspecialchars(ucwords($query)) ?></span>
    <?php endif; ?>
    <span style="margin-left:auto;font-size:11px;color:var(--text-light);font-weight:600;display:flex;align-items:center;gap:4px;">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      <?= $count ?> <?= $count === 1 ? 'lounge' : 'lounges' ?> available
    </span>
  </div>
</nav>

<!-- ═══════════════════════════════════════════
     MAIN BODY
════════════════════════════════════════════ -->
<div class="sr-body">

  <!-- ───────────────── SIDEBAR ───────────────── -->
  <aside class="sr-sidebar" id="filter-sidebar">

    <!-- Header -->
    <div class="sr-sidebar-header">
      <h3>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
        Filters
      </h3>
      <button class="sr-sidebar-clear" onclick="clearAllFilters()">Clear All</button>
    </div>

    <!-- Active chips (injected by JS) -->
    <div class="sr-active-chips" id="active-chip-container" style="display:none;"></div>

    <!-- Price Range -->
    <div class="sr-filter-section">
      <div class="sr-filter-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        Budget
        <span style="font-size:9px;font-weight:600;color:var(--text-light);text-transform:none;letter-spacing:0;margin-left:2px;">USD per person</span>
      </div>
      <div class="sr-price-range">
        <input type="number" class="sr-price-input" id="price-min" placeholder="0" min="0" max="200" value="0" onchange="applyFilters()">
        <span class="sr-price-sep">—</span>
        <input type="number" class="sr-price-input" id="price-max" placeholder="200" min="0" max="200" value="200" onchange="applyFilters()">
      </div>
      <input type="range" class="sr-range" id="price-range-slider" min="0" max="200" value="200" oninput="document.getElementById('price-max').value=this.value; applyFilters();">
    </div>

    <!-- Rating -->
    <div class="sr-filter-section">
      <div class="sr-filter-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Guest Rating
      </div>
      <div class="sr-rating-list" id="rating-filter">

        <label class="sr-rating-item">
          <input type="radio" name="rating" value="0" checked onchange="applyFilters()">
          <span class="sr-custom-radio"></span>
          <span class="sr-rating-stars">
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </span>
          <span class="sr-rating-label">Any</span>
        </label>

        <label class="sr-rating-item">
          <input type="radio" name="rating" value="4" onchange="applyFilters()">
          <span class="sr-custom-radio"></span>
          <span class="sr-rating-stars">
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24" class="empty"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </span>
          <span class="sr-rating-label">4.0 & above</span>
        </label>

        <label class="sr-rating-item">
          <input type="radio" name="rating" value="4.5" onchange="applyFilters()">
          <span class="sr-custom-radio"></span>
          <span class="sr-rating-stars">
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </span>
          <span class="sr-rating-label">4.5 & above</span>
        </label>

        <label class="sr-rating-item">
          <input type="radio" name="rating" value="4.9" onchange="applyFilters()">
          <span class="sr-custom-radio"></span>
          <span class="sr-rating-stars">
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </span>
          <span class="sr-rating-label">Exceptional 4.9+</span>
        </label>

      </div>
    </div>

    <!-- Region -->
    <div class="sr-filter-section">
      <div class="sr-filter-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        Region
      </div>
      <div class="sr-check-list" id="region-filter">
        <?php
        $regions = array_unique(array_column($LOUNGE_GUIDES, 'region'));
        sort($regions);
        foreach ($regions as $reg):
          $cnt = count(array_filter($LOUNGE_GUIDES, fn($l) => $l['region'] === $reg));
        ?>
        <label class="sr-check-item">
          <input type="checkbox" value="<?= htmlspecialchars($reg) ?>" onchange="applyFilters()">
          <span class="sr-custom-check"></span>
          <span class="sr-check-label"><?= htmlspecialchars($reg) ?></span>
          <span class="sr-check-count"><?= $cnt ?></span>
        </label>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Availability Status -->
    <div class="sr-filter-section">
      <div class="sr-filter-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Availability
      </div>
      <div class="sr-check-list" id="status-filter">
        <label class="sr-check-item">
          <input type="checkbox" value="Quiet &amp; Spacious" onchange="applyFilters()">
          <span class="sr-custom-check"></span>
          <span class="sr-status-dot quiet"></span>
          <span class="sr-check-label">Quiet &amp; Spacious</span>
        </label>
        <label class="sr-check-item">
          <input type="checkbox" value="Moderate" onchange="applyFilters()">
          <span>🔵 Moderate</span>
        </label>
        <label class="sr-check-item">
          <input type="checkbox" value="High Demand" onchange="applyFilters()">
          <span>🟡 High Demand</span>
        </label>
      </div>
    </div>

    <!-- Amenities -->
    <div class="sr-filter-section">
      <div class="sr-filter-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Amenities
      </div>
      <div class="sr-check-list" id="amenity-filter" style="max-height:200px;overflow-y:auto;padding-right:2px;">
        <?php foreach ($allAmenities as $am): ?>
        <label class="sr-check-item">
          <input type="checkbox" value="<?= htmlspecialchars($am) ?>" onchange="applyFilters()">
          <span class="sr-custom-check"></span>
          <span class="sr-check-label"><?= htmlspecialchars($am) ?></span>
        </label>
        <?php endforeach; ?>
      </div>
    </div>

  </aside>

  <!-- ───────────────── RESULTS ───────────────── -->
  <section class="sr-results">

    <!-- Hero Destination Banner (replaces old trust strip) -->
    <div class="sr-hero-banner">
      <div class="sr-hero-banner-top">
        <span class="sr-hero-banner-pill">LoungePair International</span>
      </div>
      <div class="sr-hero-banner-heading">
        <?php if ($query): ?>
          <span><?= htmlspecialchars(ucwords($query)) ?></span> Airport Lounges
        <?php else: ?>
          All Premium <span>Lounges</span> Worldwide
        <?php endif; ?>
      </div>
      <div class="sr-hero-banner-stats">
        <div class="sr-hero-stat">
          <div class="sr-hero-stat-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span>Guaranteed Entry</span>
        </div>
        <div class="sr-hero-stat">
          <div class="sr-hero-stat-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          </div>
          <span>Instant QR Pass</span>
        </div>
        <div class="sr-hero-stat">
          <div class="sr-hero-stat-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <span>Free Cancellation</span>
        </div>
        <div class="sr-hero-stat">
          <div class="sr-hero-stat-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <span>1,400+ <span class="sr-hero-stat-val">Global Lounges</span></span>
        </div>
      </div>
    </div>

    <!-- Active Filter Bar (above results) -->
    <div class="sr-active-bar" id="active-bar">
      <span class="sr-active-bar-label">Filters:</span>
      <div id="active-bar-chips" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;"></div>
      <button onclick="clearAllFilters()" style="margin-left:auto;background:none;border:none;color:var(--accent);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;padding:2px 8px;">Clear all ×</button>
    </div>

    <!-- Results Header Bar -->
    <div class="sr-results-header">
      <div class="sr-results-count">
        <h2 id="results-count-display">
          <span class="sr-count-animate" id="results-num"><?= $count ?></span>
          <?= $count === 1 ? 'Lounge' : 'Lounges' ?> Found<?php if ($query): ?> near <span>"<?= htmlspecialchars(ucwords($query)) ?>"</span><?php endif; ?>
        </h2>
        <p><?php if ($count > 0): ?>Showing <?= $count ?> premium <?= $count === 1 ? 'lounge' : 'lounges' ?> — tap a card to book instantly<?php else: ?>Try a broader search term or browse all lounges<?php endif; ?></p>
      </div>

      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <!-- Mobile filter toggle -->
        <button class="sr-mobile-filter-btn" onclick="toggleMobileFilter()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filters
        </button>

        <div class="sr-results-sort">
          <span class="sr-sort-label">Sort by:</span>
          <select class="sr-sort-select" id="sort-select" onchange="applyFilters()" style="font-size:14px;padding:9px 18px;border-radius:12px;border-color:var(--border);">
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="reviews">Most Reviewed</option>
            <option value="name-asc">Name A – Z</option>
          </select>
        </div>

        <!-- View toggle -->
        <div class="sr-view-toggle">
          <button class="sr-view-btn active" id="view-list-btn" onclick="setView('list')" title="List View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button class="sr-view-btn" id="view-grid-btn" onclick="setView('grid')" title="Grid View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Card List -->
    <div class="sr-card-list" id="sr-card-list">
      <!-- Injected by JavaScript dynamically -->
    </div>

    <!-- Pagination Controls -->
    <div class="sr-pagination" id="sr-pagination-container"></div>

    <!-- Empty state (shown by JS) -->
    <div id="search-empty-state" class="sr-empty" style="display:none;">
      <span class="sr-empty-icon">✈️</span>
      <h3>No Lounges Found<?php if ($query): ?> for “<?= htmlspecialchars(ucwords($query)) ?>”<?php endif; ?></h3>
      <p>We couldn’t find any lounges matching your search. Try a major hub like Dubai, London, or Singapore.</p>
      <div class="sr-empty-suggestions">
        <a href="/search.php?q=Dubai" class="sr-empty-suggestion">Dubai</a>
        <a href="/search.php?q=London" class="sr-empty-suggestion">London</a>
        <a href="/search.php?q=Singapore" class="sr-empty-suggestion">Singapore</a>
        <a href="/search.php?q=Tokyo" class="sr-empty-suggestion">Tokyo</a>
        <a href="/search.php" class="sr-empty-suggestion">Browse All</a>
      </div>
      <a href="/search.php" style="display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;padding:12px 28px;border-radius:99px;font-weight:700;font-size:14px;text-decoration:none;">
        Browse All Lounges
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>

    <!-- JS-driven no-filter-results -->
    <div id="no-filter-results" class="sr-empty" style="display:none;">
      <div class="sr-empty-icon">🔍</div>
      <h3>No results match your filters</h3>
      <p>Try adjusting or clearing your filters to see more lounges.</p>
      <button onclick="clearAllFilters()" style="display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;padding:12px 28px;border-radius:99px;font-weight:700;font-size:14px;border:none;cursor:pointer;">
        Clear All Filters
      </button>
    </div>
    </div>

  </section>
</div>

<!-- ═══════════════════════════════════════════
     FOOTER
════════════════════════════════════════════ -->
<?php include_once __DIR__ . '/components/footer.php'; ?>

<!-- ═══════════════════════════════════════════
     MODALS (booking + virtual tour)
════════════════════════════════════════════ -->
<?php include_once __DIR__ . '/components/modals.php'; ?>

<!-- Amenity Modal -->
<div id="amenity-modal" class="modal-overlay" onclick="closeAmenityModal()" style="display:none;">
  <div onclick="event.stopPropagation()" style="background:#fff;border-radius:28px;max-width:480px;width:100%;padding:28px;box-shadow:0 35px 65px -15px rgba(15,23,42,0.3);">
    <img id="amenity-modal-image" src="" alt="Amenity">
    <h3 id="amenity-modal-title" style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:var(--navy);margin-bottom:10px;"></h3>
    <p id="amenity-modal-description" style="font-size:14px;color:var(--text-light);line-height:1.6;margin-bottom:20px;"></p>
    <button id="amenity-select-pass-btn" class="btn-primary" style="width:100%;padding:14px;font-size:15px;">Book This Lounge</button>
  </div>
</div>


<!-- ═══════════════════════════════════════════
     JAVASCRIPT ENGINE
════════════════════════════════════════════ -->
<script src="/js/LocationSearch.js"></script>
<script>
// ── Data from PHP ──
const loungesData = <?php echo json_encode(array_values($results)); ?>;
const currencies  = <?php echo json_encode($CURRENCIES); ?>;

let currentCurrency = 'USD';
let activeVirtualTourLounge = null;
let virtualTourCurrentSlide = 0;
let currentView = 'list';

// Pagination state
let currentPage = 1;
const pageSize = 12;
let filteredLounges = [];
const loungeImageStates = {};

// ── Currency ──
function changeCurrency(code) {
  currentCurrency = code;
  const { rate, symbol } = currencies[code];
  document.querySelectorAll('.price-display').forEach(el => {
    const base = parseFloat(el.getAttribute('data-price-usd'));
    if (!isNaN(base)) {
      el.textContent = symbol + Math.round(base * rate);
    }
  });
}
changeCurrency('USD');

// ── Header LocationSearch autocomplete ──
// Always use the FULL airport list (all 1,018 lounges), not the page-filtered subset.
// Using $results here would mean a filtered page (e.g. ?q=Dubai) only offers Dubai
// airports in autocomplete, making it impossible to navigate to other destinations.
const _allAirports = <?php
  $apMap = [];
  foreach ($GLOBAL_LOUNGES as $_l) {
    $code = $_l['airportCode'];
    if ($code && !isset($apMap[$code])) {
      $apMap[$code] = [
        'iataCode'    => $code,
        'airportName' => $_l['airportName'],
        'city'        => $_l['city'],
        'country'     => $_l['country']
      ];
    }
  }
  echo json_encode(array_values($apMap));
?>;

new LocationSearch({
  containerId: 'location-search-root',
  airports: _allAirports,
  initialValue: <?= json_encode($query) ?>,
  onSelect(airport) {
    window.location.href = '/search.php?q=' + encodeURIComponent(airport.iataCode);
  }
});

// ── Mobile filter toggle ──
function toggleMobileFilter() {
  const sidebar = document.getElementById('filter-sidebar');
  sidebar.classList.toggle('mobile-open');
}

// ── View Mode ──
function setView(mode) {
  currentView = mode;
  const btnList = document.getElementById('view-list-btn');
  const btnGrid = document.getElementById('view-grid-btn');

  if (mode === 'grid') {
    btnGrid.classList.add('active');
    btnList.classList.remove('active');
  } else {
    btnList.classList.add('active');
    btnGrid.classList.remove('active');
  }
  
  // Re-render current page to apply correct layout styles
  renderPage();
}

// ── Active chips display ──
function rebuildChips() {
  const bar   = document.getElementById('active-bar');
  const chips_container = document.getElementById('active-bar-chips');
  const chips = [];

  const minPrice = parseInt(document.getElementById('price-min').value) || 0;
  const maxPrice = parseInt(document.getElementById('price-max').value) || 200;
  if (minPrice > 0 || maxPrice < 200) {
    chips.push({ label: `$${minPrice}–$${maxPrice}`, type: 'price' });
  }

  const ratingVal = document.querySelector('input[name="rating"]:checked')?.value || '0';
  if (parseFloat(ratingVal) > 0) chips.push({ label: `${ratingVal}+ Stars`, type: 'rating' });

  document.querySelectorAll('#region-filter input:checked').forEach(el => {
    chips.push({ label: el.value, type: 'region', val: el.value });
  });
  document.querySelectorAll('#status-filter input:checked').forEach(el => {
    chips.push({ label: el.value, type: 'status', val: el.value });
  });
  document.querySelectorAll('#amenity-filter input:checked').forEach(el => {
    chips.push({ label: el.value, type: 'amenity', val: el.value });
  });

  if (chips.length === 0) {
    bar.classList.remove('visible');
    chips_container.innerHTML = '';
    return;
  }
  bar.classList.add('visible');
  chips_container.innerHTML = chips.map(c =>
    `<button class="sr-chip" onclick="removeChip('${c.type}','${(c.val||'').replace(/'/g,"\\'")}')"
       style="display:inline-flex;align-items:center;gap:5px;background:#FDECEF;color:var(--accent);border:1px solid rgba(230,30,56,0.25);padding:4px 12px;border-radius:99px;font-size:11px;font-weight:700;cursor:pointer;">
       ${c.label} <span style="font-size:13px;line-height:1;">×</span>
     </button>`
  ).join('');
}

function removeChip(type, val) {
  if (type === 'price') {
    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 200;
    document.getElementById('price-range-slider').value = 200;
  } else if (type === 'rating') {
    document.querySelector('input[name="rating"][value="0"]').checked = true;
  } else {
    const selector = `#${type}-filter input[value="${CSS.escape(val)}"]`;
    const el = document.querySelector(selector);
    if (el) el.checked = false;
  }
  applyFilters();
}

function clearAllFilters() {
  document.getElementById('price-min').value = 0;
  document.getElementById('price-max').value = 200;
  document.getElementById('price-range-slider').value = 200;
  document.querySelector('input[name="rating"][value="0"]').checked = true;
  document.querySelectorAll('#region-filter input, #status-filter input, #amenity-filter input').forEach(el => el.checked = false);
  applyFilters();
}

// ── Main Filter & Sort ──
function applyFilters() {
  const minPrice  = parseFloat(document.getElementById('price-min').value) || 0;
  const maxPrice  = parseFloat(document.getElementById('price-max').value) || 999;
  const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || '0');
  const sortVal   = document.getElementById('sort-select').value;

  const checkedRegions  = [...document.querySelectorAll('#region-filter input:checked')].map(el => el.value);
  const checkedStatuses = [...document.querySelectorAll('#status-filter input:checked')].map(el => el.value);
  const checkedAmenities= [...document.querySelectorAll('#amenity-filter input:checked')].map(el => el.value);

  // Filter in-memory array
  filteredLounges = loungesData.filter(lounge => {
    if (lounge.priceUSD < minPrice || lounge.priceUSD > maxPrice) return false;
    if (lounge.rating < minRating) return false;
    if (checkedRegions.length > 0 && !checkedRegions.includes(lounge.region)) return false;
    if (checkedStatuses.length > 0 && !checkedStatuses.some(s => lounge.status.toLowerCase().includes(s.toLowerCase()))) return false;
    if (checkedAmenities.length > 0 && !checkedAmenities.every(a => lounge.amenities.includes(a))) return false;
    return true;
  });

  // Sort filtered in-memory array
  filteredLounges.sort((a, b) => {
    switch (sortVal) {
      case 'price-asc':  return a.priceUSD - b.priceUSD;
      case 'price-desc': return b.priceUSD - a.priceUSD;
      case 'rating':     return b.rating - a.rating;
      case 'reviews':    return b.reviewsCount - a.reviewsCount;
      case 'name-asc':   return a.outletName.localeCompare(b.outletName);
      default: return 0;
    }
  });

  currentPage = 1;
  renderPage();
  rebuildChips();
}

// ── Render Current Page ──
function renderPage() {
  const listContainer = document.getElementById('sr-card-list');
  const emptyGlobalState = document.getElementById('search-empty-state');
  const emptyFilterState = document.getElementById('no-filter-results');
  const paginationContainer = document.getElementById('sr-pagination-container');
  const numEl = document.getElementById('results-num');

  if (!listContainer) return;

  // Handle global no matches (from database load)
  if (loungesData.length === 0) {
    if (emptyGlobalState) emptyGlobalState.style.display = 'block';
    if (emptyFilterState) emptyFilterState.style.display = 'none';
    listContainer.innerHTML = '';
    if (paginationContainer) paginationContainer.innerHTML = '';
    if (numEl) numEl.textContent = '0';
    return;
  }
  if (emptyGlobalState) emptyGlobalState.style.display = 'none';

  // Handle active filter no matches
  if (filteredLounges.length === 0) {
    if (emptyFilterState) emptyFilterState.style.display = 'block';
    listContainer.innerHTML = '';
    if (paginationContainer) paginationContainer.innerHTML = '';
    if (numEl) numEl.textContent = '0';
    return;
  }
  if (emptyFilterState) emptyFilterState.style.display = 'none';

  // Slice page data
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = filteredLounges.slice(startIndex, startIndex + pageSize);

  // Set card list layout mode
  if (currentView === 'grid') {
    listContainer.style.display = 'grid';
    listContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
    listContainer.style.gap = '16px';
  } else {
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'column';
    listContainer.style.gap = '16px';
  }

  // Render cards
  listContainer.innerHTML = pageItems.map(renderCard).join('');

  // Update total count
  const numElCounter = document.getElementById('results-num');
  if (numElCounter) {
    numElCounter.textContent = filteredLounges.length;
    numElCounter.classList.remove('sr-count-animate');
    void numElCounter.offsetWidth; // force reflow
    numElCounter.classList.add('sr-count-animate');
  }

  // Format currency
  changeCurrency(currentCurrency);

  // Restore liked icons
  getLiked().forEach(id => {
    const btn = document.getElementById('heart-' + id);
    if (btn) btn.classList.add('liked');
  });

  // Render pagination
  renderPagination();
}

// ── Render Card HTML Template ──
function renderCard(lounge) {
  const rating = lounge.rating;
  const fullStars = Math.floor(rating);
  const halfStar = (rating - fullStars) >= 0.4;
  const starsStr = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - fullStars - (halfStar ? 1 : 0));

  const statusClass = lounge.status.includes('Quiet') ? 'sr-avail-quiet' : (lounge.status.includes('High') ? 'sr-avail-busy' : 'sr-avail-moderate');
  const statusDot = lounge.status.includes('Quiet') ? '🟢' : (lounge.status.includes('High') ? '🟡' : '🔵');

  // Terminals list
  const maxTerms = 3;
  let terminalsHTML = lounge.terminals.slice(0, maxTerms).map(t => `
    <span class="sr-terminal-chip">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 3.2l-1.5 1.5L5.7 11c-1.8 1.4-1.8 3-.5 4.3l4.2 4.2c1.3 1.3 2.9 1.3 4.3-.5l6.3 5.4 1.5-1.5z"/></svg>
      ${t}
    </span>
  `).join('');
  if (lounge.terminals.length > maxTerms) {
    terminalsHTML += `
      <span class="sr-terminal-chip" style="background:rgba(230,30,56,0.07);border-color:rgba(230,30,56,0.2);color:var(--accent);">
        +${lounge.terminals.length - maxTerms} more
      </span>
    `;
  }



  const isLikedClass = getLiked().includes(lounge.id) ? 'liked' : '';
  const descSnippet = lounge.description.length > 130 ? lounge.description.substring(0, 127) + '…' : lounge.description;

  const currentImgIdx = loungeImageStates[lounge.id] || 0;
  const images = [lounge.image, lounge.heroImage];
  const dotsHTML = images.map((_, idx) => `
    <span class="sr-img-dot ${idx === currentImgIdx ? 'active' : ''}"></span>
  `).join('');
  const currentImgUrl = images[currentImgIdx];

  const prevBtnHTML = `<button class="sr-img-nav-btn prev" onclick="navigateLoungeImage(event, '${lounge.id}', -1)" aria-label="Previous image">‹</button>`;
  const nextBtnHTML = `<button class="sr-img-nav-btn next" onclick="navigateLoungeImage(event, '${lounge.id}', 1)" aria-label="Next image">›</button>`;

  return `
    <article
      class="sr-card"
      data-id="${lounge.id}"
      style="flex-direction: ${currentView === 'grid' ? 'column' : 'row'};"
    >
      <!-- Image Area with Inline Nav -->
      <div class="sr-card-img-wrap" style="width: ${currentView === 'grid' ? '100%' : '260px'}; min-width: ${currentView === 'grid' ? 'unset' : '260px'}; aspect-ratio: ${currentView === 'grid' ? '16/9' : '4/3'}; height: ${currentView === 'grid' ? '180px' : ''}; position: relative;">
        <img
          class="sr-card-img"
          src="${currentImgUrl}"
          alt="${lounge.city} Lounge"
          loading="lazy"
        >
        <!-- Heart / Favourite -->
        <button
          class="sr-heart-btn ${isLikedClass}"
          id="heart-${lounge.id}"
          onclick="toggleHeart('${lounge.id}')"
          title="Save to favourites"
          aria-label="Add to favourites"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E61E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>

        <!-- Inline Navigation Controls -->
        ${prevBtnHTML}
        ${nextBtnHTML}
        <div class="sr-img-dots">
          ${dotsHTML}
        </div>
      </div>

      <!-- Body -->
      <div class="sr-card-body">
        <!-- Top row -->
        <div class="sr-card-top">
          <div class="sr-card-title-wrap">
            <div class="sr-card-title">
              ${lounge.outletName}
            </div>
            <div class="sr-card-subtitle">
              <span class="sr-card-iata">${lounge.airportCode}</span>
              ${terminalsHTML}
              <span class="sr-card-region">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-1px;margin-right:3px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                ${lounge.city}, ${lounge.country}
              </span>
            </div>
          </div>
        </div>

        <!-- Rating -->
        <div class="sr-card-rating">
          <span class="sr-stars-row">${starsStr}</span>
          <span class="sr-rating-num">${rating.toFixed(1)}</span>
          <span class="sr-reviews">(${lounge.reviewsCount.toLocaleString()} reviews)</span>
        </div>

        <!-- Description snippet -->
        <p style="font-size:13px;color:var(--text-light);line-height:1.55;font-weight:500;">
          ${descSnippet}
        </p>

        <!-- Tier Badge -->
        <div style="margin-top: 12px; margin-bottom: 4px;">
          <span class="sr-tier-badge tier-${lounge.tier.toLowerCase()}">
            ✦ ${lounge.tier} Tier
          </span>
        </div>

        <!-- Footer: price + buttons -->
        <div class="sr-card-footer">
          <div class="sr-price-block">
            <div class="sr-price-label">From</div>
            <div style="display:flex;align-items:baseline;gap:4px;">
              <span
                class="sr-price-val price-display"
                data-price-usd="${lounge.priceUSD}"
              >$${lounge.priceUSD}</span>
              <span class="sr-price-per">/ person</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
              <div class="sr-price-tag">✓ Free cancellation</div>
            </div>
          </div>

          <div class="sr-card-btns" style="width: 100%; max-width: 240px;">
            <button
              class="sr-btn-book"
              onclick="openBookingModal('${lounge.id}')"
              id="book-btn-${lounge.id}"
              style="width: 100%; justify-content: center; padding: 12px;"
            >
              Book Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

    </article>
  `;
}

// ── Render Pagination Controls ──
function renderPagination() {
  const container = document.getElementById('sr-pagination-container');
  const totalPages = Math.ceil(filteredLounges.length / pageSize);

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `<button class="sr-page-btn" onclick="setPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>`;

  // Smart page numbers display
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  if (startPage > 1) {
    html += `<button class="sr-page-btn" onclick="setPage(1)">1</button>`;
    if (startPage > 2) html += `<span class="sr-page-dots">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="sr-page-btn ${i === currentPage ? 'active' : ''}" onclick="setPage(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span class="sr-page-dots">...</span>`;
    html += `<button class="sr-page-btn" onclick="setPage(${totalPages})">${totalPages}</button>`;
  }

  html += `<button class="sr-page-btn" onclick="setPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;

  container.innerHTML = html;
}

function setPage(page) {
  currentPage = page;
  renderPage();
  // Scroll list smoothly to top on page change
  window.scrollTo({
    top: document.getElementById('sr-card-list').getBoundingClientRect().top + window.scrollY - 100,
    behavior: 'smooth'
  });
}

function navigateLoungeImage(event, loungeId, direction) {
  event.stopPropagation(); // Prevent card clicks
  const lounge = loungesData.find(l => l.id === loungeId);
  if (!lounge) return;

  const images = [lounge.image, lounge.heroImage];
  if (loungeImageStates[loungeId] === undefined) {
    loungeImageStates[loungeId] = 0;
  }

  let index = loungeImageStates[loungeId] + direction;
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  loungeImageStates[loungeId] = index;

  // Update image element
  const card = document.querySelector(`.sr-card[data-id="${loungeId}"]`);
  if (card) {
    const img = card.querySelector('.sr-card-img');
    if (img) img.src = images[index];

    // Update dots style inline
    const dots = card.querySelectorAll('.sr-img-dot');
    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
        dot.style.width = '14px';
        dot.style.borderRadius = '3px';
        dot.style.background = '#FFFFFF';
      } else {
        dot.classList.remove('active');
        dot.style.width = '6px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'rgba(255, 255, 255, 0.4)';
      }
    });
  }
}

// ── Favourites (Heart) ──
const LIKED_KEY = 'lp_liked_lounges';

function getLiked() {
  try { return JSON.parse(localStorage.getItem(LIKED_KEY) || '[]'); } catch(e) { return []; }
}

function toggleHeart(loungeId) {
  let liked = getLiked();
  const btn = document.getElementById('heart-' + loungeId);
  if (liked.includes(loungeId)) {
    liked = liked.filter(id => id !== loungeId);
    if (btn) btn.classList.remove('liked');
  } else {
    liked.push(loungeId);
    if (btn) {
      btn.classList.add('liked');
      // Bounce animation
      btn.style.transform = 'scale(1.35)';
      setTimeout(() => { btn.style.transform = ''; }, 250);
    }
  }
  localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
}

// ── Booking Modal ──
function openBookingModal(loungeId) {
  const lounge = loungesData.find(l => l.id === loungeId);
  if (!lounge) return;

  document.getElementById('booking-lounge-id').value = lounge.id;
  document.getElementById('booking-modal-lounge-name').textContent = lounge.outletName;
  document.getElementById('booking-modal-lounge-terminal').textContent = lounge.terminals[0] + ' • Guaranteed Entry';

  document.getElementById('booking-travelers').value = '1';
  document.getElementById('booking-date').value = '2026-07-10';
  document.getElementById('booking-addon-spa').checked = false;
  document.getElementById('booking-addon-fasttrack').checked = true;

  document.getElementById('booking-total-price-display').setAttribute('data-price-usd', lounge.priceUSD);
  calculateBookingPrice();

  document.getElementById('booking-form-step-1').style.display = 'block';
  document.getElementById('booking-form-step-2').style.display = 'none';
  document.getElementById('booking-modal').style.display = 'flex';
}

function closeBookingModal() {
  document.getElementById('booking-modal').style.display = 'none';
}

function calculateBookingPrice() {
  const id = document.getElementById('booking-lounge-id').value;
  const lounge = loungesData.find(l => l.id === id);
  if (!lounge) return;

  let priceUSD = lounge.priceUSD;
  if (document.getElementById('booking-addon-spa').checked) priceUSD += 15;
  const travelers = parseInt(document.getElementById('booking-travelers').value) || 1;
  const total = priceUSD * travelers;

  const el = document.getElementById('booking-total-price-display');
  el.setAttribute('data-price-usd', total);
  const { rate, symbol } = currencies[currentCurrency];
  el.textContent = symbol + Math.round(total * rate);
}

function submitBooking(e) {
  e.preventDefault();
  const id = document.getElementById('booking-lounge-id').value;
  const lounge = loungesData.find(l => l.id === id);
  if (!lounge) return;
  document.getElementById('confirmation-lounge-name').textContent = lounge.outletName;
  document.getElementById('booking-form-step-1').style.display = 'none';
  document.getElementById('booking-form-step-2').style.display = 'block';
  try {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  } catch(err) {}
}

// ── How it Works Modal ──
function openHowItWorksModal() {
  document.getElementById('how-it-works-modal').style.display = 'flex';
}
function closeHowItWorksModal() {
  document.getElementById('how-it-works-modal').style.display = 'none';
}

// ── Virtual Tour Modal ──
function openVirtualTourModal(loungeId) {
  const lounge = loungesData.find(l => l.id === loungeId);
  if (!lounge) return;
  activeVirtualTourLounge = lounge;
  virtualTourCurrentSlide = 0;
  document.getElementById('tour-modal-title').textContent = `${lounge.outletName} (${lounge.airportCode})`;
  document.getElementById('tour-modal-amenities').textContent = lounge.amenities.join(', ');
  const bookBtn = document.getElementById('tour-modal-book-btn');
  bookBtn.onclick = () => { closeVirtualTourModal(); openBookingModal(lounge.id); };
  renderTourSlide();
  document.getElementById('tour-modal').style.display = 'flex';
}
function closeVirtualTourModal() {
  document.getElementById('tour-modal').style.display = 'none';
  activeVirtualTourLounge = null;
}
function renderTourSlide() {
  if (!activeVirtualTourLounge) return;
  const slides = (activeVirtualTourLounge.virtualTour && activeVirtualTourLounge.virtualTour.length > 0)
    ? activeVirtualTourLounge.virtualTour
    : [{ title: 'Main Lounge Area', url: activeVirtualTourLounge.image }];
  const slide = slides[virtualTourCurrentSlide];
  document.getElementById('tour-modal-slide-image').src = slide.url;
  document.getElementById('tour-modal-slide-counter').textContent = `Area ${virtualTourCurrentSlide + 1} of ${slides.length}`;
  document.getElementById('tour-modal-slide-title').textContent = slide.title;
  const dots = document.getElementById('tour-modal-dots');
  dots.innerHTML = '';
  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.style.cssText = `width:${i===virtualTourCurrentSlide?'20px':'8px'};height:8px;border-radius:4px;background:${i===virtualTourCurrentSlide?'#E61E38':'rgba(255,255,255,0.4)'};transition:all 0.3s;`;
    dots.appendChild(d);
  });
}
function prevTourSlide() {
  const slides = activeVirtualTourLounge?.virtualTour || [];
  const len = slides.length || 1;
  virtualTourCurrentSlide = virtualTourCurrentSlide === 0 ? len - 1 : virtualTourCurrentSlide - 1;
  renderTourSlide();
}
function nextTourSlide() {
  const slides = activeVirtualTourLounge?.virtualTour || [];
  const len = slides.length || 1;
  virtualTourCurrentSlide = virtualTourCurrentSlide === len - 1 ? 0 : virtualTourCurrentSlide + 1;
  renderTourSlide();
}

// ── Amenity Modal ──
function openAmenityModal(amenityName, loungeName, loungeId) {
  const modal = document.getElementById('amenity-modal');
  document.getElementById('amenity-modal-title').textContent = amenityName;
  document.getElementById('amenity-modal-description').innerHTML = `Enjoy complimentary, guaranteed priority access to <strong>${amenityName}</strong> at the <strong>${loungeName}</strong>. Included seamlessly with your LoungePair digital boarding pass—no extra fees or waitlists.`;
  const lower = amenityName.toLowerCase();
  let img = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80';
  if (lower.includes('shower')) img = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
  else if (lower.includes('chef') || lower.includes('buffet') || lower.includes('noodle')) img = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
  else if (lower.includes('bar') || lower.includes('cocktail') || lower.includes('champagne')) img = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
  document.getElementById('amenity-modal-image').src = img;
  document.getElementById('amenity-select-pass-btn').onclick = () => { closeAmenityModal(); openBookingModal(loungeId); };
  modal.style.display = 'flex';
}
function closeAmenityModal() {
  document.getElementById('amenity-modal').style.display = 'none';
}

// ── Open direct booking if ?id= param present ──
<?php if ($directId): ?>
window.addEventListener('DOMContentLoaded', () => openBookingModal('lounge-<?= htmlspecialchars($directId) ?>'));
<?php endif; ?>

// ── Initial apply ──
applyFilters();
</script>

</body>
</html>
