'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

    _this._handleRetry = _this.fetchImage.bind(_this);
    var src = props.forceFetch ? getURLWithSalt(props.src) : props.src;
    _this.state = _extends({
      src: src,
      isLoading: true,
      isFailed: false,
      image: null
    }, props);
    _this.onLoad = _this.onLoad.bind(_this);
    _this.onError = _this.onError.bind(_this);
    return _this;
  }

  _createClass(RemoteImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var src = this.props.src;

      if (typeof src !== 'string') {
        this.onError();
      } else {
        this.fetchImage();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearEvents();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var _props = this.props;
      var src = _props.src;
      var forceFetch = _props.forceFetch;

      var rawSrc = nextProps.src !== src ? nextProps.src : src;
      var hasSalt = nextProps.forceFetch !== forceFetch ? nextProps.forceFetch : forceFetch;
      var finalSrc = hasSalt ? getURLWithSalt(rawSrc) : rawSrc;
      if (finalSrc !== this.state.src) {
        this.clearEvents();
        this.setState({
          src: finalSrc,
          isLoading: true,
          isFailed: false
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
      var image = this.state.image;

      if (image) {
        image.removeEventListener('load', this.onLoad);
        image.removeEventListener('error', this.onError);
      }
    }
  }, {
    key: 'fetchImage',
    value: function fetchImage() {
      var src = this.state.src;

      var image = new Image();
      image.addEventListener('load', this.onLoad);
      image.addEventListener('error', this.onError);
      image.src = src;
      this.setState({
        image: image
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isLoading = _state.isLoading;
      var isFailed = _state.isFailed;
      var src = _state.src;
      var image = _state.image;
      var _props2 = this.props;
      var renderLoading = _props2.renderLoading;
      var renderFetched = _props2.renderFetched;
      var renderFailure = _props2.renderFailure;

      var otherProps = _objectWithoutProperties(_props2, ['renderLoading', 'renderFetched', 'renderFailure']);

      if (isLoading) {
        if (renderLoading) {
          return renderLoading({ src: src, image: image });
        }
      } else if (isFailed) {
        if (renderFailure) {
          return renderFailure('unable to load image', this._handleRetry);
        }
      } else if (renderFetched) {
        return renderFetched({ src: src, image: image });
      }
      return _react2.default.createElement('img', _extends({}, otherProps, { src: src }));
    }
  }]);

  return RemoteImage;
}(_react.Component);

RemoteImage.propTypes = {
  src: _react.PropTypes.string.isRequired,
  forceFetch: _react.PropTypes.bool,
  renderLoading: _react.PropTypes.func.isRequired,
  renderFetched: _react.PropTypes.func.isRequired,
  renderFailure: _react.PropTypes.func.isRequired,
  onLoad: _react.PropTypes.func,
  onError: _react.PropTypes.func
};
exports.default = RemoteImage;