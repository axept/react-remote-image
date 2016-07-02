'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('/Users/denisizmaylov/Sites/react-remote-image/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/denisizmaylov/Sites/react-remote-image/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/denisizmaylov/Sites/react-remote-image/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  RemoteImage: {
    displayName: 'RemoteImage'
  }
};

var _UsersDenisizmaylovSitesReactRemoteImageNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'src/index.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersDenisizmaylovSitesReactRemoteImageNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/index.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersDenisizmaylovSitesReactRemoteImageNode_modulesReactTransformHmrLibIndexJs2(_UsersDenisizmaylovSitesReactRemoteImageNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

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

var RemoteImage = _wrapComponent('RemoteImage')((_temp = _class = function (_Component) {
  _inherits(RemoteImage, _Component);

  function RemoteImage(props, context) {
    _classCallCheck(this, RemoteImage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RemoteImage).call(this, props, context));

    _this._handleRetry = _this.fetchImage.bind(_this);
    var src = props.forceFetch ? getURLWithSalt(props.src) : props.src;
    _this.state = _extends({}, props, {
      src: src,
      isLoading: true,
      isFailed: false,
      image: null
    });
    return _this;
  }

  _createClass(RemoteImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchImage();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var _props = this.props;
      var src = _props.src;
      var forceFetch = _props.forceFetch;

      var nextState = {};
      var rawSrc = nextProps.src !== src ? nextProps.src : src;
      var hasSalt = nextProps.forceFetch !== forceFetch ? nextProps.forceFetch : forceFetch;
      var finalSrc = hasSalt ? getURLWithSalt(rawSrc) : rawSrc;
      if (finalSrc !== this.state.src) {
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
    key: 'fetchImage',
    value: function fetchImage() {
      var _this3 = this;

      var src = this.state.src;

      var image = new Image();
      image.onload = function () {
        _this3.setState({
          isLoading: false,
          isFailed: false
        }, _this3.props.onLoad);
      };
      image.onerror = function () {
        _this3.setState({
          isLoading: false,
          isFailed: true
        }, _this3.props.onError);
      };
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
      var srcSalt = _state.srcSalt;
      var src = _state.src;
      var image = _state.image;
      var _props2 = this.props;
      var renderLoading = _props2.renderLoading;
      var renderFetched = _props2.renderFetched;
      var renderFailure = _props2.renderFailure;

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
      return _react3.default.createElement('img', _extends({}, this.props, { src: src }));
    }
  }]);

  return RemoteImage;
}(_react2.Component), _class.propTypes = {
  src: _react2.PropTypes.string,
  forceFetch: _react2.PropTypes.bool,
  renderLoading: _react2.PropTypes.func,
  renderFetched: _react2.PropTypes.func,
  renderFailure: _react2.PropTypes.func,
  onLoad: _react2.PropTypes.func,
  onError: _react2.PropTypes.func
}, _temp));

exports.default = RemoteImage;