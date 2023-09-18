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
//if the dino array is empty return an empty array
//first sort the data by the dino length (highest length goes first)
//grab the first element in that newly sorted array
//return an object where the key is the dino name and value is the length in feet
//*NOTE* you MUSt convert meters into feet => multiply by 3.281

function getLongestDinosaur(dinosaurs) {
  //create an empty object to store data IF the dinosaur array is NOT empty and to return IF the dinosaur array IS empty
  let longestDino = {};

  // should return an empty object if there are no dinosaurs
  //this is the "guard clause" that checks if the array is empty and if so the empty array stored to the longestDino variable will be returned
  //when this is executed the function ends
  if (dinosaurs.length === 0) {
    return longestDino;
  }
  //if the array is not empty, create a key to store the dino name to
  //start the value at 0 (to ensure that the datatype is a number?)and update it when the longest dino length is found
  else if (dinosaurs.length > 0) {
    let key = "";
    let val = 0;

    for (let ele of dinosaurs) {
      if (ele.lengthInMeters > val) {
        key = ele.name;
        val = ele.lengthInMeters;
        //whenver the lengthInMeters is greater than the val, the val changes to that particular LIM
      }
    }
    //when the loop is complete we want to store the data into the previously empty object
    //MUST do this step OUTSIDE of the loop
    //Convert to meters into feet by multiply the value by 3.281
    longestDino[key] = val * 3.281;

    //return the final object
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
  //create the default message and assign the value to be the "error message" that will be returned if the dinosaurs ID is not found (no conditions are TRUE)
  //loop through the dinosaur array and check if the dinosaurId is equal to the inputted ID
  //if it is update the message to include the dino name, pronunciation, info and period
  //At first i was checking if the array was equal to 1 and creating a message for that and then checking if the array was greater than 1 and creating a different message for that case but then i refactored and instead am using the Math.min method as well as a spread opeartor in order to check the length of the array and return a message based on the arrays length
  //this eliminates the need of creating multiple if statements

  let message = `A dinosaur with an ID of '${id}' cannot be found.`;
  for (let dino of dinosaurs) {
    const { dinosaurId, name, pronunciation, period, mya, info } = dino;
    if (dinosaurId === id) {
      message = `${name} (${pronunciation})\n${info} It lived in the ${period} period, over ${Math.min(
        ...mya
      )} million years ago.`;
      return message;
    }
  }
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
function getDinosaursAliveMya(dinosaurs, mya, key) {}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
