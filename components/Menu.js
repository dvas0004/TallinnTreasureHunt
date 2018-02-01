import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Button
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width/3*2,
    height: window.height,
    backgroundColor: '#87CEFA',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  buttonContainer: {
    margin: 10
  },
  avatar: {
    width: 48,
    height: 48,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    margin: 20,
  },
});

class Menu extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../img/ghost.png')}
          />
          <Text style={styles.name}>{this.props.userName}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.onItemSelected('About')}
            style={styles.item}
            title="About"
          >
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.onItemSelected('Tutorial')}
            style={styles.item}
            title="Tutorial"
          >
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.onItemSelected('QRreader')}
            style={styles.item}
            title="QR Code reader"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.onItemSelected('Compass')}
            style={styles.item}
            title="Compass"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.onItemSelected('Position')}
            style={styles.item}
            title="Your Position"
          />
        </View>

      </ScrollView>
    );
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
)(Menu)
