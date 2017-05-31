#! /usr/bin/env node
const fs = require('fs');
const gm = require('gm');
const path = require('path');
const rimraf = require('rimraf');
const imagemin = require('imagemin');
const imageminZopfli = require('imagemin-zopfli');
const args = process.argv;

const icons = {
  32: 'favicon',
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

function optimizeImage(filename) {
  return new Promise((resolve, reject) =>
    // https://github.com/imagemin/imagemin
    imagemin(
      [path.resolve(__dirname, `./.tmp/${filename}`)], // input file
      'icons', // output dir
      {
        use: [imageminZopfli({ more: true })], // https://github.com/imagemin/imagemin-zopfli
      }
    ).then(() => {
      console.log(`✅  ./${filename} ===> Optimization complete 🎉`);
      resolve();
    })
  );
}

function resizeImage(imageBuffer, size) {
  const filename = icons[size] === 'favicon'
    ? 'favicon.png'
    : `${icons[size]}-icon-${size}x${size}.png`;

  return new Promise((resolve, reject) =>
    // https://github.com/aheckmann/gm
    gm(imageBuffer)
      // Validation
      .format((err, value) => {
        if (err) throw new Error(err);
        if (value !== 'PNG')
          throw new Error(
            '❌  Source image must be PNG format. See README.me for details.'
          );
      })
      .size((err, value) => {
        if (err) throw new Error(err);
        if (value.width !== value.height)
          throw new Error(
            '❌  Source image must be a square. See README.me for details.'
          );
        if (value.width < 512)
          throw new Error(
            '❌  Source image dimensions must be at least 512px x 512px. See README.me for details.'
          );
      })
      // Resizing
      .resize(size, size)
      .write(path.resolve(__dirname, `./.tmp/${filename}`), err => {
        if (err) {
          console.error(
            `❌  This is bad... I have no idea what's gone wrong.`,
            err
          );
        } else {
          console.log(`✅  ./${filename} ===> Resize complete 🎉`);
        }
        resolve(filename);
      })
  );
}

// args[0] == node bin path
// args[1] == the icon-magic bin
// args[2] == user-provided image source path
if (fs.existsSync(args[2])) {
  // Read image source from filesystem into a buffer
  fs.readFile(path.resolve(args[2]), (err, imageBuffer) => {
    if (err)
      console.error(`❌  This is bad... I have no idea what's gone wrong.`, err);
    if (!fs.existsSync('.tmp')) fs.mkdirSync('.tmp');
    if (fs.existsSync('icons')) rimraf('icons', () => {});
    // Iterate over our options object `icons` and begin resizing images
    console.log('📏  Resizing...');
    let resizePass = Object.keys(icons).map(size =>
      resizeImage(imageBuffer, size)
    );
    // Once resized image promise resolves...
    Promise.all(resizePass)
      .then(resizedImages => {
        console.log('✅  Success!\n\n');
        // ...pass them into the optimization function
        console.log(
          '⏱  Optimizing... larger icons will take longer to optimize... use the fifth P!'
        );
        console.log(
          "🚗  Note– order doesn't matter– we've gotta wait for the slowest regardless."
        );
        let optimizationPass = resizedImages.map(filename =>
          optimizeImage(filename)
        );
        // Once optimization promise resolves...
        Promise.all(optimizationPass).then(() => {
          console.log('✅  Success! Thanks for being patient.\n\n');
          // ...remove the .tmp directory we used earlier
          console.log('🗑  Cleaning Up...');
          rimraf('.tmp', () => {
            console.log(
              `✅  Success! ${Object.keys(icons).length} images were created and are available in the "icons" directory.`
            );
          });
        });
      })
      .catch(err => {
        console.error(
          `❌  This is bad... I have no idea what's gone wrong.`,
          err
        );
      });
  });
} else {
  throw Error(
    '❌  You must provide a source image to the `npm start` command. See README.md for details.'
  );
}
