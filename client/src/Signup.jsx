import React from 'react';
import $ from 'jquery';
import css from './home.css';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTaken: '',
      visibility: {display: 'none'}
    };
  }

  signUp() {
    const props = this.props;

    $.ajax({
      url: this.props.endpoint,
      type: 'POST',
      ContentType: 'application/json',
      data: {
        'firstname': this.refs.firstname.value,
        'lastname': this.refs.lastname.value,
        'location': this.refs.city.value,
        'email': this.refs.email.value,
        'password': this.refs.ps.value,
      }
    }).done(function(response) {
      props.callback();
    }).fail(function(response) {
      console.log('signup data transmission failure');
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var outer = this;
    $.ajax({
      url: this.props.endpoint,
      type: 'GET',
      ContentType: 'application/json',
      data: {
        'email': this.refs.email.value
      }
    }).done(function(exists) {
      if (exists) {
        outer.setState({
          emailTaken: 'Email already taken.',
          visibility: {display: 'unset'}
        });
      } else {
        outer.signUp();
      }
    }).fail(function(response) {
      console.log('signup data transmission failure');
    });
  }

  render() {
    return (
      <div id='signup'className="bodybody">
        <div className="w-container">
          <div className="w-form">
            <form className="signinform w-clearfix" data-name="Email Form" id="email-form" name="email-form" onSubmit={this.onSubmit.bind(this)}>
              <input className="green-focus signup-alignment w-input" id="field-3" name="field-3" placeholder="Enter your first name" required ref='firstname' type="text" />
              <input className="green-focus signup-alignment w-input" id="field" name="field" placeholder="Enter your last name" required ref='lastname' type="text" />
              <select className="location-dropdown w-select" id="field-2" name="field-2" required ref="city">
                <option value="">Select a location</option>
                <option value="San Francisco">San Francisco</option>
                <option value="San Mateo">San Mateo</option>
                <option value="Pleasanton">Pleasanton</option>
              </select>
              <input className="green-focus signup-alignment w-input" data-name="Name" id="name" name="name" placeholder="Enter your email" type="email" required ref="email" />
              <span style={this.state.visibility} >{this.state.emailTaken}</span>
              <input className="green-focus signup-alignment w-input" data-name="Email" id="email" name="email" placeholder="Enter your password" required ref='ps' type="password" />
              <input className="workout-button button-alignment w-button" data-wait="Please wait..." type="submit" value="Workout" />
            </form>
          </div>
        </div>
       </div>
    );
  }
}

Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Signup;

