import React, { Component } from 'react';

class AlertForm extends Component {
  render() {
    const { alert, create, updateState, sendAlert, cancelAlert } = this.props;

    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="email">Email</label>
          <div className="col-sm-7">
            <input type="email" className="form-control" id="email" placeholder="Enter email" value={ alert.email } onChange={ (e) => { updateState('email', e.target.value) } } />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="keyword">Keyword</label>
          <div className="col-sm-7">
            <input type="text" className="form-control" id="keyword" placeholder="Keyword" value={ alert.term } onChange={ (e) => { updateState('term', e.target.value) } } />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="keyword">Frequency</label>
          <div className="col-sm-7">
            <select className="custom-select" value={ alert.frequency }  onChange={ (e) => { updateState('frequency', e.target.value) } } >
              <option value="2">2 minutes</option>
              <option value="5">5 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success"
          onClick={ (e) => { e.preventDefault(); sendAlert(alert); } }>{ create ? 'Create a new ' : 'Update'  } alert</button>

        <button
          type="button"
          className="btn btn-light"
          onClick={ (e) => cancelAlert() }>Cancel</button>
      </form>
    );
  }
}

export default AlertForm;
