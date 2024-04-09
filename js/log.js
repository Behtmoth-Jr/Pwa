if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    const logsDiv = document.getElementById('logs');
    logsDiv.innerHTML += `<p class="block">${event.data}</p>`;
  });
}