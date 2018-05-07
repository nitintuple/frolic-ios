import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator,TabBarBottom , StackNavigator} from 'react-navigation';
import Dashboard from './ApplicationTabs/Dashboard.js';
import BasketScreen from './ApplicationTabs/BasketScreen.js';
import HistoryScreen from './ApplicationTabs/HistoryScreen.js';
import ProfileScreen from './ApplicationTabs/ProfileScreen.js';
import EditProfile from './ApplicationTabs/EditProfile.js';

const TabsVisit =  TabNavigator({
  Dashboard: { screen: Dashboard },
  Basket: { screen: BasketScreen },
  History: { screen: HistoryScreen },
  Profile: { screen: ProfileScreen },
},{
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      style: {
			backgroundColor: 'white',
		}
    }
});



export default class AppTabs extends React.Component {
  
  static navigationOptions = {
  	title: 'Dashboard',
  };

  render() {
    return <TabsVisit />;
  }
}