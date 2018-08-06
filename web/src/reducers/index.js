import { combineReducers } from 'redux';
import alertsReducer from './AlertsReducer'
import activeAlertReducer from './ActiveAlertReducer'

const rootReducer = combineReducers({
  alert: activeAlertReducer,
  alerts: alertsReducer,
});

export default rootReducer;
