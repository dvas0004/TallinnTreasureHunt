/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Image,
  Dimensions
} from 'react-native';

import { PermissionsAndroid } from 'react-native';
import { puzzleData, userData, changeModal } from './actions';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import SideMenu from 'react-native-side-menu';

import WatchGeoPosition from './components/watchGeoPosition';
import TreasureHuntMap from './components/TreasureHuntMap';
import PuzzleView from './components/PuzzleView';
import InnerModal from './components/InnerModal';
import Menu from './components/Menu';

// import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Tallinn Treasure Hunt',
        'message': 'Tallinn Treasure Hunt needs access to your location ' +
                   'so you can find puzzles.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use location")
    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}


class App extends Component {

  constructor(props) {
    super(props);

    this.puzzlesRef = firebase.database().ref();
    this.puzzlesRef.keepSynced(true);

    this.state = {
      user: this.props.appData && this.props.appData.user || null,
    };
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  listenForPuzzles(puzzlesRef) {
    puzzlesRef.on('value', (snap) => {
      console.log("Got Database Snapshot:");
      console.log(snap.val());
      this.props.puzzleData(snap.val());
      console.log("Database Children:");
      snap.forEach((child) => {
        console.log(child.val());
      });

    });
  }

  // listenForAddingItems(puzzlesRef) {
	// 	this.puzzlesRef.on('child_added',  (snap) => {
  //     console.log("Got Database Child Added:");
	// 		console.log(snap.val());
	// 	});
  // }



  componentDidMount(){
    requestLocationPermission();
    firebase.auth().signInAnonymously()
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        const userID = currentUser.uid;
        this.props.userData(userID);
        console.log("Current User:");
        console.log(userID);

        this.listenForPuzzles(this.puzzlesRef);

        // this.listenForAddingItems(this.puzzlesRef);

      }).catch((err) => {
        console.log(err);
      });

  }

  openModal() {
    console.log("Opening Modal...");
    this.props.changeModal(true);
  }

  closeModal() {
    console.log("Closing Modal...");
    this.props.changeModal(false);
  }

  onMenuItemSelected = item => {
    this.setState({
      sideMenuIsOpen: false,
      curView: item,
    });
    this.openModal();
  }


  render() {

    const menu = <Menu onItemSelected={this.onMenuItemSelected} userName={this.props.appData.user} />;

    var curView = this.state.curView || null;
    var showModal = this.props.appData && this.props.appData.modalVisible || false

    var modalView = <Modal
          visible={showModal}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
      >
      <View style={styles.modalContainer}>
          <InnerModal curView={curView} />
      </View>
    </Modal>

    return (

      <SideMenu
        menu={menu}
        isOpen={this.state.sideMenuIsOpen || false}
      >

        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>

          <View style={styles.textcontainer}>

            <Image
              style={styles.icon}
              source={require('./img/logo.png')}
            />

            <Text style={{fontWeight: "bold", fontSize: 20}}>
              Welcome to the Tallinn Treasure Hunt!
            </Text>

          </View>

          <PuzzleView style={styles.textcontainer} changeModalView={this.onMenuItemSelected} />
          <WatchGeoPosition style={styles.textcontainer} />



          <View style ={styles.container}>

            <TreasureHuntMap />

          </View>

          {modalView}


        </View>
      </SideMenu>
    );
  }
}

const {winHeight, winWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  textcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    height: 400,
    width: winWidth
  },
  modalContainer: {
     flex: 1,
     justifyContent: 'center'
  },
  icon: {
    width: 64,
    height: 64,
    padding: 10
  }
});

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    puzzleData: (data) => dispatch(puzzleData(data)),
    userData: (data) => dispatch(userData(data)),
    changeModal: (data) => dispatch(changeModal(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
