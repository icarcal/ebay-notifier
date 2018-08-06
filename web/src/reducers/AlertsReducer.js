import { FETCH_ALERTS, CREATE_ALERT, DELETE_ALERT, UPDATE_ALERT } from '../actions/Alert';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ALERTS:
      const { alerts } = action.payload.data;

      return alerts;

    case CREATE_ALERT:
      const { alert } = action.payload.data

      return [...state, alert];

    case UPDATE_ALERT:
      const updatedAlert = action.payload.data.alert;

      return state.map((stateAlert) => {
        if (stateAlert._id === updatedAlert._id) {
          return updatedAlert;
        }

        return stateAlert;
      });

    case DELETE_ALERT:
        const { _id } = action.payload.data

        return state.filter((alert) => alert._id !== _id);

    default:
      return state;
  }
}
