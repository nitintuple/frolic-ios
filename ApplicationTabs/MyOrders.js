import React, { Component } from 'react';
import { Text,Image ,Button , TouchableOpacity,Alert,Navigator, ActivityIndicator,ListView,  StyleSheet,  View } from 'react-native';
import Utility from '../Utility';
import SInfo from 'react-native-sensitive-info';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast';


class MyOrders extends React.Component {
	  static navigationOptions = {
	    title: 'My Orders      ',
	  };
	  constructor(){
		super()
		Obj = new Utility();  
		
		this.state ={
		    url:"http://apifrolic.tuple-mia.com:8003/",
			userToken : '',
			visible: false,
			isLoading: true,	
			address: 'SHOP 01-29 SOMERSET 313, 313 ORCHARD ROAD'
		}

		 SInfo.getItem('user_token',{}).then(value => {
			this.setState({userToken: value});
	        this.getOrderListing();
    	});  
	}

	helloCall(){
		Alert.alert('afaf');
	}

	getOrderListing() {
	  return fetch(this.state.url+'orders/api/previous_orders/',{
	    method: 'GET',
	    headers: {
	      Accept : 'application/json',
	      'Content-Type': 'application/json',
	      'Authorization':'Token '+ this.state.userToken,
	    }
	   })
	    .then((response) => response.json())
	    .then((responseJson) => {
	    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    
	      this.setState({
	        isLoading: false,
	        dataSource: ds.cloneWithRows(responseJson.results),
	      }, function() {
	        // In this block you can do something with new state.
	      });
	    })
	    .catch((error) => {
	      console.error(error);
	    });
	}

	share_bill (orderid) {
	 Alert.alert(orderid)
	 this.setState({visible: true});
	 return fetch(this.state.url+'orders/api/order_send_email/'+orderid,{
	   method: 'GET',
	   headers: {
	     Accept : 'application/json',
	     'Content-Type': 'application/json',
	     'Authorization':'Token '+ this.state.userToken,
	   }
	  })
	   .then((response) => response.json())
	   .then((responseJson) => {
	     this.setState({visible: false});
	     if (responseJson['details']) {
	      this.refs.toast.show(responseJson['details'], 1000, () => {});
	     }
	   })
	   .catch((error) => {
	     console.error(error);
	   });
	}

	_getItem (order_id, totalAmount) {
	    console.log(order_id)
	    console.log(totalAmount)
		SInfo.setItem('ORDERID', order_id+'', {});
		SInfo.setItem('TOTALAMOUNT', totalAmount+'' ,{});
 		this.props.navigation.navigate('MyBill');
	}

	_separator = () => {
	  return (
	    <View
	      style={{

	        height: .5,
	        width: "100%",
	        backgroundColor: "#000",

	      }}
	    />
	  );
	}

 render() {
 	if (this.state.isLoading) {
    	return (
	     <View style={{flex: 1, paddingTop: 20}}>
	       <ActivityIndicator />
	     </View>
	   );
	}
    return (
      <View style={{ flex: 1 ,padding:10}}>
		<Spinner visible={this.state.visible} textStyle={{color: 'red'}} />
      	<View style = {{flex: 1}}>
      		<ListView
      			enableEmptySections = {true}
		        dataSource={this.state.dataSource}
		        renderRow={(rowData) =>

		       <View style={{flex:1, flexDirection: 'column' ,  backgroundColor:'white', padding:10 , marginTop: 10}} >

		         <TouchableOpacity onPress={this._getItem.bind(this, rowData.order_id , rowData.price)}>
		       
		       	<View style={{flex:1, flexDirection: 'row'}}>
		         	<Text style={{color: 'black', fontSize:15}}>Order Id: </Text><Text style={{flex: 1,color: 'red', fontSize:15}} >{rowData.order_id}</Text>
					<TouchableOpacity onPress={ this.share_bill.bind(this, rowData.order_id) }>
                        <Image style={{ width:20 , height: 20}} source={{uri: 'https://image.flaticon.com/icons/png/512/1/1454.png'}}/>
                    </TouchableOpacity>

		         </View>

		         <View style={{flex:1, flexDirection: 'row'}}>
		         	<Text style={{color: 'black', fontSize:15}}>Market Name: </Text><Text style={{flex: 1,color: 'black', fontSize:15}} >{rowData.trolley.store.name}</Text>
		         </View>
		         
		         <View style={{flex:1, flexDirection: 'row'}}>
                     <Text style={{color: 'black', fontSize:15}}>Amount: </Text><Text style={{flex: 1,color: 'orange', fontSize:15}} >{rowData.trolley.store.currency+' '+rowData.price}</Text>
                 </View>

                 <View style={{flex:1, flexDirection: 'row'}}>
                     <Text style={{color: 'black', fontSize:15}}>Date: </Text><Text style={{flex: 1,color: 'black', fontSize:15}} >{rowData.last_updated_at.split(' ')[0]}</Text>
                     <Text style={{color: 'black',fontSize:15}}>Time: </Text><Text style={{color: 'black', fontSize:15}} >{rowData.last_updated_at.split(' ')[1].split('.')[0]}</Text>
                 </View>

		         <View style={styles.divider} />
		         
		         <View style={{flex:1, flexDirection: 'row' }}>
		         	<Text style={{color: 'black', fontSize:15}}>Status: </Text><Text style={{color: 'green', flex:1,fontSize:15}}>{rowData.status}</Text>

		         </View>

		         </TouchableOpacity>

		       </View>

		        }
		      />
      	</View>
      	<Toast ref="toast"  position='top' style={{backgroundColor:'green' }}/> 
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 40,
    marginHorizontal: 10,
  },

 divider: {
    marginTop:7,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
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
   }
});

export default MyOrders;



//.split(' ')[0]