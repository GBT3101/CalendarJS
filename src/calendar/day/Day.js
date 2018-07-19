import React, { Component } from 'react';
import './Day.css';

class Day extends Component {

  render() {
    const {dayValue, enabled, datePickedCallback, index, picked} = this.props;
    return (
      <div className={`DayContainer ${enabled? 'Enabled' : 'Disabled'} ${picked? 'picked' : 'unpicked'}`}>
        <div className="Day" onClick={() => enabled && datePickedCallback({date: dayValue, index})}>
          {dayValue ? dayValue.format('D') : 'no day'}
        </div>
      </div>
    );
  }
}

export default Day;
