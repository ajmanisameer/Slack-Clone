let socket = io();
      
socket.on("connect", () => {
  console.log("Connected to Server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Server");
});

socket.on('newMessage', (message)=>{
    console.log("newMessage", message)
})

socket.emit('createMessage', {
  from: 'John Doe',
  text: "Watsup Biatch"
  //callback with the input message/generateMessage
}, (message) => {
  console.log('Gotcha', message)
})
