import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Button, ScrollView, Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 0, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};

const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const data2 = {
  labels: ["Test11", "Test22", "Test33"],
  legend: ["L1", "L2", "L3"],
  data: [[60, 60, 60], [30, 30, 60], [60, 30, 60]],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
};

const commitsData = [
  { date: "2017-01-02", count: 1 },
  { date: "2017-01-03", count: 2 },
  { date: "2017-01-04", count: 3 },
  { date: "2017-01-05", count: 4 },
  { date: "2017-01-06", count: 5 },
  { date: "2017-01-30", count: 2 },
  { date: "2017-01-31", count: 3 },
  { date: "2017-03-01", count: 2 },
  { date: "2017-04-02", count: 4 },
  { date: "2017-03-05", count: 2 },
  { date: "2017-02-30", count: 4 }
];

class HomeScreen extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      textInit: "Hello",
      contador : 0,
      dataPieChart: []
    };
  }
  
    componentDidMount() {
      this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
          const url = `http://10.74.178.95:3000/api/reactnative`;
          fetch(url)
          .then(res => res.json())
          .then(res => {
             console.log(res.data);
                this.setState({
                      dataPieChart: res.data,
                      error: res.error || null,
                });   
          })
          .catch(error => {
                this.setState({ error, loading: false });
          });
    };
    makeRemoteRequestDos = () => {
      const url = 'http://10.74.178.95:3000/api/reactnative';
          fetch(url)
          .then(res => res.json())
          .then(res => {
              console.log(res);
              Alert.alert(
                'Alert Title',
                'text'
                
              );
                /*this.setState({
                      dataPieChart: res.data,
                      error: res.error || null,
                });   */
          })
          .catch(error => {
                //this.setState({ error, loading: false });
                
          });
         
      
};
    

  render(){
    return (
      <ScrollView>
      <View style={ styles.container }>
        <Text> { this.state.textInit } </Text>
        <Text> { this.state.contador } </Text>
        <Button style={ styles.buttonStyle }
          title="Go to Details"
          onPress = { this.showAlert }
          ></Button>
          <Button style={ styles.buttonStyle }
          title="Aumentar contador"
          onPress = { this.aumentaContador }
          ></Button>
          <Button
          title="Go to Details..."
          onPress={styles.buttonStyle}
          />
          <Button
          title="Go to makeRemoteRequest"
          onPress={this.makeRemoteRequestDos}
          />
          <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={screenWidth} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />

        <PieChart
          data={this.state.dataPieChart}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

     

        <StackedBarChart
          data={data2}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />

        <ContributionGraph
          values={commitsData}
          endDate={new Date("2017-04-01")}
          numDays={105}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
      </ScrollView>
    );
  }

  aumentaContador = () => {
    this.setState({
      contador: this.state.contador + 1,
    }); 
  }

  showAlert = () => {
     Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle:{
    padding: 40,
  }
});

export default AppContainer;