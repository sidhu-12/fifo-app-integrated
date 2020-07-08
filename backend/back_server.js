
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
var moment = require('moment');
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
// get list of unassigned containers for user with particular username
app.get("/auth/unassigned_containers/:emr_username", function(req, res) {  
  // console.log(req.params.emr_username)
  const sql = `call SP_GET_EMR_AVAILABLE_TASK_DETAILS('${req.params.emr_username}')`;
  con.query(sql, function(err, results) {
      if (err) throw err;
      else {
          console.log(results)  
          res.send(results);
      }
    });
  });


// get list of assigned containers for user with particular userID

app.get("/auth/assigned_containers/:emr_Id", function(req, res) {  
  const sql = `call SP_GET_EMR_AVAILABLE_TASK_DETAILS_UPDATED(${req.params.emr_Id})`;
  con.query(sql, function(err, results) {
      if (err) throw err;
      else {
          console.log(results)  
          res.send(results);
      }
    });
  });


// get list of history containers for user with particular userID

app.get("/auth/history_containers/:emr_Id", function(req, res) {  
  const sql = `call SP_GET_EMR_AVAILABLE_TASK_DETAILS_UPDATED_HISTORY(${req.params.emr_Id})`;
  con.query(sql, function(err, results) {
      if (err) throw err;
      else {
          console.log(results)  
          res.send(results);
      }
    });
  });

// update the current container in my containers

app.post("/transfer_to_my_container", function(req, res) {
  
  const sql= `UPDATE consignee_container_available_details SET CCAD_EMR_MASTER_ID = ${req.body.emr_Id}, 
              CCAD_EMR_EXPECTED_DELIVERY_DATE = "${moment(req.body.EXPECTED_DELIVARY_DATE).format('YYYY-MM-DD')}" , 
              CCAD_EMR_EXPECTED_DELIVARY_TIME = '${req.body.EXPECTED_DELIVARY_TIME}' , 
              CCAD_EMR_CONTAINER_ASSIGNED_DATE = CURRENT_DATE , 
              CCAD_EMR_CONTAINER_ASSIGNED_TIME = CURRENT_TIME WHERE CCAD_BL_NO = '${req.body.BILL_NUMBER}' 
              AND CCAD_CONTAINER_NO = '${req.body.CONTAINER_NO}' `;
  console.log(sql)
  con.query(sql,function(err, results) {
      if (err) throw err;
      res.send("done");
      });
  })

  
  // update the container details within Update Screen

  app.post("/update_container_details", function(req, res) {
      // console.log(req)
      const sql = `UPDATE consignee_container_available_details SET  
                   CCAD_EMR_SERVICES_ID = ${req.body.service_Id} , 
                   CCAD_EMR_EXPECTED_DELIVERY_DATE = '${req.body.date}' , 
                   CCAD_EMR_EXPECTED_DELIVARY_TIME = '${req.body.time}' , 
                   CCAD_EMR_SWEEP_FLAG = '${req.body.sweep_flag}' , 
                   CCAD_EMR_WASHING_FLAG = '${req.body.washing_flag}' , 
                   CCAD_EMR_CLEANING_FLAG = '${req.body.cleaning_flag}' 
                   WHERE CCAD_BL_NO = '${req.body.bill_no}' 
                   AND CCAD_CONTAINER_NO = '${req.body.container_no}' `;
      console.log(sql)
      con.query(sql,function(err, results) {
          if (err) throw err;
          res.send("done");
          });
      })

  // Drop-Down list of Shipping Line in Yard Inventory
  //ESL_EMR_MASTER_ID=5 (EMR_Id)
  app.get("/drop-down_shipping_line/:emr_Id", function(req, res) {  
      const sql = `SELECT SLM_ID AS ID , SLM_SHIPPING_NAME AS SHIPPING_LINE_NAME 
                   FROM shipping_line_master , emr_shipping_line_assignment 
                   WHERE SLM_MASTER_CODE = ESL_SHIPPING_LINE_MASTERCODE 
                   AND ESL_EMR_MASTER_ID = ${req.params.emr_Id}`;
      con.query(sql, function(err, results) {
          if (err) throw err;
          else {
              console.log(results)  
              res.send(results);
          }
          });
      });
  
  // Drop-Down list of Location in Yard Inventory
      // Real query
          // SELECT CM_ID AS ID,CM_CITY_CODE AS CODE,
          // CM_CITY_NAME AS NAME , FN_GET_STATE_NAME(CM_STATE_ID) AS STATE_NAME 
          // FROM city_master order by CM_CITY_NAME
      //To access EMR_Master_Id use --> req.params.emr_Id  
  app.get("/drop-down_location_list/:emr_Id", function(req, res) {  
      const sql = `SELECT CM_ID AS ID, CM_CITY_NAME AS NAME
                   FROM city_master order by CM_CITY_NAME`;
      con.query(sql, function(err, results) {
          if (err) throw err;
          else {
              console.log(results)  
              res.send(results);
          }
          });
      });

  // Drop-Down list of Equipment Type in Yard Inventory
      //To access EMR_Master_Id use --> req.params.emr_Id 
  app.get("/drop-down_equipment_type_list/:emr_Id", function(req, res) {  
      const sql = `SELECT LOK_ID AS ID,LOK_VALUE AS EQUIPMENT_TYPE 
                   FROM lookup_master WHERE LOK_MODULE='ADMINISTRATION' 
                   AND LOK_TYPE='EQUIPMENT TYPE' 
                   AND LOK_VALUE_STATUS='A' AND LOK_STATUS='A'`;
      con.query(sql, function(err, results) {
          if (err) throw err;
          else {
              console.log(results)  
              res.send(results);
          }
          });
      });
  
  // Drop-Down list of Equipment Size in Yard Inventory
      //To access EMR_Master_Id use --> req.params.emr_Id 
  app.get("/drop-down_equipment_size_list/:emr_Id", function(req, res) {  
      const sql = `SELECT LOK_ID AS ID,LOK_VALUE AS EQUIPMENT_SIZE 
                   FROM lookup_master WHERE LOK_MODULE='ADMINISTRATION' 
                   AND LOK_TYPE='EQUIPMENT SIZE'`;
      con.query(sql, function(err, results) {
          if (err) throw err;
          else {
              console.log(results)  
              res.send(results);
          }
          });
      });
  
  
  // get list of Yard Inventory containers 
      app.get("/yard_inventory_list/:emr_Id", function(req, res) {  
      const sql = `SELECT FN_GET_STAKEHOLDER_NAME_BY_ID(ETSD_EMR_ID,'EMR') AS EMR_NAME , 
                   FN_GET_SHIPPING_LINE_NAME(ETSD_SHIPPING_LINE_ID) AS SHIPPING_LINE_NAME , 
                   FN_GET_CITY_NAME(ETSD_LOCATION_ID) AS LOCATION_NAME , 
                   FN_GET_EQUIPMENT_TYPE(ETSD_EQUIPMENT_TYPE_ID) AS EQUIPMENT_TYPE , 
                   FN_GET_EQUIPMENT_SIZE(ETSD_EQUIPMENT_SIZE_ID) AS EQUIPMENT_SIZE , 
                   COALESCE(ETSD_TOTAL_CNTR_DELIVERED_TO_YARD,0) AS TOTAL_CONTAINER_DELIVERED_TO_YARD , 
                   COALESCE(ETSD_TOTAL_CNTR_UNDER_REPAIR,0) AS CONTAINERS_UNDER_REPAIR , 
                   COALESCE(ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_DATE,'') AS DAY1_DATE , 
                   COALESCE(ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP,0) AS DAY1_CONTAINER_NOS , 
                   COALESCE(ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_2DAY_DATE,'') AS DAY2_DATE , 
                   COALESCE(ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_2DAY,0) AS DAY2_CONTAINER_NOS , 
                   COALESCE(ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_3DAY_DATE,'') AS DAY3_DATE , 
                   COALESCE(ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_3DAY,0) AS DAY3_CONTAINER_NOS , 
                   DATE(ETSD_MODIFIEDTIME) AS LAST_MODIFIED_DATE , 
                   TIME(ETSD_MODIFIEDTIME) AS LAST_MODIFIED_TIME 
                   FROM emr_transaction_summary_details WHERE ETSD_EMR_ID = ${req.params.emr_Id} 
                   AND ETSD_STATUS = 'A'`;
      con.query(sql, function(err, results) {
          if (err) throw err;
          else {
              console.log(results)  
              res.send(results);
          }
          });
      });

  // to check the yard inventory container if present in database with already entered EMR_ID,
  //  SHIPPING_ID, LOCATION_ID, EQUIP_TYPE_ID, EQUIP_SIZE_ID
  app.post("/check_entry_in_yard_inventory_list", function(req, res) {  
      // console.log(req.body)
      shipping_line=parseInt(req.body.selected_shipping_line,10)
      location=parseInt(req.body.selected_location,10)
      equipment_type=parseInt(req.body.selected_equip_type,10)
      equipment_size=parseInt(req.body.selected_equip_size,10)
      emr_Id = parseInt(req.body.emr_Id,10)
      const sql = `select count(*) 'count' from emr_transaction_summary_details
                   where ETSD_EMR_ID = ${emr_Id} 
                   and ETSD_SHIPPING_LINE_ID =${shipping_line} 
                   and ETSD_LOCATION_ID = ${location}
                   and ETSD_EQUIPMENT_TYPE_ID =${equipment_type} 
                   and ETSD_EQUIPMENT_SIZE_ID =${equipment_size} `;
      con.query(sql, function(err, results) {
          if (err) throw err;
          else {
              console.log(results)  
              res.send(results);
          }
          });
      });
  
  // insert the Yard Inventory Details
          //ETSD_MODIFIEDBY=null (always)
  app.post("/insert_yard_inventory", function(req, res) {
      // console.log(req.body)
      yard_container_no=parseInt(req.body.yard_container_no,10)
      repair_container_no=parseInt(req.body.repair_container_no,10)
      unit_current_date=parseInt(req.body.unit_current_date,10)
      unit_current_date_1=parseInt(req.body.unit_current_date_1,10)
      unit_current_date_2=parseInt(req.body.unit_current_date_2,10)
      shipping_line=parseInt(req.body.selected_shipping_line,10)
      location=parseInt(req.body.selected_location,10)
      equipment_type=parseInt(req.body.selected_equip_type,10)
      equipment_size=parseInt(req.body.selected_equip_size,10)
      emr_Id = parseInt(req.body.emr_Id,10)
      const sql = `INSERT INTO emr_transaction_summary_details 
                   (ETSD_SHIPPING_LINE_ID, ETSD_LOCATION_ID, ETSD_EQUIPMENT_TYPE_ID, ETSD_EQUIPMENT_SIZE_ID, 
                   ETSD_PICKUPDATE, ETSD_PICKUPTIME,
                   ETSD_TOTAL_CNTR_DELIVERED_TO_YARD, ETSD_EMR_ID, 
                   ETSD_CREATEDBY, ETSD_CREATEDDATE, ETSD_CREATEDTIME,
                   ETSD_TOTAL_CNTR_UNDER_REPAIR,  
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_DATE, ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP,
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_2DAY_DATE, ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_2DAY,
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_3DAY_DATE, ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_3DAY) 
                   VALUES(${shipping_line}, ${location}, ${equipment_type}, ${equipment_size},
                      '${req.body.date}', '${req.body.time}', 
                      ${yard_container_no}, ${emr_Id}, 
                      ${emr_Id}, CURRENT_DATE, CURRENT_TIME, 
                      ${repair_container_no},
                      '${moment(req.body.current_date).format('YYYY-MM-DD')}', ${unit_current_date},
                      '${moment(req.body.current_date_1).format('YYYY-MM-DD')}', ${unit_current_date_1},
                      '${moment(req.body.current_date_2).format('YYYY-MM-DD')}', ${unit_current_date_2}) `;
      console.log(sql)
      con.query(sql,function(err, results) {
          if (err) throw err;
          res.send("done");
          });
      })

      // Update the Yard Inventory Details
          //ETSD_MODIFIEDBY=null (always)
  app.post("/update_yard_inventory", function(req, res) {
      // console.log(req.body)
      //ETSD_MODIFIEDBY = ? 
      yard_container_no=parseInt(req.body.yard_container_no,10)
      repair_container_no=parseInt(req.body.repair_container_no,10)
      unit_current_date=parseInt(req.body.unit_current_date,10)
      unit_current_date_1=parseInt(req.body.unit_current_date_1,10)
      unit_current_date_2=parseInt(req.body.unit_current_date_2,10)
      shipping_line=parseInt(req.body.selected_shipping_line,10)
      location=parseInt(req.body.selected_location,10)
      equipment_type=parseInt(req.body.selected_equip_type,10)
      equipment_size=parseInt(req.body.selected_equip_size,10)
      emr_Id = parseInt(req.body.emr_Id,10)
      const sql = `UPDATE emr_transaction_summary_details SET 
                   ETSD_PICKUPDATE = '${req.body.date}' , ETSD_PICKUPTIME = '${req.body.time}' , 
                   ETSD_TOTAL_CNTR_DELIVERED_TO_YARD = ${yard_container_no} , 
                   ETSD_TOTAL_CNTR_UNDER_REPAIR = ${repair_container_no},
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_DATE = '${moment(req.body.current_date).format('YYYY-MM-DD')}' , 
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP = ${unit_current_date} , 
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_2DAY_DATE = '${moment(req.body.current_date_1).format('YYYY-MM-DD')}', 
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_2DAY = ${unit_current_date_1} , 
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_3DAY_DATE = '${moment(req.body.current_date_2).format('YYYY-MM-DD')}' , 
                   ETSD_TOTAL_CNTR_AVAILABLE_FOR_PICKUP_3DAY = ${unit_current_date_2} , 
                   ETSD_MODIFIEDTIME = CURRENT_TIMESTAMP  
                   WHERE ETSD_EMR_ID = ${emr_Id} 
                   AND ETSD_SHIPPING_LINE_ID = ${shipping_line} 
                   AND ETSD_LOCATION_ID = ${location}  
                   AND ETSD_EQUIPMENT_TYPE_ID = ${equipment_type} 
                   AND ETSD_EQUIPMENT_SIZE_ID = ${equipment_size} `;
      console.log(sql)
      con.query(sql,function(err, results) {
          if (err) throw err;
          res.send("done");
          });
      })

