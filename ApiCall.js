import React from 'react';
import { FlatList, ActivityIndicator, Alert, Text, View  } from 'react-native';

class FetchExample extends React.Component {
  
  static navigationOptions=
  {
  title: 'Movies List',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

//Function used for Get Request
  // componentDidMount(){
  //   return fetch('https://facebook.github.io/react-native/movies.json')
  //     .then((response) => response.json())
  //     .then((responseJson) => {

  //       this.setState({
  //         isLoading: false,
  //         dataSource: responseJson.movies,
  //       }, function(){

  //       });

  //     })
  //     .catch((error) =>{
  //       console.error(error);
  //     });
  // }

//Function used for POST Request
 componentDidMount(){
    return fetch('http://apifrolic.tuple-mia.com:8003/users/api/login/',{
      method: 'POST',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },body: '{"username":"boy","password":"123456"}'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("User Details: "+responseJson.username+"\n"+responseJson.role);
        this.setState({
          isLoading: false,
          dataSource: responseJson.username,

        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


// componentDidMount{
//   return fetch('http://apifrolic.tuple-mia.com:8003/users/api/login/', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: '{"username":"boy","password":"123456"}',
// }).then((response) => response.json())
//   .then((responseJson) => {

//         this.setState({
//           isLoading: false,
//           dataSource: responseJson,
//         }, function(){

//         });

//       })
//       .catch((error) =>{
//         console.error(error);
//       });
// }


  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default FetchExample;
