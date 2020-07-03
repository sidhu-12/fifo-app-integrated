import React, { Component } from "react";
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from "react-native-modals";
import {
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
  ActivityIndicator,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
var uname, prop1;
class History_Consignee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      op: [],
      key: -1,
      visible: false,
      div: [],
      text: [],
      load: true,
    };
    this.changeState = this.changeState.bind(this);
    this.content;
  }
  createList = () => {
    const onBackPress = () => {
      prop1.navigation.pop();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
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
        stopLoading();
      }
    };
    xhr.open("POST", "https://fifo-app-server.herokuapp.com/history", true);
    xhr.setRequestHeader("Content-type", "application/json");
    //console.log(name);
    xhr.send(JSON.stringify(name));
    const stopLoading = () => {
      this.setState({ load: false });
    };
    const create = (obj) => {
      this.setState({ op: JSON.parse(obj.responseText)[0] });
      this.setState({ text: JSON.parse(obj.responseText)[1] });
      this.setState({ load: false });
      //console.log(this.state.op);
    };
  };

  componentDidMount() {
    this.createList();
  }
  changeState = (i) => {
    var j = -2;
    //this.setState({visible:true});
    var del_date='';
    var dop='';
    var dop_cfs='';
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
     var date1 = new Date(this.state.op[i].arrival_date);
     var year1 = date1.getFullYear();
     var month1 = date1.getMonth() + 1;
     var dt1 = date1.getDate();
 
     if (dt1 < 10) {
       dt1 = "0" + dt1;
     }
     if (month1 < 10) {
       month1 = "0" + month1;
     }
     var arrival_date = dt1 + "-" + month1 + "-" + year1;
     if(this.state.op[i].dop_cfs!="")
     {
    var date = new Date(this.state.op[i].dop_cfs);
    //console.log(this.state.op[i].dop_cfs);
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
        <Text style={{ fontSize: 20 }}>Date of Pickup from CFS:{dop_cfs}</Text>
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
        <Text style={{ fontSize: 20 }}>
          Driver Name:{this.state.op[i].driver_name}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Mobile Number:{this.state.op[i].mob_number}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Truck Number:{this.state.op[i].truck_number}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Arrival Date at Factory:{arrival_date}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Arrival Time at Factory:{this.state.op[i].arrival_time}
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
        <Text style={{ fontSize: 20 }}>Date of Pickup from Port:{dop}</Text>
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
        <Text style={{ fontSize: 20 }}>
          Driver Name:{this.state.op[i].driver_name}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Mobile Number:{this.state.op[i].mob_number}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Truck Number:{this.state.op[i].truck_number}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Arrival Date at Factory:{arrival_date}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Arrival Time at Factory:{this.state.op[i].arrival_time}
        </Text>
      </View>
    );
    
  }

  

   
    j--;
    this.setState({ visible: true });
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
    var output = [],
      contentText = [];
    contentText.push(
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
          {this.state.text.header}
        </Text>
      </View>
    );
    contentText.push(
      <View>
        <Text style={{ fontSize: 15, textAlign: "right" }}>
          {this.state.text.footer}
        </Text>
      </View>
    );
    for (let i = 0; i < this.state.op.length; i++) {
      if(this.state.op[i].dop!="")
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
      var dop = +dt1 + "-" + month1 + "-" + year1;
      //console.log(this.state.op[i].delivery_date);
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
              {"Container No : "}
              {this.state.op[i].container_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Type : "}
              {this.state.op[i].container_type}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Size  : "}
              {this.state.op[i].container_size}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Date of Pickup: "}
              {dop}
            </Text>
            <Text style={{ fontSize: 16 }}>
             from Port
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
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
    }else
    { var date1 = new Date(this.state.op[i].dop_cfs);
      var year1 = date1.getFullYear();
      var month1 = date1.getMonth() + 1;
      var dt1 = date1.getDate();

      if (dt1 < 10) {
        dt1 = "0" + dt1;
      }
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      var dop = +dt1 + "-" + month1 + "-" + year1;
      //console.log(this.state.op[i].delivery_date);
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
              {"Container No : "}
              {this.state.op[i].container_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Type : "}
              {this.state.op[i].container_type}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Size  : "}
              {this.state.op[i].container_size}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Date of Pickup: "}
              {dop}
            </Text>
            <Text style={{ fontSize: 16 }}>
             from CFS
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
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
          <Text>No History Available</Text>
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
        <View>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            {this.state.text.header}
          </Text>
        </View>
        <ScrollView
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

        <View>
          <Text style={{ textAlign: "right", fontSize: 16 }}>
            {this.state.text.footer}
          </Text>
        </View>
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
    backgroundColor: "rgba(39, 59, 145,1)",
    borderRadius: 25,
    width: 100,
    height: 38,
    justifyContent: "center",
  },
});

class History_Shipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      op: [],
      key: -1,
      visible: false,
      div: [],
      text: [],
      load: true,
    };
    this.changeState = this.changeState.bind(this);
    this.content;
  }
  createList = () => {
    const onBackPress = () => {
      prop1.navigation.pop();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
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
        stopLoading();
      }
    };
    xhr.open(
      "POST",
      "https://fifo-app-server.herokuapp.com/history_shipper",
      true
    );
    xhr.setRequestHeader("Content-type", "application/json");
    //console.log(name);
    xhr.send(JSON.stringify(name));
    const stopLoading = () => {
      this.setState({ load: false });
    };
    const create = (obj) => {
      this.setState({ op: JSON.parse(obj.responseText)[0] });
      this.setState({ text: JSON.parse(obj.responseText)[1] });
      this.setState({ load: false });
      //console.log(this.state.op);
    };
  };

  componentDidMount() {
    this.createList();
  }
  changeState = (i) => {
    var j = -2;
    //this.setState({visible:true};

    var date1 = new Date(this.state.op[i].arrival_date);
    var year1 = date1.getFullYear();
    var month1 = date1.getMonth() + 1;
    var dt1 = date1.getDate();

    if (dt1 < 10) {
      dt1 = "0" + dt1;
    }
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    var arrival_date = dt1 + "-" + month1 + "-" + year1;

    // console.log(this.state.driv);
    this.mob_no = this.state.op[i].mob_number;
    this.content = (
      <View key={j}>
        <Text style={{ fontSize: 20 }}>
          Shipper Name:{this.state.op[i].shipper_name}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Container No:{this.state.op[i].container_no}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Container Type:{this.state.op[i].container_type}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Cluster Name:{this.state.op[i].cluster_name}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Transaction Id:{this.state.op[i].transaction_id}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Driver Name:{this.state.op[i].driver_name}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Mobile Number:{this.state.op[i].mob_number}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Truck Number:{this.state.op[i].truck_number}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Arrival Date at Factory:{arrival_date}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Arrival Time at Factory:{this.state.op[i].arrival_time}
        </Text>
      </View>
    );
    j--;
    this.setState({ visible: true });
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
    var output = [],
      contentText = [];
    contentText.push(
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
          {this.state.text.header}
        </Text>
      </View>
    );
    contentText.push(
      <View>
        <Text style={{ fontSize: 15, textAlign: "right" }}>
          {this.state.text.footer}
        </Text>
      </View>
    );
    for (let i = 0; i < this.state.op.length; i++) {
      //console.log(this.state.op[i].delivery_date);
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
              {"Container No    : "}
              {this.state.op[i].container_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Type : "}
              {this.state.op[i].container_type}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Size  : "}
              {this.state.op[i].container_size}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Shipper Name   : "}
              {this.state.op[i].shipper_name}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Cluster Name    : "}
              {this.state.op[i].cluster_name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
              marginLeft: "auto",
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
              margin: 5,
              marginRight: 5,
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
    if (this.state.op.length == 0) {
      output.push(
        <View key={-1}>
          <Text>No History Available</Text>
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
        <View>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            {this.state.text.header}
          </Text>
        </View>
        <ScrollView
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

        <View>
          <Text style={{ textAlign: "right", fontSize: 16 }}>
            {this.state.text.footer}
          </Text>
        </View>
      </View>
    );
  }
}

/*const styles = StyleSheet.create({
         container: {
           flex: 1,
           backgroundColor: "white",
           flexDirection: "column",
           padding: 5,
         },
         imageContainer: {
           flexDirection: "row",
           justifyContent: "space-evenly",
           alignItems: "center",
           padding: 5,
         },
         btn1: {
           backgroundColor: "rgba(237, 31, 36,0.95)",
           borderRadius: 25,
           width: 100,
           height: 38,
           justifyContent: "center",
         },
         btn2: {
           backgroundColor: "rgba(39, 59, 145,1)",
           borderRadius: 25,
           width: 100,
           height: 38,
           justifyContent: "center",
         },
       });*/

const Tab = createBottomTabNavigator();
export default function History(props) {
  uname = props.route.params.uname;
  prop1 = props;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "black",
        activeBackgroundColor: "#00c0e2",
        inactiveBackgroundColor: "lightgray",
        tabStyle: {
          borderLeftWidth: 3,
          borderLeftColor: "white",
          borderRightWidth: 3,
          borderRightColor: "white",
          borderTopWidth: 3,
          borderTopColor: "white",
          borderBottomWidth: 3,
          borderBottomColor: "white",
          borderRadius: 10,
        },
        labelStyle: {
          fontSize: 20,
          fontWeight: "100",
          marginBottom: 8,
        },
      }}
    >
      <Tab.Screen name="Consignee" component={History_Consignee} />
      <Tab.Screen name="Shipper" component={History_Shipper} />
    </Tab.Navigator>
  );
}
