import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  Navigator,
  Keyboard,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import Utility from './Utility';
import Toast, {DURATION} from 'react-native-easy-toast';
import TextInput from 'react-native-material-textinput';
import Spinner from 'react-native-loading-spinner-overlay';

class Registration extends React.Component{
	 //To display title of the page
	 static navigationOptions = {
    title: 'SIGN UP   ',
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
        visible: false
      }; 
  	 }

	  state = {
	    useremail:'',
      name:'',
      pwd:'',
      lname:'',
      mobile:''
	  }


   CheckTextInputIsEmptyOrNot = () =>{
 
      const { useremail }  = this.state ;
      const { name }  = this.state ;
      const { pwd }  = this.state ;
      const { mobile } = this.state;
      const { lname } = this.state;

      if(name == null){
        this.refs.toast.show('Please enter your first name.', 1000, () => {});
      }else if(lname == null){
        this.refs.toast.show('Please enter your last name.', 1000, () => {});
      }else if(useremail == null){
        this.refs.toast.show('Please enter your email.', 1000, () => {});
      }else if (!this.validateEmail(this.state.useremail)) {
        this.refs.toast.show('Please enter a valid Email-Id.', 1000, () => {});
      }else if(mobile == null){
        this.refs.toast.show('Please enter your mobile number.', 1000, () => {});
      }else if(pwd == null){
        this.refs.toast.show('Please enter your password', 1000, () => {});
      }
      else{
          this.setState({
            visible: !this.state.visible
          });
          this._registerApiCall();
        //this.props.navigation.goBack();
      }
  }

	validateEmail = (email) => {
	  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	};

 _registerApiCall(){
      return fetch(Obj._getRegisterUrl(),{
      method: 'POST',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },body: '{"first_name":"'+this.state.name+'","last_name":"'+this.state.lname+'","email":"'+this.state.useremail+'","phone":"'+this.state.mobile+'","password":"'+this.state.pwd+'"}'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
           visible: false
        });
        this.refs.toast.show('Your account has been registered, please login to activate.', 1000, () => {});
        this.props.navigation.goBack();
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  _signIn(){
    this.props.navigation.goBack();
  }

	_handlePress(message){
		Obj._downMyKeyboard();
	}

   render() {
     let {useremail} = this.state
     let {name} = this.state
     let {mobile} = this.state
     let {pwd} = this.state
     let {lname} = this.state
    return (
      <View style= {{padding:50, paddingTop:30, backgroundColor:"#ffffff"}}>
      <Spinner visible={this.state.visible} textStyle={{color: 'red'}} />
      <View style={{ marginTop: 7 }}>
        <TextInput
            label="First Name"
            value={name}
            maxLength = {50}
            onChangeText={name => this.setState({ name })}/>
        </View>

        <View style={{ marginTop: 7 }}>
        <TextInput
            label="Last Name"
            value={lname}
            maxLength = {50}
            onChangeText={lname => this.setState({ lname })}/>
        </View>

      	<View style={{ marginTop: 7 }}>
        <TextInput
            label="Email"
            maxLength = {50}
            value={useremail}
            onChangeText={useremail => this.setState({ useremail })}/>
        </View>

        <View style={{ marginTop: 7 }}>
        <TextInput
            label="Mobile"
            value={mobile}
            maxLength = {10}  
            keyboardType = 'numeric'
            onChangeText={mobile => this.setState({ mobile })}/>
        </View>

        <View style={{ marginTop: 7 }}>
        <TextInput
            secureTextEntry={true} 
            label="Password"
            value={pwd}
            maxLength = {15}
            onChangeText={pwd => this.setState({ pwd })}/>
        </View>
        
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
						style={styles.SubmitButtonStyle}
						activeOpacity = { .5 }
						onPress={() => this.CheckTextInputIsEmptyOrNot()}
						>
							<Text style={styles.TextStyle}> SIGN UP </Text>
            </TouchableOpacity>
        </View>

        <View style={{marginTop: 50, justifyContent: 'center', alignItems: 'center', flexDirection:"row"}}>
            <Text style={{}}>Are you member?</Text>
            <Text onPress={() => {this._signIn() }} style={{color:"#55B2C7"}}> SIGN IN</Text>
        </View>

		  <Toast ref="toast"
             position='top'
		         style={{backgroundColor:'red' }}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({

	listViewContainer: {
		// 		flex:1, 
		width: 250,
		height: 150,
		// 		flexDirection: 'row' ,
		// backgroundColor:'white',
		margin: 10,
	},
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		marginTop: 40,
		marginHorizontal: 10,
	},
	image: {
		width: 100,
		height: 100,
	},
	listcontainer: {
		padding: 10,
		marginTop: 3,
		backgroundColor: 'white',
		alignItems: 'center',
	},
	listtext: {
		color: '#4f603c'
	},
	SubmitButtonStyle: {
        alignItems:'center',
        backgroundColor:'#55B2C7', 
        // borderRadius:50,
        // width:175,
        // height:50,
    },
    TextStyle:{
       color:'#fff',
       textAlign:'center',
       fontSize:20,
       padding:10,
    },
    inputsContainer: {
      flex: 1,
      marginLeft : 10,
      marginRight : 10,
      justifyContent: 'center',
    }
});

export default Registration;