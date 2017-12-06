'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getURLWithSalt(URL) {
  if (typeof URL === 'string' && URL !== '' && URL.indexOf('data:') !== 0) {
    var salt = Math.floor((Date.now() + Math.random()) * 100);
    if (URL.indexOf('?') >= 0) {
      return URL + '&_=' + salt;
    }
    return URL + '?_=' + salt;
  }
  return URL;
}

var RemoteImage = function (_Component) {
  _inherits(RemoteImage, _Component);

  function RemoteImage(props, context) {
    _classCallCheck(this, RemoteImage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RemoteImage).call(this, props, context));

    var src = props.forceFetch ? getURLWithSalt(props.src) : props.src;
    var isEmpty = typeof src !== 'string';
    // Warning if source is empty, only for develop
    if (process.env['NODE_ENV'] !== 'production') {
      if (isEmpty) {
        console.warn('Image src is not a string', src);
      }
    }
    _this.state = _extends({
      src: src,
      isLoading: true,
      isFailed: false,
      isEmpty: typeof src !== 'string'
    }, props);
    _this._handleRetry = _this.fetchImage.bind(_this);
    _this.onLoad = _this.onLoad.bind(_this);
    _this.onError = _this.onError.bind(_this);
    return _this;
  }

  _createClass(RemoteImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchImage();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearEvents();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var _this2 = this;

      var src = _ref.src;
      var forceFetch = _ref.forceFetch;

      var finalSrc = forceFetch ? getURLWithSalt(src) : src;
      if (finalSrc !== this.state.src) {
        this.clearEvents();
        this.setState({
          src: src,
          isLoading: true,
          isFailed: false,
          isEmpty: typeof src !== 'string'
        }, function () {
          return _this2.fetchImage();
        });
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.setState({
        isLoading: false,
        isFailed: false
      }, this.props.onLoad);
    }
  }, {
    key: 'onError',
    value: function onError() {
      this.clearEvents();
      this.setState({
        isLoading: false,
        isFailed: true
      }, this.props.onError);
    }
  }, {
    key: 'clearEvents',
    value: function clearEvents() {
      if (this.image) {
        this.image.removeEventListener('load', this.onLoad);
        this.image.removeEventListener('error', this.onError);
      }
    }
  }, {
    key: 'fetchImage',
    value: function fetchImage() {
      var _state = this.state;
      var src = _state.src;
      var isEmpty = _state.isEmpty;

      if (!isEmpty) {
        this.image = new Image();
        this.image.addEventListener('load', this.onLoad);
        this.image.addEventListener('error', this.onError);
        this.image.src = src;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var image = this.image;
      var state = this.state;
      var props = this.props;
      var isLoading = state.isLoading;
      var isFailed = state.isFailed;
      var isEmpty = state.isEmpty;
      var src = state.src;
      var renderLoading = props.renderLoading;
      var renderFetched = props.renderFetched;
      var renderFailure = props.renderFailure;

      var renderProps = _objectWithoutProperties(props, ['renderLoading', 'renderFetched', 'renderFailure']);

      var error = new Error('Unable to load image');
      if (isLoading && !isEmpty) {
        return renderLoading({ src: src, image: image });
      } else if (isFailed || isEmpty) {
        return renderFailure(error, this._handleRetry);
      } else if (renderFetched) {
        return renderFetched({ src: src, image: image });
      }
      return _react2.default.createElement('img', _extends({}, renderProps, { src: src }));
    }
  }]);

  return RemoteImage;
}(_react.Component);

RemoteImage.propTypes = {
  src: _propTypes2.default.string,
  forceFetch: _propTypes2.default.bool,
  renderLoading: _propTypes2.default.func.isRequired,
  renderFetched: _propTypes2.default.func.isRequired,
  renderFailure: _propTypes2.default.func.isRequired,
  onLoad: _propTypes2.default.func,
  onError: _propTypes2.default.func
};
exports.default = RemoteImage;