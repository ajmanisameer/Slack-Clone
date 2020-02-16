let socket = io();

socket.on("connect", () => {
  console.log("Connected to Server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Server");
});

//Generating Message
socket.on('newMessage', (message) => {
  console.log("newMessage", message);
  let li = document.createElement('li');
  li.innerText = `${message.from}: ${message.text}`

  document.querySelector('body').appendChild(li)
})


//Generating LocationMessage
socket.on('newLocationMessage', (message) => {
  console.log("newLocationMessage", message);
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.setAttribute('target', '_blank')
  a.setAttribute('href', message.url)
  a.innerText = 'My Current Location'
  li.appendChild(a);

  document.querySelector('body').appendChild(li)
})


// socket.emit('createMessage', {
//   from: 'John Doe',
//   text: "Watsup Biatch"
//   //callback with the input message/generateMessage
// }, (message) => {
//   console.log('Gotcha', message)
// })

document.querySelector('#submit-btn').addEventListener('click', function (e) {
  e.preventDefault();

  socket.emit("createMessage", {
    from: 'User',
    text: document.querySelector('input[name="message"]').value
  }, function () {

  });
});

document.querySelector('#send-location').addEventListener('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your Browser.')
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position)
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng:  position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch Location!')  
  })
})