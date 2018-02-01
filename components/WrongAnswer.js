import React, {Component} from 'react';
import { View,
  Text,
  StyleSheet,
  Image,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { changeModal } from '../actions';

class WrongAnswer extends Component {

  constructor(props) {
    super(props);

  }

  render () {

    return (
      <View style={{ alignItems: 'center' }}>

        <View style={styles.tutorialContainer}>
          <Image
            style={styles.icon}
            source={require('../img/sad.png')}
          />


          <Text style={{fontWeight: "bold", padding:10, fontSize: 20}}>
            Sorry that's the wrong answer!
          </Text>
          <Text style={{fontWeight: "bold", padding:10, fontSize: 20}}>
            Don't worry... you can try again!
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
    alignItems: "center",
    justifyContent: "center"
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
)(WrongAnswer)
