//app setup and auth
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const exphbs  = require('express-handlebars');
const fs = require('fs');

//custom middleware
const data = require('./lib/data');

//custom routers
// const msalRouter = require('./routes/msal-router');
const formRouter = require('./routes/form-router');
const indexRouter = require('./routes/index-router');
const wpRouter = require('./routes/wp-router');
const apiRouter = require('./routes/api-router');
const socketRouter = require('./routes/socket-router');

//handlebars interception of .html files for custom rendering
app.engine('html', exphbs({extname: '.html'}));
app.set('view engine', 'html');

//always use cookies
app.use(cookieSession({
  name: 'auth',
  keys: [process.env.COOKIE_KEY],
  maxAge: 168 * 60 * 60 * 1000, // 24*7 hours
}))

app.get('/app3/components/:file', function(req, res) {
  // Note: should use a stream here, instead of fs.readFile
  fs.readFile('./public/app3/components/' + req.params.file, function(err, data) {
    if(err) {
      res.send("Oops! Couldn't find that file.");
    } else {
      // set the content type based on the file
      res.contentType("text/javascript");
      res.send(data);
    }   
    res.end();
  }); 
});
//serve static assets from /public
// express.static.mime.define({'application/javascript': ['vue']});
app.use(express.static("public"));

// var options = {
//   setHeaders: function (res, path, stat) {
//     res.set('Content-Type','text/javascript')
//   }
// }

// app.use(express.static('public/app3/components', options))


//router setups
const form = express.Router()
form.use(formRouter)

const wp = express.Router()
wp.use(wpRouter)

const index = express.Router()
index.use(indexRouter)

const api = express.Router()
api.use(apiRouter)

const socket = express.Router()
socket.use(socketRouter)
 
//attach routers
app.use('/form', form)
app.use('/wp', wp)
app.use('/', index)
app.use('/api', api)
app.use('/cursors', socket)

// SOCKET INFO
let port = process.env.PORT || 8000;
let server = require('http').createServer(app).listen(port, function(){
  console.log('Server is listening at port: ', port);
});

app.use(express.static('public'));

// let io = require('socket.io').listen(server) /* create socket connection */
const io = require("socket.io")(server, {
  // ...
});
var totalUsers = 0,
    stepID = 0,
    friendsGroup = [];

io.on('connection', function (socket) {
  friendsGroup.push(++stepID);   /* new id */
  var thisID = stepID
  totalUsers++;
    socket.on('nameChosen',function(data){
      const playerId = data.player
      const name = data.response.name
      const role = data.response.role
      
      const completePlayer = {
        id: playerId,
        name: name,
        role: role,
        lastLocation: [0, 0]
      }
      friendsGroup[friendsGroup.indexOf(playerId)] = completePlayer
      socket.broadcast.emit('name updated', {data:completePlayer})
  });
  io.emit('connected', { connections: totalUsers });   /* new connection ALL */
  socket.broadcast.emit('new friend', { friend: thisID  });   /* new connection friends */
  socket.emit('init',{ player:thisID, friends: friendsGroup });   /* new connection self */
  
  socket.on('disconnect', function (){
    var i = 0;
    for(i in friendsGroup){
    if(friendsGroup[i].id === thisID){
      friendsGroup.splice(i,1);
    }
  }
    friendsGroup = friendsGroup
    totalUsers--;
    socket.broadcast.emit('bye friend',{connections:totalUsers, friend: thisID});
  });   /* disconnect friends */
  
  socket.on('move',function(data){
    console.log(data)
    const index = friendsGroup.findIndex(function(item, i){
    return item.id === data.friend
    });
    if (index > -1){
   friendsGroup[index].lastLocation = [data.friendX, data.friendY]
    }
      socket.broadcast.emit('move', data);
  });
  //console.log(friendsGroup);
});
// END SOCKET INFO

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
