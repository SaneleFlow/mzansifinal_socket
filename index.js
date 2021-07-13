let app = require('express')();
// var cors = require('cors')
// app.use(cors())
let server = require('http').createServer(app);
let io = require('socket.io')(server);



sendroom = '';
users = [];




io.on('connection', (socket) => {




  socket.on('comment-room', (room) => {

    socket.room = 'project:' + room;

    console.log(socket.room);


    socket.join(socket.room)
  });


  socket.on('message-room', (room) => {

    socket.room = 'private:' + room;

    console.log(socket.room);


    socket.join(socket.room)
  });



//   socket.on('like-channel', () => {

// let room = 1;

//     socket.room = 'likes:' + room;

//     // console.log(socket.room);


//     socket.join(socket.room)

//   });






  socket.on('disconnect', function () {
    io.emit('users-changed', { user: socket.username, event: 'left' });
  });


  socket.on('set-name', (name) => {
    socket.username = name;
    io.emit('users-changed', { user: name, event: 'joined' });
  });

  socket.on('set-ID',  (id) => {
    socket.user_id = id;

  })

  socket.on('set-ID',  (id) => {
    socket.user_id = id;

  })


  socket.on('image', (img) => {
    socket.img = img;
    console.log('here')
    console.log(img)
 
  })







  socket.on('send-message', (message) => {
// console.log(socket.user_id)
    io.to(socket.room).emit('message', { comment: message.text, name: socket.username, user_id: socket.user_id, image: socket.img.text, created_at: new Date() });
  });


  socket.on('send-private', (message) => {

    io.to(socket.room).emit('message', { message: message.text, name: socket.username, user_id: socket.user_id, image: socket.img.text, created_at: new Date() });
  });








});


var port = process.env.PORT || 8080;


server.listen(port, function () {
  console.log('listening in http://localhost:' + port);
  // response.send('listening in http://localhost:' + port)
});

