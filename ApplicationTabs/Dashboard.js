import React, { Component } from 'react';
import { Text, View , Image, TouchableOpacity, StyleSheet, Alert, BackHandler} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import HistoryScreen from './HistoryScreen.js';
import { TabNavigator,TabBarBottom,StackNavigator,NavigationActions } from 'react-navigation';
import BasketScreen from './BasketScreen.js';

class Dashboard extends React.Component {
    
  componentDidMount() {
    // SInfo.getItem('sacn_count',{}).then(value => {
    //     if(value == '1'){
    //       this.setState({imageUrl: 'http://www.nafpaktia.com/data/wallpapers/8/747440.png'})
    //       this.setState({myText: 'Connected Successfully'})
    //       this.setState({visibleStatus:false})
    //     //   this.setState({btntext:"START OVER"})
    //       this.setState({txt:"Fill the basket itself that moving wherein first years day."})
    //     }
    //     if(value == '0'){
    //       this.setState({imageUrl: 'http://www.nafpaktia.com/data/wallpapers/8/747440.png'})
    //       this.setState({myText: 'Not Connected?'})
    //       this.setState({visibleStatus:false})
    //       this.setState({btntext:"SCAN"})
    //       this.setState({txt:"Scan QR Code fill the basket itself that moving wherein first years day."})
    //     }
    // });
    
    SInfo.getItem('user_token',{}).then(value => {
        this.setState({token:value})
        console.log(this.state.token)
        console.log('this.state.token')
        return fetch(this.state.url+'stores/api/trolley_with_user/',{
          method: 'GET',
          headers: {
            Accept : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.state.token,
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('responseJsonnn');
            if(responseJson['details'].length > 0)
            {
                console.log(responseJson['details'][0]['order_id'])
                console.log(typeof(responseJson['details'][0]['order_id']))
                SInfo.setItem('order_id',responseJson['details'][0]['order_id'].toString(),{})
                if(!responseJson['details'][0]['payment_status']){
                  console.log("redirect to cart")
                  const resetAction = NavigationActions.reset({
                     index: 0,
                     actions: [
                     NavigationActions.navigate({ routeName: 'Basket'}),
                     // NavigationActions.navigate('Basket'),
                     // this.props.navigation.navigate('Basket')
                  ]
                  })
                  this.props.navigation.dispatch(resetAction);
                }
            }
            return responseJson;
        })
        .catch((error) =>{
          console.error(error);
        });
    });
  }

    
 static navigationOptions = {
    title: 'Home    ',
    headerLeft: null,
    showIcon: true,
    tabBarIcon: <Image source={{uri:'https://d30y9cdsu7xlg0.cloudfront.net/png/194333-200.png'}}/>
  };
	 constructor() {
      super()
      this.state = {
         url:"http://apifrolic.tuple-mia.com:8003/",
      	 imageUrl : "connected.png",
         myText: 'Not Connected?',
         visibleStatus : true,
         btntext: "SCAN",
         txt:"Scan QR Code fill the basket itself that moving wherein first years day."
      }
      SInfo.deleteItem('order_id',{})
   }

	_updateText = () => {
    if(this.state.btntext=="SCAN")
    {
      this.props.navigation.navigate('MyBarcode');
    }
    if(this.state.btntext=="START OVER")
    {
      this.props.navigation.navigate('Basket');
    }
	}

  render() {
    return (
      <View style={{backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
        	 <Image
        	 	style={{width: 100, height: 100, justifyContent: 'center'}}
        	 	source={require("../image/connected.png")}/>

        	 <Text style={{fontSize:20 , marginTop: 10, justifyContent: 'center'}}> {this.state.myText}</Text>	
		    </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom:100}}>
            <View>
              <TouchableOpacity
                  style={styles.SubmitButtonStyle}
                  activeOpacity = { .5 }
                  onPress={ this._updateText }
                  >
                  <Text style={styles.TextStyle}> {this.state.btntext} </Text>
              </TouchableOpacity>
            </View>
            <View style={{width:300, marginLeft:5, marginRight: 5, marginTop:50,  alignItems:'center' ,justifyContent: 'center'}}>
              <Text style={{fontSize:16 ,color: 'gray',textAlign: 'center'}}>{this.state.txt}</Text>
            </View>
        </View>
     	</View>
    );
  }
}

const styles = StyleSheet.create({

    SubmitButtonStyle: {
        alignItems:'center',
        backgroundColor:'#55B2C7', 
        borderRadius:50,
        width:175,
        height:50,
    },
    TextStyle:{
       color:'#fff',
       textAlign:'center',
       fontSize:20,
       padding:12,
    }
});

 export default Dashboard;