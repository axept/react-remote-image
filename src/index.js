import React, { Component } from 'react'
import PropTypes from 'prop-types'

function getURLWithSalt(URL) {
  if (typeof URL === 'string' && URL !=='' && URL.indexOf('data:') !== 0) {
    const salt = Math.floor((Date.now() + Math.random()) * 100)
    if (URL.indexOf('?') >= 0) {
      return URL + '&_=' + salt
    }
    return URL + '?_=' + salt
  }
  return URL
}

export default class RemoteImage extends Component {

  static propTypes = {
    src: PropTypes.string,
    forceFetch: PropTypes.bool,
    renderLoading: PropTypes.func.isRequired,
    renderFetched: PropTypes.func.isRequired,
    renderFailure: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    const src = props.forceFetch ? getURLWithSalt(props.src) : props.src
    const isEmpty = typeof src !== 'string'
    // Warning if source is empty, only for develop
    if (process.env['NODE_ENV'] !== 'production') {
      if (isEmpty) {
        console.warn('Image src is not a string', src)
      }
    }
    this.state = {
      src,
      isLoading: true,
      isFailed: false,
      isEmpty: typeof src !== 'string',
      ...props,
    }
    this._handleRetry = this.fetchImage.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.onError = this.onError.bind(this)
  }

  componentDidMount() {
    this.fetchImage()
  }

  componentWillUnmount() {
    this.clearEvents()
  }

  componentWillReceiveProps({ src, forceFetch }) {
    const finalSrc = forceFetch ? getURLWithSalt(src) : src
    if (finalSrc !== this.state.src) {
      this.clearEvents()
      this.setState({
        src,
        isLoading: true,
        isFailed: false,
        isEmpty: typeof src !== 'string',
      }, () => this.fetchImage())
    }
  }

  onLoad() {
    this.setState({
      isLoading: false,
      isFailed: false,
    }, this.props.onLoad)
  }

  onError() {
    this.clearEvents()
    this.setState({
      isLoading: false,
      isFailed: true,
    }, this.props.onError)
  }

  clearEvents() {
    if (this.image) {
      this.image.removeEventListener('load', this.onLoad)
      this.image.removeEventListener('error', this.onError)
    }
  }

  fetchImage() {
    const { src, isEmpty } = this.state
    if (!isEmpty) {
      this.image = new Image()
      this.image.addEventListener('load', this.onLoad)
      this.image.addEventListener('error', this.onError)
      this.image.src = src
    }
  }

  render() {
    const { image, state, props } = this
    const {
      isLoading,
      isFailed,
      isEmpty,
      src,
      } = state
    const {
      renderLoading,
      renderFetched,
      renderFailure,
      ...renderProps,
      } = props
    const error = new Error('Unable to load image')
    if (isLoading && !isEmpty) {
      return renderLoading({ src, image })
    } else if (isFailed || isEmpty) {
      return renderFailure(error, this._handleRetry)
    } else if (renderFetched) {
      return renderFetched({ src, image })
    }
    return (
      <img {...renderProps} src={src} />
    )
  }
}
