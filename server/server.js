const path=require('path'); //no need to import already available in node
// console.log(__dirname + '/../public');
const http=require('http'); //built in module no need to install we can simply require
const express=require('express');
const nodemon=require('nodemon');
const socketIO=require('socket.io');
var app=express(); //app variable for configuring our express application

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000; //doing it for Heroku Deployment
console.log(publicPath);
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',{
    from:'mike',
    text:'hey there ',
    
  });
  //if you want to send data and send multiple data
  //then emit object
  //emit is not a listener so not providing ca;lback function

  socket.on('disconnect',()=>{
    console.log("User was disconnected");
  });

  socket.on('createMessage',(message)=>{
  console.log("create message",message);
  });
  //we are in our node code therefore we can use arrow function




});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});  //start the server at port 3000 and a little message onec the server is up
