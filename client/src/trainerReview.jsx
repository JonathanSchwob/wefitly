import React from 'react';
import $ from 'jquery';

var dummyArray = [{
  userName: 'angryCustomer',
  userReview: 'Jon sucks'
}, {
  userName: 'zak',
  userReview: 'Jon cool'
}, {
  userName: 'elliot',
  userReview: 'Jon is very cool'
}];

class trainerReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainerReviewArray: dummyArray
    };
  }

  // submitReview() {
  //   // e.preventDefault();
  //   $.ajax({
  //     url: '/api/reviews',
  //     type: 'POST',
  //     ContentType: 'application/json',
  //     data: {
  //       review: this.refs.review.value,
  //       trainer: this.props.email, //this is a property thats going to be passed down by the previous view
  //     }
  //   }).done(function(response) {
  //     console.log('review submitted');
  //     this.refs.review.value = '';
  //   }).fail(function(response) {
  //     console.log('review data transmission failure');
  //   });    
  // }


  getReviews() {
    var outer = this;

    $.ajax({
      url: '/api/reviews',
      type: 'GET',
      data: {
        trainer: 'chad',
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
  }

  render () {
    return (
    <div>
      <h1>Reviews for Jon</h1>
      <br/>
      <span>
        {this.state.trainerReviewArray.map(function(item, index) {
          return (
            <div key={index}>
              <div>{item.name}</div>
              <div>{item.trainer}</div>
              <div>{item.review}</div>
            </div>);
        })}
        <form>
          <textarea required ref="review"></textarea>
          <button onClick={() => {
            this.submitReview();
          }}/>
        </form>
      </span>  
    </div>
    );
  }
}

export default trainerReview;
