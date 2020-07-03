import 'react-native-gesture-handler';
import React,{Component} from 'react';
import {Image,View,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login.js'
import DashBoardDrawer from './components/dashboard.js'
import Driver_Details from './components/driver_details.js'
import Consign_Notif from './components/consign_notif.js'
import Confirmed_Req from './components/confirmed_req.js'
import Arrived from './components/arrived.js'
import Shipper_Req from './components/shipper_req.js'
import Arrival1 from './components/arrival1.js'
import History from './components/history.js'
import Home from './components/Home.js' 
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

//EMR Screens latest

import UpdateScreen from "./emr_screens/UpdateScreen";
import HistoryScreen from "./emr_screens/HistoryScreen";
import UnassignedScreen from "./emr_screens/UnassignedScreen";
import AssignedScreen from "./emr_screens/AssignedScreen";
import YardInventory1 from "./emr_screens/YardInventory1";
import YardInventory2 from "./emr_screens/YardInventory2";
import ShowYardInventory from "./emr_screens/ShowYardInventory";
import HomeDrawer from './emr_screens/HomeScreen';


console.disableYellowBox = true;         // Hides te warnings in the app

const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();

export default class  App extends Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" keyboardHandlingEnabled="true" >
      <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={DashBoardDrawer}
         options={({ navigation, route }) => ({
        })}
      
        />
        <Stack.Screen name="Dashboard2" component={HomeDrawer} 
                      options={{
                        title: "Dashboard",
                        headerTitleStyle:{
                          marginLeft:-20
                        }  
                      }}
        />
        <Stack.Screen name="Assigned" component={AssignedScreen} 
                      options={{
                        title: "Assigned Containers",
                        headerTitleStyle:{
                          marginLeft:-20
                      }  
                      }}
        />
        <Stack.Screen name="Unassigned" component={UnassignedScreen}
                      options={{
                        title: "Unassigned Containers",
                        headerTitleStyle:{
                          marginLeft:-20
                      }  
                      }}
        />
        <Stack.Screen name="UpdateScreen" component={UpdateScreen}
                      options={{
                        title: "Update Container",
                        headerTitleStyle:{
                          marginLeft:-20
                      }  
                      }}
        />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen}
                      options={{
                        title: "History-My Containers",
                        headerTitleStyle:{
                          marginLeft:-20
                      }  
                      }}
        />
        <Stack.Screen name="ShowYardInventory" component={ShowYardInventory}
                      options={({navigation , route}) => ({
                        title: "Yard Inventory",
                        headerTitleStyle:{
                          marginLeft:-20
                        },
                        headerRight:() =>(
                            <View style={{padding:10}}>
                                {/* Navigating to Update YardInventory1 */}
                                <Ionicons name="md-add-circle-outline" size={30}
                                          style={{marginRight:10}} 
                                          onPress={()=> navigation.navigate("YardInventory1", 
                                                          {emr_Id:route.params.emr_Id,
                                                           emr_IP_Address:route.params.emr_IP_Address
                                                          })}
                                />
                            </View>
                        )
                      })}
        />
        <Stack.Screen name="YardInventory1" component={YardInventory1} 
                      options={{
                        title: "Update Yard Inventory",
                        headerTitleStyle:{
                          marginLeft:-20
                      }  
                      }}
        />
        <Stack.Screen name="YardInventory2" component={YardInventory2} 
                      options={{
                        title: "Update Yard Inventory",
                        headerTitleStyle:{
                          marginLeft:-20
                      }  
                      }}
        />
        <Stack.Screen name="Update Driver Details" component={Driver_Details}/>
        <Stack.Screen name="Consignee Notification" component={Consign_Notif}/>
        <Stack.Screen name="Confirmed Request" component={Confirmed_Req}/>
        <Stack.Screen name="Update Arrival Time and Date" component={Arrived}/>
        <Stack.Screen name="Shipper Confirmed Request" component={Shipper_Req}/>
        <Stack.Screen name="Update Shipper Arrival" component={Arrival1}/>
        <Stack.Screen name="History" component={History}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
  }
   