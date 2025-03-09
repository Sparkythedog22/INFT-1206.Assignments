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

const imageAltText = [
    'A human eye.',
    'A close-up image of a rock.',
    'Some flowers.',
    'Ancient Egyptian art.',
    'A moth on a leaf.'
];

/* Looping through images */

for (let i = 0; i < imageFilenames.length; i++) {
    const newImage = document.createElement('img');

    newImage.setAttribute('src', `images/${imageFilenames[i]}`);
    newImage.setAttribute('alt', `${imageAltText[i]}`);

    newImage.addEventListener("click", () => {
        displayedImage.setAttribute('src', `images/${imageFilenames[i]}`);
        displayedImage.setAttribute('alt', `${imageAltText[i]}`);
    });

    thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener("click", (event) => {
    buttonClass = btn.getAttribute("class");
    if(buttonClass === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
});