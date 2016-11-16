'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CONTROL_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Icon = function (_Component) {
  (0, _inherits3.default)(Icon, _Component);

  function Icon() {
    (0, _classCallCheck3.default)(this, Icon);
    return (0, _possibleConstructorReturn3.default)(this, (Icon.__proto__ || (0, _getPrototypeOf2.default)(Icon)).apply(this, arguments));
  }

  (0, _createClass3.default)(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex;
      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          size = _props2.size,
          responsive = _props2.responsive;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-firefox', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-firefox');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M4.24954645,1 C4.20019837,2.2660337 4.15311916,3.47137493 4.10547273,4.68409001 C4.72941407,4.52980633 5.34030936,4.43848401 5.93475529,4.69429995 C7.22631387,2.92627708 9.08339018,2.31821789 11.1293506,2.093599 C11.1418294,2.1140189 11.1548754,2.1344388 11.1673543,2.1548587 C11.1265145,2.19853459 11.0868091,2.24277771 11.0448349,2.28531916 C10.2252028,3.11799724 9.56609389,4.0641192 9.09700345,5.13219333 C8.96257245,5.43792459 8.93137538,5.78960062 8.8587713,6.12142397 C8.83041033,6.25074999 8.89564056,6.31995076 9.02666824,6.33810178 C9.633593,6.42091581 10.2393833,6.51791033 10.848577,6.58767831 C11.2308828,6.63135421 11.6177265,6.63929528 12.0028684,6.65517742 C12.1832442,6.66255127 12.2609533,6.75217194 12.2649238,6.92233776 C12.2802387,7.60640436 12.0516493,8.192342 11.5059842,8.61265157 C10.9801719,9.01707901 10.3760832,9.27573105 9.72491533,9.41640146 C9.65741622,9.43114917 9.59048433,9.45100185 9.51674581,9.47028731 C9.58197604,10.3023982 9.64663905,11.1191941 9.7152726,11.9847709 C9.08339018,11.6818757 8.4787343,11.3925939 7.86103238,11.0970725 C7.67498441,11.4890212 7.66137115,11.8769992 7.77878556,12.2729184 C8.09529399,13.3455303 9.21044733,13.9677699 10.3647388,13.6824586 C10.7691662,13.582628 11.1599804,13.4124621 11.5411518,13.2394602 C11.9172183,13.06816 12.2700288,12.8480788 12.6370197,12.6563587 C13.2592594,12.3319092 13.8860368,12.3602702 14.5111126,12.649552 C14.6001661,12.6909591 14.690354,12.7454121 14.7595547,12.8146129 C14.9943836,13.0494417 15.1770282,13.3177365 15.0828698,13.6716814 C14.9915475,14.0137147 14.7431054,14.2116743 14.4056098,14.2831439 C14.2116208,14.3245509 14.0096907,14.3421347 13.8117311,14.3415675 C13.6801362,14.3410003 13.609801,14.384109 13.5377641,14.490179 C12.8582353,15.4986951 11.9762091,16.2417525 10.7476119,16.4544598 C10.2314423,16.5435132 9.69768879,16.5287655 9.17187641,16.5582609 C9.10210842,16.5622315 9.03234044,16.5520215 8.91662768,16.5457821 C8.98639567,16.6104451 9.02156327,16.6501505 9.06353751,16.6813475 C10.4537923,17.7080147 11.9909568,18.0585562 13.6784345,17.654696 C15.0590466,17.3251416 16.2870766,16.7063052 17.3006976,15.6904153 C18.2666723,14.7216045 18.7085362,13.5400865 18.7227167,12.1940749 C18.7368972,10.8412566 18.4345692,9.56047519 17.7425616,8.38689825 C17.6217438,8.18156483 17.4640568,7.99778574 17.288786,7.75615028 C18.4799468,8.29614315 19.5298699,8.90987454 20.0159769,10.1764755 C20.1594834,8.59450055 19.8679326,7.09704134 19.2576046,5.6517663 C18.6478437,4.20762571 17.7726242,2.95747415 16.5763585,1.92059709 C16.6262738,1.93137426 16.6767563,1.93931533 16.7249699,1.95463025 C19.4192621,2.79865272 21.4879113,4.40445084 22.7806043,6.94616097 C23.4068145,8.17645985 23.7272934,9.49751384 23.8923543,10.8588404 C24.0693267,12.316027 24.0483396,13.7647054 23.6762437,15.1969344 C23.054004,17.5945708 21.7408911,19.5560155 19.9229529,21.2100272 C18.1929338,22.7840611 16.1776032,23.805056 13.8707219,24.097174 C8.73171416,24.7483419 4.68120042,22.8986394 1.80823415,18.5707554 C0.665287063,16.8486773 0.125861413,14.921833 0.022627482,12.8594232 C-0.144135022,9.50942545 0.61140122,6.38518099 2.2716524,3.47761434 C2.75492333,2.63018856 3.33745766,1.85423242 4.04875079,1.18094299 C4.09923331,1.13329656 4.1514175,1.08791901 4.24954645,1', stroke: 'none' })
      );
    }
  }]);
  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.contextTypes = {
  intl: _react.PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'PlatformFirefox';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];