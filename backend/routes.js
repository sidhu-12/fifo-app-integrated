
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
const config=require("./config.json");
const con=mysql.createConnection(config.connection);
const nodemailer=require("nodemailer");
const request=require("request");
app.listen(process.env.PORT||3000, () => {
  console.log("Listening on localhost:3000");
});

con.connect(function(error) {
  if (error) console.log(error);
  else console.log("connected");
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Content-type") 
  next();
});
app.post("/conf", function(req, res) {
  con.query(`SELECT * FROM import_req where username='${req.body.username}' and accepted=1 and arrival_date is null`, function(error, results) {
    //con.query(`Call conf_req(?)`,[req.body.username], function(error, results) {
  if (error) throw error;
    //console.log(results);
    res.send(results);
  });
});
app.post("/abc", function(req, res) {
  console.log(req.body);
  res.send("Uploaded Successfully");
});


app.post("/auth", function(req, res) {
  //const sql=`Call authenticate(?,?)`;
  const sql = `Select * from user_login where username= BINARY '${req.body.username}' and password= BINARY '${req.body.password}'`;
  
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
    else {
      console.log(results)   
      if (results.length >=1) {res.send("True");}
      else res.send("False");
    }
  });
});
app.post("/rej", function(req, res) {
  const sql = `update import_req set accepted=2 where container_no='${req.body.con_no}'`;
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
     res.send("done");
  });
});
app.post("/driver_details", function(req, res) {
  const sql = `insert into driver_details (container_no,driver_name,mobile_number,truck_no,round_trip) values
  ('${req.body.container_no}','${req.body.name}','${req.body.mob_no}','${req.body.truck_no}','${req.body.round_trip}') `;
  //const sql=`Call driver_details_insertion(?,?,?,?,?)`;
  //console.log(sql);
  const sql1 = `update import_req set accepted=1 where container_no='${req.body.container_no}'`;
  //r;console.log(sql);
  con.query(sql1, function(err, results) {
    if (err) throw err;});
  con.query(sql,function(err, results) {
    if (err) throw err;
     res.send("done");
  });
});
app.post("/req", function(req, res) {
  con.query(`SELECT * FROM import_req where username='${req.body.username}' and accepted=0 and arrival_date is NULL`, function(error, results,) {
    if (error) throw error;
    res.send(results);
    /*con.query(`Call notification_req(?)`,[req.body.username] ,function(error, results) {
      if (error) throw error;
      //console.log(results);
      res.send(results);*/
  });
});
app.post("/driv", function(req, res) {
  con.query(`SELECT * FROM driver_details where container_no='${req.body.container_no}'`, function(error, results,) {
    if (error) throw error;
    res.send(results);
  });
});
app.post("/date", function(req, res) {
  const sql = `update import_req set arrival_date='${req.body.actualDate}' , arrival_time='${req.body.actualTime}' where container_no='${req.body.con_no}'`;
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
     res.send("done");
  });
});
app.post("/history", function(req, res) {
  const sql = `Select *,DATEDIFF(CURRENT_DATE(),dop) as diff from import_req where DATEDIFF(CURRENT_DATE(),dop)<30 and username='${req.body.username}' and accepted=1 and arrival_date <>'0000-00-00'`;
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
    let response=[];
    response.push(results);
    response.push(config.contact);
    console.log(response);
    res.send(response);
  });
});