# Icon Magic 📲🕴
A Node script that uses [GraphicsMagick](http://aheckmann.github.io/gm/docs.html) and [ImageMin](https://github.com/imagemin/imagemin) to resize, optimize, and prefix your "Add to Homescreen" icons for Apple and Android devices from a single source image (png).

## Usage:
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


## Example:
`npm start ./sample.png`

| Filename                             | Image                                                    |
| ------------------------------------ | -------------------------------------------------------- |
| ./icons/apple-touch-icon-60x60.png   | ![apple-touch-60](./icons/apple-touch-icon-60x60.png)    |
| ./icons/apple-touch-icon-120x120.png | ![apple-touch-120](./icons/apple-touch-icon-120x120.png) |
| ./icons/apple-touch-icon-152x152.png | ![apple-touch-152](./icons/apple-touch-icon-152x152.png) |
| ./icons/apple-touch-icon-152x152.png | ![apple-touch-152](./icons/apple-touch-icon-152x152.png) |
| ./icons/apple-touch-icon-167x167.png | ![apple-touch-167](./icons/apple-touch-icon-167x167.png) |
| ./icons/apple-touch-icon-180x180.png | ![apple-touch-180](./icons/apple-touch-icon-180x180.png) |
| ./icons/pwa-icon-192x192.png         | ![pwa-192](./icons/pwa-icon-192x192.png)                 |
| ./icons/pwa-icon-256x256.png         | ![pwa-256](./icons/pwa-icon-256x256.png)                 |
| ./icons/pwa-icon-384x384.png         | ![pwa-384](./icons/pwa-icon-384x384.png)                 |
| ./icons/pwa-icon-512x512.png         | ![pwa-512](./icons/pwa-icon-512x512.png)                 |


## Guidelines

Browser and Mobile OS vendors have different methods for handling web apps on their different devices. These are always changing and seem to be quite opinionated. If you feel that something is out-of-date with this script, feel free to open an issue and submit a pull request!

[[Apple Guidelines]](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) [[Google Guidelines]](https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/#provide_great_icons_tiles)
