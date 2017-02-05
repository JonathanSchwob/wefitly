import React from 'react';
import $ from 'jquery';
import css from './home.css';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: '',
      trainerReviewArray: [],
      reviewVisibility: {
        display: 'none'
      }
    };
  }

  getFiltered() {
    var outer = this;
    $.ajax({
      url: '/api/userSignin',
      method: 'GET',
      ContentType: 'application/json'
    }).done(function (response) {
      outer.setState({warriorName: response.firstname + ' ' + response.lastname});
      console.log(response);
    });
  }

  handleBooking(e) {

    e.preventDefault();
    $.post('/api/bookings', {
      isBooked: true,
      trainerName: this.props.firstName + ' ' + this.props.lastName,
      trainerEmail: this.props.email,
      service: this.refs.service.value,
      date: this.refs.date.value,
      duration: this.refs.duration.value
    }).done((results) => {
      console.log(results);
      $('html, body').scrollTop( $(document).height() );
      this.setState({completed: 'Booking Complete'});
      this.props.submitRequest();
    });
    this.refs.duration.value = '';
  }

  toggleReviews() {
    if (this.state.reviewVisibility.display === 'none') {
      this.setState({
        reviewVisibility: {display: 'unset'}
      });
    } else {
      this.setState({
        reviewVisibility: {display: 'none'}
      });
    }
  }

  submitReview(e) {
    e.preventDefault();
    var outer = this;
    $.ajax({
      url: '/api/reviews',
      type: 'POST',
      ContentType: 'application/json',
      data: {
        name: this.state.warriorName,
        review: this.refs.review.value,
        trainer: this.props.firstName + ' ' + this.props.lastName, //trainer-not taking into acct dupe names
      }
    }).done(function(response) {
      outer.getReviews();
      console.log('review submitted');
      outer.refs.review.value = '';
    }).fail(function(response) {
      console.log('review data transmission failure');
    });    
  }


  getReviews() {
    var outer = this;

    $.ajax({
      url: '/api/reviews',
      type: 'GET',
      data: {
        trainer: this.props.firstName + ' ' + this.props.lastName
      }
    }).done(function(response) {      
      console.log('====------====review gotten', response);
      outer.setState({
        trainerReviewArray: response
      });
    }).fail(function(response) {
      console.log('review get transmission failure');
    });  
  }

  componentDidMount() {
    this.getReviews();
    this.getFiltered();
  }
  

  render() {
    return ( 
    <div>
      <h1 onClick={this.getFiltered.bind(this)}>AH</h1>
      <li className="testimonial-row">
        <div className="row-container w-clearfix">
          <div className="row-column w-clearfix"><img className="test-image" src={this.props.pic} />
          </div>
          <div className="extended-row-column w-clearfix">
            <div className="services-container w-clearfix">
              <p className="dashboard-paragraph">Bio: {this.props.bio}</p>    
              <span> Hourly Rate: ${this.props.rate}</span>
            </div>
            <div className="services-container">
              <ul className="services-list w-list-unstyled">
                <li className="services-list-item">Name: {this.props.firstName + ' ' + this.props.lastName}</li>
                <li className="services-list-item">Location: {this.props.location}</li>
                <li className="services-list-item" style={{position: 'absolute', fontWeight: 'bold'}}>
                 {this.state.completed}
                </li>
                </ul>
            </div>
          </div>
          
          <div className="booking-div">
            <div className="booking-wrapper w-form">
              <form onSubmit={this.handleBooking.bind(this)} className="booking-wrapper w-clearfix">
                <input className="book-button-alignment signupbutton w-button" type="submit" value="Book"/>
                <input className="booking-input green-focus w-input" placeholder="How Long?" type="text" required ref='duration'/>
                <select className="booking-input green-focus w-input" placeholder="Which Service?" required ref='service'>
                  <option value="" disabled selected>Pick your service</option>
                  {this.props.services.split('/').map(function(service, i) {
                    return <option required ref='service' value={service} className="services-list-item" key={i}>{service}</option>;
                  })}</select> 
                <input type="date" required ref='date' />
              </form>
            </div>
          </div>
        </div>
        <button id="expandReviews" onClick={this.toggleReviews.bind(this)}>Reviews &#9660;</button>
      </li>
      <div style={this.state.reviewVisibility}>
        <li>
          <div className="w-col w-col-12" id="bookingMessages">
            {this.state.trainerReviewArray.map((item) => {
              return (
                <div>
                  <p>
                    <div style={{display: 'unset'}}>{item.name}: </div> 
                    <div style={{display: 'unset'}}>{item.review}</div>
                  </p>
                </div>
              );
            })} 
          </div>
        </li>
        <form onSubmit={this.submitReview.bind(this)}>
          <textarea required ref="review"></textarea>
          <button>Submit Review</button>  
        </form>       
      </div>
    </div>
    );
  }
}

export default TableRow;



