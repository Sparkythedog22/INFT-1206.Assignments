/*
Name: Chael
File: main.html
Date: 03 March 2025
JavaScript for a silly story generator
*/

// 1. Element Selectors

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// 2. Text Variables

const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
const insertX = [
  "Willy the Goblin",
  "Big Daddy",
  "Father Christmas"
]
const insertY = [
  "the soup kitchen",
  "Disneyland",
  "the White House"
];
const insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away"
]

// 3. Event Listener & New Function

randomize.addEventListener('click', result);

function result() {
  var newStory = storyText;
  var xItem = randomValueFromArray(insertX);
  var yItem = randomValueFromArray(insertY);
  var zItem = randomValueFromArray(insertZ);

  // replace newStory placeholders
  newStory = newStory.replaceAll(":insertx:", xItem).replaceAll(":inserty:", yItem).replaceAll(":insertz:", zItem);

  if(customName.value !== '') {
    const name = customName.value;

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300);
    const temperature =  Math.round(94);

  }

  story.textContent = ;
  story.style.visibility = 'visible';
}