"use strict";
/*global React*/

var React = require('react');

var NavBarLogin = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  $(React.findDOMNode(this)).find(".button-collapse").sideNav();
  },
  render: function() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">Logo</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
          <ul className="right hide-on-med-and-down">
            <li><a href="sass.html"><i className="mdi-action-search"></i></a></li>
            <li><a href="components.html"><i className="mdi-action-view-module"></i></a></li>
            <li><a href="javascript.html"><i className="mdi-navigation-refresh"></i></a></li>
            <li><a href="mobile.html"><i className="mdi-navigation-more-vert"></i></a></li>
          </ul>
        </div>
      </nav>
);
  }
});

module.exports = NavBarLogin;
