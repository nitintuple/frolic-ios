import React, { Component } from 'react';
import { Text, View , Image ,Platform,  StyleSheet, Alert, TouchableOpacity, BackHandler} from 'react-native';
// import Connect from './ApplicationTabs/Connect.js';
import BasketScreen from './BasketScreen.js';
import { TabNavigator,TabBarBottom,StackNavigator,NavigationActions} from 'react-navigation';
import SInfo from 'react-native-sensitive-info';
import QRCodeScanner from 'react-native-qrcode-scanner';

class MyBarcode extends React.Component{
    
	constructor() {
      super()
      this.state = {
        url:"http://apifrolic.tuple-mia.com:8003/",
        token:"" 
      }
   }

   onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

	 static navigationOptions = {
			title: 'Scan QR Code',
			headerLeft: null,
	  };
	  
    componentDidMount() {
      SInfo.getItem('user_token',{}).then(value => {
			console.log('user_token '+value);
			this.setState({token : value})
      });
      // BackHandler.exitApp()
    }
    
	read_barcode(code){
     console.log(code);
     console.log(this.state.token);
		 SInfo.setItem('sacn_count', '1', {});
     return fetch(this.state.url+'stores/api/add_trolley_to_user/',{
      method: 'POST',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Token ' + this.state.token
        },body: '{"qr_code":"'+code['data']+'"}'
     })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log('responseJson')
          console.log(responseJson)
          if(responseJson['details'].length > 0){
            console.log("move to basket")
            console.log(responseJson['details'][0].order_id)
            SInfo.setItem('order_id', responseJson['details'][0].order_id.toString(), {});
            this.props.navigation.navigate('Connect');
          }
      })
      .catch((error) =>{
        console.error(error);
      });
	}
	
	render() {
		
	  
	    return (
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={styles.centerText}>
              Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
        }
      />
	    );
  }
}

const styles = StyleSheet.create({

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  camera: {
    flex: 1
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  }
});

export default MyBarcode;