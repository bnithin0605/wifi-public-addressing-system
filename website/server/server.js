const path = require("path");
const express = require("express");
const WebSocket = require("ws");
const app = express();
const WS_PORT = process.env.WS_PORT || 8888;// hop by hop
const HTTP_PORT = 8000 ;//end to end 
const mysql = require('mysql2');
require("dotenv").config();
const session =require('express-session');
const cookie_parser=require('cookie-parser');
const MySqlStore= require('express-mysql-session')(session);
  const con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database:process.env.database
});
var sessionStore=new MySqlStore({
  expiration:600000,
  createDatabaseTable:true,
  schema:{
    tableName:'session',
    columnNames:{
      session_id:'session_id',
      expires:'expires',
      data:'userinfo'
    }
  },
},con);
app.use(cookie_parser())
app.use(session({
  key:'userinfo',
  secret:'secret key',
  store:sessionStore,
  resave:false,
  saveUninitialized:true
}));
app.use("/images", express.static("images"));
app.use(express.static("public"));
const wsServer= new WebSocket.Server({ port: WS_PORT }, () =>
  console.log('WS server is listening at ws://45.249.79.39:${WS_PORT}') 
  );
console.log(wsServer);
// array of connected websocket clients
let connectedClients = [];
app.use(express.json());       
app.use(express.urlencoded({extended: true}));
app.use("/js", express.static("js"));
wsServer.on("connection", (ws, req) => {
  console.log("Connected");
  // add new connected client
  connectedClients.push(ws);
  // listen for messages from the streamer, the clients will not send anything so we don't need to filter
  ws.on("message", (data) => {
    connectedClients.forEach((ws, i) => {
      if (ws.readyState === ws.OPEN  ) {
        ws.send(data);
      } else {
        connectedClients.splice(i, 1);
      }
    });
  });
});  
app.post("/login", (req, res) => { 
   if(req.sessionID && req.session.userinfo){
   res.redirect("/b");
   }
   con.connect(function (err) {
    if (err) {
        console.log(err);
        }
    }); 
   
  var sql = `select * from admin_registration where username='${req.body.username}' and    password='${req.body.password}'`;
  con.query(sql,function(err,result)
   {
    if(err) throw err;
    
    if(result.length>=1)
    {
      req.session.userinfo=req.body.username;
      res.redirect("/b");
    }
    else{
      res.sendFile(path.resolve(__dirname, "./login.html"))
    }
      });
});
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});


app.post("/adminlogin", (req, res) => {
console.log("hello");
con.connect(function (err) {
    if (err) {
    console.log(err);
    }
})
var sql = `select * from admin_credentials where username='${req.body.username}' and password='${req.body.password}'`;
  con.query(sql,function(err,result)
   {
    if(err) throw err; 
    if(result.length==1)
    {
      req.session.userinfo=req.body.username;
      res.redirect("/adminreg");
    }
    else{
      res.redirect("/a");
    }
  });
});
app.post("/r", (req, res) => {
if(!(req.sessionID && req.session.userinfo)){
    res.redirect("/a");
}
con.connect(function (err) {
    if (err) {
    console.log(err);
    }
})
var sql = `insert into admin_registration(username,empid,email,password) values('${req.body.username}','${req.body.empid}','${req.body.email}','${req.body.password}')`;
  con.query(sql,function(err,result)
   {
    if(err) throw err;
    if(result.length==1)
    {
      res.send(alert(result));
    }
    else{
      res.sendFile(path.resolve(__dirname, "./adminlog.html"))
    }
  });
});

function checkAlive() {
	console.log("[Server] Total number of connected clients: " + wsServer.clients.size);}

  setInterval(function () {
    checkAlive();
  }, 5000);
app.get("/",(req,res)=>{
if(req.sessionID && req.session.userinfo){
res.redirect("/b");
}
else{
 res.sendFile(path.resolve(__dirname, "./login.html"))
 }
  } );

app.get("/b",(req,res)=>{
    if(req.sessionID && req.session.userinfo){
    res.sendFile(path.resolve(__dirname,"./broadcast.html"));
    }
    else{
    res.redirect("/");
    }
    
});

app.get("/logout", (req,res)=>{
  req.session.destroy((err)=>{    
     res.redirect("/");
  });
});
app.get("/adminlogout", (req,res)=>{
  req.session.destroy((err)=>{
     res.redirect("/a");
  });
});
app.get("/adminreg",(req,res)=>{
   if(req.sessionID && req.session.userinfo){
       res.sendFile(path.resolve(__dirname, "./adminreg.html"));
   }
   else{
   res.redirect("/a");
   }
   });
app.get("/c", (req, res) =>{
  res.sendFile(path.resolve(__dirname, "./client.html"))
});
app.get("/a", (req, res) =>{
  if(req.sessionID && req.session.userinfo){
     res.redirect("/adminreg");
  }
  res.sendFile(path.resolve(__dirname, "./adminlog.html"))
});
server=app.listen(HTTP_PORT, () =>
  console.log("HTTP server listening at http://45.249.79.39:${HTTP_PORT}")
);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});