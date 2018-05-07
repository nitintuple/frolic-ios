import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, Button, TouchableOpacity, Alert, ActivityIndicator, ListView, StyleSheet } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';

class SavedCards extends React.Component {
	static navigationOptions = {
		title: 'Payments    ',
	};
	constructor() {
		super()
		this.state = {
			isLoading: true,
			url: "http://apifrolic.tuple-mia.com:8003/",
			address: 'SHOP 01-29 SOMERSET 313, 313 ORCHARD ROAD'
		}
	}

	componentDidMount() {
		// return fetch('https://reactnativecode.000webhostapp.com/StudentsList.php')
		// 	.then((response) => response.json())
		// 	.then((responseJson) => {
		// 		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
				this.setState({
					isLoading: false,
		// 			dataSource: ds.cloneWithRows(responseJson),
		// 		}, function () {
		// 			// In this block you can do something with new state.
				});
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
	}

	_addCard(){
		this.props.navigation.navigate('AddCard');
	}

	payment(parameter){
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
					this._getItem(parameter);
				}
				return responseJson;
			})
			.catch((error) =>{
			  console.error(error);
			});
		});
	}
	_getItem(student_name) {
		SInfo.getItem('user_token', {}).then(value => {
			this.setState({ token: value })
			console.log('user_token ' + this.state.token);
			return fetch(this.state.url + 'payment/api/dummy_checkout_odd/', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Token ' + this.state.token
				}
			})
				.then((response) => response.json())
				.then((responseJson) => {
					console.log('responseJson')
					console.log(responseJson)
					if (responseJson['details'] == "Payment Completed") {
						Alert.alert('Payment Done wih ' + student_name);
						const resetAction = NavigationActions.reset({
							index: 0,
							actions: [
								NavigationActions.navigate({ routeName: 'Tabs' }),
							]
						})
						this.props.navigation.dispatch(resetAction);
					}
				})
				.catch((error) => {
					console.error('error');
					console.error(error);
				});
		});
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
				<View style={{ flex: 1, paddingTop: 20 }}>
					<ActivityIndicator />
				</View>
			);
		}
		return (
			<View style={{ padding: 7 }}>

				<View style={styles.listViewContainer} >
					<Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}> Debit Cards</Text>
					<View style={{marginTop:5}}>
					<ImageBackground
						style={{ width: '100%', height: '100%' }}
						source={{ uri: 'http://www.col323webdesign.com/wp-content/uploads/credit-card-backgrounds-expitrans-accept-credit-cards-today.jpg' }}>

						<TouchableOpacity onPress={this.payment.bind(this, 'Debit Cards')} style={{ padding: 10 }} >
							<Image
								style={{ width: 50, height: 50, resizeMode: 'center' }}
								source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2000px-MasterCard_Logo.svg.png' }} />

							<View style={{ flexDirection: 'row' }}>
								<Text style={{ flex: 1, color: 'white', textAlign: 'center', fontSize: 22 }} >5242-5403-4522-0091</Text>
							</View>

							<View style={{ flexDirection: 'row', marginTop: 5 }}>

								<Text style={{ flex: 1, color: 'white', fontSize: 15 }} >Expiry Date:</Text>
								<Text style={{ flex: 1, color: 'white', fontSize: 15, justifyContent: 'flex-end' }} > 06/2019</Text>

							</View>

							<View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
								<Text style={{ color: 'white', fontSize: 17 }}>Bharat Arora</Text>
							</View>

						</TouchableOpacity>
					</ImageBackground>
					</View>
				</View>

				<View style={styles.listViewContainer} >
					<Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' , marginTop:30}}> Credit Cards</Text>
					<View style={{marginTop:7}}>
					<ImageBackground
						style={{ width: '100%', height: '100%' }}
						source={{ uri: 'http://letitflip.com/demo/Demo_opf_files/Demo_BookBgTexture_.jpg' }}>

						<TouchableOpacity onPress={this.payment.bind(this, 'Credit Cards')} style={{ padding: 10 }} >
							<Image
								style={{ width: 50, height: 50, resizeMode: 'center' }}
								source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2000px-MasterCard_Logo.svg.png' }} />

							<View style={{ flexDirection: 'row' }}>
								<Text style={{ flex: 1, color: 'white', textAlign: 'center', fontSize: 22 }} >5242-5403-4522-0091</Text>
							</View>

							<View style={{ flexDirection: 'row', marginTop: 5 }}>

								<Text style={{ flex: 1, color: 'white', fontSize: 15 }} >Expiry Date:</Text>
								<Text style={{ flex: 1, color: 'white', fontSize: 15, justifyContent: 'flex-end' }} > 06/2019</Text>

							</View>

							<View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
								<Text style={{ color: 'white', fontSize: 17 }}>Bharat Arora</Text>
							</View>

						</TouchableOpacity>
					</ImageBackground>
					</View>
				</View>

				<View style={{marginTop : 70}}>
					<TouchableOpacity
						style={styles.SubmitButtonStyle}
						activeOpacity = { .5 }
						onPress={() => this._addCard()}
						>
							<Text style={styles.TextStyle}> Add Card </Text>
                    </TouchableOpacity>
			    </View>
			</View>
		);

		// return (
		//   <View style={{ padding:15}}>


		//   	<Text style={{color:'black' , fontSize:18, fontWeight:'bold'}}> Debit Cards</Text>
		//  	<View style = {{marginTop:5}}>
		//   		<ListView
		//   			horizontal={true}
		//      dataSource={this.state.dataSource}
		//      renderRow={(rowData) =>

		//     <View style={styles.listViewContainer} >

		//     	<ImageBackground 
		//     		style={{width: '100%', height: '100%'}}
		//     		source={{uri: 'http://www.col323webdesign.com/wp-content/uploads/credit-card-backgrounds-expitrans-accept-credit-cards-today.jpg'}}>

		//       <TouchableOpacity onPress={this._getItem.bind(this, rowData.student_name)} style={{padding:10}} >
		//       <Image 
		//       	style={{width:50 , height:50, resizeMode: 'center'}}
		//       	source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2000px-MasterCard_Logo.svg.png'}}/>

		//      	<View style={{ flexDirection: 'row'}}>
		//        	<Text style={{flex: 1,color: 'white', textAlign:'center', fontSize:22}} >5242-5403-4522-0091</Text>
		//        </View>

		//        <View style={{flexDirection: 'row' , marginTop:5}}>

		//         <Text style={{flex:1, color: 'white', fontSize:15}} >Expiry Date:</Text>
		//         <Text style={{flex: 1,color: 'white', fontSize:15, justifyContent: 'flex-end'}} > 06/2019</Text>

		//        </View>

		//        <View style={{flexDirection: 'row', justifyContent: 'flex-start' , marginTop:5}}>
		//        	<Text style={{color: 'white', fontSize:17}}>Bharat Arora</Text>
		//        </View>

		//       </TouchableOpacity>
		//        </ImageBackground>
		//     </View>
		//      }
		//    />
		//   	</View>


		//   	<Text style={{color:'black' , fontSize:18, fontWeight:'bold'}}> Credit Cards</Text>

		//  	<View style = {{ marginTop:5}}>
		//   		<ListView
		//   			horizontal={true}
		//      dataSource={this.state.dataSource}
		//      renderRow={(rowData) =>

		//     <View style={styles.listViewContainer} >
		// <ImageBackground 
		//     		style={{width: '100%', height: '100%'}}
		//     		source={{uri: 'http://letitflip.com/demo/Demo_opf_files/Demo_BookBgTexture_.jpg'}}>

		//       <TouchableOpacity onPress={this._getItem.bind(this, rowData.student_name)} style={{padding:10}} >
		//       <Image 
		//       	style={{width:50 , height:50, resizeMode: 'center'}}
		//       	source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2000px-MasterCard_Logo.svg.png'}}/>

		//      	<View style={{ flexDirection: 'row'}}>
		//        	<Text style={{flex: 1,color: 'white', textAlign:'center', fontSize:22}} >5242-5403-4522-0091</Text>
		//        </View>

		//        <View style={{flexDirection: 'row' , marginTop:5}}>

		//         <Text style={{flex:1, color: 'white', fontSize:15}} >Expiry Date:</Text>
		//         <Text style={{flex: 1,color: 'white', fontSize:15, justifyContent: 'flex-end'}} > 06/2019</Text>

		//        </View>

		//        <View style={{flexDirection: 'row', justifyContent: 'flex-start' , marginTop:5}}>
		//        	<Text style={{color: 'white', fontSize:17}}>Bharat Arora</Text>
		//        </View>

		//       </TouchableOpacity>
		//        </ImageBackground>

		//     </View>
		//      }
		//    />
		//   	</View>

		//   </View>
		// );
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
export default SavedCards;