import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RemoteImage from '../src'

const imageURLs = [
  'http://image.shutterstock.com/z/stock-photo-cat-and-her-kitten-48629962.jpg',
  'http://image.shutterstock.com/z/stock-photo-father-and-teenager-daughter-with-head-in-his-shoulder-sharing-something-funny-in-a-mobile-phone-138701705.jpg',
  'http://image.shutterstock.com/z/stock-photo-portrait-of-business-team-outside-office-141032806.jpg',
  'http://image.shutterstock.com/z/stock-photo-chinese-new-year-s-food-258919031.jpg',
]
const imageStyle = {
  display: 'inline-block',
  position: 'relative',
  width: 300,
  maxHeight: 250,
  padding: 15,
}

const loaderStyle = {
  display: 'inline-block',
  position: 'relative',
  width: 300,
  height: 220,
  padding: 15,
}

const loaderSpinnerStyle = {
  width: 148,
  height: 148,
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginTop: -74,
  marginLeft: -74
}

const labelStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  padding: 10,
  background: 'rgba(255,255,255,.7)',
  fontWeight: 'bold',
}

export default class Application extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoaded: {},
      isVisible: {},
    }
  }

  render() {
    return (
      <div>
        <h2>Simple</h2>
        {imageURLs.map(URL => (
          <RemoteImage
            renderLoading={() => (
              <div style={loaderStyle}>
                <img
                  src={require('./loading-50.gif')}
                  style={loaderSpinnerStyle}
                  />
              </div>
            )}
            src={URL}
            style={imageStyle}
            />
        ))}
        <h2>Advanced</h2>
        {imageURLs.map(URL => (
          <RemoteImage
            renderLoading={() => (
              <div style={loaderStyle}>
                <img
                  src={require('./loading-50.gif')}
                  style={loaderSpinnerStyle}
                  />
              </div>
            )}
            renderFetched={({ src, image }) => (
              <div style={imageStyle}>
                <img src={src} style={{ ...imageStyle, padding: 0 }} />
                <span style={labelStyle}>
                  {image.naturalWidth + 'x' + image.naturalHeight}
                </span>
              </div>
            )}
            src={URL}
            style={imageStyle}
            />
        ))}
      </div>
    )
  }
}
