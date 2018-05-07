import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Alert, Button, } from 'react-native';
import ChartView from 'react-native-highcharts';
import SInfo from 'react-native-sensitive-info';

class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'History  ',
    headerLeft: null,
  };
  
  constructor(){
    super()
        
    this.state ={
      url:"http://apifrolic.tuple-mia.com:8003/",
      userToken : '',
      this_month:'',
      last_month:'',
      three_month:'',
      six_month:'',
      a_m:[],
      p_m:[],
      filter:'',
      category:[],
      token:""
    }
  }

  componentWillMount(){
    SInfo.getItem('user_token',{}).then(value => {
    console.log('user_token '+value);
    this.setState({token : value})
    this.table_api();
    this.graph_api("week");
    });
  }
 
  _onPressButton(filt) {
    // Alert.alert(filter);
    this.setState({filter:filt})
    this.graph_api();
  }

  table_api() {
    return fetch(this.state.url+'history/api/table/',{
      method: 'GET',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Token ' + this.state.token //c81be4333708721bcc2b1a46320b81aee4036556',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        if(!responseJson.details.this_month[0]){
          responseJson.details.this_month[0]=0;
        }
        if(!responseJson.details.last_month[0]){
          responseJson.details.last_month[0]=0;
        }
        if(!responseJson.details.three_month[0]){
          responseJson.details.three_month[0]=0;
        }
        if(!responseJson.details.six_month[0]){
          responseJson.details.six_month[0]=0;
        }
        this.setState({this_month: responseJson.details.this_month[0]});
        this.setState({last_month: responseJson.details.last_month[0]});
        this.setState({three_month: responseJson.details.three_month[0]});
        this.setState({six_month: responseJson.details.six_month[0]});
        return responseJson;
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  
  graph_api(filt) {
    if(filt == "week"){
        am = Array.apply(null, Array(7)).map(function () { return 0})
        pm = Array.apply(null, Array(7)).map(function () { return 0})
        categ = ['S','M', 'T', 'W', 'T', 'F', 'S']
    }
    if(filt == "month"){
        am = Array.apply(null, Array(12)).map(function () { return 0})
        pm = Array.apply(null, Array(12)).map(function () { return 0})
        categ = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
    }
    if(filt == "year"){
    //     Alert.alert(filt)
        am = Array.apply(null, Array(2)).map(function () { return 0})
        pm = Array.apply(null, Array(2)).map(function () { return 0})
        categ = ['2018','2017']
    }

    url = this.state.url+'history/api/graph/?filter='+filt
    console.log(url)
    return fetch(url,{
      method: 'GET',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Token ' + this.state.token //c81be4333708721bcc2b1a46320b81aee4036556',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
        for(i in responseJson.details){
          if(responseJson.details[i]['am_pm']=="am")
          {
            if(filt == "year"){
              var index = categ.indexOf(responseJson.details[i][filt])
              am[index+1] = responseJson.details[i]['price']
            }
            else{
              am[responseJson.details[i][filt]] = responseJson.details[i]['price']
            }
          }
          if(responseJson.details[i]['am_pm']=="pm")
          {
            if(filt == "year"){
              var index = categ.indexOf(responseJson.details[i][filt])
              pm[index+1] = responseJson.details[i]['price']
            }
            else{
              pm[responseJson.details[i][filt]] = responseJson.details[i]['price']
            }
          }
        }
        this.setState({a_m:am})
        this.setState({p_m:pm})
        this.setState({category:categ})
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  render() {
  	var Highcharts='Highcharts';
    var conf={
            chart: {
                type: 'column',
            },
            title: {
                text: ''
            },
            xAxis: {
              tickLength: 0,
              categories: this.state.category//['S','M', 'T', 'W', 'T', 'F', 'S']
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                  enabled: true
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                // gridLineWidth: 0,
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: true,
                align: 'center',
                verticalAlign: 'bottom',
                floating: false
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
              column: {
                stacking: 'normal',
              },
              series: {
                borderRadius: 0,
                pointWidth: 10
              }
            },
            series: [{
                  name: 'AM',
                  data: this.state.a_m//[5, 3, 4, 7, 2, 1, 6]
              }, {
                  name: 'PM',
                  data: this.state.p_m//[2, 2, 3, 2, 1, 5, 4]
              }]
        };
 
    const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        },
        colors: ['#058DC7', '#50B432']
    };
   
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Text>History!</Text>
      // </View>
    <ScrollView style={{padding:15}}>
        <View style={{backgroundColor:'#ffffff', borderRadius:5}}>
          <View><Text style={{fontSize: 15, marginLeft:10, marginTop:10}}>Billing & Collection</Text></View>
          <View style={{flexDirection: 'row',margin:10, paddingBottom:20, borderColor:'gray', borderBottomWidth:2, borderRadius: 0.5}}>
            <Text style={{fontSize: 10, marginLeft:5, marginTop:10}}>April, 2018</Text>
            <View style={{flexDirection: 'row',marginRight: 0, position: 'absolute', right: 0}}>
              <View style={{paddingLeft:5}}><Button onPress={this.graph_api.bind(this,"week")} title="Week" testID="week"/></View>
              <View style={{paddingLeft:5}}><Button onPress={this.graph_api.bind(this,"month")} title="Month" testID="Month"/></View>
              <View style={{paddingLeft:5}}><Button onPress={this.graph_api.bind(this,"year")} title="Year" testID="year"/></View>
            </View>
          </View>
          <ChartView style={{height:200}} config={conf} options={options}></ChartView>
          <View style={{paddingLeft:40,paddingRight:40,paddingBottom:0}}>
          </View>
        </View>

        <View style={{backgroundColor:'#ffffff',marginTop:10,marginBottom:30, borderRadius:5}}>
          <View style={{flexDirection: 'row', borderBottomWidth: 1, paddingBottom:20, marginTop:10, margin:10}}>
            <Text style={{fontSize: 20, marginLeft:0, marginTop:10}}>Billing & Collection</Text>
            <Text style={{fontSize: 20, marginLeft:10, marginTop:10,right:-60}}>Amount</Text>
          </View>
          <View style={{flexDirection: 'row', borderBottomWidth: 1, paddingBottom:10, marginTop:10, margin:10}}>
            <Text style={{fontSize: 15, marginLeft:0,}}>This Month</Text>
            <Text style={{fontSize: 15, marginRight:15, position: 'absolute', right: 0}}>${this.state.this_month}</Text>
          </View>
          <View style={{flexDirection: 'row', borderBottomWidth: 1, paddingBottom:10, marginTop:10, margin:10}}>
            <Text style={{fontSize: 15, marginLeft:0,}}>Last Month</Text>
            <Text style={{fontSize: 15, marginRight:15, position: 'absolute', right: 0}}>${this.state.last_month}</Text>
          </View>
          <View style={{flexDirection: 'row', borderBottomWidth: 1, paddingBottom:10, marginTop:10, margin:10}}>
            <Text style={{fontSize: 15, marginLeft:0,}}>Three Month</Text>
            <Text style={{fontSize: 15, marginRight:15, position: 'absolute', right: 0}}>${this.state.three_month}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom:10, marginTop:10, margin:10}}>
            <Text style={{fontSize: 15, marginLeft:0,}}>Six Month</Text>
            <Text style={{fontSize: 15, marginRight:15, position: 'absolute', right: 0}}>${this.state.six_month}</Text>
          </View>
        </View>
    </ScrollView>
    );
  }
}

export default HistoryScreen;