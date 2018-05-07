import React, { Component } from 'react';
import {
  Keyboard,
  Alert
} from 'react-native';


class Utility extends React.Component{

 constructor() {
      super()
      this.state = {
        globalUrl : 'http://apifrolic.tuple-mia.com:8003',
        // globalUrl : 'http://192.168.1.17:8002',
      }
   }

   //Forgot Password Url
  _getForgotPwdUrl(){
    return this.state.globalUrl + '/users/api/forgot_password/';
  }

  _getRegisterUrl(){
    return this.state.globalUrl + '/users/api/register/';
  }

  _getEmailLoginUrl(){
    return this.state.globalUrl + '/users/api/login/';
  }

  _getProfileDetailsUrl(){
    return this.state.globalUrl + '/users/api/profile/';
  }

  getMyOrdersUrl(){
    return this.state.globalUrl + '/orders/api/previous_orders/';
  }

//Show alert messages
 _showErrorDialog=(Value)=>{
    Alert.alert(Value);
  }

  validateEmail = (email) => {
  	Alert.alert(email);
  	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	  return re.test(email);
  };

//Put down Keyboard
_downMyKeyboard(){
	Keyboard.dismiss();
   }
}
export default Utility;





// ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']