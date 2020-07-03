
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
const config=require("./config.json");
const con=mysql.createConnection(config.db_con);
const nodemailer=require("nodemailer");
const request=require("request");
app.listen(process.env.PORT||3000, () => {
  console.log("Listening on localhost:3000");
});
 
con.connect(function(error) {
  if (error) console.log(error);
  else console.log("connected");
});
app.post("/conf", function(req, res) {
  con.query(`SELECT CCAD_BL_NO AS bl_no , COALESCE(CCAD_CONTAINER_NO,'') AS container_no , FN_GET_EQUIPMENT_TYPE_BY_ISO_CODE(CCAD_ISO_CODE) AS container_type , FN_GET_EQUIPMENT_SIZE_BY_ISO_CODE(CCAD_ISO_CODE) AS container_size , COALESCE(CCAD_PICKUP_DATE_FROM_PORT,'') AS dop , COALESCE(CCAD_PICKUP_DATE_FROM_CFS,'') AS dop_cfs , COALESCE(CCAD_DELIVARY_DATE_AT_FACTORY,'') AS delivery_date , COALESCE(CCAD_TIME,'') AS time , COALESCE(CCAD_DRIVER_NAME,'') AS driver_name , COALESCE(CCAD_DRIVER_MOBILE_NO,'') AS mob_number , COALESCE(CCAD_TRUCKER_NUMBER,'') AS truck_number , COALESCE(CCAD_PORT_OF_DISCHARGE,'') AS port_name , COALESCE(CCAD_PLACE_OF_DELIVARY,'') AS delivery_place , FN_GET_STAKEHOLDER_NAME_BY_ID(CBMD_CONSIGNEE_ID,'CON') AS conginee_name,FN_GET_STAKEHOLDER_MAIL_ID_BY_ID(CBMD_CONSIGNEE_ID, 'CON') AS consignee_mail,FN_GET_STAKEHOLDER_MOBILE_NUMBER_BY_ID(CBMD_CONSIGNEE_ID, 'CON') AS consignee_mobile FROM consignee_container_available_details , consignee_blno_mapping_details WHERE CCAD_BL_NO = CBMD_BL_NO AND CCAD_TRANSPORT_CO_NAME = '${req.body.username}' AND CCAD_TRANSPORTER_CONFIRM_FLAG IN('Y') AND 	CCAD_ARRIVED_DATE_UPDATED_BY_TRANSPORTER is NULL AND 	CCAD_ARRIVED_TIME_UPDATED_BY_TRANSPORTER is NULL ORDER BY CCAD_BL_NO,port_name,delivery_place;`, function(error, results) {
    //con.query(`Call conf_req(?)`,[req.body.username], function(error, results) {
  if (error) throw error;
    //console.log(results);
    res.send(results);
  });
});
app.post("/shipper_conf", function(req, res) {
  con.query(`SELECT COALESCE(SCAD_DRIVER_NAME,'') AS driver_name , COALESCE(SCAD_DRIVER_MOBILE_NUMBER,'') AS mob_number , COALESCE(SCAD_TRUCKER_NUMBER,'') AS truck_number , COALESCE(SCAD_CONTAINER_NUMBER,'') AS container_no , FN_GET_EQUIPMENT_TYPE(SCAD_EQUIPMENT_TYPE_ID) AS container_type , FN_GET_EQUIPMENT_SIZE(SCAD_EQUIPMENT_SIZE_ID) AS container_size , COALESCE(SCAD_FIFO_REFERENCE_NUMBER,'') AS transaction_id , FN_GET_STAKEHOLDER_NAME_BY_ID(SCAD_BLOCKED_SHIPPER_ID,'SHP') AS shipper_name,FN_GET_STAKEHOLDER_MAIL_ID_BY_ID(SCAD_BLOCKED_SHIPPER_ID, 'SHP') AS shipper_mail,FN_GET_STAKEHOLDER_MOBILE_NUMBER_BY_ID(SCAD_BLOCKED_SHIPPER_ID, 'SHP') AS shipper_mobile, FN_GET_CLUSTER_NAME(SCAD_LOCATION_ID) AS cluster_name FROM shipper_container_available_details , shipper_container_booking_details WHERE SRD_REQUEST_REFERENCE_NO = SCAD_FIFO_REFERENCE_NUMBER AND SRD_SHIPPER_ID = SCAD_BLOCKED_SHIPPER_ID AND SCAD_TRANSPORTER_ID = '${req.body.username}' AND SCAD_ACTUAL_ARRIVED_DATE_AT_FACTORY_UPDATED_BY_TRANSPORTER is NULL;`, function(error, results) {
    //con.query(`Call conf_req(?)`,[req.body.username], function(error, results) {
  if (error) throw error;
    //console.log(results);
    res.send(results);
  });
});


app.post("/auth", function(req, res) {
  //const sql=`Call authenticate(?,?)`;
  const sql = `set @O_STAT = 0;set @O_STATUS = '0';set @O_STAKEHOLDER_ID = 0;set @O_STAKEHOLDER_ROLE = 0;set @O_STAKEHOLDER_NAME = '0';set @O_STAKEHOLDER_ROLE_NAME = '0'; set @O_FIFOAPPROVALFLAG = '0'; call SP_FIFO_AGENT_LOGIN('${req.body.username}', '${req.body.password}', '${config.key}', 'C', @O_STAT, @O_STATUS, @O_STAKEHOLDER_ID, @O_STAKEHOLDER_ROLE, @O_STAKEHOLDER_NAME, @O_STAKEHOLDER_ROLE_NAME, @O_FIFOAPPROVALFLAG);select @O_STAT, @O_STATUS as status, @O_STAKEHOLDER_ID as uname, @O_STAKEHOLDER_ROLE, @O_STAKEHOLDER_NAME as name, @O_STAKEHOLDER_ROLE_NAME, @O_FIFOAPPROVALFLAG;`;
  
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
    else {
      //console.log(results)   
     res.send(results);

    }
  });
});
app.post("/driver_details", function(req, res) {
  //const sql = `insert into driver_details (container_no,driver_name,mobile_number,truck_no,round_trip) values
  //('${req.body.container_no}','${req.body.name}','${req.body.mob_no}','${req.body.truck_no}','${req.body.round_trip}') `;
  //const sql=`Call driver_details_insertion(?,?,?,?,?)`;
  const sql=`UPDATE consignee_container_available_details SET CCAD_TRUCKER_NUMBER = '${req.body.truck_no}' , CCAD_DRIVER_MOBILE_NO = '${req.body.mob_no}' , CCAD_DRIVER_NAME = '${req.body.name}' , CCAD_TRANSPORTER_CONFIRM_FLAG = 'Y', CCAD_TRANSPORTER_ROUND_TRIP_FLAG = '${req.body.round_trip}' , CCAD_TRANSPORTER_CONFIRM_DATE = CURRENT_DATE , CCAD_TRANSPORTER_CONFIRM_TIME = CURRENT_TIME  WHERE CCAD_CONTAINER_NO = '${req.body.container_no}' AND CCAD_TRANSPORT_CO_NAME ='${req.body.username}' AND CCAD_BL_NO ='${req.body.bl_no}';`;
  con.query(sql,function(err, results) {
    if (err) throw err;
     res.send("done");

  });
  
});
app.post("/req", function(req, res) {
  con.query(`SELECT CCAD_BL_NO AS bl_no , COALESCE(CCAD_CONTAINER_NO,'') AS container_no , FN_GET_EQUIPMENT_TYPE_BY_ISO_CODE(CCAD_ISO_CODE) AS container_type , FN_GET_EQUIPMENT_SIZE_BY_ISO_CODE(CCAD_ISO_CODE) AS container_size , COALESCE(CCAD_PICKUP_DATE_FROM_PORT,'') AS dop , COALESCE(CCAD_PICKUP_DATE_FROM_CFS,'') AS dop_cfs , COALESCE(CCAD_DELIVARY_DATE_AT_FACTORY,'') AS delivery_date , COALESCE(CCAD_TIME,'') AS time, COALESCE(CCAD_PORT_OF_DISCHARGE,'') AS port_name , COALESCE(CCAD_PLACE_OF_DELIVARY,'') AS delivery_place , FN_GET_STAKEHOLDER_NAME_BY_ID(CBMD_CONSIGNEE_ID,'CON') AS conginee_name FROM consignee_container_available_details , consignee_blno_mapping_details WHERE CCAD_BL_NO = CBMD_BL_NO AND CCAD_TRANSPORT_CO_NAME ='${req.body.username}' AND CCAD_TRANSPORTER_CONFIRM_FLAG IN ('N','R') ORDER BY CCAD_BL_NO,conginee_name,port_name,delivery_place;`, function(error, results,) {
    if (error) throw error;
    res.send(results);
    /*con.query(`Call notification_req(?)`,[req.body.username] ,function(error, results) {
      if (error) throw error;
      //console.log(results);
      res.send(results);*/
  });
});

app.post("/date", function(req, res) {
  //const sql = `update import_req set arrival_date='${req.body.actualDate}' , arrival_time='${req.body.actualTime}' where container_no='${req.body.con_no}'`;
  //console.log(sql);
  const sql=`UPDATE shipper_container_available_details SET SCAD_ACTUAL_ARRIVED_DATE_AT_FACTORY_UPDATED_BY_TRANSPORTER ='${req.body.actualDate}' , SCAD_ACTUAL_ARRIVED_TIME_AT_FACTORY_UPDATED_BY_TRANSPORTER ='${req.body.actualTime}' WHERE SCAD_CONTAINER_NUMBER ='${req.body.con_no}'AND SCAD_TRANSPORTER_ID ='${req.body.username}' AND SCAD_FIFO_REFERENCE_NUMBER = '${req.body.trans_id}'`
  //console.log(sql);
  con.query(sql, function(err, results) {
    if (err) throw err;
    res.send("done");
  });
  let transporter = nodemailer.createTransport(config.mail);
var mail_content='<b>From</b>: noreply@fifofuture.in [mailto:noreply@fifofuture.in]<br/><b>Sent</b>: '+new Date()+'<br/><b>To</b>:'+req.body.shipper_mail+'<br/><b>Subject</b>: Cnee : Container arrival notice at factory<br/><br/><br/><br/><label style="font-size:large;font-family:\'Times New Roman\', Times, serif;"><b>Dear Shipper: '+req.body.shipper_name+' we are pleased to confirm arrival of the container No: '+req.body.con_no+' at your factory. Contact truck driver Name & Mobile No: ('+req.body.driver_name+' & '+req.body.mob_number+').</b></label><br/>Regards,<br/>Welcome Team,<br/>fifofuture.in<br/><div style="height: 10px;background-color: grey;"></div><br/><b>Note</b>: This is an auto generated mail please do not reply to this mail. To contact us or send any feedback, please mail us at: fifoadmin@fifofuture.in';
//console.log(mail_content);
let mailOptions = {
    from: 'noreply@fifofuture.in', 
    to: req.body.shipper_mail, 
    subject: 'Cnee : Container arrival notice at factory',
    html:mail_content,
  };
//console.log(mailOptions);
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    });
    request("http://www.smsintegra.com/api/smsapi.aspx?uid="+config.sms.user+"&pwd="+config.sms.pass+"&mobile="+req.body.shipper_mobile+"&msg=Dear "+req.body.shipper_name+" We are pleased to confirm arrival of the Container No:"+req.body.con_no+" at your factory.Contact truck Driver Name and Mobile No:( "+req.body.driver_name+" and "+req.body.mob_number+" )&sid="+config.sms.smsid+"&type=0&dtNow=dateandtime",function(error,response,body){
      console.log(body);
    });
  });
app.post("/date_consignee", function(req, res) {
  //const sql = `update import_req set arrival_date='${req.body.actualDate}' , arrival_time='${req.body.actualTime}' where container_no='${req.body.con_no}'`;
  //console.log(sql);
  const sql=`UPDATE consignee_container_available_details SET CCAD_ARRIVED_DATE_UPDATED_BY_TRANSPORTER ='${req.body.actualDate}' , CCAD_ARRIVED_TIME_UPDATED_BY_TRANSPORTER ='${req.body.actualTime}' WHERE CCAD_CONTAINER_NO ='${req.body.con_no}'AND CCAD_TRANSPORT_CO_NAME ='${req.body.username}' AND CCAD_BL_NO = '${req.body.bl_no}';`
  con.query(sql, function(err, results) {
    if (err) throw err;
    //console.log(results);
     res.send("done");
  });
   let transporter = nodemailer.createTransport(config.mail);
var mail_content='<b>From</b>: noreply@fifofuture.in [mailto:noreply@fifofuture.in]<br/><b>Sent</b>: '+new Date()+'<br/><b>To</b>:'+req.body.consignee_mail+'<br/><b>Subject</b>: Cnee : Container arrival notice at factory<br/><br/><br/><br/><label style="font-size:large;font-family:\'Times New Roman\', Times, serif;"><b>Dear Consignee: '+req.body.consignee_name+' we are pleased to confirm arrival of the container No: '+req.body.con_no+' at your factory. Contact truck driver Name & Mobile No: ('+req.body.driver_name+' & '+req.body.mob_number+').</b></label><br/>Regards,<br/>Welcome Team,<br/>fifofuture.in<br/><div style="height: 10px;background-color: grey;"></div><br/><b>Note</b>: This is an auto generated mail please do not reply to this mail. To contact us or send any feedback, please mail us at: fifoadmin@fifofuture.in';
//console.log(mail_content);
let mailOptions = {
    from: 'noreply@fifofuture.in', 
    to: req.body.consignee_mail, 
    subject: 'Cnee : Container arrival notice at factory',
    html:mail_content,
  };
//console.log(mailOptions);
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    });
    request("http://www.smsintegra.com/api/smsapi.aspx?uid="+config.sms.user+"&pwd="+config.sms.pass+"&mobile="+req.body.consignee_mobile+"&msg=Dear "+req.body.consignee_name+" We are pleased to confirm arrival of the Container No:"+req.body.con_no+" at your factory.Contact truck Driver Name and Mobile No:( "+req.body.driver_name+" and "+req.body.mob_number+" )&sid="+config.sms.smsid+"&type=0&dtNow=dateandtime",function(error,response,body){
      console.log(body);
      //console.log("http://www.smsintegra.com/api/smsapi.aspx?uid=FIFOFUTURE&pwd=18105&mobile="+req.body.consignee_mobile+"&msg=Dear "+req.body.consignee_name+" We are pleased to confirm arrival of the Container No:"+req.body.con_no+" at your factory.Contact truck Driver Name and Mobile No:( "+req.body.driver_name+" and "+req.body.mob_number+" )&sid=Smsint&type=0&dtNow=dateandtime");
        
    });
});
app.post("/history", function(req, res) {
  //const sql = `Select *,DATEDIFF(CURRENT_DATE(),dop) as diff from import_req where DATEDIFF(CURRENT_DATE(),dop)<30 and username='${req.body.username}' and accepted=1 and arrival_date <>'0000-00-00'`;
  //console.log(sql);
  const sql=`SELECT DATEDIFF(CURRENT_DATE,CCAD_MODIFIEDTIME),CCAD_BL_NO AS bl_no , COALESCE(CCAD_CONTAINER_NO,'') AS container_no , FN_GET_EQUIPMENT_TYPE_BY_ISO_CODE(CCAD_ISO_CODE) AS container_type , FN_GET_EQUIPMENT_SIZE_BY_ISO_CODE(CCAD_ISO_CODE) AS container_size , COALESCE(CCAD_PICKUP_DATE_FROM_PORT,'') AS dop , COALESCE(CCAD_PICKUP_DATE_FROM_CFS,'') AS dop_cfs , COALESCE(CCAD_DELIVARY_DATE_AT_FACTORY,'') AS delivery_date , COALESCE(CCAD_TIME,'') AS time , COALESCE(CCAD_DRIVER_NAME,'') AS driver_name , COALESCE(CCAD_DRIVER_MOBILE_NO,'') AS mob_number , COALESCE(CCAD_TRUCKER_NUMBER,'') AS truck_number , COALESCE(CCAD_PORT_OF_DISCHARGE,'') AS port_name , COALESCE(CCAD_PLACE_OF_DELIVARY,'') AS delivery_place , FN_GET_STAKEHOLDER_NAME_BY_ID(CBMD_CONSIGNEE_ID,'CON') AS conginee_name, COALESCE(CCAD_ARRIVED_DATE_UPDATED_BY_TRANSPORTER,'') AS arrival_date,COALESCE(CCAD_ARRIVED_TIME_UPDATED_BY_TRANSPORTER,'') AS arrival_time FROM consignee_container_available_details , consignee_blno_mapping_details  WHERE CCAD_BL_NO = CBMD_BL_NO AND CCAD_TRANSPORT_CO_NAME = '${req.body.username}' AND CCAD_TRANSPORTER_CONFIRM_FLAG IN('Y') AND 	CCAD_ARRIVED_DATE_UPDATED_BY_TRANSPORTER is not NULL AND DATEDIFF(CURRENT_DATE,CCAD_MODIFIEDTIME)<30  ORDER BY CCAD_BL_NO,port_name,delivery_place;`
con.query(sql, function(err, results) {
    if (err) throw err;
    let response=[];
    response.push(results);
    response.push(config.contact);
    //console.log(response);
    res.send(response);
  });
});
app.post("/history_shipper", function(req, res) {
  //const sql = `Select *,DATEDIFF(CURRENT_DATE(),dop) as diff from import_req where DATEDIFF(CURRENT_DATE(),dop)<30 and username='${req.body.username}' and accepted=1 and arrival_date <>'0000-00-00'`;
  //console.log(sql);
  const sql=`SELECT COALESCE(SCAD_DRIVER_NAME,'') AS driver_name , COALESCE(SCAD_DRIVER_MOBILE_NUMBER,'') AS mob_number , COALESCE(SCAD_TRUCKER_NUMBER,'') AS truck_number , COALESCE(SCAD_ACTUAL_ARRIVED_DATE_AT_FACTORY_UPDATED_BY_TRANSPORTER,'') AS arrival_date,COALESCE(SCAD_ACTUAL_ARRIVED_TIME_AT_FACTORY_UPDATED_BY_TRANSPORTER,'') AS arrival_time,COALESCE(SCAD_CONTAINER_NUMBER,'') AS container_no , FN_GET_EQUIPMENT_TYPE(SCAD_EQUIPMENT_TYPE_ID) AS container_type , FN_GET_EQUIPMENT_SIZE(SCAD_EQUIPMENT_SIZE_ID) AS container_size , COALESCE(SCAD_FIFO_REFERENCE_NUMBER,'') AS transaction_id , FN_GET_STAKEHOLDER_NAME_BY_ID(SCAD_BLOCKED_SHIPPER_ID,'SHP') AS shipper_name,FN_GET_STAKEHOLDER_MAIL_ID_BY_ID(SCAD_BLOCKED_SHIPPER_ID, 'SHP') AS shipper_mail,FN_GET_STAKEHOLDER_MOBILE_NUMBER_BY_ID(SCAD_BLOCKED_SHIPPER_ID, 'SHP') AS shipper_mobile, FN_GET_CLUSTER_NAME(SCAD_LOCATION_ID) AS cluster_name FROM shipper_container_available_details , shipper_container_booking_details WHERE SRD_REQUEST_REFERENCE_NO = SCAD_FIFO_REFERENCE_NUMBER AND SRD_SHIPPER_ID = SCAD_BLOCKED_SHIPPER_ID AND SCAD_TRANSPORTER_ID = '${req.body.username}'AND SCAD_ACTUAL_ARRIVED_DATE_AT_FACTORY_UPDATED_BY_TRANSPORTER is not NULL AND DATEDIFF(CURRENT_DATE,SCAD_MODIFIEDDATE)<30 ;`;
    con.query(sql, function(err, results) {
    if (err) throw err;
    let response=[];
    response.push(results);
    response.push(config.contact);
    //console.log(response);
    res.send(response);
  });
});
