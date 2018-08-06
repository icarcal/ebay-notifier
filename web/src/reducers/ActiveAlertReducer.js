import { SELECT_ALERT } from '../actions/Alert';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_ALERT:
      return action.payload;
    default:
      return state;
  }
}
