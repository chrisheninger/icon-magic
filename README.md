# Icon Magic 📲🕴
A Node script that uses [GraphicsMagick](http://aheckmann.github.io/gm/docs.html) and [ImageMin](https://github.com/imagemin/imagemin) to resize, optimize, and prefix your "Add to Homescreen" icons for Apple and Android devices from a single source image (png).

## Usage:
Make sure you have GraphicsMagick ☝️ installed on your machine and available on the command-line already.
```js
// Clone the repository and cd into the directory
git clone git@github.com:chrisheninger/icon-magic.git && cd icon-magic

// Install dependencies via npm (or yarn)
npm install

// The script takes a single argument– a source image path (png-only)
npm start ./sample.png

// If everything is successful, you should have a directory named 'icons'
// with all the prefixed, resized, and optimized images! 🎉

// Move the outputted icons directory to your project directory
mv icons/ ../path/to/desired/directory/
```

## Tags:
```html
<!-- Apple Guidelines: https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html -->
<link rel="apple-touch-icon" href="./path/to/icons/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="120x120" href="./path/to/icons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="152x152" href="./path/to/icons/apple-touch-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="167x167" href="./path/to/icons/apple-touch-icon-167x167.png" />
<link rel="apple-touch-icon" sizes="180x180" href="./path/to/icons/apple-touch-icon-180x180.png" />
<meta name="apple-mobile-web-app-title" content="App Title">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!-- Android Guidelines: https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/-->
<link rel="manifest" href="./path/to/manifest.json">
<meta name="theme-color" content="#009ad3">
```

```js
/* Manifest.json– see Android Guidelines above for configuration options */
{
  "short_name": "App Title",
  "name": "A bit longer of an App Title",
  "start_url": "./path/to/index.html",
  "icons": [
    {
      "src": "./path/to/icons/pwa-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "./path/to/icons/pwa-icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "./path/to/icons/pwa-icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "./path/to/icons/pwa-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "background_color": "#f5f5f5",
  "theme_color": "#009ad3",
  "display": "standalone",
  "orientation": "portrait"
}
```


## Example:
`npm start ./icons/sample.png`

| Filename                     | Image                                                    |
| ---------------------------- | -------------------------------------------------------- |
| apple-touch-icon-60x60.png   | ![apple-touch-60](./icons/apple-touch-icon-60x60.png)    |
| apple-touch-icon-120x120.png | ![apple-touch-120](./icons/apple-touch-icon-120x120.png) |
| apple-touch-icon-152x152.png | ![apple-touch-152](./icons/apple-touch-icon-152x152.png) |
| apple-touch-icon-152x152.png | ![apple-touch-152](./icons/apple-touch-icon-152x152.png) |
| apple-touch-icon-167x167.png | ![apple-touch-167](./icons/apple-touch-icon-167x167.png) |
| apple-touch-icon-180x180.png | ![apple-touch-180](./icons/apple-touch-icon-180x180.png) |
| pwa-icon-192x192.png         | ![pwa-192](./icons/pwa-icon-192x192.png)                 |
| pwa-icon-256x256.png         | ![pwa-256](./icons/pwa-icon-256x256.png)                 |
| pwa-icon-384x384.png         | ![pwa-384](./icons/pwa-icon-384x384.png)                 |
| pwa-icon-512x512.png         | ![pwa-512](./icons/pwa-icon-512x512.png)                 |


## Guidelines

Browser and Mobile OS vendors have different methods for handling web apps on their different devices. These are always changing and seem to be quite opinionated. If you feel that something is out-of-date with this script, feel free to open an issue and submit a pull request!

[[Apple Guidelines]](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) [[Google Guidelines]](https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/#provide_great_icons_tiles)


## Mac OS App

A drag-and-drop standalone Mac OS App is currently in the works thanks to [Create React App](https://github.com/facebookincubator/create-react-app) and [Electron](https://github.com/electron/electron). 
