import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  Navigator,
  Keyboard,
  View
} from 'react-native';
import Utility from './Utility';
import Toast, {DURATION} from 'react-native-easy-toast';
import TextInput from 'react-native-material-textinput';
import Spinner from 'react-native-loading-spinner-overlay';
import { TabNavigator,TabBarBottom,StackNavigator, NavigationActions } from 'react-navigation';
  
const styles = StyleSheet.create(
{
 inputsContainer: {
    flex: 1,
    marginLeft : 10,
    marginRight : 10,
    justifyContent: 'center',
  }
});

class ForgotPassword extends React.Component{
   //To display title of the page
   static navigationOptions = {
    title: 'Forgot Password        ',
    headerStyle: { backgroundColor: '#fff' },
    headerTintColor: "#808184",
    headerTitleStyle: {
      fontWeight:"normal"
    }
   };

   constructor(props) {
       super(props)
       Obj = new Utility();  
       this.state = {
        visible: false,
        color:'red'
      };
     }

    state = {
      useremail:'',
    }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };



  _handlePress(message){
    Obj._downMyKeyboard();
    if (!this.validateEmail(this.state.useremail)) {
      this.refs.toast.show('Please enter a valid Email-Id.', 1000, () => {
          // something you want to do at close
         });
    }else {
            this.setState({
              visible: !this.state.visible
            });
          
         this._forgotApiCall();
    }
  }



  _forgotApiCall(){
      return fetch(Obj._getForgotPwdUrl(),{
      method: 'POST',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },body: '{"email":"'+this.state.useremail+'"}'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
           visible: false,
           color:'green'
        });
        this.refs.toast.show(responseJson.details, 1000, () => {});
        this.timeoutHandle = setTimeout(()=>{this.props.navigation.goBack();},1500) ;
        //this.props.navigation.goBack();
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentWillUnmount(){
     clearTimeout(this.timeoutHandle); 
}

   render() {
     let {useremail} = this.state
    return (

      <View style= {{padding:40}}>
      <Spinner visible={this.state.visible} textStyle={{color: 'red'}} />
        <View style={{ marginTop: 30 }}>
        <TextInput
            label="Email"
            value={useremail}
            onChangeText={useremail => this.setState({ useremail })}/>
        </View>

        
        <View style={{ marginTop: 30 }}>
        <Button 
          title="Submit"
          color="#404040"
          onPress={() => this._handlePress('HelloIndia')}/>
        </View>
    <Toast ref="toast"
           position='top'
           style={{backgroundColor: this.state.color }}/>
      </View>
    );
  }
}


export default ForgotPassword;