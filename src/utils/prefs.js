/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

// @flow

const { isDevelopment } = require("devtools-config");
const { Services, PrefsHelper } = require("devtools-modules");

const prefsSchemaVersion = "1.0.3";

const pref = Services.pref;

if (isDevelopment()) {
  pref("devtools.debugger.auto-pretty-print", true);
  pref("devtools.source-map.client-service.enabled", true);
  pref("devtools.debugger.pause-on-exceptions", false);
  pref("devtools.debugger.ignore-caught-exceptions", false);
  pref("devtools.debugger.call-stack-visible", true);
  pref("devtools.debugger.scopes-visible", true);
  pref("devtools.debugger.workers-visible", true);
  pref("devtools.debugger.expressions-visible", true);
  pref("devtools.debugger.breakpoints-visible", true);
  pref("devtools.debugger.start-panel-collapsed", false);
  pref("devtools.debugger.end-panel-collapsed", false);
  pref("devtools.debugger.tabs", "[]");
  pref("devtools.debugger.ui.framework-grouping-on", true);
  pref("devtools.debugger.pending-selected-location", "{}");
  pref("devtools.debugger.pending-breakpoints", "{}");
  pref("devtools.debugger.expressions", "[]");
  pref("devtools.debugger.file-search-case-sensitive", false);
  pref("devtools.debugger.file-search-whole-word", false);
  pref("devtools.debugger.file-search-regex-match", false);
  pref("devtools.debugger.project-directory-root", "");
  pref("devtools.debugger.prefs-schema-version", "1.0.1");
  pref("devtools.debugger.features.project-text-search", true);
  pref("devtools.debugger.features.workers", true);
  pref("devtools.debugger.features.async-stepping", true);
  pref("devtools.debugger.features.wasm", true);
  pref("devtools.debugger.features.shortcuts", true);
  pref("devtools.debugger.features.root", true);
  pref("devtools.debugger.features.column-breakpoints", true);
  pref("devtools.debugger.features.map-scopes", true);
  pref("devtools.debugger.features.breakpoints-dropdown", true);
  pref("devtools.debugger.features.remove-command-bar-options", true);
}

export const prefs = new PrefsHelper("devtools", {
  autoPrettyPrint: ["Bool", "debugger.auto-pretty-print"],
  clientSourceMapsEnabled: ["Bool", "source-map.client-service.enabled"],
  pauseOnExceptions: ["Bool", "debugger.pause-on-exceptions"],
  ignoreCaughtExceptions: ["Bool", "debugger.ignore-caught-exceptions"],
  callStackVisible: ["Bool", "debugger.call-stack-visible"],
  scopesVisible: ["Bool", "debugger.scopes-visible"],
  workersVisible: ["Bool", "debugger.workers-visible"],
  breakpointsVisible: ["Bool", "debugger.breakpoints-visible"],
  expressionsVisible: ["Bool", "debugger.expressions-visible"],
  startPanelCollapsed: ["Bool", "debugger.start-panel-collapsed"],
  endPanelCollapsed: ["Bool", "debugger.end-panel-collapsed"],
  frameworkGroupingOn: ["Bool", "debugger.ui.framework-grouping-on"],
  tabs: ["Json", "debugger.tabs", []],
  pendingSelectedLocation: ["Json", "debugger.pending-selected-location", {}],
  pendingBreakpoints: ["Json", "debugger.pending-breakpoints", {}],
  expressions: ["Json", "debugger.expressions", []],
  fileSearchCaseSensitive: ["Bool", "debugger.file-search-case-sensitive"],
  fileSearchWholeWord: ["Bool", "debugger.file-search-whole-word"],
  fileSearchRegexMatch: ["Bool", "debugger.file-search-regex-match"],
  debuggerPrefsSchemaVersion: ["Char", "debugger.prefs-schema-version"],
  projectDirectoryRoot: ["Char", "project-directory-root", ""]
});

export const features = new PrefsHelper("devtools.debugger.features", {
  asyncStepping: ["Bool", "async-stepping", false],
  projectTextSearch: ["Bool", "project-text-search", true],
  wasm: ["Bool", "wasm", true],
  shortcuts: ["Bool", "shortcuts", true],
  root: ["Bool", "root", false],
  columnBreakpoints: ["Bool", "column-breakpoints", false],
  mapScopes: ["Bool", "map-scopes", true],
  breakpointsDropdown: ["Bool", "breakpoints-dropdown", true],
  removeCommandBarOptions: ["Bool", "remove-command-bar-options", true],
  workers: ["Bool", "workers", true]
});

if (prefs.debuggerPrefsSchemaVersion !== prefsSchemaVersion) {
  // clear pending Breakpoints
  prefs.pendingBreakpoints = {};
  prefs.debuggerPrefsSchemaVersion = prefsSchemaVersion;
}
