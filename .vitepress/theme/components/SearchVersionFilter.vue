<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

type VersionFilter = 'all' | 'v3' | 'v2'

const STORAGE_KEY = 'sws-search-version'
const filter = ref<VersionFilter>('all')
const open = ref(false)

function applyAttr(v: VersionFilter) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-sws-search-version', v)
}

function setFilter(v: VersionFilter) {
  filter.value = v
  open.value = false
  try {
    localStorage.setItem(STORAGE_KEY, v)
  } catch {}
  applyAttr(v)
}

function toggleOpen() {
  open.value = !open.value
}

function onDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.sws-svf')) open.value = false
}

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as VersionFilter | null
    if (saved === 'v3' || saved === 'v2' || saved === 'all') {
      filter.value = saved
    }
  } catch {}
  applyAttr(filter.value)
  document.addEventListener('click', onDocClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
})

watch(filter, (v) => applyAttr(v))

const LABEL: Record<VersionFilter, string> = {
  all: 'All versions',
  v3: 'v3 only',
  v2: 'v2 only',
}
const OPTIONS: VersionFilter[] = Object.keys(LABEL) as VersionFilter[]
</script>

<template>
  <Teleport to="body">
    <div class="sws-svf" :data-open="open">
      <button
        class="sws-svf-trigger"
        type="button"
        :aria-expanded="open"
        :aria-label="`Search version filter: ${LABEL[filter]}`"
        @click="toggleOpen"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
        </svg>
        <span class="sws-svf-label">{{ LABEL[filter] }}</span>
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" class="sws-svf-caret">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </svg>
      </button>

      <ul v-show="open" class="sws-svf-menu" role="listbox" :aria-label="`Filter results by version`">
        <li
          v-for="opt in OPTIONS"
          :key="opt"
          role="option"
          :aria-selected="filter === opt"
        >
          <button
            type="button"
            class="sws-svf-item"
            :class="{ 'is-active': filter === opt }"
            @click="setFilter(opt)"
          >
            <span class="sws-svf-dot" :data-v="opt" aria-hidden="true"></span>
            <span>{{ LABEL[opt] }}</span>
            <svg v-if="filter === opt" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" class="sws-svf-check">
              <path d="M5 12l5 5 9-11" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </Teleport>
</template>

<style>
/*
 * Search version filter
 *
 * - Always rendered, hidden by default.
 * - Shown only when the VitePress local search modal is open
 *   (detected via :has() on the body).
 * - Positioned at the top of the modal, above the input.
 */

.sws-svf {
  display: none;
}

/* Show the filter chip when the local search modal is open.
   Use a z-index above the modal's backdrop (z-index: 100) and shell. */
body:has(.VPLocalSearchBox) .sws-svf {
  display: block;
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  pointer-events: auto;
}

.sws-svf-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px 5px 9px;
  font: 600 0.78rem/1 var(--vp-font-family-base);
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
  white-space: nowrap;
}

.sws-svf-trigger:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.sws-svf-caret {
  opacity: 0.7;
  transition: transform 0.15s;
}

.sws-svf[data-open="true"] .sws-svf-caret {
  transform: rotate(180deg);
}

.sws-svf-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 4px;
  list-style: none;
  min-width: 180px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

.sws-svf-menu li {
  list-style: none;
  margin: 0;
}

.sws-svf-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  font: 500 0.82rem/1.2 var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
}

.sws-svf-item:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.sws-svf-item.is-active {
  color: var(--vp-c-brand-1);
}

.sws-svf-check {
  margin-left: auto;
  color: var(--vp-c-brand-1);
}

.sws-svf-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-text-3);
}

.sws-svf-dot[data-v="v3"] {
  background: #16a34a;
}

.sws-svf-dot[data-v="v2"] {
  background: #d97706;
}

/*
 * Tag each search result with a version badge (v3 / v2) and dim the
 * "other version" rows when a lock is active.
 */

/* Version badge on each result */
.VPLocalSearchBox .result {
  position: relative;
}

.VPLocalSearchBox .result[href*="/v3/"] .titles::before,
.VPLocalSearchBox .result[href*="/v2/"] .titles::before {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 1px 6px;
  font: 700 0.62rem/1.4 var(--vp-font-family-base);
  letter-spacing: 0.04em;
  color: #fff;
  border-radius: 999px;
  vertical-align: middle;
}

.VPLocalSearchBox .result[href*="/v3/"] .titles::before {
  content: "v3";
  background: #16a34a;
}

.VPLocalSearchBox .result[href*="/v2/"] .titles::before {
  content: "v2";
  background: #d97706;
}

/* Hide results when a version lock is active */
html[data-sws-search-version="v3"] .VPLocalSearchBox .results li:has(.result[href*="/v2/"]) {
  display: none;
}

html[data-sws-search-version="v2"] .VPLocalSearchBox .results li:has(.result[href*="/v3/"]) {
  display: none;
}

/*
 * Add a small breathing room at the top of the modal so the filter doesn't
 * cover the close button on small screens
 */
.VPLocalSearchBox .backdrop {
  padding-top: 12px;
}

/*
 * Mobile adjustments
 */
@media (max-width: 640px) {
  body:has(.VPLocalSearchBox) .sws-svf {
    top: 8px;
  }

  .sws-svf-trigger {
    font-size: 0.72rem;
    padding: 4px 9px 4px 8px;
  }

  .sws-svf-menu {
    min-width: 160px;
  }
}
</style>
