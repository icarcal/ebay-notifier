import React, { Component } from 'react';
import './AlertList.css';

class AlertListItem extends Component {
  render() {
    const { alert, editAlert, deleteAlert } =  this.props;

    return (
      <tr>
        <th scope="row">{ alert._id }</th>
        <td>{ alert.email }</td>
        <td>{ alert.frequency } minutes</td>
        <td>{ alert.term }</td>
        <td>
          <div>
            <button type="button" className="btn btn-sm btn-info" onClick={ (e) => editAlert(alert) }>Edit</button>
            <button type="button" className="btn btn-sm btn-danger" onClick={ (e) => deleteAlert(alert) }>Delete</button>
          </div>
        </td>
      </tr>
    );
  }
}

export default AlertListItem;
