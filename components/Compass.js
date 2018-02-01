import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const { DeviceEventEmitter } = require('react-native');
const ReactNativeHeading = require('react-native-heading');

class Compass extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      heading: null
    };

  }

  render () {
    return (
      <View style={{alignItems: "center"}}>

        <View >
          <Text style={{ fontSize: 15 }} >
            Your heading:
          </Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {this.state.heading && this.state.heading.compass || null}
          </Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {this.state.heading &&  this.state.heading.degrees || null} Degrees
          </Text>
        </View>

      </View>
    )
  }

  componentDidMount() {
    ReactNativeHeading.start(1)
    	.then(didStart => {
    		this.setState({
    			headingIsSupported: didStart,
    		})
  	})

    DeviceEventEmitter.addListener('headingUpdated', data => {

      var headingCompass = "N/A";
      if (data >= (365-23) || data <= 23){
          headingCompass = "North";
      } else if (data <= 68) {
          headingCompass = "North East"
      } else if (data <= 113){
          headingCompass = "East";
      } else if (data <= 158) {
          headingCompass = "South East";
      } else if (data <= 203) {
          headingCompass = "South";
      } else if (data <= 248) {
          headingCompass = "South West";
      } else if (data <= 293) {
          headingCompass = "West";
      } else if (data < (365-23)){
          headingCompass = "North West";
      }

    	this.setState({
        heading: {
          degrees: data,
          compass: headingCompass
        }
      })
    });

  }
  componentWillUnmount() {
  	ReactNativeHeading.stop();
  	DeviceEventEmitter.removeAllListeners('headingUpdated');
  }

}

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sendLocation: (data) => dispatch(sendLocation(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compass)
