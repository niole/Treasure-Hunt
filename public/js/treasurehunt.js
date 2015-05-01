"use strict";
/*global React*/

var Show = React.createClass({
  render: function() {
<<<<<<< HEAD
    return (
      <h1>Hola</h1>
    );
=======
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
    console.log(user);
    this.setState( { "user": user } );
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
      success: function() {
        this.setState( { "user": user } );
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

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
      var showList = [];
      console.log('this.state.projects');
      console.log(this.state.projects);
      for ( var i=0; i < this.state.projects.length; i++ ) {
          console.log(this.state.projects[i]);
          showList.push(<li><a href="#!" name={this.state.projects[i]._id}>{this.state.projects[i].title}</a></li>);
      }
      $(document).ready( function() {
          $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: false // Displays dropdown below the button
        });
      });
      return (
        <div className="container-fluid">
          <h1>inside PickCreateProject</h1>
          <table>
            <thead>
              <tr>
                <td><h4>create a new project</h4></td>
                <td><h4>edit an old project</h4></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" ref="projectnamefield" placeholder="name your project"/></td>
                <td>
                  <a className='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>
                    <ul id="dropdown1" className="dropdown-content">
                      {showList}
                    </ul>
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

var EditProject = React.createClass({
  render: function() {
    return(<h1>Edit Project Page</h1>);
>>>>>>> 48e2ab0... Using commonjs, browserify, gulp, can login as user and have a drop down menu of old files to edit.
  }
});

$(document).ready( function() {
  React.render(
    <Show/>,
    $('#container')[0]);
});
