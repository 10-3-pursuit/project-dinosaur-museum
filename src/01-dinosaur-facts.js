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
  // Initialize variables to store the longest dinosaur length and a new dinosaur object
  let longestDinosaur = 0
  let newDinosaurObj = {}
  // Iterate through the array of dinosaurs using .forEach()
  dinosaurs.forEach((dinosaur) => {
    // Check if the current dinosaur's length is greater than 'longestDinosaur'
    if (dinosaur.lengthInMeters > longestDinosaur) {
      // If it is, update longestDinosaur
      longestDinosaur = dinosaur.lengthInMeters
      /* Create a new dinosaur object with the dinosaur name as the key
      and its length converted to feet as the value. If the next dinosaur is longer, 
      the object is updated. */
      newDinosaurObj = {
        [dinosaur.name]: dinosaur.lengthInMeters * 3.281
      }
    }
  })
  /* Return the new dinosaur object with the longest dinosaur. If there are no dinosaurs, 
  returns empty object. */
  return newDinosaurObj
}

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

function getDinosaurDescription(dinosaurs, id) {
  // Created a variable to hold a default error message in case the ID is not found.
  let dinoInfo = `A dinosaur with an ID of '${id}' cannot be found.`
  // Iterate through the 'dinosaurs' array using .forEach().
  dinosaurs.forEach((dinosaur) => {
    // Check if the current dinosaur's 'dinosaurId' matches the original 'id' parameter.
    if (dinosaur.dinosaurId === id) {
      // If the IDs match, update 'dinoInfo' with the dinosaur's information using string interoplation.
      dinoInfo = `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length - 1]} million years ago.`
    }
  })
  // Return 'dinoInfo', which either contains the dinosaur's information or the default error message.
  return dinoInfo
}

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

function getDinosaursAliveMya(dinosaurs, mya, key) {
  // Created empty array to store values.
  const dinosaurArray = []
  // Iterate through the 'dinosaurs' array using .forEach().
  dinosaurs.forEach(dinosaur => {
    // Check if the 'dinosaur.mya' array has more than one element using '.length'.
    if (dinosaur.mya.length > 1) {
      /* Check if value of 'mya' in the parameters is equal to or inbetween the two values of the elements 
      in the array 'dinosaur.mya'. */
      if (dinosaur.mya[0] >= mya && dinosaur.mya[1] <= mya) {
        // Check if 'key' is in the parameters and that dinosaur[key] is NOT undefined.
        if (key && dinosaur[key] !== undefined) {
          // Push the value of 'dinosaur[key]' into the array 'dinosaurArray'.
          dinosaurArray.push(dinosaur[key])
        } else {
          // If 'key' is not in the parameters or 'dinosaur[key]' is undefined, push 'dinosaurId' into 'dinosaurArray'.
          dinosaurArray.push(dinosaur.dinosaurId)
        }
      }
    } 
    // Check if the 'dinosaur.mya' array has only one element using '.length'.
    else if (dinosaur.mya.length === 1) {
      // Check if the value of 'mya' in the parameters is within 1 million years BEFORE the value of 'dinosaur.mya[0]'.
      if (mya >= dinosaur.mya[0] - 1 && mya <= dinosaur.mya[0]) {
        // Check if 'key' is in the parameters and that dinosaur[key] is NOT undefined.
        if (key && dinosaur[key] !== undefined) {
          // Push the value of 'dinosaur[key]' into the array 'dinosaurArray'.
          dinosaurArray.push(dinosaur[key])
        } else {
          // If 'key' is not in the parameters or 'dinosaur[key]' is undefined, push 'dinosaurId' into 'dinosaurArray'.
          dinosaurArray.push(dinosaur.dinosaurId)
        }
      }
    }
  })
  /* Return 'dinosaurArray' with either the dinosaur ID's or the specified key, after the entire 'dinosaurs' 
  array has been iterated through. */
  return dinosaurArray
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya
};
