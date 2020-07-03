import React from "react";
import {
  Linking,
  ScrollView,
  Dimensions,
  Keyboard,
  Image,
  Alert,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import SideMenu from "react-native-side-menu";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import History from "./history.js";
import Login from "./login.js";
const Drawer = createDrawerNavigator();
var name, prop, prop1, tp_name;
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/guest-user.jpg")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 15,
            marginTop: 5,
          }}
        />
        <DrawerItem
          label={tp_name}
          style={{ alignSelf: "flex-end" }}
          labelStyle={{ fontWeight: "bold", fontSize: 20 }}
          onPress={() => {
            prop.navigation.navigate("Dashboard", { id: name, name: tp_name });
            prop1.navigation.toggleDrawer();
          }}
        />
      </View>
      <DrawerItem
        label="History"
        onPress={() => {
          prop.navigation.navigate("History", { uname: name });
          prop1.navigation.toggleDrawer();
        }}
      />
      <DrawerItem
        label="Contact Us"
        onPress={() => Linking.openURL("https://fifofuture.in/cargo/contactus")}
      />
      <DrawerItem label="Logout" onPress={() => prop.navigation.popToTop()} />
    </DrawerContentScrollView>
  );
}
const DashboardDrawer = (props) => {
  name = props.route.params.id;
  tp_name = props.route.params.name;
  prop = props;
  props.navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => prop1.navigation.toggleDrawer()}>
        <Image
          source={require("../assets/side-menu.png")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 15,
          }}
        />
      </TouchableOpacity>
    ),
  });

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerType="front"
      drawerPosition="left"
      drawerContent={(props) => <CustomDrawerContent />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};
const Dashboard = (props) => {
  prop1 = props;
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
      <Text style={{ fontSize: 25, textAlign: "center", marginTop: 10 }}>
        Welcome {tp_name} !
      </Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <TouchableOpacity
          style={styles.boxOne}
          onPress={() =>
            props.navigation.navigate("Consignee Notification", { uname: name })
          }
        >
          <Text style={styles.inside}>Consignee Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxTwo}
          onPress={() =>
            props.navigation.navigate("Confirmed Request", { uname: name })
          }
          title="Confirmed Request"
        >
          <Text style={styles.inside}>Confirmed Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxThree}
          onPress={() =>
            props.navigation.navigate("Shipper Confirmed Request", {
              uname: name,
            })
          }
          title="Update the arrival at Shipper Factory"
        >
          <Text style={styles.inside}>Update Shipper Arrival</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
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
  boxOne: {
    backgroundColor: "#00c0e2",
    borderRadius: 10,
    width: WIDTH - 60,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  boxTwo: {
    backgroundColor: "#00c0e2",
    borderRadius: 10,
    width: WIDTH - 60,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  boxThree: {
    backgroundColor: "#00c0e2",
    borderRadius: 10,
    width: WIDTH - 60,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  inside: {
    color: "white",
    fontSize: 25,
  },
});
export default DashboardDrawer;
