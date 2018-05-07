import React, { Component } from 'react';
import TextInput from 'react-native-material-textinput';
import { Text, View, Button ,Alert,  Navigator, Image, StyleSheet } from 'react-native';

 class AddCard extends React.Component{

 	static navigationOptions = {
	    title: 'Add Card      ',
	  };

	constructor(){
    super()
	    this.state ={
	      cnum : '',
	      ctype: '',
	      cdate: '',
	      cvv: '',
	      cname: '',
	    }
   
	  }  

	  _addCard(){
	  	var cardData = {
            number : this.state.cnum,
            cvc : this.state.cvv,
            holderName : this.state.cname,
            expiryMonth : this.state.cdate,
            expiryYear : this.state.cdate,
        };

        console.log("Data "+cardData.number);
	  }

 	render(){
 		return(
 			<View style={{padding: 10}}>

 				<TextInput
			     	style = {{flex:1}}
			        label="Card Number"
			        maxLength = {30}
			        value={this.state.cnum}
			        keyboardType = 'numeric'
			        onChangeText={ (cnum) => this.setState({ cnum })}/>

			    <TextInput
			     	style = {{flex:1}}
			        label="Card Type (Debit/Credit)"
			        maxLength = {30}
			        value={this.state.ctype}
			        onChangeText={ (ctype) => this.setState({ ctype })}/>   

			    <TextInput
			        label="Expiry Date (MM/YYYY)"
			        maxLength = {30}
			        value={this.state.cdate}
			        onChangeText={ (cdate) => this.setState({ cdate })}/>
			        
			     <TextInput
			        label="CVC"
			        maxLength = {30}
			        value={this.state.cvv}
			        keyboardType = 'numeric'
			        onChangeText={ (cvv) => this.setState({ cvv })}/>

				 <TextInput
			     	style = {{flex:1}}
			        label=" Name (As Per Card)"
			        maxLength = {30}
			        value={this.state.cname}
			        onChangeText={ (cname) => this.setState({ cname })}/>
			        
			    <View style={{marginTop : 70}}>
					<TouchableOpacity
						style={styles.SubmitButtonStyle}
						activeOpacity = { .5 }
						onPress={() => this._addCard()}
						>
							<Text style={styles.TextStyle}> Add </Text>
                    </TouchableOpacity>
			    </View>

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

 export default AddCard;