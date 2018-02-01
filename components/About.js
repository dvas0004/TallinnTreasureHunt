import React, {Component} from 'react';
import { View,
  Text,
  StyleSheet,
  Image,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { changeModal } from '../actions';

class About extends Component {

  constructor(props) {
    super(props);

  }

  render () {

    return (
      <View style={{ alignItems: 'center' }}>

        <View style={styles.tutorialContainer}>
          <Image
            style={styles.icon}
            source={require('../img/heart.png')}
          />

          <Text style={{ padding:10 }}>
            This app was made with love by David Vassallo davevassallo (at) gmail.com
          </Text>

          <Image
            style={styles.icon}
            source={require('../img/react_native.png')}
          />

          <Text style={{ padding:10 }}>
            Using React Native and the fantastic work of hundreds of developers across the world...
          </Text>

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
)(About)
