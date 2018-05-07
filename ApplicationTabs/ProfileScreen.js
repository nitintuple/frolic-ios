import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View ,Alert,  Navigator, Image, StyleSheet} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'


var styles = StyleSheet.create({
  textInput: {
    flex:1,
    fontSize:17 ,
    color:'black',
  }, 
  divider: {
    marginTop:15,
    marginBottom:15,
    marginLeft:0,
    marginRight:0,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  }
});

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile  ',
    headerLeft: null,
  };

  constructor(){
    super()
     this.state ={
      username: '', 
      mobile: '',
    }
    SInfo.getItem('user_email',{}).then(value => {
        this.setState({mobile: value});
    });
    SInfo.getItem('display_name',{}).then(values => {
        console.log(values)
        this.setState({username: values});
    });
  }

  _signOut(){
      //Facebook Logout 
      SInfo.setItem('user_token','',{});
      // LoginManager.logOut();
      const resetAction = NavigationActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({ routeName: 'Home'}),
       ]
     })
     this.props.navigation.dispatch(resetAction);
     
     
     //this.props.navigation.navigate('Home');      
      
    // Google Logout Method
    //  GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
    //   this.setState({user: null});
    //   this.props.navigation.navigate('Home');      
    // })
    // .done();
  }

  render() {
    return (
      <View style={{padding:40,backgroundColor:"white", flex: 1}}>
        
         <View style={{ }}>
            {/* <Image style={{marginLeft:5, width:70 , height: 70}} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEWpqan///+mpqbU1NTZ2dmjo6Pe3t7i4uLm5ubs7Oz8/Pzw8PD19fWwsLC7u7u4uLjBwcHKysqzs7N9s9HRAAADSUlEQVR4nO3da4+bMBCFYXvAAWzu///Hdgy5NZCtKhXRM5z340q7zCPATrJR4vwPxUdt2yatydVL1bPbvfL3ir/t4/dvr17HWo+tQ+Rpkk71GPAHhNv7YSrHfpi7rnPOSdhNTml/FJ2ym+dhLJo96VaYpjn/MQeXDt1N6Y/CpkfEPRPp6x+F7RiQfTkJffouvDl0X05c+U04WfDlwrQvHMPZk/2zpI9bYeytnMGcDHEjNAV8Jz6Eoy1gvlB/F0527sFHMr0Lb/aAuqKWL2F79jAHlZ5CczfhmgwPYWPxGs2F+i40tlG8Wk6iCpNVoBLTIjTzcHSbjFkYu7PnOLAuqtDwRaprTaPC0rJQChUa3QzX9NGp84NloZtVOJ89xKF1KrS8lGrRmd4s3CI8e4Rjk0sITS+lLlAIX2hdtPr0d+0Swta4MFGIngqTcWFDIXqXEJp9wXst1BSip8KaQuykohC9Swgr28/x5UYhehTidwnhzbiwpBA9CvGjED8K8aMQPxWafuNefusehehRiB+F+KmwoBA7CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjEL9LCO1/Pg2F4FGIH4X4XUB4hU/3pBA8CvGjED8K8buE0P73zFAIHoX4XUJo//sPKQSPQvxCdYHvdKYQPBUm48KGQvQuIWyNCxOF6KkwGhe2FKKXhbZfxQjxCsKzZzg2uYSwO3uIY4vO2xfOZ89waJ13fjh7iEObVTha3i6kV6HpN3pLocLGsjDUKjS9XXRRhX6yexJl9FmYDAubReh7s8TBr0Kz/5wJ1V1o9SRKPoWrMJ09yzFJegp9afE61d3+JbS4Y+Sd4k1o71Zcb8I3YRxsEWWOH0JjRJlb/yn00dCFKkP0W6EuN1ZW1McisxH60lk4jXLfJvaEPg0B3hiG5L8Lva8GQTaKDNWH6FPofTN2AVIpErqx2Xi2Ql1Vm6Kfu+VXPpL/o+1Y+mx+7os67mj2hHfnUtu2KaVGq+u6yt2WylfFkb0dZz3wMoPOkkfSyXS+ddCvjl8e8iDaUwZdBQAAAABJRU5ErkJggg=='}}/> */}
            <Image style={{marginLeft:5, width:70 , height: 70}} source={{uri: 'https://genglobal.org/sites/default/files/styles/230x230/public/default_images/default-user-image.png?itok=PHIu5RIB'}}/>
            <Text style={{fontSize:20 , fontWeight: 'bold' , color :'darkgray'}}> {this.state.username}</Text>
            <Text style={{fontSize:15 , color:'gray'}}> {this.state.mobile}</Text>
         </View>

          <View style={[styles.divider,{marginTop: 40}]} />

          <View style={{  marginTop: 0 ,marginLeft:0,  flexDirection:'row'}}>
              <Image style={{ width:25 , height:25 }} source={{ uri:'https://iberogen.es/content/uploads/2014/05/formulario.png' }}></Image>
              <Text style={styles.textInput} onPress={() => this.props.navigation.navigate('MyOrders')}>  My Orders</Text>
          </View>

          <View style={styles.divider} />
          
           <View style={{  marginTop: 0 , marginLeft:0, flexDirection:'row'}}>
              <Image style={{ width:25 , height:25 }} source={{ uri:'https://cdn.iconscout.com/public/images/icon/premium/png-512/pay-payment-pos-money-card-bank-hand-credit-304d242926e79c2c-512x512.png' }}></Image>
              <Text style={styles.textInput} onPress={() =>this.props.navigation.navigate('SavedCards')}>  Payments</Text>
          </View>

          <View style={styles.divider} />

           <View style={{  marginTop: 0 , marginLeft:0,  flexDirection:'row'}} >
              <Image style={{ width:25 , height:25 }} source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png' }}></Image>
              <Text style={styles.textInput} onPress={() =>this.props.navigation.navigate('EditProfile')}>  Settings</Text>
          </View>

          <View style={styles.divider} />

           <View style={{  marginTop: 0 , marginLeft:0,  flexDirection:'row'}}>
              <Image style={{ width:25 , height:25 }} source={{ uri:'https://d30y9cdsu7xlg0.cloudfront.net/png/30459-200.png' }}></Image>
              <Text style={styles.textInput} onPress={() => {this._signOut() }}>  Logout</Text>
          </View>

          <View style={styles.divider} />

      </View>
    );
  }
}

export default ProfileScreen;