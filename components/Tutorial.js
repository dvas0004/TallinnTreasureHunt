import React, {Component} from 'react';
import { View,
  Text,
  StyleSheet,
  Image,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { changeModal } from '../actions';

class Tutorial extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      page: 1
    };

  }

  render () {

    var tutorialView = null;

    if (this.state.page == 1) {
      tutorialView = <View style={styles.tutorialContainer}>
        <Image
          style={styles.icon}
          source={require('../img/question.png')}
        />

        <Text style={{fontWeight: "bold", fontSize: 20}}>
          Welcome to Tallinn Treasure Hunt!
        </Text>
        <Text style={{fontSize: 20, padding:10 }}>
          Your objective is simple: Roam the streets of Tallinn to
          answer as many puzzle questions as you can!
        </Text>

      </View>
    } else if (this.state.page == 2) {
      tutorialView = <View style={styles.tutorialContainer}>
        <Image
          style={styles.icon}
          source={require('../img/map.png')}
        />

        <Text style={{ padding:10 }}>
          Using the map, you can see where your current position is, and where
          puzzles are located in Tallinn. Walk towards these puzzles and when close,
          tap on the puzzle. You will be asked a question that has several answer options
          to choose from.
        </Text>

        <Text style={{ padding:10, color: "red" }}>
          Your position is marked in red
        </Text>

        <Text style={{ padding:10, color: "blue" }}>
          Unanswered puzzles are marked in blue
        </Text>

        <Text style={{padding:10, color: "green" }}>
          Answered puzzles are marked in green
        </Text>

      </View>
    } else if (this.state.page == 3) {
      tutorialView = <View style={styles.tutorialContainer}>
        <Image
          style={styles.icon}
          source={require('../img/compass.png')}
        />

        <Text style={{ padding:10 }}>
          You have a couple of tools at your disposal to help answer the puzzles...
          For example you have compass you can access from the side menu (swipe right)
        </Text>

      </View>
    } else if (this.state.page == 4) {
      tutorialView = <View style={styles.tutorialContainer}>
        <Image
          style={styles.icon}
          source={require('../img/qr-code.png')}
        />

        <Text style={{ padding:10 }}>
          You also have a QR code scanner to help answer some of the puzzles...
          you can also access this from the side menu (swipe right)
        </Text>

        <Text style={{fontWeight: "bold", fontSize: 20}}>
          Good luck!
        </Text>

      </View>
    }

    let nextButton = <Button style={styles.button}
        onPress={() => {
          const newPage = this.state.page + 1;
          this.setState({
            page: newPage
          })
        }}
        title="Next"
    >
    </Button>

    return (
      <View style={{ alignItems: 'center' }}>

        {tutorialView}

        <View style={{flexDirection:"row"}}>

          <View style={{margin: 5}}>

            { this.state.page == 4 ? null : nextButton }

          </View>

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
)(Tutorial)
