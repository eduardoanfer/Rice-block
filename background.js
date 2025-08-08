function verificarBloqueio(tabId, url) {
    if (!url) return;
    chrome.storage.sync.get({ blockedSites: [] }, ({ blockedSites }) => {
        const hostname = new URL(url).hostname.replace(/^www\./, ""); // remove www.
        if (blockedSites.some(site => hostname.endsWith(site))) {
            chrome.tabs.update(tabId, { muted: true });
        }
    });
}

// Quando a aba é atualizada
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        verificarBloqueio(tabId, tab.url);
    }
});

// Quando o áudio começa ou para
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.audible) {
        verificarBloqueio(tabId, tab.url);
    }
});
