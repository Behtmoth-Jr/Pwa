let deferredPrompt; // Переменная для хранения события beforeinstallprompt
var k;
window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js')
      console.log('Service worker register success', reg)
    } catch (e) {
      console.log('Service worker register fail')
    }
  }
})

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
          localStorage.setItem('k', 1);
        }
        deferredPrompt = null;
      });
    });

    window.addEventListener('load', async () => {
      let v =localStorage.getItem('k');
      console.log(v);
      if (v == 1) {
        console.log('App installed');
        document.getElementById('install-btn').style.display = 'none';
      }
  })
