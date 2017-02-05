import React from 'react';
import $ from 'jquery';
import ProfilePictureEditor from './ProfilePictureEditor.jsx';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.state = {

    };
  }

  handleFormChange(e) {
    const $ele = $(e.target);
    if ($ele.attr('type') === 'checkbox') {
      this.setState({[$ele.attr('name')]: $ele.is(':checked')});
    } else if ($ele.attr('type') === 'text') {
      this.setState({[$ele.attr('name')]: $ele.val()});
    }

  }

  onSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/updateTrainer',
      type: 'POST',
      ContentType: 'application/json',
      data: this.state
    }).done(function(response) {
      window.location.href = '#/trainerdash';
    }).fail(function(response) {
      console.log('profile transmission failure');
    });
  }

  render() {
    return (
    <div className="profiel-body">
      <div className="heading-div">
        <h1 className="profile-editor-heading">Edit Your Profile</h1>
      </div>
      <div className="w-container">
        <div className="profile-editor-wrapper w-form">
          <form className="profile-editor-alignment signinform w-clearfix" onSubmit={this.onSubmit.bind(this)} >
            {/*<input onChange={this.handleFormChange} className="green-focus signup-alignment w-input" type='text' name='firstname' placeholder='First Name' value={this.state.firstname || ''}/>
            <input className="green-focus signup-alignment w-input" onChange={this.handleFormChange} type='text' name='lastname' placeholder='Last Name' value={this.state.lastname || ''}/>
           */} <input onChange={this.handleFormChange} className="green-focus signup-alignment w-input" placeholder="Image url" name='pic' type='text' />
            <textarea id="bioField" className="green-focus signup-alignment w-input"onChange={this.handleFormChange} type='text' name='bio' placeholder='Tell us about yourself' value={this.state.bio || ''}></textarea>
            <input className="green-focus signup-alignment w-input"onChange={this.handleFormChange} type='text' name='rate' placeholder='Enter your hourly rate' value={this.state.rate || ''}></input>
            <div className="w-checkbox">
              <input className="green-focus signup-alignment w-input" onChange={this.handleFormChange} type='checkbox' name='oneonone' />
              <label className="w-form-label">1-on-1 Personal Training</label>
            </div>
            <div className="w-checkbox">
            <input className="green-focus signup-alignment w-input" onChange={this.handleFormChange} type='checkbox' name='dietcons' value='Diet consulting'/>
              <label className="w-form-label">Diet Consulting</label>
            </div>
            <div className="w-checkbox">
              <input className="green-focus signup-alignment w-input" onChange={this.handleFormChange} type='checkbox' name='group' value='Group Training'/>
              <label className="w-form-label">Group Training</label>
            </div>
            <div className="w-checkbox">
              <input className="green-focus signup-alignment w-input" onChange={this.handleFormChange} type='checkbox' name='remote' value='Remote Training'/>
              <label className="w-form-label">Remote Training</label>
            </div>
            <input className="profile-button-alignment signupbutton w-button" type="submit"/>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default Signup;





