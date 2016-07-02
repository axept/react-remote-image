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
    renderLoading: PropTypes.func,
    renderFetched: PropTypes.func,
    renderFailure: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    this._handleRetry = this.fetchImage.bind(this)
    const src = props.forceFetch ? getURLWithSalt(props.src) : props.src
    this.state = {
      ...props,
      src,
      isLoading: true,
      isFailed: false,
      image: null,
    }
  }

  componentDidMount() {
    this.fetchImage()
  }

  componentWillReceiveProps(nextProps) {
    const { src, forceFetch } = this.props
    const nextState = {}
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
      this.setState({
        src: finalSrc,
        isLoading: true,
        isFailed: false,
      }, () => this.fetchImage())
    }
  }

  fetchImage() {
    const { src } = this.state
    const image = new Image()
    image.onload = () => {
      this.setState({
        isLoading: false,
        isFailed: false,
      }, this.props.onLoad)
    }
    image.onerror = () => {
      this.setState({
        isLoading: false,
        isFailed: true,
      }, this.props.onError)
    }
    image.src = src
    this.setState({
      image,
    })
  }

  render() {
    const { isLoading, isFailed, srcSalt, src, image } = this.state
    const { renderLoading, renderFetched, renderFailure } = this.props
    if (isLoading) { 
      if (renderLoading) {
        return renderLoading({ src, image })
      }
    } else if (isFailed) {
      if (renderFailure) {
        return renderFailure('unable to load image', this._handleRetry)
      }
    } else if (renderFetched) {
      return renderFetched({ src, image })
    }
    return (
      <img {...this.props} src={src} />
    )
  }
}
