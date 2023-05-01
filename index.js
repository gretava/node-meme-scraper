import fs from 'node:fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

// { existsSync, mkdirSync } from 'node:fs';

// Created a folder
const folderName = 'memes/';
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}

// Accessed the website
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

// Load cheerio
const $ = cheerio.load(body);

// Download 10 images and change file names
for (let i = 1; i < 11; i++) {
  const downloadImage = $('img', body)[i - 1].attribs.src;
  await fetch(downloadImage).then((res) => {
    let path = './memes/0' + i + '.jpg';
    if (i === 10) {
      path = './memes/' + i + '.jpg';
    }
    const dest = fs.createWriteStream(path);
    res.body.pipe(dest);
    console.log(downloadImage);
  });
}

//   .then((res) => res.text())
//   .then((html) => {
//     // for (let i = 0; i < 10; i++) {
//     //   const currentImg = ;
//   });
// console.log(html);

// fetch('https://memegen-link-examples-upleveled.netlify.app/')
//   .then((res) => res.text())
//   .then((data) => {

//   });
// Need to push the data into array, end up with return value in it
// const array = [];

// Iterate through the first 10 images:
// for (i=0; i<=10; i++) {array.push({img: })} return

// Check out fs.createWriteStream()

// async function downloadImage() {
//   const url = 'https://memegen-link-examples-upleveled.netlify.app/';
//   const path = path.resolve(__dirname, '/memes', '01.jpg');
//   const writer = fs.createWriteStream(path);

//   const response = await axios({
//     url,
//     method: 'GET',
//     responseType: 'stream',
//   });

//   response.data.pipe(writer);

//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve);
//     writer.on('error', reject);
//   });
// }

// downloadImage();
