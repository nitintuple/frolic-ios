import React, { Component } from 'react';
import { Text, Image, Button, TouchableOpacity, Alert, ActivityIndicator, ListView, StyleSheet, View } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
import Toast, { DURATION } from 'react-native-easy-toast';

class BasketScreen extends React.Component {
	static navigationOptions = {
		title: 'CART   ',
		headerLeft: null,
	};
	constructor() {
		super()
		this.state = {
			novalue : false ,
			isLoading: true,
			color: "orange",
			btntext: "CHECKOUT & PAY",
			len: 0,
			amount: 0,
			discount: 0,
			net: 0,
			token: '1',
			trolley_id: '1',
			address: 'SHOP 01-29 SOMERSET 313, 313 ORCHARD ROAD',
			url: "http://apifrolic.tuple-mia.com:8003/",
			price: '',
			total: 0,
			net: 0,
			save: 0,
		}
	}

	componentDidMount() {

		var that = this
		SInfo.getItem('user_token', {}).then(value => {
			console.log('user_token ' + value);
			this.setState({ token: value })
			SInfo.getItem('order_id', {}).then(value => {
				// if (!value){
				// 	return
				// }
				console.log('order_id ' + value);
				this.setState({ trolley_id: value })
				console.log('= ' + this.state.token)
				console.log('= ' + this.state.trolley_id)
				url = this.state.url + 'orders/api/orders_details/' + this.state.trolley_id + '/'
				console.log(url)
				return fetch(url, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Token ' + this.state.token //c81be4333708721bcc2b1a46320b81aee4036556
					}
				})
					.then((response) => response.json())
					.then((responseJson) => {
						console.log('responseJsonnn')
						console.log(responseJson)
						for (cart in responseJson['cart']){
						    this.setState({
						        total : this.state.total+(responseJson['cart'][cart]['price']*responseJson['cart'][cart]['qty']),
						    })
						    this.setState({
						        save: this.state.save+(((responseJson['cart'][cart]['price']*responseJson['cart'][cart]['qty'])*responseJson['cart'][cart]['discount'])/100),
						    })
						    console.log(this.state.total)
						    console.log(this.state.save)
						}
						if (!Object.keys(responseJson).length) {
							this.setState({novalue : true});
							//Alert.alert('No cart found');
							// const resetAction = NavigationActions.reset({
							// 	index: 0,
							// 	actions: [
							// 		NavigationActions.navigate({ routeName: 'Tabs' }),
							// 	]
							// })
							// this.props.navigation.dispatch(resetAction);
							return
						}
						if (responseJson['payment_status']) {
							this.setState({ btntext: "DONE" })
							this.setState({ color: "green" })
						}
						let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
						this.setState({
							isLoading: false,
							dataSource: ds.cloneWithRows(responseJson['cart']),
						});
					})
					.catch((error) => {
						console.error(error);
					});
			});
		});
	}

	//   return fetch('https://reactnativecode.000webhostapp.com/StudentsList.php')
	//     .then((response) => response.json())
	//     .then((responseJson) => {
	// 			console.log(responseJson)
	//       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	//       this.setState({
	//         isLoading: false,
	//         dataSource: ds.cloneWithRows(responseJson),
	//       }, function() {
	//         // In this block you can do something with new state.
	//       });
	//     })
	//     .catch((error) => {
	//       console.error(error);
	//     });
	// }

	_getItem() {
		SInfo.setItem('sacn_count', '0', {});
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

	_done_payment() {
		if (this.state.btntext == 'DONE') {
			Alert.alert('Payment Done');
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName: 'Tabs' }),
				]
			})
			this.props.navigation.dispatch(resetAction);
		}
		else {
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName: 'SavedCards' }),
				]
			})
			this.props.navigation.dispatch(resetAction);
		}
	}

	render() {
		if (this.state.isLoading) {
	    return (
	      <View style={{flex: 1, justifyContent:'center', alignItems:'center' , padding: 20, backgroundColor:'white'}}>
		  	<Image style={{ width: 330, height: 200, margin:50 }} source={{ uri: 'https://www.chocogrid.com/img/images/cart-empty.jpg' }} />
			<Text style={{fontSize:20,color:'gray'}}> Shop Now !!! </Text>
	      </View>
	    );
	    }
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, paddingTop: 20 }}>
					<ActivityIndicator />
				</View>
			);
		}
		return (		
			<View style={{ flex: 1, padding: 10 }}>

				<View>
					<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
						<View>
							<Image style={{ width: 50, height: 50 }} source={{ uri: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/shop-icon.png' }} />
						</View>
						<View style={{ marginLeft: 20 }}>
							<Text style={{ fontSize: 18, marginLeft: 0, fontWeight: 'bold', color: 'gray' }}> Singapore </Text>
							<Text style={{ fontSize: 18, marginLeft: 0, fontWeight: 'bold', color: 'gray' }}> Supermarket</Text>
							<Text style={{ justifyContent: 'center', textAlign: 'justify', alignItems: 'center' }}>
								<Image style={{ width: 50, height: 50 }} source={{ uri: 'http://www.free-icons-download.net/images/location-icon-61664.png' }} />
								<Text style={{ fontSize: 10, textAlign: 'justify', marginLeft: 10 }}> {this.state.address}</Text>
							</Text>
						</View>
					</View>

				</View>

				<View style={{ marginTop: 15, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<View style={{ flex: 1, flexDirection: 'row' }} >
							<Text style={{ fontSize: 15, fontWeight: 'normal' }}> You have </Text><Text style={{ fontSize: 15, fontWeight: 'bold', color: 'orange' }}>{this.state.len}</Text><Text style={{ fontSize: 15, fontWeight: 'normal' }}> item in your bag. </Text>
						</View>
					</View>
				</View>

				<View style={{ flex: 1, marginTop: 5 }}>
					<ListView

						dataSource={this.state.dataSource}
						renderRow={(rowData) =>
                            
							<View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', padding: 10, marginTop: 10 }} >

								<TouchableOpacity>
									<View style={{ flex: 1, flexDirection: 'row' }}>
										<Text style={{ color: 'red', fontSize: 14 }}>Product: </Text><Text style={{ fontSize: 13 }} >{rowData.product.title}</Text>
									</View>

									<View style={{ flex: 1, flexDirection: 'row' }}>
										<Text style={{ color: 'black', fontSize: 13 }}>Quantity: </Text><Text style={{ flex:1, color: 'orange', fontSize: 13 }} >{rowData.qty}</Text>
										<Text style={{ color: 'black', fontSize: 13 }}>Discount: </Text><Text style={{ fontSize: 13 }} >{rowData.discount}</Text>
									</View>
									
									<View style={{ flex: 1, flexDirection: 'row' }}>
										<Text style={{ color: 'black', fontSize: 13 }}>Per Item Price: </Text><Text style={{ flex: 1, fontSize: 13 }} >{rowData.price}</Text>
										<Text style={{ color: 'black', fontSize: 13 }}>Price: </Text><Text style={{ color: 'orange', fontSize: 13 }} >{rowData.price*rowData.qty}</Text>
									</View>
								</TouchableOpacity>

							</View>
                        }
					/>
				</View>
				<View style={{ backgroundColor: 'white', marginTop: 5 }}>
					<View style={{ flexDirection: 'row', paddingBottom: 0, marginTop: 5, }}>
						<Text style={{ fontSize: 15, marginLeft: 10, }}>Total Amount</Text>
						<Text style={{ color: 'orange', fontSize: 15, marginRight: 15, position: 'absolute', right: 0 }}>${this.state.total.toFixed(2)}</Text>
					</View>
					<View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 5, margin: 10 }}>
						<Text style={{ fontSize: 15, marginLeft: 0, }}>Total Saving</Text>
						<Text style={{ color: 'orange', fontSize: 15, marginRight: 5, position: 'absolute', right: 0 }}>${this.state.save.toFixed(2)}</Text>
					</View>
					<View style={{ flexDirection: 'row', paddingBottom: 10, marginTop: 0, }}>
						<Text style={{ fontSize: 15, marginLeft: 10, }}>Net Payable</Text>
						<Text style={{ color: 'orange', fontSize: 15, marginRight: 15, position: 'absolute', right: 0 }}>${(this.state.total - this.state.save).toFixed(2)}</Text>
					</View>
				</View>

				<View style={{ marginTop: 10 }} >
					<Button
						onPress={this._done_payment.bind(this)}
						color={this.state.color}
						title={this.state.btntext} />
				</View>

				<Toast ref="toast"
					position='top'
					style={{ backgroundColor: 'red' }} />
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

export default BasketScreen;