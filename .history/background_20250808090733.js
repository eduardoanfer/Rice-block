chrome.tabs.onUpdate.addListener((tabId, changeInfo, tab) => {
  if(changeInfo.status === "complete" && tab.url){
    chrome.storage.sync.get({blockedSites: []}, ({blockedSites}) => {
      const url = new URL(tab.url)
      if(blockedSites.some(site => url.hostname.includes(site)))
      {chrome.tabs.update(tabId, {muted: true})}
    })

  }

} )