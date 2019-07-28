// Detectar si podemos usar Service Workers
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js").then(register => {
    Notification.requestPermission().then(result => {
      console.log(result);
      register.showNotification("Hola mundo!");
    });
  });
}

// fetch("https://reqres.in/api/users")
//   .then(response => response.text())
//   .then(console.log);
