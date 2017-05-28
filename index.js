const fs = require('fs');
const gm = require('gm');
const path = require('path');
const rimraf = require('rimraf');
const imagemin = require('imagemin');
const imageminZopfli = require('imagemin-zopfli');
const args = process.argv;

const icons = {
  60: 'apple-touch',
  120: 'apple-touch',
  152: 'apple-touch',
  167: 'apple-touch',
  180: 'apple-touch',
  192: 'pwa',
  256: 'pwa',
  384: 'pwa',
  512: 'pwa',
};

function optimizeImages(size, cb) {
  // https://github.com/imagemin/imagemin
  imagemin(
    [path.resolve(__dirname, `./.tmp/${icons[size]}-icon-${size}x${size}.png`)], // input file
    'icons', // output dir
    {
      use: [imageminZopfli({ more: true })], // https://github.com/imagemin/imagemin-zopfli
    }
  ).then(() => {
    console.log(
      `./${icons[size]}-icon-${size}x${size}.png ===> Optimization complete 🎉`
    );
    cb();
  });
}

function resizeImages(imageBuffer, size, cb) {
  // https://github.com/aheckmann/gm
  gm(imageBuffer)
    // Validation
    .format((err, value) => {
      if (err) throw new Error(err);
      if (value !== 'PNG')
        throw new Error(
          'Source image must be PNG format. See README.me for details.'
        );
    })
    .size((err, value) => {
      if (err) throw new Error(err);
      if (value.width !== value.height)
        throw new Error(
          'Source image must be a square. See README.me for details.'
        );
      if (value.width < 512)
        throw new Error(
          'Source image dimensions must be at least 512px x 512px. See README.me for details.'
        );
    })
    // Resizing
    .resize(size, size)
    .write(
      path.resolve(__dirname, `./.tmp/${icons[size]}-icon-${size}x${size}.png`),
      err => {
        if (err) {
          console.log(':( An error occured.', err);
        } else {
          console.log(
            `./${icons[size]}-icon-${size}x${size}.png ===> Resize complete 🎉`
          );
        }
        cb();
      }
    );
}

// args[0] == node bin path
// args[1] == this index.js path
// args[2] == user-provided image source path
if (fs.existsSync(args[2])) {
  // Read image source from filesystem into a buffer
  fs.readFile(path.resolve(args[2]), (err, imageBuffer) => {
    if (err) console.log(':( An error occured.', err);
    if (!fs.existsSync('.tmp')) fs.mkdirSync('.tmp');
    if (fs.existsSync('icons')) rimraf('icons', () => {});

    let resizePass = Object.keys(icons).reduce((promiseChain, size) => {
      return promiseChain.then(
        () =>
          new Promise(resolve => {
            resizeImages(imageBuffer, size, resolve);
          })
      );
    }, Promise.resolve());

    console.log('⏱  Resizing...');
    resizePass.then(() => {
      console.log('✅  Success!');
      console.log('');
      console.log('');

      let optimizationPass = Object.keys(icons).reduce((promiseChain, size) => {
        return promiseChain.then(
          () =>
            new Promise(resolve => {
              optimizeImages(size, resolve);
            })
        );
      }, Promise.resolve());

      console.log(
        '⏱  Optimizing... larger icons will take longer... use the fifth P!'
      );
      optimizationPass.then(() => {
        console.log('✅  Success! Thanks for being patient.');
        console.log('');
        console.log('');

        console.log('⏱  Cleaning Up...');
        rimraf('.tmp', () => {
          console.log('✅  Success!');
        });
      });
    });
  });
} else {
  throw Error(
    'You must provide a source image to the `npm start` command. See README.md for details.'
  );
}
