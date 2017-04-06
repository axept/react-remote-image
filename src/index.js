import React, { Component, PropTypes } from 'react'

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
    this._handleRetry = this.fetchImage.bind(this)
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
      image: null,
      ...props,
    }
    this.onLoad = this.onLoad.bind(this)
    this.onError = this.onError.bind(this)
  }

  componentDidMount() {
    this.fetchImage()
  }

  componentWillUnmount() {
    this.clearEvents()
  }

  componentWillReceiveProps(nextProps) {
    const { src, forceFetch } = this.props
    const rawSrc  =
      (nextProps.src !== src) ?
        nextProps.src :
        src
    const hasSalt =
      (nextProps.forceFetch !== forceFetch) ?
        nextProps.forceFetch :
        forceFetch
    const finalSrc =
      hasSalt ?
        getURLWithSalt(rawSrc) :
        rawSrc
    if (finalSrc !== this.state.src) {
      this.clearEvents()
      this.setState({
        src: finalSrc,
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
    const { image } = this.state
    if (image) {
      image.removeEventListener('load', this.onLoad)
      image.removeEventListener('error', this.onError)
    }
  }

  fetchImage() {
    const { src, isEmpty } = this.state
    if (!isEmpty) {
      const image = new Image()
      image.addEventListener('load', this.onLoad)
      image.addEventListener('error', this.onError)
      image.src = src
      this.setState({
        image,
      })
    }
  }

  render() {
    const {
      isLoading,
      isFailed,
      isEmpty,
      src,
      image,
      } = this.state
    const {
      renderLoading,
      renderFetched,
      renderFailure,
      ...otherProps,
      } = this.props
    if (isLoading && !isEmpty) {
      if (renderLoading) {
        return renderLoading({ src, image })
      }
    } else if (isFailed || isEmpty) {
      if (renderFailure) {
        return renderFailure('unable to load image', this._handleRetry)
      }
    } else if (renderFetched) {
      return renderFetched({ src, image })
    }
    return (
      <img {...otherProps} src={src} />
    )
  }
}
