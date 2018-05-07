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
import SwiperPage from './SwiperPage.js';
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

const FBSDK = require('react-native-fbsdk');
const { LoginButton, AccessToken, LoginManager } = FBSDK;
 
type Props = {};

var Contacts = require('react-native-contacts')


class Home extends React.Component {
  
  static navigationOptions = {
    title: 'SIGN IN    ',
    headerStyle: { backgroundColor: '#fff' },
    headerTintColor: "#808184",
    headerTitleStyle: {
      fontWeight:"normal"
      }
  };

  state = {
    name: '',
    pwd: '',
  }

  constructor(props) {
    super(props)
    Obj = new Utility();    
    this.state = {
      user: null,
      visible: false,
      fname : '',
      lname: '',
      dob:'',
      fid : '',
      email: '',
      url:"http://192.168.1.17:8002/"
    };

    //this._getAllContacts();
  }

  async _getAllContacts(){
    Contacts.getAll((err, contacts) => {
      if(err === 'denied'){
        // error
      } else {
        //  // company name is to be synced
        //  // contacts returned in []
        // for(let i = 0; i < contacts.length; i++) {
        //  // loop through your data
        //   if(contacts[i].phoneNumbers.length > 0){
        //       if(contacts[i].emailAddresses.length > 0){
        //       console.log(contacts[i].familyName + " "+contacts[i].givenName +" "+contacts[i].phoneNumbers[0].number+" "+contacts[i].emailAddresses[0].email );
        //       }else console.log(contacts[i].familyName + " "+contacts[i].givenName +" "+contacts[i].phoneNumbers[0].number);
        //      }
        //   else console.log(contacts[i].familyName + " "+contacts[i].givenName);
        // }
        
      }
      });
  }
  
  componentDidMount() {
    //Copy on Splash Screen
    this._setupGoogleSignin();
  }


  //iniital google login check
  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '238609273486-kb1pc8fdrmkkoo884j8pdgv8pq545b15.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
    
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }
//Google Login
  // _signIn() {
  //   GoogleSignin.signIn()
  //     .then((user) => {
  //     // this.setState({user: user});
  //       console.log("Details "+user.id + " "+user.accessToken+" "+user.givenName+" "+user.familyName+" "+user.email);
  //     if(user != null){
  //       this.setState({visible: true});
  //       this.setState({fname : user.givenName });
  //       this.setState({lname : user.familyName });
  //       this.setState({dob : '1991-04-06' });
  //       this.setState({email : user.email });
  //       this.setState({fid : user.id});

  //       this._loginUsingGoogle(user.accessToken);
  //     }
        
  //   })
  //   .catch((err) => {
  //     console.log('WRONG SIGNIN', err);
  //   })
  //   .done();
  //     }
  


 _loginUsingGoogle = (token)=>{
    return fetch('http://apifrolic.tuple-mia.com:8003/users/api/google_register/',{
      method: 'POST',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },body: '{"email":"'+this.state.email+'","first_name":"'+this.state.fname+'","last_name":"'+this.state.lname+'","birth_date":"1991-02-12" ,"google_id":"'+this.state.fid+'","access_token":"'+token+'"}'
     })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
          visible: false
        });
        console.log(responseJson)
        if(responseJson.email.hasOwnProperty('details')){
          this.refs.toast.show(responseJson.email.details , 1000, () => {});
        }
        else{
          SInfo.setItem('LOGIN_TYPE', '3', {}); 
          SInfo.setItem('user_email', responseJson.email, {});
          SInfo.setItem('user_token', responseJson.token, {});
          SInfo.setItem('user_id', responseJson.user_id, {});
          SInfo.setItem('user_name', responseJson.username, {});
          SInfo.setItem('display_name', responseJson.display_name , {});
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
            NavigationActions.navigate({ routeName: 'Tabs'}),
            ]
          })
          this.props.navigation.dispatch(resetAction);
        }
      })
      .catch((error) =>{
        console.error(error);
      });
  }

//Function to move dashboard
  _moveToForgot(){
    Obj._downMyKeyboard();
    this.props.navigation.navigate('Forgot');
  }

  _signUp(){
    Obj._downMyKeyboard();
    this.props.navigation.navigate('Register');
  }

//Google Logout
  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }

//Check for validations
  CheckTextInputIsEmptyOrNot = () =>{
 
      const { name }  = this.state ;
      const { pwd }  = this.state ;

      if(this.state.name == null ){
        this.refs.toast.show('Please enter your email', 1000, () => {});
      }else if (!this.validateEmail(this.state.name)) {
        this.refs.toast.show('Please enter a valid email', 1000, () => {});
      }else if(pwd == null){
        this.refs.toast.show('Please enter your password', 1000, () => {});
      }else{
          this.setState({
            visible: !this.state.visible
          });
          this._loginUsingEmailCall();
      }
  }  

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  _loginUsingEmailCall(){
    console.log('"email":"'+this.state.name+'","password":"'+this.state.pwd+'"')
      return fetch(Obj._getEmailLoginUrl(),{
      method: 'POST',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },body: '{"email":"'+this.state.name+'","password":"'+this.state.pwd+'"}'
     })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({visible: false});
      SInfo.setItem('LOGIN_TYPE', '1', {}); 
      SInfo.setItem('user_email', responseJson.email, {});
      SInfo.setItem('user_token', responseJson.token, {});
      SInfo.setItem('user_id', responseJson.user_id, {});
      SInfo.setItem('user_name', responseJson.username, {});
      SInfo.setItem('display_name', responseJson.display_name , {});
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
        });
      })
      .catch((error) =>{
        console.log(error);
        console.error(error);
      });
  }

  _loginUsingFB = (token)=>{
    return fetch('http://apifrolic.tuple-mia.com:8003/users/api/fbregister/',{
      method: 'POST',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },body: '{"email":"'+this.state.email+'","first_name":"'+this.state.fname+'","last_name":"'+this.state.lname+'","birth_date":"1991-02-12" ,"facebook_id":"'+this.state.fid+'","access_token":"'+token+'"}'
     })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
          visible: false
        });
      SInfo.setItem('LOGIN_TYPE', '2', {}); 
      SInfo.setItem('user_email', responseJson.email, {});
      SInfo.setItem('user_token', responseJson.token, {});
      SInfo.setItem('user_id', responseJson.user_id, {});
      SInfo.setItem('user_name', responseJson.username, {});
      SInfo.setItem('display_name', responseJson.display_name , {});
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
        NavigationActions.navigate({ routeName: 'Tabs'}),
        ]
      })
      this.props.navigation.dispatch(resetAction);
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  initUser(token) {
    console.log('tokennnnnnnnnnnnnnnnnn '+token)
    fetch('https://graph.facebook.com/v2.3/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      this.setState({visible: true});
      console.log("User Data "+ json.name +" "+json.id + " " +json.email +" " +token);
      this.setState({fname : json.name.split(' ')[0] });
      this.setState({lname : json.name.split(' ')[1] });
      this.setState({dob : '1991/04/06' });
      this.setState({email : json.email });
      this.setState({fid : json.id });

      console.log('FB DETAILS '+json.name.split(' ')[0] +" "+json.name.split(' ')[1]);  
      this._loginUsingFB(token);
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
}

  login() {
    console.log("facebook login")
        LoginManager.logInWithReadPermissions(["user_friends", "public_profile", "email"]).then((res) => {
            if(res.isCancelled) {
                console.log("cancelled");
            } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  this.initUser(data.accessToken.toString());
                });
            }
        });
    }

  render() {
     let { name } = this.state
     let { pwd } = this.state

     if (!this.state.user) {
      return (
         <View style= { styles.inputsContainer }>
         <Spinner visible={this.state.visible} textStyle={{color: 'red'}} />
        <TextInput
            style = {{flex:1 }}
            label="Email"
            maxLength = {50}
            value={name}
            onChangeText={name => this.setState({ name })}
        />

         <TextInput
            secureTextEntry={true} 
            style = {{flex:1 }}
            label="Password"
            value={pwd}
            maxLength = {15}
            onChangeText={pwd => this.setState({ pwd })}
        />
        <View style={{marginTop: 10 , }}>
            <Text style={{}} onPress={() => {this._moveToForgot()}}>Forgot Password?</Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity = { .5 }
              onPress={() => this.CheckTextInputIsEmptyOrNot()}
              >
              <Text style={styles.TextStyle}> SIGN IN </Text>
          </TouchableOpacity>
        </View>

       <View style={{flexDirection: 'row', marginTop: 35, justifyContent: 'center', alignItems: 'center'}}>
           <Text>--------------------</Text>
           <Text>  OR  </Text>
           <Text>--------------------</Text>
       </View>
        
        <View style={{flexDirection: 'row', marginTop: 30}}>
            <View style={{flexDirection: 'row', height: 40, marginTop:5 , position :'absolute', right: 0}}>
              <TouchableOpacity
                    style={styles.FacebookButton}
                    activeOpacity = { .5 }
                    onPress={this.login.bind(this)}
                    >
                    <Text style={styles.TextStyle}> FACEBOOK </Text>
                </TouchableOpacity>
            </View>
          <View style={{flexDirection: 'row', height: 40, marginTop:5}}>
              <TouchableOpacity
                    style={styles.GoogleButton}
                    activeOpacity = { .5 }
                    onPress={() => { this._signIn(); }}
                    >
                    <Text style={styles.TextStyle}> GOOGLE </Text>
                </TouchableOpacity>
            </View>
        </View>
        
        <View style={{marginTop: 50, justifyContent: 'center', alignItems: 'center', flexDirection:"row"}}>
            <Text style={{}}>Not a member?</Text>
            <Text onPress={() => {this._signUp() }} style={{color:"#55B2C7"}}> SIGN UP</Text>
        </View>

         <Toast ref="toast"
                position='top'
                style={{backgroundColor:'red' }}/>         
        </View>
      );
    }
  }
}

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
      GoogleButton: {
        alignItems:'center',
        backgroundColor:'#DD4B39', 
        borderRadius:2,
        width:140,
        height:41,
    },
    FacebookButton: {
      alignItems:'center',
      backgroundColor:'#3B5998', 
      borderRadius:2,
      width:140,
      height:41,
  },
    TextStyle:{
       color:'#fff',
       textAlign:'center',
       fontSize:16,
       padding:10,
    },
  inputsContainer: {
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    flex: 1,
    backgroundColor:'#ffffff', 
    justifyContent: 'center',
    padding:30,
  },
	SubmitButtonStyle: {
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'#55B2C7', 
        // borderRadius:50,
        // width:175,
        // height:50,
    },
    TextStyle:{
       color:'#fff',
       textAlign:'center',
       fontSize:20,
       padding:8,
    }
});

export default Home;