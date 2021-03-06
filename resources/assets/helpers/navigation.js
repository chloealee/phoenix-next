/* global document */

import { findKey } from 'lodash';

export const campaignPaths = {
  community: '/',
  action: '/action',
  blocks: '/blocks/',
  quiz: '/quiz/',
  pages: '/pages/',
};

/**
 * Get the display name of the given route,
 *
 * @param  {String} route
 * @return {String}
 */
export function getRouteName(route) {
  // When doing path comparisons, we want the least specific
  // (eg: '/') paths at the end of the array.
  const pathValues = (
    Object.values(campaignPaths).sort((pathA, pathB) => pathB.length - pathA.length)
  );

  // Check if /pages/faq starts with /pages/.
  const match = pathValues.find(path => route.startsWith(path));
  if (! match) {
    return 'undefined route';
  }

  // Find the display name for the matched path value.
  // This is a bit crazy because we need to find the index
  // in the `campaignPaths` object and the `pathValues` array is in
  // a different order.
  let name = findKey(campaignPaths, path => path === match);
  if (name === 'pages') {
    // Remove /pages/ from /pages/faq
    // Not the most fullproof solution in the world but should suffice.
    name = route.replace(match, '');
  }

  return name;
}

/**
 * Toggle the specified class on the given target element
 * when the button element is clicked or touched.
 *
 * @param  {Element} button
 * @param  {Element} target
 * @param  {String} toggleClass
 */
export function toggleHandler(button, target, toggleClass) {
  if (! button || ! target) {
    return;
  }

  function clickHandler() {
    target.classList.toggle(toggleClass);
  }

  button.addEventListener('mousedown', clickHandler, false);
}

/**
 * Setup event listeners for the top-level navigation
 * in the site chrome.
 */
export function bindNavigationEvents() {
  const navToggle = document.getElementById('js-navigation-toggle');
  const nav = document.getElementsByClassName('navigation')[0];
  const chrome = document.getElementsByClassName('chrome')[0];
  toggleHandler(navToggle, nav, 'is-visible');
  toggleHandler(navToggle, chrome, 'has-mobile-menu');

  const accountToggle = document.getElementById('js-account-toggle');
  const dropdown = document.getElementsByClassName('navigation__dropdown')[0];
  toggleHandler(accountToggle, dropdown, 'is-visible');
}
