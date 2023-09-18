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

  //Created an empty object to hold the data for our "longestDino"
  let longestDino = {};

  //Created a f(x) to sort in ascending order based on "lengthInMeters" values
  //Used spread operator to make a shallow copy of array so it doesn't mutate and mess with other tests
  const sortInAscendingOrder = ([...dinosaurs]) => {
    //Used sort method for numbers
    return dinosaurs.sort((a,b) => {return a.lengthInMeters - b.lengthInMeters}
      )};

  //Created a new array of dino's in ascending order
  const newSortedArray = sortInAscendingOrder(dinosaurs);
  //Created a variable equal to the object of the first longest dino in the array
  const firstlongestDino = newSortedArray.find((dino) => dino.lengthInMeters === newSortedArray[newSortedArray.length - 1].lengthInMeters);   

    for (dino of newSortedArray) {
      if (dino) {
        if (dino.lengthInMeters === firstlongestDino.lengthInMeters) {
        //this sets the key of obj longestDino to the first longest dino's name and set it equal to a value of the length of the dino converted to feet fixed to the second decimal place
        //The Number() method was used since the output showed the length in feet in quotes so to cancel that I used this method
        longestDino[dino.name] = Number((dino.lengthInMeters * 3.281).toFixed(2))
        //break the f(x) so it doesn't return the other longest dinosaurs, that aren't the first instance
        break; 
        }
      }
    }

  return longestDino; 
};

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

  //created the defaut dino description to be the error message
  let dinoDescription = "A dinosaur with an ID of 'incorrect-id' cannot be found."; 
    //checks if there is an id value in our parameters 
    if (id) {
      //created a condition that will update dino description based on if the id given matched that of one of the dinos
      for (dino of dinosaurs) {  
        // create a variable that returns smaller mya number 
        const mostRecentMYA = (Math.min(...dino.mya)); 
        //created a condition that checks if dino id matches id given, if this is true, dinoDescription will update with correct string information
        if (dino.dinosaurId === id) { 
          dinoDescription = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${mostRecentMYA} million years ago.`
        } 
      }  
    }
  return dinoDescription;
};   

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


}; 

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya
};
