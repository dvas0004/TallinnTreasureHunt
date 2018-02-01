import { REHYDRATE } from 'redux-persist';
import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE,
  NEW_LOCATION, USER_DATA,
  PUZZLE_DATA, PUZZLE_SELECTED,
  CORRECT_ANSWER, MODAL_CHANGED
} from '../constants'

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case NEW_LOCATION:
      return {
        ...state,
        position: action.data
      }
    case USER_DATA:
      return {
        ...state,
        user: action.data
      }
    case PUZZLE_DATA:
      return {
        ...state,
        puzzles: action.data
      }
    case PUZZLE_SELECTED:
        return {
          ...state,
          puzzle_selected: action.data
        }
    case MODAL_CHANGED:
        return {
          ...state,
          modalVisible: action.data
        }
    case CORRECT_ANSWER:
        var curState = {
          ...state
        }

        var solvedPuzzles = curState.solvedPuzzles || [];
        solvedPuzzles.push(action.data);

        var curState = {
          ...state,
          solvedPuzzles: solvedPuzzles
        }

        return curState
    // case REHYDRATE:
    //   console.log("REHYDRATE");
    //   console.log(action.payload);
    //   return {
    //     action.payload
    //   };
    default:
      return state
  }
}
