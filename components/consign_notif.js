import React, { Component } from "react";
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from "react-native-modals";
import {
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  Alert,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
export default class Consign_Notif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      op: [],
      key: -1,
      visible: false,
      load: true,
    };
    this.acceptForm = this.acceptForm.bind(this);
    //this.rejectForm=this.rejectForm.bind(this);
    this.changeState = this.changeState.bind(this);
    this.content;
  }
  acceptForm = (i) => {
    Alert.alert(
      "Update Driver Details ",
      "Please update the driver details for \n Container Number:" +
        this.state.op[i].container_no
    );
    this.props.navigation.navigate("Update Driver Details", {
      con_no: this.state.op[i].container_no,
      uname: this.props.route.params.uname,
      bl_no: this.state.op[i].bl_no,
    });
  };
  /*rejectForm=(i)=>{
    Alert.alert("Rejected");
    //this.props.navigation.navigate('Consign Notification',{uname:this.props.route.params.uname});
    var con={con_no:this.state.op[i].container_no};
    var xhr=new XMLHttpRequest;
    xhr.onreadystatechange=function()
    {
      //console.log(this.readyState);
      if(this.readyState==4&&this.status==200)
      {
        //console.log(this.responseText);
        console.log(this.responseText);
        if(this.responseText=='done')
        {
            navigate();
        }
        
      
      }
    }
    xhr.open("POST","http://192.168.0.103:3000/rej",true);
    xhr.setRequestHeader("Content-type","application/json");
    //console.log(name);
    xhr.send(JSON.stringify(con));
    const navigate=()=>{
        this.props.navigation.pop();
        this.props.navigation.push('Consign Notification',{uname:this.props.route.params.uname});
    }*/

  createList = () => {
    const { uname } = this.props.route.params;
    var name = { username: uname };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      //console.log(this.readyState);
      if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
        create(this);
      }
      if (this.readyState == 4 && this.status != 200) {
        Alert.alert("Network Error","Please check your network connection");
        console.log(this.responseText);
        stopLoading();
      }
    };
    xhr.open("POST", "https://fifo-app-server.herokuapp.com/req", true);
    xhr.setRequestHeader("Content-type", "application/json");
    //console.log(name);
    xhr.send(JSON.stringify(name));
    const stopLoading = () => { 
      this.setState({ load: false });
    };
    const create = (obj) => {
      this.setState({ op: JSON.parse(obj.responseText) });
      this.setState({ load: false });
    };
  };

  componentDidMount() {
    this.createList();
  }
  changeState = (i) => {
    try {
      let j = -2;
      var del_date='';
      var dop='';
      var dop_cfs='';
      //BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      this.setState({ visible: true });
      var date = new Date(this.state.op[i].delivery_date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
       del_date = dt + "-" + month + "-" + year;
       if(this.state.op[i].dop_cfs!="")
       {
      var date = new Date(this.state.op[i].dop_cfs);
      console.log(this.state.op[i].dop_cfs);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
       dop_cfs =dt + "-" + month + "-" + year;
       this.content = (
        <View key={j}>
          <Text style={{ fontSize: 20 }}>
            Consignee Name:{this.state.op[i].conginee_name}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Container No:{this.state.op[i].container_no}
          </Text>
          <Text style={{ fontSize: 20 }}>BL No:{this.state.op[i].bl_no}</Text>
          <Text style={{ fontSize: 20 }}>
            Container Type:{this.state.op[i].container_type}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Container Size:{this.state.op[i].container_size}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Date of Pickup from CFS:{dop_cfs}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Port Name:{this.state.op[i].port_name}
          </Text>
          <Text style={{ fontSize: 20 }}>Delivery Date:{del_date}</Text>
          <Text style={{ fontSize: 20 }}>
            Delivery Time:{this.state.op[i].time}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Delivery Place:{this.state.op[i].delivery_place}
          </Text>
        </View>
      );
    }else
    {
      var date1 = new Date(this.state.op[i].dop);
      var year1 = date1.getFullYear();
      var month1 = date1.getMonth() + 1;
      var dt1 = date1.getDate();

      if (dt1 < 10) {
        dt1 = "0" + dt1;
      }
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      dop =dt1 + "-" + month1 + "-" + year1;
      this.content = (
        <View key={j}>
          <Text style={{ fontSize: 20 }}>
            Consignee Name:{this.state.op[i].conginee_name}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Container No:{this.state.op[i].container_no}
          </Text>
          <Text style={{ fontSize: 20 }}>BL No:{this.state.op[i].bl_no}</Text>
          <Text style={{ fontSize: 20 }}>
            Container Type:{this.state.op[i].container_type}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Container Size:{this.state.op[i].container_size}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Date of Pickup from Port:{dop}
            </Text>
          <Text style={{ fontSize: 20 }}>
            Port Name:{this.state.op[i].port_name}
          </Text>
          <Text style={{ fontSize: 20 }}>Delivery Date:{del_date}</Text>
          <Text style={{ fontSize: 20 }}>
            Delivery Time:{this.state.op[i].time}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Delivery Place:{this.state.op[i].delivery_place}
          </Text>
        </View>
      );
    }
      //console.log(this.state.op[i].dop);
  
      j--;
    } catch (error) {
      throw error;
    }

    const onBackPress = () => {
      if (this.state.visible) {
        this.setState({ visible: false });
        return true;
      } else {
        return false;
      }
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
  };
  render() {
    var output = [];
    var dop='';
    for (let i = 0; i < this.state.op.length; i++) {
      if(this.state.op[i].dop!="")
      {
      var date1 = new Date(this.state.op[i].dop);
      var year1 = date1.getFullYear();
      var month1 = date1.getMonth() + 1;
      var dt1 = date1.getDate();
      //console.log(time);
      if (dt1 < 10) {
        dt1 = "0" + dt1;
      }
      if (month1 < 10) {
        month1 = "0" + month1;
      }
       dop =dt1 + "-" + month1 + "-" + year1;
      output.push(
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderColor: "#00c0e2",
            borderWidth: 3,
            borderRadius: 10,
            padding: 10,
            margin: 5,
          }}
          key={i}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={{ fontSize: 16 }}>
              {"BL No             :"} {this.state.op[i].bl_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container No :"} {this.state.op[i].container_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Type :"} {this.state.op[i].container_type}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Size  :"} {this.state.op[i].container_size}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Date of Pickup:"} {dop}
            </Text>
            <Text style={{ fontSize: 16 }}>
             from Port
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-evenly",
              marginLeft: "auto",
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
              margin: 5,
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => this.changeState(i)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                View Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => this.acceptForm(i)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            visible={this.state.visible}
            footer={
              <ModalFooter>
                <ModalButton
                  text="Close"
                  onPress={() => {
                    this.setState({ visible: false });
                  }}
                />
              </ModalFooter>
            }
          >
            <ModalContent>{this.content}</ModalContent>
          </Modal>
        </View>
      );
    }else{
      var date1 = new Date(this.state.op[i].dop_cfs);
      var year1 = date1.getFullYear();
      var month1 = date1.getMonth() + 1;
      var dt1 = date1.getDate();
      //console.log(time);
      if (dt1 < 10) {
        dt1 = "0" + dt1;
      }
      if (month1 < 10) {
        month1 = "0" + month1;
      }
       dop =dt1 + "-" + month1 + "-" + year1;
      output.push(
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderColor: "#00c0e2",
            borderWidth: 3,
            borderRadius: 10,
            padding: 10,
            margin: 5,
          }}
          key={i}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={{ fontSize: 16 }}>
              {"BL No             :"} {this.state.op[i].bl_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container No :"} {this.state.op[i].container_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Type :"} {this.state.op[i].container_type}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Size  :"} {this.state.op[i].container_size}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Date of Pickup:"} {dop}
            </Text>
            <Text style={{ fontSize: 16 }}>
             from CFS
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-evenly",
              marginLeft: "auto",
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
              margin: 5,
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => this.changeState(i)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                View Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => this.acceptForm(i)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            visible={this.state.visible}
            footer={
              <ModalFooter>
                <ModalButton
                  text="Close"
                  onPress={() => {
                    this.setState({ visible: false });
                  }}
                />
              </ModalFooter>
            }
          > 
            <ModalContent>{this.content}</ModalContent>
          </Modal>
        </View>
      );
    }
  }
    if (this.state.op.length == 0) {
      output.push(
        <View key={-1}>
          <Text>No Request Available</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{ resizeMode: "stretch" }}
            source={require("./fifo.png")}
          />
          <View>
            <Text style={{ fontSize: 15 }}>
              Driven by <Text style={{ color: "#00c0e2" }}>Technology</Text> ,
              Defined By <Text style={{ color: "#00c0e2" }}>Humanity</Text>
            </Text>
          </View>
        </View>
        <ScrollView
          style={{ marginTop: 10 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {output}
          <ActivityIndicator
            size="large"
            color="skyblue"
            animating={this.state.load}
            hidesWhenStopped={true}
            style={{ alignSelf: "center" }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btn1: {
    backgroundColor: "#00c0e2",
    borderRadius: 25,
    width: 90,
    height: 38,
    justifyContent: "center",
  },
  btn2: {
    backgroundColor: "#00c0e2",
    borderRadius: 25,
    width: 90,
    height: 38,
    justifyContent: "center",
  },
});
