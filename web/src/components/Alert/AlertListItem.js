import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectAlert, deleteAlert } from '../../actions/Alert';
import './AlertList.css';

class AlertListItem extends Component {
  render() {
    const { alert } =  this.props;

    return (
      <tr>
        <th scope="row">{ alert._id }</th>
        <td>{ alert.email }</td>
        <td>{ alert.frequency } minutes</td>
        <td>{ alert.term }</td>
        <td>
          <div>
            <button type="button" className="btn btn-sm btn-info" onClick={ (e) => this.editAlert() }>Edit</button>
            <button type="button" className="btn btn-sm btn-danger" onClick={ (e) => this.deleteAlert() }>Delete</button>
          </div>
        </td>
      </tr>
    );
  }

  editAlert() {
    const { alert } = this.props;
    this.props.selectAlert(alert);
  }

  deleteAlert() {
    const { alert } = this.props;
    this.props.deleteAlert(alert);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectAlert,
    deleteAlert
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AlertListItem);
