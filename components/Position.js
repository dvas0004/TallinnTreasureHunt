import React, {Component} from 'react';
import { View,
  Text,
  StyleSheet,
  Image,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { changeModal } from '../actions';

class Position extends Component {

  constructor(props) {
    super(props);

  }

  render () {

    const positionSource = this.props.appData.position || {
      latitude: null,
      longitude: null,
      error: null
    };
    const latitude = positionSource.latitude;
    const longitude = positionSource.longitude;


    return (
      <View style={{ alignItems: 'center' }}>

        <View style={styles.tutorialContainer}>
          <Image
            style={styles.icon}
            source={require('../img/location.png')}
          />

          <Text style={{fontWeight: "bold"}}>Your Position:</Text>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
          {positionSource.error ? <Text>Error: {positionSource.error}</Text> : null}

        </View>

        <View style={{flexDirection:"row"}}>

          <View style={{margin: 5}}>
            <Button
                onPress={() => this.props.changeModal(false)}
                title="Close"
            >
            </Button>
          </View>

        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({

  icon: {
    width: 64,
    height: 64
  },
  tutorialContainer: {
    flexDirection: "column",
    alignItems: "center"
  }

});

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeModal: (data) => dispatch(changeModal(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Position)
