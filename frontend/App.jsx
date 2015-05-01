"use strict";
/*global React*/

var React = require('react');
var LoginCreateUser = require('./LoginCreateUser.jsx');

var App = React.render( <LoginCreateUser/>, $('#container')[0]);

module.exports = App;
