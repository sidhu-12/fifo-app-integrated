import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler,Alert } from "react-native";
import Carousel from "./Carousel";
import { dummyData } from "./Data";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  submitForm = () => {
    this.props.navigation.navigate("Login");
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
 }
 
 componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
 }
 
 backPressed = () => {
   Alert.alert(
     'Exit App',
     'Do you want to exit?',
     [
       {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Yes', onPress: () => BackHandler.exitApp()},
     ],
     { cancelable: false });
     return true;
 }
  render() {
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
        <Carousel data={dummyData} />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={this.submitForm} style={styles.btnLogin}>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Login
            </Text>
          </TouchableOpacity>
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
  btnLogin: {
    width: 150,
    height: 45,
    borderRadius: 40,
    backgroundColor: "#00c0e2",
    justifyContent: "center",
    marginTop: 40,
  },
});

export default Home;
