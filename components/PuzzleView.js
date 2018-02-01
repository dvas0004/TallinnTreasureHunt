import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Picker
} from 'react-native';
import {
  Card,
  ListItem,
  Button
} from 'react-native-elements'
import { correctAnswer, changeModal } from '../actions';
import Vincenty from '../utils/vincenty.js'

class PuzzleView extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    let selected_puzzle = this.props.appData && this.props.appData.puzzle_selected || null;
    console.log("selected_puzzle");
    console.log(selected_puzzle);

    let puzzle_question = null;
    let puzzle_question_view =null;
    let puzzle_answers = null;
    let puzzle_distance = null;

    if (selected_puzzle) {
      const puzzle = this.props.appData.puzzles[selected_puzzle];


      puzzle_distance = Vincenty(puzzle.lat, puzzle.long, this.props.appData.position.latitude, this.props.appData.position.longitude);

      if (puzzle_distance > 50000) {
        puzzle_question = "Please get closer to the puzzle, you'll need physical clues to answer the question!";
      } else {
        puzzle_question = puzzle.question;


        let pickerItems = [];
        let answers = puzzle.answer;

        pickerItems.push(
          <Picker.Item label="Please Select an Answer..." value="9999" key="9999" />
        )

        for (var i=0; i< answers.length; i++){
          pickerItems.push(
            <Picker.Item label={answers[i]} value={i} key={i} />
          )
        }

        puzzle_answers = <Picker
          onValueChange={(itemValue, itemIndex) => {

            console.log("Answer Selected");
            console.log(itemIndex);
            console.log(itemValue);
            console.log(puzzle.rightAnswer);

            if (itemValue == puzzle.rightAnswer){

              this.props.correctAnswer(selected_puzzle);
              this.props.changeModalView("CorrectAnswer");

            } else {
              this.props.changeModalView("WrongAnswer");
            }

          }}>
          {pickerItems}
        </Picker>

        puzzle_question_view = <Card
          title='Puzzle Question'
        >
          <Text style={{marginBottom: 10}}>
            {puzzle_question}
          </Text>
          <View>
            {puzzle_answers}
          </View>
        </Card>


      }


    }

    return (

      <View>

        <View>

          {puzzle_question_view}

        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{padding: 5}}>
            {puzzle_distance ? `You are ${puzzle_distance}m away from the puzzle` : null}
          </Text>
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
    correctAnswer: (data) => dispatch(correctAnswer(data)),
    changeModal: (data) => dispatch(changeModal(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PuzzleView)
