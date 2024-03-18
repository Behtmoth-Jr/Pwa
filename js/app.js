window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js')
      console.log('Service worker register success', reg)
    } catch (e) {
      console.log('Service worker register fail')
    }
  }

  await loadEmojis()
})

function loadEmojis() {
  fetch('https://api.github.com/emojis')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const emojisContainer = document.getElementById('emojis-container');
      Object.keys(data).forEach(key => {
        const img = document.createElement('img');
        img.src = data[key];
        img.alt = key;

        // Создание контейнера для каждого эмодзи и его названия
        const emojiContainer = document.createElement('div');
        emojiContainer.classList.add('emoji-wrapper');

        // Создание элемента для вывода названия
        const emojiName = document.createElement('p');
        emojiName.textContent = key; // Установка текста названия

        // Добавление эмодзи и названия в контейнер
        emojiContainer.appendChild(img);
        emojiContainer.appendChild(emojiName);

        // Добавление каждого контейнера на страницу
        emojisContainer.appendChild(emojiContainer);
      });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

let deferredPrompt; // Переменная для хранения события beforeinstallprompt

    window.addEventListener('beforeinstallprompt', (e) => {
      // Сохраняем событие
      deferredPrompt = e;

      // Предотвращаем браузерный диалог об установке
      e.preventDefault();
    });

    // Обработчик клика на кнопке установки
    document.getElementById('install-btn').addEventListener('click', () => {
      // Вызываем диалог установки приложения
      deferredPrompt.prompt();

      // Скрытие кнопки установки после вызова диалога
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('App installed');
          document.getElementById('install-btn').style.display = 'none';
        }
        deferredPrompt = null;
      });
    });

document.addEventListener("DOMContentLoaded", loadEmojis);