const fs = require('fs');
const gm = require('gm');
const path = require('path');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

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

function cleanup(size, cb) {
  fs.unlink(
    path.resolve(__dirname, `./${icons[size]}-icon-${size}x${size}.png`),
    cb
  );
}

function optimizeImages(size, cb) {
  imagemin(
    [path.resolve(__dirname, `./${icons[size]}-icon-${size}x${size}.png`)],
    'icons',
    { use: [imageminPngquant({ quality: '100' })] }
  ).then(function() {
    console.log(
      `./${icons[size]}-icon-${size}x${size}.png ===> Optimization complete 🎉`
    );
    cb();
  });
}

function resizeImages(imageData, size, cb) {
  gm(imageData)
    .resizeExact(size, size)
    .write(
      path.resolve(__dirname, `./${icons[size]}-icon-${size}x${size}.png`),
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

fs.readFile(path.resolve(__dirname, 'sample.png'), (err, imageData) => {
  if (err) console.log('shit', err);

  let resizePass = Object.keys(icons).reduce((promiseChain, size) => {
    return promiseChain.then(
      () =>
        new Promise(resolve => {
          resizeImages(imageData, size, resolve);
        })
    );
  }, Promise.resolve());

  console.log('⏱  Resizing ===================>');
  resizePass.then(() => {
    console.log('✅  Resizing Success!');
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

    console.log('⏱  Optimizing ===================>');
    optimizationPass.then(() => {
      console.log('✅  Success!');
      console.log('');
      console.log('');

      let cleanupPass = Object.keys(icons).reduce((promiseChain, size) => {
        return promiseChain.then(
          () =>
            new Promise(resolve => {
              cleanup(size, resolve);
            })
        );
      }, Promise.resolve());

      console.log('⏱  Cleaning Up ===================>');
      optimizationPass.then(() => {
        console.log('✅  Success!');
        console.log('');
        console.log('');
      });
    });
  });
});
