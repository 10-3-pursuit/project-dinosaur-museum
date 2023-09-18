/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
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
  // Create an empty object to store data IF the dinosaur array is NOT empty and to return IF the dinosaur array IS empty.
  let longestDino = {};

  // If there are no dinosaurs in the array, return the empty object.
  // This is the "guard clause" that checks if the array is empty and if so the empty array stored to the longestDino variable will be returned
  if (dinosaurs.length === 0) {
    return longestDino;
  }

  // If the array is not empty, Create variables to store the longest dinosaur's name and length in meters.
  else if (dinosaurs.length > 0) {
    let key = ""; // Create a variable to store the name of the longest dinosaur.
    let val = 0; // Create a variable to store the length (in meters) of the longest dinosaur.

    // Loop through each dinosaur in the 'dinosaurs' array.
    for (let ele of dinosaurs) {
      // Check if the current dinosaur's length in meters is greater than the stored length.
      if (ele.lengthInMeters > val) {
        key = ele.name; // Update the 'key' to the current dinosaur's name.
        val = ele.lengthInMeters; // Update the 'val' to the current dinosaur's length in meters.
      }
    }

    // After the loop, store the data (name and length in feet) in the 'longestDino' object.
    // Convert the length from meters to feet by multiplying by 3.281.
    longestDino[key] = val * 3.281;

    // Return the object containing the name and length of the longest dinosaur.
    return longestDino;
  }
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
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found".
 */
function getDinosaurDescription(dinosaurs, id) {
  // Create a default message that will be returned if the dinosaur ID is not found.
  let message = `A dinosaur with an ID of '${id}' cannot be found.`;

  // Loop through each dinosaur in the 'dinosaurs' array.
  for (let dino of dinosaurs) {
    // Destructure the properties of the current dinosaur.
    const { dinosaurId, name, pronunciation, period, mya, info } = dino;

    // Check if the current dinosaur's ID matches the input 'id'.
    if (dinosaurId === id) {
      // If the ID matches, update the message to include the dinosaur's name, pronunciation, information, and period.
      message = `${name} (${pronunciation})\n${info} It lived in the ${period} period, over ${Math.min(
        ...mya
      )} million years ago.`;

      // Return the updated message and exit the loop since we found the matching dinosaur.
      return message;
    }
  }

  // If no matching dinosaur ID is found, the default message is returned.
  return message;
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
  const dinoAliveDuringMya = [];

  for (const dinosaur of dinosaurs) {
    // Check if the dinosaur's mya period matches the specified range.
    if (
      dinosaur.mya.length === 2 &&
      dinosaur.mya[0] >= mya &&
      mya >= dinosaur.mya[1]
    ) {
      const dinoKeys = Object.keys(dinosaur);
      // If the key exists, push its value; otherwise, push the dinosaur ID.
      dinoAliveDuringMya.push(
        dinoKeys.includes(key) ? dinosaur[key] : dinosaur.dinosaurId
      );
    } else if (
      dinosaur.mya.length === 1 &&
      (dinosaur.mya[0] === mya || mya === dinosaur.mya[0] - 1)
    ) {
      const dinoKeys = Object.keys(dinosaur);
      // If the key exists, push its value; otherwise, push the dinosaur ID.
      dinoAliveDuringMya.push(
        dinoKeys.includes(key) ? dinosaur[key] : dinosaur.dinosaurId
      );
    }
  }

  return dinoAliveDuringMya;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
