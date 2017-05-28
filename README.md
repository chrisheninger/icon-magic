# Icon Magic 📲🕴
A Node script that uses [GraphicsMagick](http://aheckmann.github.io/gm/docs.html) and [ImageMin](https://github.com/imagemin/imagemin) to prefix, resize, and optimize your "Add to Homescreen" icons for Apple and Android devices from a single source image (png).

Browser and Mobile OS vendors have different methods for handling web apps on their different devices. [Apple Guidelines](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) [Google Guidelines](https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/#provide_great_icons_tiles)

## Usage:
```js
// Clone the repository and cd into the directory
git clone git@github.com:chrisheninger/icon-magic.git && cd icon-magic
// Install dependencies via npm (or yarn)
npm install
// The script takes a single argument– a source image path (png-only)
npm start ./sample.png
// If everything is resized and compressed successfully, you should have an icons directory with all the prefixed, resized, and optimized images!
// Move the outputted icons directory to your project directory
mv icons/ ../path/to/desired/directory/
```
