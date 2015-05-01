"use strict";
/*global React*/

var React = require('react');
var PickCreateProject = require('./PickCreateProject.jsx');

var LoginCreateUser = React.createClass({
  getInitialState: function() {
    return { "user": '' };
  },
  render: function() {
      if (this.state.user !== '') {
        return (
          <PickCreateProject currUser={this.state.user}/>
        );
      } else {
      return (
        <div className="container-fluid">
          <h1>Hola</h1>
          <input type='text' ref='userfield' placeholder='user'/>
          <button onClick={this._submitNewUser}>create new user account</button>
          <button onClick={this._loginAsUser}>login</button>
        </div>
      );
    }
  },
  _loginAsUser: function(e) {
    e.preventDefault();
    var user = this.refs.userfield.getDOMNode().value.trim();
    this.refs.userfield.getDOMNode().value = '';
    $.ajax({
      url: '/treasurehunt/finduser',
      dataType: 'json',
      type: 'POST',
      data: { 'user': user },
      success: function(data) {
        if (data.length > 0) {
          this.setState( { "user": data[0].user } );
        } else {
          console.log("user doesn't exist");
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  _submitNewUser: function(e) {
    e.preventDefault();
    var user = this.refs.userfield.getDOMNode().value.trim();
    this.refs.userfield.getDOMNode().value = '';
    console.log(user);
    $.ajax({
      url: '/treasurehunt/newuser',
      dataType: 'json',
      type: 'POST',
      data: { 'user': user },
      success: function(data) {
        this.setState( { "user": data[0].user } );
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

module.exports = LoginCreateUser;
