import React from 'react';
import BookingTable from './booking.jsx';
import TrainerTable from './trainerTable.jsx';
import Pending from './pending.jsx';
import Confirmed from './confirmed.jsx';
import _ from 'lodash';
import $ from 'jquery';
import css from './home.css';

//This is just a placeholder for the userdashboard. Signing in/up for a user should redirect them to the trainer table componenet.
class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: [],
      pending: []
    };
  }
     
  updateBookings() {
    $.get('/api/userBookings').done((bookings) => {
      console.log('userBookings ----------------', bookings);
      var confirmedBookings = [];
      var pendingBookings = [];
      bookings.forEach(function(booking) {
        if (booking.isBooked) {
          confirmedBookings.push(booking);
        } else {
          pendingBookings.push(booking);
        }
      });
      this.setState({
        confirmed: confirmedBookings,
        pending: pendingBookings
      });
      console.log('this is the pending state--------', this.state.pending);
    });
  }
   
  componentDidMount() {
    this.updateBookings();
  }

  render() {
    return (
      <div>
        <div className="dash-body">
          <div className="dash-container w-container">
            <h1>Your Dashboard</h1>
            <TrainerTable />
          </div>
        </div>

        <h2>Bookings</h2>
        <div className="dash-container w-col w-col-6" id="confirmed">
          <center><h1 id="pendingTitle">Confirmed Bookings</h1></center>
          <BookingTable booking={this.state.confirmed} RequestType={Confirmed} type={'user'} /> 
        </div>

        <div className="dash-container w-col-6" id="pending">
          <center><h1 id="pendingTitle">Pending Bookings</h1></center>
          <BookingTable booking={this.state.pending} RequestType={Pending} type={'user'} />   
        </div> 
      </div>
    ); 
  }  
}
export default UserDash;