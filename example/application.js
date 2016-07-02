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

const labelStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  padding: 10,
  background: 'rgba(255,255,255,.5)',
  fontWeight: 'bold',
}

export default class Application extends Component {
  render() {
    return (
      <div>
        <h2>Simple</h2>
        {imageURLs.map(URL => (
          <RemoteImage
            renderLoading={() => (
              <div style={imageStyle}>
                Loading...
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
              <div style={imageStyle}>
                Loading...
              </div>
            )}
            renderFetched={({ src, image }) => (
              <div style={imageStyle}>
                <img src={src} width="300" />
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
