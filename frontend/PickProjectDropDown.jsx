"use strict";
/*global React*/

var React = require('react');

var PickProjectDropDown = React.createClass({
  propTypes: {
    projects: React.PropTypes.array,
    getProject: React.PropTypes.func
  },
  getInitialState: function() {
    return ( { "Projects": this.props.projects } );
  },
  componentDidUpdate: function() {
    $(React.findDOMNode(this)).find('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false // Displays dropdown below the button
      }
    );
  },
  render: function() {
    var showList = [];
    for (var i = 0; i < this.props.projects.length; i++ ) {
      console.log('inside for');
      console.log(this.props.projects[i]);
      showList.push(<li><a href="#!" id={this.props.projects[i]._id} onClick={this.getProject}>{this.props.projects[i].title}</a></li>);
    }
    return (
      <div>
        <a className='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>
          <ul id="dropdown1" className="dropdown-content">
            {showList}
          </ul>
      </div>
    );
  }
});

module.exports = PickProjectDropDown;
