function atualizarSites() {
  chrome.storage.sync.get({ blockedSites: [] }, ({ blockedSites }) => {
    const sites = document.getElementById("sites"); // pegando a lista no HTML
    sites.innerHTML = ""; // limpando a lista

    blockedSites.forEach(site => {
      const li = document.createElement("li");
      li.textContent = site + " ";

      const btn = document.createElement("button");
      btn.textContent = "Remove";

      btn.onclick = () => {
        // Remove o site clicado filtrando a lista
        chrome.storage.sync.get({ blockedSites: [] }, ({ blockedSites }) => {
          const novaLista = blockedSites.filter(s => s !== site);
          chrome.storage.sync.set({ blockedSites: novaLista }, atualizarSites);
        });
      };

      li.appendChild(btn);
      sites.appendChild(li);
    });
  });
}

document.getElementById("add").onclick = () => {
  const input = document.getElementById("site");
  const site = input.value.trim().toLowerCase();

  if (!site) {
    alert("Please enter a valid website name.");
    return; // não adiciona valores vazios
  }

  chrome.storage.sync.get({ blockedSites: [] }, ({ blockedSites }) => {
    if (!blockedSites.includes(site)) {
      blockedSites.push(site);
      chrome.storage.sync.set({ blockedSites }, () => {
        atualizarSites();
        input.value = ""; // limpa o input após adicionar
      });
    } else {
      alert("This site is already blocked.");
    }
  });
};

atualizarSites();
