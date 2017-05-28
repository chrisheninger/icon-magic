const fs = require('fs');
const gm = require('gm');
const path = require('path');
const rimraf = require('rimraf');
const imagemin = require('imagemin');
const imageminZopfli = require('imagemin-zopfli');

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
    .resize(size, size)
    .compress('Lossless')
    .write(
      path.resolve(__dirname, `./.tmp/${icons[size]}-icon-${size}x${size}.png`),
      err => {
        if (err) {
          console.log('shit', err);
        } else {
          console.log(
            `./${icons[size]}-icon-${size}x${size}.png ===> Resize complete 🎉`
          );
        }
        cb();
      }
    );
}

fs.readFile(path.resolve(__dirname, 'sample.png'), (err, imageBuffer) => {
  if (err) console.log('shit', err);
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
