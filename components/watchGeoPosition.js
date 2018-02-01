import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { sendLocation } from '../actions'
import { connect } from 'react-redux'

class WatchGeoPosition extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log("Mounting Watch Geo Position");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.sendLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      (error) => this.props.sendLocation({
        latitude: null,
        longitude: null,
        error: error
      })
    );

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {

        var alreadySending = false;

        if (!alreadySending){
          alreadySending = true;
          console.log("Updating your position...")

          setTimeout(() => {

            this.props.sendLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null
            });

            alreadySending = false;

          }, 5000)
        }

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return false;
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
)(WatchGeoPosition)
