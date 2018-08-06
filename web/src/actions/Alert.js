import axios from 'axios';
import { API_URL } from '../configs'

export const FETCH_ALERTS = 'FETCH_ALERTS';
export const SELECT_ALERT = 'SELECT_ALERT';
export const CREATE_ALERT = 'CREATE_ALERT';
export const UPDATE_ALERT = 'UPDATE_ALERT';
export const DELETE_ALERT = 'DELETE_ALERT';

export function fetchAlerts() {
  const notificationUrl = `${API_URL}/notification`;
  const request = axios.get(notificationUrl);

  return {
    type: FETCH_ALERTS,
    payload: request,
  };
}

export function selectAlert(alert) {
  return {
    type: SELECT_ALERT,
    payload: alert,
  };
}


export function createAlert(alert) {
  const notificationUrl = `${API_URL}/notification/`;
  const request = axios.post(notificationUrl, alert);

  return {
    type: CREATE_ALERT,
    payload: request,
  };
}

export function updateAlert(alert) {
  const notificationUrl = `${API_URL}/notification/${alert._id}`;
  const request = axios.put(notificationUrl, alert);

  return {
    type: UPDATE_ALERT,
    payload: request,
  };
}

export function deleteAlert(alert) {
  const notificationUrl = `${API_URL}/notification/${alert._id}`;
  const request = axios.delete(notificationUrl);

  return {
    type: DELETE_ALERT,
    payload: request,
  };
}
