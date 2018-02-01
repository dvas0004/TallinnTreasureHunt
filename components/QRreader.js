import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Text,
  TouchableHighlight,
  View,
  Vibration,
  Alert,
  Button
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import { changeModal } from '../actions';

class QRreader extends Component {

  closeModal() {
    console.log("Closing Modal...");
    this.props.changeModal(false);
  }

  onBarCodeRead = (e) => {
    Vibration.vibrate(1000);
    Alert.alert(
      'QR Code Scanned',
      e.data,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
    console.log(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );
  }

  render() {
    return (
      <QRCodeScanner
        topContent={(
            <Text>
              Scan the QR code.
            </Text>
          )}
        bottomContent={(
            <Button
                onPress={() => this.closeModal()}
                title="Close"
            >
            </Button>
        )}
        onRead={this.onBarCodeRead.bind(this)}
      />
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
    changeModal: (data) => dispatch(changeModal(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRreader)
