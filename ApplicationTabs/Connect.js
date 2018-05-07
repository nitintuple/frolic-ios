import React, { Component } from 'react';
import { Text, View , Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import BasketScreen from './BasketScreen.js';
import { TabNavigator,TabBarBottom,StackNavigator } from 'react-navigation';

class Connect extends React.Component {
    
    componentDidMount() {
        //setTimeout(this.props.navigation.navigate('Basket') , 3000 )
        // setTimeout(function(){this.navi()} , 3000) ;
        let that = this;
        setTimeout(function(){that.props.navigation.navigate('Basket')}, 2000);
    }
    
 static navigationOptions = {
    title: 'Connected',
    headerLeft: null,
    showIcon: true,
    tabBarIcon: <Image source={{uri:'https://d30y9cdsu7xlg0.cloudfront.net/png/194333-200.png'}}/>
  };
	 constructor() {
      super()
      this.state = {
      	imageUrl : "connected.png",
         myText: 'Connected Successfully',
         visibleStatus : true,
         btntext: "START OVER",
         txt:"Fill the basket itself that moving wherein first years day."
      }
   }

// 	_updateText = () => {
//     if(this.state.btntext=="SCAN")
//     {
//       this.props.navigation.navigate('MyBarcode');
//     }
//     if(this.state.btntext=="START OVER")
//     {
//       //this.props.navigation.navigate('HistoryScreen');
//       Alert.alert("change");
//     }
//     this.setState({imageUrl: 'http://www.nafpaktia.com/data/wallpapers/8/747440.png'})
// 	this.setState({myText: 'Connected Successfully'})
//     this.setState({visibleStatus:false})
//     this.setState({btntext:"START OVER"})
//     this.setState({txt:"Fill the basket itself that moving wherein first years day."})
// 	}

  render() {
    return (
      <View style={{backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center', marginTop:50}}>
        	 <Image
        	 	style={{width: 100, height: 100, justifyContent: 'center'}}
        	 	source={require("../image/connected.png")}/>

        	 <Text style={{fontSize:20 , marginTop: 10, justifyContent: 'center'}}> {this.state.myText}</Text>	
		  </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom:100}}>
        	
	        	<View style={{ width: 150 , height: 0 , alignItems:'center', justifyContent:'center'}}>
	        		<View style={{width:275, marginLeft:5, marginRight: 5, marginTop:50,  alignItems:'center' ,justifyContent: 'center'}}>
	        			<Text style={{fontSize:16 ,color: 'gray',textAlign: 'center'}}>{this.state.txt}</Text>
	        		</View>
	 	       	</View>

     	</View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

    SubmitButtonStyle: {
        alignItems:'center',
        backgroundColor:'orange', 
        borderRadius:50,
        width:175,
        height:50,
    },
    TextStyle:{
       color:'#fff',
       textAlign:'center',
       fontSize:20,
       padding:10,
    }
});

 export default Connect;