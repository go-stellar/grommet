'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Bug = require('./Bug');

var _Bug2 = _interopRequireDefault(_Bug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  console.warn('Defect has been renamed to Bug.' + ' Plese update your import statement.');
  return _react2.default.createElement(_Bug2.default, props);
};

module.exports = exports['default'];