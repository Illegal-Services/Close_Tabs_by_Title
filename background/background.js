import { saveSettings } from "../shared/shared_functions.js";
import { initializeTabsClosing } from "../js/initializeTabsClosing.js";

// Add an event listener for the 'onInstalled' event, which means it will run when the extension when it will be first installed
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await saveSettings({
      insensitiveSearch: false,
      whitelistFirefoxReservedTabs: false,
    });
  }
});

// Listen for incoming messages from the extension's UI "Close Tabs" button pressed
browser.runtime.onMessage.addListener(async (message) => {
  if ((await message.action) === "closeTabs") {
    return initializeTabsClosing(message.tabsToClose);
  }
});
