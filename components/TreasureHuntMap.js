import React, {Component} from 'react';
import {
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { puzzleSelected } from '../actions';

class TreasureHuntMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      puzzleLocation: {
        longitude: null,
        latitude: null
      },
      position: this.props.appData && this.props.appData.position || {"latitude": null, "longitude": null}
    };
  }

  render () {


    const positionSource = this.props.appData && this.props.appData.position || this.state.position;
    const latitude = positionSource.latitude;
    const longitude = positionSource.longitude;

    console.log("Rendering TreasureHuntMap with:");
    console.log(this.props.appData);

    var puzzleMarkers = [];
    var solvedPuzzles = this.props.appData && this.props.appData.solvedPuzzles || [];

    for (puzzle in this.props.appData.puzzles) {
      var currentPuzzle = this.props.appData.puzzles[puzzle];
      console.log("Puzzle Loop");
      console.log(currentPuzzle);

      var currentPuzzleColor = null;

      if (solvedPuzzles.indexOf(puzzle) > -1) {
        currentPuzzleColor = "green";
      } else {
        currentPuzzleColor = "blue";
      }

      puzzleMarkers.push(<MapView.Marker
        identifier={puzzle}
        key={currentPuzzle.name}
        coordinate={{ latitude: currentPuzzle.lat, longitude: currentPuzzle.long  }}
        title={currentPuzzle.name}
        pinColor={currentPuzzleColor}
        description={currentPuzzle.question}

        onPress={(e) => {

          console.log("puzzle selected:");
          console.log(e.nativeEvent);
          this.props.puzzleSelected(e.nativeEvent.id);
          this.setState({
            puzzleLocation: {
              longitude: e.nativeEvent.coordinate.longitude,
              latitude: e.nativeEvent.coordinate.latitude
            }
          })

        }}

       />);
    }

    console.log("Puzzle Markers:");
    console.log(puzzleMarkers.length);
    console.log("--------------");

    return (
      <MapView
        style={styles.map}
        region={{
          latitude: this.state.puzzleLocation.latitude || 59.436931,
          longitude: this.state.puzzleLocation.longitude || 24.745645,
          latitudeDelta: 0.032,
          longitudeDelta: 0.032,
        }}

      >
        { latitude ? <MapView.Marker coordinate={{ latitude: latitude, longitude: longitude  }} title={"You"} description={"Your Position"} /> : null }
        {puzzleMarkers}
      </MapView>
    )

  }

}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 10
  }
});

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    puzzleSelected: (data) => dispatch(puzzleSelected(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreasureHuntMap)
