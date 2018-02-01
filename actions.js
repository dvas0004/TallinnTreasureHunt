import { FETCHING_DATA, FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE, NEW_LOCATION, USER_DATA,
  PUZZLE_DATA, PUZZLE_SELECTED,
  CORRECT_ANSWER, MODAL_CHANGED
} from './constants'

export function getData() {
  return {
    type: FETCHING_DATA
  }
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  }
}

export function sendLocation(data) {
  return {
    type: NEW_LOCATION,
    data,
  }
}

export function userData(data) {
  return {
    type: USER_DATA,
    data,
  }
}

export function puzzleData(data) {
  return {
    type: PUZZLE_DATA,
    data,
  }
}

export function puzzleSelected(data) {
  return {
    type: PUZZLE_SELECTED,
    data,
  }
}

export function correctAnswer(data) {
  return {
    type: CORRECT_ANSWER,
    data,
  }
}

export function changeModal(data) {
  return {
    type: MODAL_CHANGED,
    data,
  }
}
