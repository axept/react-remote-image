react-remote-image
===
Image component with declarative state control. Just like Relay.

![react-remote-image-view](https://github.com/StartupMakers/react-remote-image/raw/master/example/demo.gif)

## Installation

```bash
npm install react-remote-image --save
```

## Usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import RemoteImage from 'react-remote-image'

ReactDOM.render(
  <RemoteImage 
    src="http://funpeep.com/wp-content/uploads/2014/04/cute-cat-cats-hd-wallpaper.jpg"
    renderLoading={() => (
      <div className="image--loading">
        Loading...
      </div>
    )}
    alt="Meow meow cat"
    />,
  document.getElementById('app')
);
```

## Advanced usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import RemoteImage from 'react-remote-image'
import Spinner from 'react-spinkit'

ReactDOM.render(
  <RemoteImage 
    src="http://funpeep.com/wp-content/uploads/2014/04/cute-cat-cats-hd-wallpaper.jpg"
    renderLoading={() => (
      <Spinner spinnerName='circle'/>
    )}
    renderFetched={(src, image) => {
      <div className="image-container">
        <img src={src} width="300" />
        <span className="image__info">
          {image.naturalWidth + 'x' + image.naturalHeight}
        </span>
      </div>
    }}
    renderFailure={(error, retry) => (
      <span className="error">
        Failed to load image: {error.message}.
        <button onClick={retry}>
          Retry
        </button>
      </span>
    )}
    alt="Meow meow cat"
    />,
  document.getElementById('app')
)    
```

## Fading

```css
.image {
  opacity: 0;
  transition: 0.3s;
}
.image--loaded {
  opacity: 1;
}
```

```javascript
import React, { Component } from 'react'
import RemoteImage from 'react-remote-image'

class CatView extends Component {
  
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoaded: false,
    }
  }

  render() {
    const { isLoaded } = this.state
    const imageClass =
      isLoaded ?
        'image image-loaded' :
        'image'
    return (
      <RemoteImage 
        src="http://funpeep.com/wp-content/uploads/2014/04/cute-cat-cats-hd-wallpaper.jpg"
        renderLoading={() => (
          <div className="image--loading">
            Loading...
          </div>
        )}
        renderFetched={({ src }) => (
          <img src={src} className={imageClass} />
        )}
        onLoad={() => this.setState({
          isLoaded: true,
        })}
        alt="Meow meow cat"
        />
    )
  }
}
