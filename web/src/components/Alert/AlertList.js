import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../configs'
import AlertListItem from './AlertListItem'
import AlertForm from './AlertForm'

class AlertList extends Component {

  constructor(props) {
    super(props);

    this.defaultAlert = {
      email: '',
      term: '',
      frequency: '2'
    };

    this.state = {
      alerts: [],
      oldAlert: {},
      alert: { ...this.defaultAlert },
      editing: false,
      create: false,
      update: false,
    }

    this.renderAlerts = this.renderAlerts.bind(this);
    this.renderAlertForm = this.renderAlertForm.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.editAlert = this.editAlert.bind(this);
    this.updateState = this.updateState.bind(this);
    this.cancelAlert = this.cancelAlert.bind(this);
    this.sendAlert = this.sendAlert.bind(this);
  }

  componentDidMount() {
    const notificationUrl = `${API_URL}/notification`;

    axios.get(notificationUrl).then((response) => {
      const { alerts } = response.data;
      this.setState({ alerts });
    });
  }

  renderAlerts() {
    const { alerts } = this.state;

    return alerts.map((alert) => {
      return <AlertListItem
        key={ alert._id }
        alert={ alert }
        deleteAlert={ this.deleteAlert }
        editAlert={ this.editAlert } />
    });
  }

  renderAlertForm() {
    return <AlertForm
      alert={ this.state.alert }
      create={ this.state.create }
      update={ this.state.update }
      updateState={ this.updateState }
      cancelAlert={ this.cancelAlert }
      sendAlert={ this.sendAlert } />
  }

  createAlert() {
    this.setState({
      editing: true,
      create: true,
      alert: { ...this.defaultAlert },
      oldAlert: { ...this.defaultAlert }
    })
  }

  editAlert(alert) {
    const oldAlert = { ...alert };

    this.setState({
      alert,
      oldAlert,
      editing: true,
      update: true,
    });
  }

  sendAlert(alert) {
    const notificationUrl = (this.state.update) ? `${API_URL}/notification/${alert._id}` : `${API_URL}/notification/`;
    const { alerts } = this.state;
    const method = (this.state.update) ? 'put' : 'post';

    axios[method](notificationUrl, alert).then((response) => {
      const state = {
        editing: false,
        create: false,
        update: false,
      };

      if (!this.state.update) {
        const { _id } = response.data;
        alert._id = _id;
        const newState = [ ...this.state.alerts, alert ];
        return this.setState({
          alerts: newState,
          ...state,
        });
      }

      const newState = alerts.map((alertMap) => {
        if (alertMap._id === alert._id) {
          return alert;
        }

        return alertMap;
      });

      this.setState({
        alerts: newState,
        ...state,
      });
    });
  }

  cancelAlert() {
    const alert = { ...this.state.alert };

    this.setState({
      alert,
      oldAlert: {},
      editing: false,
      create: false,
      update: false,
    });
  }

  deleteAlert(alert) {
    const notificationUrl = `${API_URL}/notification/${alert._id}`;
    const { alerts } = this.state;

    axios.delete(notificationUrl).then(() => {
      const newState = alerts.filter((alertFilter) => alertFilter._id !== alert._id);

      this.setState({ alerts: newState });
    });
  }

  updateState(field, value) {
    const alert = { ...this.state.alert };

    alert[field] = value;

    this.setState({ alert });
  }

  render() {
    const { editing } = this.state;

    if (editing) {
      return (
        <div className="row my-3">
          <div className="col">
            { this.renderAlertForm() }
          </div>
        </div>
      );
    }

    return (
      <div className="wrapper">
        <div className="row my-3">
          <div className="col">
            <button
                className="btn btn-dark"
                onClick={ (e) => this.createAlert() }
                >Add new alert</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">Frequency</th>
                  <th scope="col">Keyword</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.renderAlerts() }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AlertList;
