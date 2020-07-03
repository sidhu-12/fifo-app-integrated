// EMR Server File

var express = require('express') ;
var mysql = require('mysql') ;
var bodyParser = require('body-parser') ;
var moment = require('moment');



var app = express() ;

app.use(bodyParser.json({type:'application/json'})) ;
app.use(bodyParser.urlencoded({extended:true})) ;

var con = mysql.createConnection({

    host : '107.180.78.61' ,
    user: 'mobileapp' ,                                                                                                                                                                   
    password: 'Mob@App@321' ,
    database : 'trail'
});

app.listen('4545',() => {
    console.log('Server started at port 4545');
})

con.connect(function(error){
    if(error) console.log(error)
    else console.log("connected") ;
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
