/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require('../data/dinosaurs');
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  let result = {}; // creates a result object to format output correctly (the key should be dinosaur name )
  if (dinosaurs.length === 0) { // checks if there are no dinosaurs
    return result; // if no dinosaurs returns empty object. If not empty then it will continue to next line of code
  }
//initializing variables to keep track of longest dinosaur we have found so far before iterating. Starting point is necessary for comparison of what we have so far to current value
  let longestDino = null; // value is set to null because initially there are no values to compare
  let maxLengthInFeet = 0; // value is a number and set to 0 to initiate starting point as it iterates through the list

  for (let dino of dinosaurs) { // iterate to get to the objects inside the dinosaurs array
    let lengthInFeet = dino.lengthInMeters * 3.281; // converts meters to feet (required for this function in particular to keep units consistent)
    if (lengthInFeet > maxLengthInFeet) { // if this dino is longer than the longest one found so far - this allows us to update our tracking variables
      maxLengthInFeet = lengthInFeet; // whenever new longest dinosaur is found maxLengthInFeet is updated to reflect this (updates to length in feet)
      longestDino = dino.name; // this will update it to the name of the dinosaur that has the new longest length
    }
  }
  result[longestDino] = maxLengthInFeet; // formats output as an object where the key is the dinosaur name with longest length and the value is the maximum length in feet

  return result; // result object makes function defined so when invoked it produces output. Output is an object where the key is the dinosaur name with longest length and the value is the maximum length in feet.
};
//console.log(getLongestDinosaur(exampleDinosaurData)); // to test function using node src/01-dinosaur-facts.js

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` argument is provided when the function is called, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */

// If only 2 parameters OR If all 3 but key doesn't exist in the data (dinosaur and mya) RETURNS array of dinosaurs IDs who were alive at given mya
// If all 3 parameters returns actual key value
// To do this ^ :check if key exists (if statement or .filter()) if it does then push key into new array if it doesn't - push id into array
// if the `mya` key is an array of one number, should allow for 1 MYA less than the amount 
// To do this iterate through the array using a for loop or high order native array function like .filter() or .map() use: if dino.mya.length === 1 and mya === dino.mya || mya === dino.mya - 1

function getDinosaursAliveMya(dinosaurs, mya, key) {
  const result =[];
  let max;
  let min;
  for (let dino of dinosaurs) {
    if (dino.mya.length === 1) { //Checks for dino.mya values where there is only 1 element inside the array. If statement to provide a range of dinos alvie at the time
      max = dino.mya;
      min = dino.mya - 1; // Unnecessary to iterate over an array with just 1 element in order to subtract from it
    } else {
      max = dino.mya[0];
      min = dino.mya[1];
    }
    if (mya <= max && mya >= min) {
      if (key && dino.hasOwnProperty(key)) { // if it matches key
        result.push(dino[key]);
      } else if (key && !dino.hasOwnProperty(key)) { // if there's a key argument but it doesn't match any keys in the data
        result.push(dino.dinosaurId);
      } else {
        result.push(dino.dinosaurId); // for all other cases which include if the optional parameter key isn't provided an argument
      }
    }
  }
 return result;
}
console.log(getDinosaursAliveMya(exampleDinosaurData));

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya
};
