# Laugh at IE
[![MIT](https://img.shields.io/github/license/the-fukui/laugh-at-IE)](https://github.com/the-fukui/laugh-at-IE/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/laugh-at-ie.svg)](https://badge.fury.io/js/laugh-at-ie)
![size](https://img.shields.io/bundlephobia/min/laugh-at-ie)
[![Netlify Status](https://api.netlify.com/api/v1/badges/01dcc711-2cf7-4bb8-80ca-83a83a64da0b/deploy-status)](https://app.netlify.com/sites/laugh-at-ie/deploys)

This script laugh at those who still access your website with Internet Explorer. 😂

[Demo](https://laugh-at-ie.netlify.com/) (Open with IE, please 🙏）

- Play laughing sound when page loaded and any error has occured with IE. 
- You can set an arbitrary function to callback when laughing sound is played.


## Installation & Usage


### Install via npm
```sh
npm install laugh-at-ie
```

Import it to your project & initialize it.

```javascript
import LaughAtIE from 'laugh-at-ie'  

const laugh = new LaughAtIE()
laugh.init()
```

### or using \<script\> tag in the HTML:

```html
<script src="https://unpkg.com/laugh-at-ie/dist/index.js"></script>
<script>
var laugh = new LaughAtIE();
laugh.init();
</script>
```

## Customization
You can designate your original laughing sound and callback function. Default settings below.

```javascript
var laugh = new LaughAtIE({
    onLoad: {
        sound: 'https://laugh-at-ie.netlify.com/sound/laugh.mp3',
        callback: function(){}
    },
    onError: {
        sound: 'https://laugh-at-ie.netlify.com/sound/laugh2.mp3',
        callback: function(e){
            //You can get error message 
            alert('Error!\n\n' + e)
        }
    }
});
laugh.init();
```

### sample
[Demo site](https://laugh-at-ie.netlify.com/)

```javascript
function error(e) {
    var confirm = window.confirm('Error message: ' + e + '\n\nAn error occured. Do you want to get Chrome?');
    if (confirm) {
        location.href('https://www.google.com/chrome/')
    }
}

function welcome() {
    alert('Are you still use Internet Explorer???');
}

var laugh = new LaughAtIE({
    onLoad: {
        callback: welcome
    },
    onError: {
        callback: error
    }
});
laugh.init();
```

## License
[MIT](https://github.com/the-fukui/laugh-at-IE/blob/master/LICENSE)

