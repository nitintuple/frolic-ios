/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  Button,
  Alert,
  Navigator,
  Keyboard,
  TouchableOpacity,
  View
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast';
import TextInput from 'react-native-material-textinput';
import { TabNavigator,TabBarBottom,StackNavigator, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Utility from './Utility'
import ForgotPassword from './ForgotPassword.js';
import AppTabs from './AppTabs';

import Registration from './Registration.js';
import Home from './Home.js';
import Dashboard from './ApplicationTabs/Dashboard.js';
import BasketScreen from './ApplicationTabs/BasketScreen.js';
import HistoryScreen from './ApplicationTabs/HistoryScreen.js';
import ProfileScreen from './ApplicationTabs/ProfileScreen.js';
import EditProfile from './ApplicationTabs/EditProfile.js';
import SavedCards from './ApplicationTabs/SavedCards.js';
import MyOrders from './ApplicationTabs/MyOrders.js';
import MyBill from './ApplicationTabs/MyBill.js';
import MyBarcode from './ApplicationTabs/MyBarcode.js';
import Connect from './ApplicationTabs/Connect.js';

import SInfo from 'react-native-sensitive-info';

import SplashScreen from 'react-native-splash-screen'
import Swiper from 'react-native-swiper';
import Svg,{ Use, Defs, Stop, Image, } from 'react-native-svg';
import AddCard from './ApplicationTabs/AddCard.js';

type Props = {};

var Contacts = require('react-native-contacts')

class SwiperPage extends Component<Props> {

  static navigationOptions = { header: null }
  
  componentDidMount() {
    //Copy on Splash Screen
    SInfo.getItem('swipe',{}).then(value => {
      if(value!== null){
        SInfo.getItem('user_token',{}).then(value => {
          if(value!== null && value.length > 4){
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'Tabs'}),
              ]
            })
            this.props.navigation.dispatch(resetAction);
          }
          else{
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home'}),
              ]
            })
            this.props.navigation.dispatch(resetAction);
           }
        });
      }
    });
  }
  
  constructor(props){
    super(props);
    this.state =  {
        btntext : 'SKIP',
    }
  }

  _onPressButton() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
      ]
    })
    this.props.navigation.dispatch(resetAction);
  }
  
  render() {
    return (

      <View>
        <View style={{height:'93%'}}>
          <Swiper style={styles.wrapper} showsButtons={false} showsPagination ={true} loop={false} activeDotColor	="#808184"
            onIndexChanged={(index) => {
              if(index==3){
                this.setState({
                  btntext: "GET STARTED"
                })
              }
              else{
                this.setState({
                  btntext: "SKIP"
                }) 
              }
            }}>
            <View style={{padding:0,margin:0}}>
              <Svg width="300" height="550">
                 <Image width="100%" height="100%" href={require('./image/screen_1.png')}/>
              </Svg>
            </View>

            <View>
              <Svg width="300" height="550">
                 <Image width="100%" height="100%" href={require('./image/screen_2.png')}/>
              </Svg>
            </View>

            <View>
              <Svg width="300" height="550">
                 <Image width="100%" height="100%" href={require('./image/screen_3.png')}/>
              </Svg>
            </View>
            
            <View>
              <Svg width="300" height="550">
                 <Image width="100%" height="100%" href={require('./image/screen_4.png')}/>
              </Svg>
            </View>
          </Swiper>
        </View>
        <View style={{height:'7%'}}>
         
          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity = { .5 }
            onPress={this._onPressButton.bind(this)}
            >
            <Text style={styles.TextStyle}> {this.state.btntext} </Text>
          </TouchableOpacity>
        </View>
      </View>
  );
  }
}

const RootStack = StackNavigator(
  {
    Swipe: {
      screen: SwiperPage,
    },
    Home: {
      screen: Home,
    },
    Forgot: {
      screen: ForgotPassword,
    },
    EditProfile:{
      screen : EditProfile,
    },
    SavedCards :{
      screen : SavedCards,
    },
    MyOrders :{
      screen :  MyOrders,
    },
    MyBill :{
      screen: MyBill,
    },
    Register: {
      screen: Registration,
    },
    Connect: {
      screen: Connect,
    },
    Basket: { 
      screen: BasketScreen,
    },
    Tabs: {
      screen: TabNavigator({
                  Dashboard: { screen: Dashboard },
                  Basket: { screen: BasketScreen },
                  History: { screen: HistoryScreen },
                  Profile: { screen: ProfileScreen },
                },{
                    tabBarPosition: 'bottom',
                    tabBarOptions: {
                      activeTintColor: '#55B2C7',
                      inactiveTintColor: '#808184',
                      style: {
                        backgroundColor: '#ffffff',
                        borderTopWidth:1,
                        borderTopColor:'#D3D3D3'
                      },
                      indicatorStyle: {
                        backgroundColor: '#55B2C7',
                      },
                    }
                  }
                ),
    },
    MyBarcode: {  
      screen: MyBarcode,
    },
    AddCard: {
      screen : AddCard,
    },
    initialRouteName: 'Swipe',
  }
);

const styles = StyleSheet.create(
{
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flex: 1,
  },
  SubmitButtonStyle: {
    alignItems:'center',
    backgroundColor:'#55B2C7', 
    height:50,
  },
  TextStyle:{
       color:'#fff',
       textAlign:'center',
       fontSize:16,
       padding:8,
    },
  inputsContainer: {
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    flex: 1,
    marginLeft : 10,
    marginRight : 10,
    justifyContent: 'center', 
    padding:30,
  }

});

export default class App extends React.Component {
  
  componentDidMount() {
    // Alert.alert('called');
     SInfo.setItem('swipe','1',{});
     setTimeout(function(){SplashScreen.hide()},2000); 
  }

  render() {
    return <RootStack />;
  }
}
