import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

class Arrived extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      actualDate: "",
      actualTime: "",
      show: false,
      mode: "date",
      display: "default",
      load: false,
    };
    this.actualDate = "";
    this.actualTime = "";
    // this.onChange=this.onChange.bind(this);
  }

  onChange = async (event, selectedDate) => {
    this.setState({ show: false });
    if (selectedDate != undefined && this.state.mode == "date") {
      console.log(selectedDate);
      this.setState({ chosenDate: selectedDate });
      var date = new Date(this.state.chosenDate);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      var del_date = dt + "-" + month + "-" + year;
      this.actualDate = year + "-" + month + "-" + dt;
      this.setState({ actualDate: del_date });
      console.log(del_date);
    } else if (selectedDate != undefined && this.state.mode == "time") {
      this.setState({ chosenDate: selectedDate });
      const addZero = (i) => {
        {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
      };
      var date1 = new Date(this.state.chosenDate);
      var hrs1 = addZero(date1.getHours());
      var mins1 = addZero(date1.getMinutes());
      var dop = hrs1 + ":" + mins1;
      this.actualTime = dop + ":00";
      this.setState({ actualTime: dop });
      console.log(dop);
    }
    //this.setState({show:false});
  };
  onChangeIOS = (selectedDate) => {
    this.setState({ show: false });
    if (selectedDate != undefined && this.state.mode == "date") {
      this.setState({ chosenDate: selectedDate });

      var date = new Date(this.state.chosenDate);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      var del_date = dt + "-" + month + "-" + year;
      this.actualDate = year + "-" + month + "-" + dt;
      this.setState({ actualDate: del_date });
      console.log(del_date);
    } else if (selectedDate != undefined && this.state.mode == "time") {
      this.setState({ chosenDate: selectedDate });
      const addZero = (i) => {
        {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
      };
      var date1 = new Date(this.state.chosenDate);
      var hrs1 = addZero(date1.getHours());
      var mins1 = addZero(date1.getMinutes());
      var dop = hrs1 + ":" + mins1;
      this.actualTime = dop + ":00";
      this.setState({ actualTime: dop });
      console.log(dop);
    }
    //this.setState({show:false});
  };
  updateTime = () => {
    if (this.actualDate == "" || this.actualTime == "") {
      Alert.alert("Please enter the time or date");
      this.setState({ load: false });
    } else {
      this.setState({ load: true });
      var con = {
        username: this.props.route.params.uname,
        con_no: this.props.route.params.con_no,
        actualDate: this.actualDate,
        actualTime: this.actualTime,
        bl_no: this.props.route.params.bl_no,
        consignee_name: this.props.route.params.consignee_name,
        consignee_mail: this.props.route.params.consignee_mail,
        consignee_mobile: this.props.route.params.consignee_mobile,
        driver_name: this.props.route.params.driver_name,
        mob_number: this.props.route.params.mob_number,
      };
      console.log(con);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          if (this.responseText == "done") {
            navigate();
          }
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
          stopLoading();
        }
      };
      xhr.open(
        "POST",
        "https://fifo-app-server.herokuapp.com/date_consignee",
        true
      );
      //xhr.open("POST","http://192.168.0.101/date_consignee",true);

      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(con));
      const stopLoading = () => {
        this.setState({ load: false });
      };
      const navigate = () => {
        this.setState({ load: false });
        Alert.alert("Successfully updated");
        this.props.navigation.pop();
        this.props.navigation.pop();
        //this.props.navigation.navigate("",{uname:this.props.route.params.uname});
      };
    }
  };
  showMode = (currentMode) => {
    this.setState({ show: true });
    this.setState({ mode: currentMode });
  };
  showDatepicker = () => {
    this.showMode("date");
    this.setState({ display: "default" });
  };
  showDateTimePicker = () => {
    this.showMode("datetime");
    this.setState({ display: "default" });
  };
  showTimepicker = () => {
    this.showMode("time");
    this.setState({ display: "default" });
  };
  render() {
    var minDate = new Date();
    minDate.setDate(minDate.getDate() - 2);
    if (Platform.OS == "ios") {
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
          <View style={styles.container1}>
          <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Container No : {this.props.route.params.con_no}
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Consignee Name : {this.props.route.params.consignee_name}
            </Text>
            <View style={styles.blueBox}>
              <TouchableOpacity
                onPress={this.showDatepicker}
                style={styles.btn}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Set Arrival Date
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 30,
                  color: "rgba(39, 59, 145,1)",
                }}
              >
                {this.state.actualDate}
              </Text>
            </View>
            <View style={styles.blueBox}>
              <TouchableOpacity
                onPress={this.showTimepicker}
                style={styles.btn}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Set Arrival Time
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 30,
                  color: "rgba(39, 59, 145,1)",
                }}
              >
                {this.state.actualTime}
              </Text>
            </View>
            <DateTimePickerModal
              isVisible={this.state.show}
              locale="en_GB"
              cancelTextIOS="Exit"
              //date={new Date()}
              mode={this.state.mode}
              onCancel={() => {
                this.setState({ show: false });
              }}
              onConfirm={(date) =>
                setTimeout(() => {
                  this.onChangeIOS(date);
                }, 250)
              }
              minuteInterval="15"
              minimumDate={minDate}
              maximumDate={new Date()}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={this.updateTime}
              style={{
                width: 150,
                borderRadius: 40,
                backgroundColor: "#00c0e2",
                height: 45,
                justifyContent: "center",
                bottom: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Update
              </Text>
            </TouchableOpacity>
            <ActivityIndicator
              size="large"
              color="skyblue"
              animating={this.state.load}
              hidesWhenStopped={true}
            />
          </View>
        </View>
      );
    } else {
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
          <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Container No : {this.props.route.params.con_no}
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Consignee Name : {this.props.route.params.consignee_name}
            </Text>
          <View style={styles.container1}>
            <View style={styles.blueBox}>
              <TouchableOpacity
                onPress={this.showDatepicker}
                style={styles.btn}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Set Arrival Date
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 30,
                  color: "rgba(39, 59, 145,1)",
                }}
              >
                {this.state.actualDate}
              </Text>
            </View>
            <View style={styles.blueBox}>
              <TouchableOpacity
                onPress={this.showTimepicker}
                style={styles.btn}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Set Arrival Time
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 30,
                  color: "rgba(39, 59, 145,1)",
                }}
              >
                {this.state.actualTime}
              </Text>

              {this.state.show && (
                <DateTimePicker
                  timeZoneOffsetInMinutes={0}
                  value={new Date()}
                  maximumDate={new Date()}
                  minimumDate={minDate}
                  mode={this.state.mode}
                  is24Hour={true}
                  display={this.state.display}
                  onChange={this.onChange}
                  neutralButtonLabel="ok"
                />
              )}
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={this.updateTime}
              style={{
                width: 150,
                borderRadius: 40,
                backgroundColor: "#00c0e2",
                height: 45,
                justifyContent: "center",
                bottom: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Update
              </Text>
            </TouchableOpacity>
            <ActivityIndicator
              size="large"
              color="skyblue"
              animating={this.state.load}
              hidesWhenStopped={true}
            />
          </View>
        </View>
      );
    }
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
  container1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 25,
    marginTop: 5,
    padding: 10,
    marginBottom: 50,
    margin: 5,
  },
  btn: {
    width: 200,
    borderRadius: 40,
    backgroundColor: "#00c0e2",
    height: 45,
    justifyContent: "center",
  },
  blueBox: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#00c0e2", 
  },
  blueBox1: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: "skyblue",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});
export default Arrived;
