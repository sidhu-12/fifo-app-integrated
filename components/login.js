import "react-native-gesture-handler";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  Alert,
  StyleSheet,
  StatusBar,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { createStackNavigator, Assets } from "@react-navigation/stack";

//import { createDrawerNavigator } from '@react-navigation/drawer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isPasswordVisible: true,
      toggleText: "Show",
      keyboardOffset: 0,
      load: false,
      loginInProcess:false,
    };
  }

  handleToggle = () => {
    const { isPasswordVisible } = this.state;
    if (isPasswordVisible) {
      this.setState({ isPasswordVisible: false });
      this.setState({ toggleText: "Hide" });
    } else {
      this.setState({ isPasswordVisible: true });
      this.setState({ toggleText: "Show" });
    }
  };
  submitForm = () => {
    Keyboard.dismiss();
    this.setState({ load: true });
    const { username, password } = this.state;
    if (this.state.username == "" || this.state.password == "") {
      Alert.alert("Please enter the username or password");
      this.setState({ load: false,loginInProcess:false });
    } else {
      var auth = {
        username: username,
        password: password,
      };
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
          //console.log(this.responseText);
          validate(this);
        }
        if (this.readyState == 4 && this.status != 200) {
          Alert.alert("Network Error","Please check your network connection");
          console.log(this.responseText);
          stopLoading();
        }
      };
      xhr.open("POST", "https://fifo-app-server.herokuapp.com/auth", true);
      //xhr.open("POST","http://192.168.0.101/auth",true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(auth));
      const stopLoading = () => {
        this.setState({ load: false });
      };
      const validate = (xml) => {
        var res = JSON.parse(xml.responseText);
        console.log(res[res.length - 1]);
        if (res[res.length - 1][0].status == "LOGIN SUCCESSFULL") {
          Alert.alert(res[res.length - 1][0].status);
          this.setState({ load: false });
          this.props.navigation.pop();
          this.props.navigation.push("Login");
          if(this.state.username.slice(0,3)=='EMR')
          {
            this.props.navigation.navigate('Dashboard2',{
              id:res[res.length-1][0].uname,
              name:res[res.length-1][0].name,
              username:this.state.username
            }) 
          }
          else{
            this.props.navigation.navigate('Dashboard',{
              id:res[res.length-1][0].uname,
              name:res[res.length-1][0].name
            });
          }
          // this.props.navigation.navigate("Dashboard", {
          //   id: res[res.length - 1][0].uname,
          //   name: res[res.length - 1][0].name,
          // });
        } else {
          this.setState({ load: false });
          Alert.alert(res[res.length - 1][0].status + "\nPlease try again");
          this.setState({loginInProcess:false})
        }
        
      };
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
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
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            style={styles.loginContainer}
          >
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Enter UserName"
              placeholderTextColor="rgba(0,0,0,0.5)"
              onChangeText={(username) => this.setState({ username })}
            />

            <TextInput
              secureTextEntry={this.state.isPasswordVisible}
              style={styles.input}
              placeholder="Enter Password"
              ref={(ref) => (this.passwordInput = ref)}
              placeholderTextColor="rgba(0,0,0,0.5)"
              onChangeText={(password) => this.setState({ password })}
            />

            <TouchableOpacity onPress={this.handleToggle}>
              <Text style={{ fontSize: 15 }}>{this.state.toggleText}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
              if(this.state.loginInProcess==false)
              {
                this.setState({loginInProcess:true});
                this.submitForm();
              }

              
            }} style={styles.btnLogin}>
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <ActivityIndicator
              size="large"
              color="skyblue"
              animating={this.state.load}
              hidesWhenStopped={true}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
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
    paddingLeft: 45,
    marginTop: 15,
  },
  btnLogin: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#00c0e2",
    justifyContent: "center",
    marginTop: 40,
  },
  loginContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
export default Login;
