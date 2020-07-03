import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  Platform,
  Picker,
  Alert,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  Image,
  ActivityIndicator,
} from "react-native";

export default class Driver_Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mob_no: "",
      truck_no: "",
      round_trip: "Y",
      container_no: this.props.route.params.con_no,
      bl_no: this.props.route.params.bl_no,
      username: this.props.route.params.uname,
      load: false,
    };
  }
  submitForm = () => {
    var name_pattern = /[a-zA-Z .]+/;
    var num_pattern = /^[0-9]{10}$/;
    var truck_pattern = /^[A-Z]{2}[0-9]{2}([A-Z])?([A-Z])?[0-9]{4}$/;

    if (!name_pattern.test(this.state.name)) {
      Alert.alert("Please Fill the appropriate Name");
      this.setState({ load: false });
    } else if (
      this.state.mob_no == "" ||
      !num_pattern.test(this.state.mob_no)
    ) {
      Alert.alert("Please Fill the Correct Mobile Number");
      this.setState({ load: false });
    } else if (
      this.state.truck_no == "" ||
      !truck_pattern.test(this.state.truck_no)
    ) {
      Alert.alert("Please Fill the Correct Truck Number");
      this.setState({ load: false });
    } else {
      //Alert.alert("Successfully done");
      //this.props.navigation.navigate('Dashboard');
      this.setState({ load: true });
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        //console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
          //console.log(this.responseText);
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
        "https://fifo-app-server.herokuapp.com/driver_details",
        true
      );
      xhr.setRequestHeader("Content-type", "application/json");
      //console.log(name);
      xhr.send(JSON.stringify(this.state));
      const stopLoading = () => {
        this.setState({ load: false });
      };
      const navigate = () => {
        this.setState({ load: false });
        Alert.alert("Successfully done");
        this.props.navigation.pop();
        this.props.navigation.pop();
        this.props.navigation.navigate("Consignee Notification", {
          uname: this.props.route.params.uname,
        });
      };
    }
  };
  showDetails = () => {};
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView>
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
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Container No : {this.state.container_no}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 10 }}>
              Driver's Name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Eg:Raj"
              onChangeText={(name) => this.setState({ name })}
            />
          </View>
          <View>
            <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 10 }}>
              Mobile Number
            </Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Eg:9876543210"
              onChangeText={(mob_no) => this.setState({ mob_no })}
            />
          </View>
          <View>
            <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 10 }}>
              Truck Number
            </Text>
            <TextInput
              autoCapitalize="characters"
              style={styles.input}
              placeholder="Eg:TN01PP1234"
              onChangeText={(truck_no) => this.setState({ truck_no })}
            />
          </View>

          <View>
            <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 10 }}>
              Round Trip
            </Text>
            <View
              style={{
                height: 45,
                width: 150,
                paddingLeft: 10,
                marginTop: 10,
                marginLeft: 10,
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 45,
                justifyContent: "center",
              }}
            >
              <Picker
                mode="dropdown"
                selectedValue={this.state.round_trip}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ round_trip: itemValue })
                }
              >
                <Picker.Item label="Yes" value="Y" />
                <Picker.Item label="No" value="N" />
              </Picker>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={this.submitForm}
              style={{
                width: WIDTH - 60,
                height: 45,
                borderRadius: 25,
                backgroundColor: "#00c0e2",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                Submit
              </Text>
            </TouchableOpacity>
            <ActivityIndicator
              size="large"
              color="skyblue"
              animating={this.state.load}
              hidesWhenStopped={true}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const { width: WIDTH } = Dimensions.get("window");
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
  input: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingLeft: 20,
    marginTop: 10,
    marginLeft: 10,
  },
});
