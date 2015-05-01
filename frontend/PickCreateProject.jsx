"use strict";
/*global React*/

var React = require('react');
var EditProject = require('./EditProject.jsx');
var PickProjectDropDown = require('./PickProjectDropDown.jsx');

var PickCreateProject = React.createClass({
  propTypes: {
    currUser: React.PropTypes.string
  },
  getInitialState: function() {
      return ( { "user": this.props.currUser,
                 "projects": [],
                  "project": { "title": "", "_id": "" } } );
  },
  componentDidMount: function() {
    $.getJSON('/treasurehunt/getprojects/' + this.props.currUser, function(data) {
      var userData = data[0];
      console.log('userData');
      console.log(userData);
      this.setState({
         "user": userData.user,
        "projects": userData.projects,
         "project": { "title": "", "_id": "" }
        });
    }.bind(this));
  },
  render: function() {
    if (this.state.project.title !== "" ) {
      return (<EditProject/>);
    } else {
      return (
        <div className="container-fluid">
          <h1>inside PickCreateProject</h1>
          <table>
            <thead>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" ref="projectnamefield" placeholder="name your project"/></td>
                <td>
                  <PickProjectDropDown projects={this.state.projects} getProject={this._getProject}/>
                </td>
              </tr>
              <tr>
                <td><button type="submit" onClick={this._createNew}>submit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  },
  _getProject: function(e) {
    e.preventDefault();
    var projectID = e.target.id;
    console.log('getProject projectID');
    console.log(projectID);
  },
  _createNew: function(e) {
    e.preventDefault();
    var projectName = this.refs.projectnamefield.getDOMNode().value.trim();
    this.refs.projectnamefield.getDOMNode().value = '';

    var x = new Date();
    var ID = x.getTime();

    $.ajax({
      url: '/treasurehunt/newproject',
      dataType: 'json',
      type: 'POST',
      data: { "user": this.props.currUser, "project": projectName, "_id": ID },
      success: function(data) {
        console.log('data inside newproj success');
        console.log(data);

        this.setState({
          "project": projectName
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  }
});

module.exports = PickCreateProject;
