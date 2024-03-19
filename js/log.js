function logPage() {
    const log = document.querySelector(".log");
    log.classList.add("active");
  
    setTimeout(() => {
      document.querySelector(".emoji-list").innerHTML += `
      <div class='block'><p>Регистрация ServiceWorker завершена</p></div>
    `;
      setTimeout(() => {
        document.querySelector(".emoji-list").innerHTML += `
        <div class='block'><p>Активация ServiceWorker завершена</p></div>
      `;
        if (navigator.onLine) {
          setTimeout(() => {
            document.querySelector(".emoji-list").innerHTML += `
          <div class='block'><p>Подключение к интернету активно</p></div>
          <div class='block'><p>Загрузка файлов с сервера</p></div>
        `;
          }, 1400);
        } else {
          setTimeout(() => {
            document.querySelector(".emoji-list").innerHTML += `
          <div class='block'><p>Подключение к интернету не активно</p></div>
          <div class='block'><p>Загрузка файлов из кеша</p></div>
        `;
          }, 1400);
        }
      }, 1400);
    }, 1400);
  }