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
  
  BackHandler,
} from "react-native";
import call from "react-native-phone-call";
export default class Confirmed_Req extends Component {
  constructor(props) {
    super(props);
    this.state = {
      op: [],
      visible: false,
      load: true,
    };
    this.acceptForm = this.acceptForm.bind(this);
  }
  acceptForm = (i) => {
    Alert.alert(
      "Update arrival date and time",
      "Please update the arrival date and time for \ncontainer number: " +
        this.state.op[i].container_no
    );
    this.props.navigation.navigate("Update Shipper Arrival", {
      con_no: this.state.op[i].container_no,
      uname: this.props.route.params.uname,
      trans_id: this.state.op[i].transaction_id,
      shipper_name: this.state.op[i].shipper_name,
      shipper_mail: this.state.op[i].shipper_mail,
      shipper_mobile: this.state.op[i].shipper_mail,
      driver_name: this.state.op[i].driver_name,
      mob_number: this.state.op[i].mob_number,
    });
  };

  createList = () => {
    const { uname } = this.props.route.params;
    var name = { username: uname };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      console.log(this.readyState);
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
      "https://fifo-app-server.herokuapp.com/shipper_conf",
      true
    );
    xhr.setRequestHeader("Content-type", "application/json");
    //console.log(name);
    xhr.send(JSON.stringify(name));
    const stopLoading = () => {
      this.setState({ load: false });
    };
    const create = (obj) => {
      this.setState({ op: JSON.parse(obj.responseText) });
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
  callDriver = () => {
    const args = {
      number: this.mob_no,
      prompt: true,
    };

    call(args).catch(console.error);
  };

  render() {
    var output = [];
    for (let i = 0; i < this.state.op.length; i++) {
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
              {"Container No : "}
              {this.state.op[i].container_no}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Type : "}
              {this.state.op[i].container_type}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Container Size : "}
              {this.state.op[i].container_size}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Shipper Name : "}
              {this.state.op[i].shipper_name}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {"Cluster Name : "}
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
                Select
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            visible={this.state.visible}
            onRequestClose={() => {
              this.setState({ visible: false });
            }}
            footer={
              <ModalFooter>
                <ModalButton
                  text="Close"
                  onPress={() => {
                    this.setState({ visible: false });
                  }}
                />
                <ModalButton text="Call" onPress={() => this.callDriver()} />
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
          <Text>No Shipper Request Available</Text>
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
