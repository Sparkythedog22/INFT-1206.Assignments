/*
Name: Chael
File: main.js
Date: 08 March 2025
JavaScript for an image gallery.
*/

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = [
    'pic1.jpg',
    'pic2.jpg',
    'pic3.jpg',
    'pic4.jpg',
    'pic5.jpg'
];

/* Declaring the alternative text for each image file */

/* Looping through images */

for (const imageFilename of imageFilenames) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${imageFilename}`);
    newImage.setAttribute('alt', `images/${imageFilename}`);
    thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
