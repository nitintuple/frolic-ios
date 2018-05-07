import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Svg,{ Use, Defs, Stop, Image, } from 'react-native-svg';

type Props = {};
class SwiperPage extends Component<Props> {

  static navigationOptions = {
    header: { visible: false } // !!! Hide Header
  }
  
  _onPressButton() {
    Alert.alert('button clicked');
  }
  
  render() {
    return (

      <View>
        <View style={{height:525}}>
          <Swiper style={styles.wrapper} showsButtons={false} showsPagination ={true} loop={false}>
            <View style={{padding:0,margin:0}}>
              <Svg width="300" height="500">
                 <Image width="100%" height="100%" href={require('./image/screen_1.png')}/>
              </Svg>
            </View>

            <View>
              <Svg width="300" height="500">
                 <Image width="100%" height="100%" href={require('./image/screen_2.png')}/>
              </Svg>
            </View>

            <View>
              <Svg width="300" height="500">
                 <Image width="100%" height="100%" href={require('./image/screen_3.png')}/>
              </Svg>
            </View>
            
            <View>
              <Svg width="300" height="500">
                 <Image width="100%" height="100%" href={require('./image/screen_4.png')}/>
              </Svg>
            </View>
          </Swiper>
        </View>
        <View style={{height:10}}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="Skip"
            color="#841584"
          />
        </View>
      </View>
	);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  wrapper: {
    flex: 1,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default SwiperPage;