function atualizarSites()
{
  chrome.storage.sync.get({blockedSites:[]}, ({blockedSites}) => {
    const sites = document.getElementById("sites") // pegando os sites da lista html
    sites.innerHTML = "" // limpando a lista
    blockedSites.forEach(site => {
      const li = document.createElement("li")
      li.textContent = site
      const btn = document.createElement("button")
      btn.textContent = "Remover"
      btn.onclick = () => {
        blockedSites.splice(index, 1);
        chrome.storage.sync.set({blockedSites}, atualizarSites);
      };
      sites.appendChild(btn)
      sites.appendChild(li)
   })
  })
}
document.getElementById("add").onclick = () => {
  const site = document.getElementById("site").value.trim();
  chrome.storage.sync.get({blockedSites: []}, ({blockedSites}) => {
    blockedSites.push(site)
    chrome.storage.sync.set({blockedSites}, atualizarSites);
  })
  document.getElementById("site").value = ""

};
atualizarSites();
