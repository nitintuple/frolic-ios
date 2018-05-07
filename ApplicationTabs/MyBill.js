import React, { Component } from 'react';
import { Text,Image ,Button,TouchableOpacity,Alert, ActivityIndicator,ListView,  StyleSheet,  View } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Toast, {DURATION} from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';

class MyBill extends React.Component {
 static navigationOptions = {
    title: 'Order Summary',
  };
  constructor(){
    super()
    this.state ={
      url:"http://apifrolic.tuple-mia.com:8003/",
      orderID : '',
      userToken: '',
      isLoading: true, 
      username: '', 
      marketname: '',
      totalItems: '',
      totalAmount : '',
      currency: '',
      address: '',
      date:'',
      time:'',
      visible : false,
    }

     SInfo.getItem('ORDERID',{}).then(valuess => {
        this.setState({orderID : valuess});
      }); 

     SInfo.getItem('user_token',{}).then(value => {
          this.setState({userToken: value});
          this._getBillDetails();
      });  
     
      SInfo.getItem('TOTALAMOUNT' , {}).then(value => {
          this.setState({totalAmount: value});
      });  

      SInfo.getItem('display_name',{}).then(values => {
          this.setState({username: values});
      });
  }

_getBillDetails(){
    return fetch(this.state.url+'orders/api/previous_orders_details/'+this.state.orderID+"/",{
      method: 'GET',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Token ' + this.state.userToken,
      }
     })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      
        this.setState({
          isLoading: false,
          currency: responseJson.trolley.store.currency,
          marketname: responseJson.trolley.store.name,
          address : responseJson.trolley.store.address,
          totalItems : responseJson.cart.length,
          date: responseJson.last_updated_at.split(' ')[0],
          time: responseJson.last_updated_at.split(' ')[1].split('.')[0],
          dataSource: ds.cloneWithRows(responseJson.cart),

        }, function() {
        });
      })
      .catch((error) => {
        console.error(error);
      });
}

share_bill (orderid) {
 this.setState({visible: true});
 Alert.alert(orderid)
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
     this.setState({ visible: false});
     if (responseJson['details']) {
       this.refs.toast.show(responseJson['details'], 1000, () => {});
     }
   })
   .catch((error) => {
     console.error(error);
   });
}


  _getItem (student_name) {
   // Alert.alert(student_name);
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
         <View style={{flexDirection: 'row' , marginTop:5}}>
            <Text style = {{color : 'grey' , fontSize:16 , flex:1}}>PAYMENT DETAILS</Text>
            <TouchableOpacity onPress={ this.share_bill.bind(this, this.state.orderID) }>
             <Image style={{ width:25 , height: 25, marginTop:2}} source={{uri: 'https://image.flaticon.com/icons/png/512/1/1454.png'}}/>
           </TouchableOpacity>
         </View>
        

         <View style={{ backgroundColor: 'white' , padding: 5, flexDirection:'column', marginTop:5}}>
            <View style={{flexDirection: 'row' , marginTop:5}}>
              <Image style={{ width:15 , height: 15}} source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_419233.png'}}/>
              <Text style={{color: 'black', fontSize:12 ,flex: 1, marginLeft:5}}>{this.state.username} </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:5}}>
              <Image style={{ width:15 , height: 15}} source={{uri: 'https://image.flaticon.com/icons/png/512/31/31858.png'}}/>
              <Text style={{color: 'black', fontSize:12,flex: 1, marginLeft:5}}>{this.state.marketname} </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:5}}>
              <Image style={{ width:15 , height: 15}} source={{uri: 'https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/location-pin-512.png'}}/>
              <Text style={{color: 'black', fontSize:12,flex: 1, marginLeft:5}}>{this.state.address} </Text>
            </View>

            <View style={styles.divider} />

            <View style={{flexDirection: 'row' , marginTop:5}}>
              <Text style={{color: 'black', fontSize:12 ,flex: 1}}>Order No: </Text><Text style={{color: 'black', fontSize:12}} >{this.state.orderID}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:5}}>
              <Text style={{color: 'black', fontSize:12 ,flex: 1}}>Payment Options: </Text><Text style={{color: 'black', fontSize:12}} >Credit Card</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:5}}>
              <Text style={{color: 'black', fontSize:12 ,flex: 1}}>Order Items: </Text><Text style={{color: 'black', fontSize:12}} >{this.state.totalItems}</Text>
            </View>

             <View style={{flexDirection: 'row', marginTop:5}}>
              <Text style={{color: 'black', fontSize:12 ,flex: 1}}>Date: </Text><Text style={{color: 'black', fontSize:12}} >{this.state.date}</Text>
            </View>

             <View style={{flexDirection: 'row', marginTop:5}}>
              <Text style={{color: 'black', fontSize:12 ,flex: 1}}>Time: </Text><Text style={{color: 'black', fontSize:12}} >{this.state.time}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:5}}>
              <Text style={{color: 'black',fontWeight: 'bold',  fontSize:12 ,flex: 1}}>Total: </Text><Text style={{color: 'orange', fontSize:12}} >{this.state.currency +' '+this.state.totalAmount}</Text>
            </View>
        </View>

        <Text style = {{color : 'grey' , fontSize:16 , marginTop:5 }}>ORDERED ITEMS</Text>

        
        <View style = {{flex: 1, marginTop:5}}>
          <ListView

            dataSource={this.state.dataSource}
            renderRow={(rowData) =>

           <View style={{flex:1, flexDirection: 'column' ,  backgroundColor:'white', padding:10 , marginTop: 10}} >

             <TouchableOpacity onPress={this._getItem.bind(this, rowData.product.title)} >
           
            <View style={{flex:1, flexDirection: 'row'}}>
              <Text style={{flex: 1,color: 'red', fontSize:14}} >{rowData.product.title}</Text>
             </View>

             <View style={{flex:1, flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize:13}}>Discount: </Text><Text style={{flex: 1,color: 'green', fontSize:13}} >{rowData.discount+"%"}</Text>
             </View>

             <View style={{flex:1, flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize:13}}>Price Per Item: </Text><Text style={{flex: 1,color: 'green', fontSize:13}} >{this.state.currency +" "+rowData.price}</Text>
             </View>
             
             <View style={{flex:1, flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize:13}}>Quantity: </Text><Text style={{flex: 1,color: 'black', fontSize:13}} >{rowData.qty}</Text>
              <Text style={{color: 'black', fontSize:13}}>Net Price: </Text><Text style={{color: 'orange', fontSize:13}} >{this.state.currency+' '}{ (rowData.price * rowData.qty) - ((rowData.price * rowData.qty * rowData.discount)/100)}</Text>
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

export default MyBill;