<h1 align="center">react-smooth-scroll</h1>
<h3 align="center">Smooth Scroll into React components</h3>

<br><br>
Minimal class to manage Smooth Scroll into React components based on [virtual-scroll](https://github.com/ayamflow/virtual-scroll), [VirtualScroll.js](https://github.com/drojdjou/bartekdrozdz.com/blob/master/static/src/framework/VirtualScroll.js) and [raf](https://github.com/pqml/raf).
<br><br>

## Features

- Smooth Scroll on any DOM Node
- Manage easing value
- ES7 Decorator

<br>

## Installation

```sh
npm install -S antoninlanglade/react-smooth-scroll
```

<br>

## Example
```javascript
import SmoothScroll from 'react-smooth-scroll';

// If you want to use decorator
@SmoothScroll.SmoothScrollDecorator

// Else you can setup with more params 
export default class Page extends React.Component {
  constructor() {
    const customEase = 0.1;
  }

  // ComponentDidMount
  componentDidMount() {
    SmoothScroll.smoothScrollManager.add(this.refs.component, customEase, this.scrollUpdate);
  }

  // ComponentWillUnmount
  componentWillUnmount() {
    SmoothScroll.smoothScrollManager.remove(this.refs.component);
  }

  // ScrollUpdate with y offset 
  scrollUpdate(y) {
    console.log(y);
  }

  render() {
    return (
      <div ref="component">
        // Your scrollable content
      </div>
    )
  }
}
```

<br>

## Usage

### `SmoothScroll.smoothScrollManager.add(DOMNode, ease, scrollUpdateFunction)`

Add an element into SmoothScrollManager : 
<br>
<br>
`DOMNode` **required** DOMNode
<br>
`ease` *optional* Float
<br>
`scrollUpdateFunction` *optional* Function
<br>
<br>
Example:
```js
  SmoothScroll.smoothScrollManager.add(this.refs.component, 0.1, (y) => { console.log(y) });
```

<br>

### `SmoothScroll.smoothScrollManager.remove(DOMNode)`

Remove an element from SmoothScrollManager : 
<br>
<br>
`DOMNode` **required** DOMNode
<br>
<br>
Example:
```js
  SmoothScroll.smoothScrollManager.remove(this.refs.component);
```

<br>

### `SmoothScroll.smoothScrollManager.reset(DOMNode, position)`

Reset position of an element on y axis from SmoothScrollManager : 
<br>
<br>
`DOMNode` **required** DOMNode
<br>
`position` *optional* Float
<br>

<br>
Example:
```js
  SmoothScroll.smoothScrollManager.reset(this.refs.component, 30.0);
```

<br>




## License
MIT.
