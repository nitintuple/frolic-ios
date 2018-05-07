import React, { Component } from 'react';
import TextInput from 'react-native-material-textinput';
import { Text, View, Button ,Alert,  Navigator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Utility from '../Utility';
import Spinner from 'react-native-loading-spinner-overlay';
import SInfo from 'react-native-sensitive-info';
import Toast, {DURATION} from 'react-native-easy-toast';
import { TabNavigator,TabBarBottom,StackNavigator,NavigationActions } from 'react-navigation';

class EditProfile extends React.Component{
  static navigationOptions = {
    title: 'Settings      ',
  };

  constructor(){
    super()
    Obj = new Utility();   
    this.state ={
      visible: false,
      userToken : '',
      address: '',
      fname: '',
      lname: '',
      mobile: '',
      email:'',
      dob: '',
      username: ''
    }
    SInfo.getItem('user_token',{}).then(value => {
        this.setState({visible: !this.state.visible});
        this.setState({userToken : value});
        this._callGetProfileApi(value);
    });     
  }

//Get User Details
 _callGetProfileApi= (token) => {
    return fetch(Obj._getProfileDetailsUrl(),{
    method: 'GET',
    headers: {
      Accept : 'application/json',
      'Content-Type': 'application/json',
      'Authorization':'Token '+token,
    }
   })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({ visible: false});
        this.setState({username: responseJson[0].first_name +" "+responseJson[0].last_name});
        this.setState({email: responseJson[0].email});
        this.setState({dob: responseJson[0].profile.birth_date});
        this.setState({address: responseJson[0].profile.location});
        this.setState({mobile: responseJson[0].profile.phone});
        this.setState({fname: responseJson[0].first_name});
        this.setState({lname: responseJson[0].last_name});
    })
    .catch((error) =>{
      console.error(error);
    });
  };

  _checkForUserInputs(){
    
      if(this.state.fname == ''  || this.state.fname == null ){
        this.refs.toast.show('Please enter your first name.', 1000, () => {});
      }else if(this.state.lname == ''  || this.state.lname == null){
        this.refs.toast.show('Please enter your last name.', 1000, () => {});
      }else if(this.state.mobile == ''  || this.state.mobile == null){
        this.refs.toast.show('Please enter your mobile number.', 1000, () => {});
      }else if(this.state.dob == ''  || this.state.dob == null){
        this.refs.toast.show('Please enter your date of birth.', 1000, () => {});
      }else if(this.state.address == '' || this.state.address == null){
        this.refs.toast.show('Please enter your location', 1000, () => {});
      }
      else{
        //console.log('called');
         this.setState({visible : !this.state.visible});
         this._saveUserProfileApi();
      }
      Alert.alert('Saved')
      this.props.navigation.navigate('Profile')
  }

  //Save User Details
 _saveUserProfileApi(){
    return fetch(Obj._getProfileDetailsUrl(),{
    method: 'POST',
    headers: {
      Accept : 'application/json',
      'Content-Type': 'application/json',
      'Authorization':'Token '+this.state.userToken,
    },body: '{"first_name":"'+this.state.fname+'","last_name":"'+this.state.lname+'","profile":{"phone":"'+this.state.mobile+'","location":"'+this.state.address+'","birth_date":"'+this.state.dob+'"}}'
   })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ visible: false });
      console.log('Save Profile Response '+responseJson.username);
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  render() {
    return (
      <View style={{padding:40, paddingTop:30,backgroundColor:"white", flex: 1}}>
      <Spinner visible={this.state.visible} textStyle={{color: 'red'}} />
      <View style={{ marginBottom:20 }}>
        {/* <Image style={{marginLeft:5, width:70 , height: 70}} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEWpqan///+mpqbU1NTZ2dmjo6Pe3t7i4uLm5ubs7Oz8/Pzw8PD19fWwsLC7u7u4uLjBwcHKysqzs7N9s9HRAAADSUlEQVR4nO3da4+bMBCFYXvAAWzu///Hdgy5NZCtKhXRM5z340q7zCPATrJR4vwPxUdt2yatydVL1bPbvfL3ir/t4/dvr17HWo+tQ+Rpkk71GPAHhNv7YSrHfpi7rnPOSdhNTml/FJ2ym+dhLJo96VaYpjn/MQeXDt1N6Y/CpkfEPRPp6x+F7RiQfTkJffouvDl0X05c+U04WfDlwrQvHMPZk/2zpI9bYeytnMGcDHEjNAV8Jz6Eoy1gvlB/F0527sFHMr0Lb/aAuqKWL2F79jAHlZ5CczfhmgwPYWPxGs2F+i40tlG8Wk6iCpNVoBLTIjTzcHSbjFkYu7PnOLAuqtDwRaprTaPC0rJQChUa3QzX9NGp84NloZtVOJ89xKF1KrS8lGrRmd4s3CI8e4Rjk0sITS+lLlAIX2hdtPr0d+0Swta4MFGIngqTcWFDIXqXEJp9wXst1BSip8KaQuykohC9Swgr28/x5UYhehTidwnhzbiwpBA9CvGjED8K8aMQPxWafuNefusehehRiB+F+KmwoBA7CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjEL9LCO1/Pg2F4FGIH4X4XUB4hU/3pBA8CvGjED8K8buE0P73zFAIHoX4XUJo//sPKQSPQvxCdYHvdKYQPBUm48KGQvQuIWyNCxOF6KkwGhe2FKKXhbZfxQjxCsKzZzg2uYSwO3uIY4vO2xfOZ89waJ13fjh7iEObVTha3i6kV6HpN3pLocLGsjDUKjS9XXRRhX6yexJl9FmYDAubReh7s8TBr0Kz/5wJ1V1o9SRKPoWrMJ09yzFJegp9afE61d3+JbS4Y+Sd4k1o71Zcb8I3YRxsEWWOH0JjRJlb/yn00dCFKkP0W6EuN1ZW1McisxH60lk4jXLfJvaEPg0B3hiG5L8Lva8GQTaKDNWH6FPofTN2AVIpErqx2Xi2Ql1Vm6Kfu+VXPpL/o+1Y+mx+7os67mj2hHfnUtu2KaVGq+u6yt2WylfFkb0dZz3wMoPOkkfSyXS+ddCvjl8e8iDaUwZdBQAAAABJRU5ErkJggg=='}}/> */}
        <Image style={{marginLeft:5, width:70 , height: 70}} source={{uri: 'https://genglobal.org/sites/default/files/styles/230x230/public/default_images/default-user-image.png?itok=PHIu5RIB'}}/>
        <Text style={{fontSize:20 , fontWeight: 'bold' , color :'darkgray'}}> {this.state.username}</Text>
        <Text style={{fontSize:15 , color:'gray'}}> {this.state.mobile}</Text>
      </View>

    <TextInput
     	 style = {{flex:1}}
        label="First Name"
        maxLength = {30}
        value={this.state.fname}
        onChangeText={ (fname) => this.setState({ fname })}/>

    <TextInput
        style = {{flex:1 , marginTop: 7}}
        label="Last Name"
        maxLength = {30}
        value={this.state.lname}
        onChangeText={ (lname) => this.setState({ lname })}/>

    <TextInput
        style = {{flex:1 , marginTop: 7}}
        label="Mobile"
        keyboardType = 'numeric'
        maxLength = {15}
        value={this.state. mobile}
        onChangeText={ (mobile)  => this.setState({ mobile })}/>

    <TextInput
        style = {{flex:1 , marginTop: 7}}
        label="DOB (YYYY/MM/DD)"
        maxLength = {12}
        value={this.state.dob}
        onChangeText={ (dob) => this.setState({ dob })}/>


    <TextInput
        style = {{flex:1 , marginTop: 7}}
        label="Address"
        maxLength = {200}
        value={this.state.address}
        onChangeText={ (address) => this.setState({ address })}/>

      <View style={{marginTop:15, flexDirection:'row'}}>
        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity = { .5 }
          onPress={() => this._checkForUserInputs()}
          >
          <Text style={styles.TextStyle}> Save Details </Text>
        </TouchableOpacity>
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
        backgroundColor:'#404040', 
        // borderRadius:50,
        // width:175,
        // height:50,
    },
    TextStyle:{
       color:'#fff',
       textAlign:'center',
       fontSize:20,
       padding:10,
    }
});

export default EditProfile;