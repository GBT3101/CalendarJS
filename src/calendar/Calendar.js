import React, { Component } from 'react';
import './Calendar.css';
import moment from 'moment';
import Day from './day/Day';

class Calendar extends Component {

  constructor() {
    super();
    this.state = {
      year: moment().year(),
      month: moment().month(),
      days: [],
      selectedDate: moment()
    }
  }

  componentWillMount() {
    this.setState({days: this.createCurrentMonthDays()});
  }

  renderPreviousMonthDays() {
    let firstDay = moment().year(this.state.year).month(this.state.month).date(1).day();
    let lastMonthNumberOfDays = moment().year(this.state.year).month(this.state.month).subtract(1, 'month').daysInMonth();

    return Array(firstDay).fill(0).map((_, day) => <Day key={'p'+day} enabled={false} dayValue={moment().year(this.state.year).month(this.state.month-1).date(lastMonthNumberOfDays--)}/>).reverse();
  }

  createCurrentMonthDays() {
    let days = Array(moment().year(this.state.year).month(this.state.month).daysInMonth()).fill(0);
    return days.map((_, day) => {
      const dayValue = moment().year(this.state.year).month(this.state.month).date(day + 1);
      return (<Day enabled picked={!dayValue.startOf('day').diff(this.state.selectedDate.startOf('day'))} key={day+1} index={day} datePickedCallback={(data) => this.datePickedCallback(data)} dayValue={dayValue} />)
    })
  }

  updateCurrentMonthDays() {
    this.setState({days: this.createCurrentMonthDays(), selectedIndex: -1});
  }

  renderNextMonthDays() {
    let currentMonthNumberOfDays = moment().year(this.state.year).month(this.state.month).daysInMonth();
    let lastDay = moment().year(this.state.year).month(this.state.month).date(currentMonthNumberOfDays).day();
    let nextMonthDays = 1;

    return Array(6 - lastDay).fill(0).map((_, day) => <Day key={'n'+day} enabled={false} dayValue={moment().year(this.state.year).month(this.state.month+1).date(nextMonthDays++)}/>);
  }

  datePickedCallback({date}) {
    this.setState({selectedDate: date}, () => {
      this.updateCurrentMonthDays()
    });
  }

  changeMonth(preset) {
    this.setState({
      year: moment().month(this.state.month).add(preset, 'month').year(),
      month: moment().month(this.state.month).add(preset, 'month').month()
    }, () => {
      this.updateCurrentMonthDays()
    })
  }

  renderWeekDays() {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekDays.map(day => <div className="WeekDayLabel" key={day}>{day}</div>);
  }

  render() {
    return (
      <div className="CalendarContainer">
        <div className="CalendarHeader">
          <h3>{`${this.state.year} - ${moment().month(this.state.month).format('MMMM')}`}</h3>
        </div>
        <div onClick={() => this.changeMonth(-1)} className="backArrow arrow">
          {'<<'}
        </div>
        <div className="CalendarWeekDays">
          {this.renderWeekDays()}
        </div>
        <div className="CalendarBody">
          <div className="CalendarDays">
            {this.renderPreviousMonthDays()}
            {this.state.days}
            {this.renderNextMonthDays()}
          </div>
        </div>
        <div onClick={() => this.changeMonth(1)} className="forwardArrow arrow">
          {'>>'}
        </div>
      </div>
    );
  }
}

export default Calendar;
