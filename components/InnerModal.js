import React, {Component} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { changeModal } from '../actions';

import QRreader from './QRreader';
import Compass from './Compass';
import Tutorial from './Tutorial';
import About from './About';
import Position from './Position';
import CorrectAnswer from './CorrectAnswer.js'
import WrongAnswer from './WrongAnswer.js'


class InnerModal extends Component {

  constructor(props) {
    super(props);
  }


  closeModal() {
    console.log("Closing Modal...");
    this.props.changeModal(false);
  }

  render () {

    buttonView = <Button
        onPress={() => this.closeModal()}
        title="Close"
    >
    </Button>

    if (this.props.curView == null) {
      curComponent = null;
      buttonRequired = true;
    } else if (this.props.curView == "QRreader") {
      curComponent = <QRreader />;
      buttonRequired = false;
    } else if (this.props.curView == "Compass") {
      curComponent = <Compass />;
      buttonRequired = true;
    } else if (this.props.curView == "Tutorial") {
      curComponent = <Tutorial />;
      buttonRequired = false;
    } else if (this.props.curView == "About") {
      curComponent = <About />;
      buttonRequired = false;
    } else if (this.props.curView == "Position") {
      curComponent = <Position />;
      buttonRequired = false;
    } else if (this.props.curView == "CorrectAnswer") {
      curComponent = <CorrectAnswer />;
      buttonRequired = false;
    } else if (this.props.curView == "WrongAnswer") {
      curComponent = <WrongAnswer />;
      buttonRequired = false;
    }


    return (
      <View style={styles.innerContainer}>
        <View>
          {curComponent}
        </View>
        <View>
          {buttonRequired ? buttonView : null}
        </View>
      </View>
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

const styles = StyleSheet.create({
  innerContainer: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center',
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InnerModal)
