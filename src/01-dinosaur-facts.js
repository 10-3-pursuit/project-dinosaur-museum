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
  //should return an empty object if there are no dinosaurs
  if (!dinosaurs || dinosaurs.length === 0) {
    return {}; 
  }
  /*if the value is equal to the one it is iterateing to check for the greatest hight 
  in meters it will take the first one becuase if they are equal it does not change with > */
  // should return the first dinosaur if there are multiples with the same length
  const longestDinosaur = dinosaurs.reduce((currentLongest, currentDinosaur) => {
    if (currentDinosaur.lengthInMeters > currentLongest.lengthInMeters) {
      return currentDinosaur;
    } else {
    return currentLongest;
    }
  });
  // Convert length from meters to feet had to google it
  const lengthInFeet = longestDinosaur.lengthInMeters * 3.28084; 
  // should return an object where the key is the tallest dinosaur name and the value is the length in feet
  return {[longestDinosaur.name]:lengthInFeet };
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
  const dinosaurFound = dinosaurs.find((dinosaur)=> dinosaur.dinosaurId === id);
  // ✕ should return a string description of a dinosaur, by ID (1 ms)
  // ✕ should work for dinosaurs with only one value in `mya`
  if(dinosaurFound){
    // deconstruct dinosaurFound
    const {name ,pronunciation, info ,period , mya} = dinosaurFound;
    
    // ✕ should work for dinosaurs with only one value in `mya`
    if(mya.length ===1){
      const newMya =mya[0]
      return `${name} (${pronunciation})\n${info} It lived in the ${period} period, over ${newMya} million years ago.`;
    }else{
      return `${name} (${pronunciation})\n${info} It lived in the ${period} period, over ${mya[1]} million years ago.`;
    }

  }else{
  // ✕ should return an error message if the dinosaur cannot be found (1 ms)
  return `A dinosaur with an ID of '${id}' cannot be found.`
  }

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
  const filteredDinosaurs = dinosaurs.filter((dinosaur) => {
    // Check if the mya value is within the range of the dinosaur's mya values
    let myaRange;
    if (Array.isArray(dinosaur.mya)) {
      if (dinosaur.mya.length === 1) {
        myaRange = [dinosaur.mya[0], dinosaur.mya[0] - 1];
      } else {
        myaRange = dinosaur.mya;
      }
    } else {
      myaRange = [dinosaur.mya];
    }

    return myaRange.includes(mya);
  });

  const resultArray = [];
  if (key) {
    filteredDinosaurs.forEach((dinosaur) => {
      if (dinosaur[key]) {
        resultArray.push(dinosaur[key]);
      } else {
        resultArray.push(dinosaur.dinosaurId);
      }
    });
  } else {
    filteredDinosaurs.forEach((dinosaur) => {
      resultArray.push(dinosaur.dinosaurId);
    });
  }

  return resultArray;
}
  // ✕ should return the IDs of all dinosaurs that were alive approximately at the given time
  // ✕ should include dinosaurs with only one `mya` year
  // ✕ if the `mya` key is an array of one number, should allow for 1 MYA less than the amount
  // ✕ should return an empty array if the year does not match any (1 ms)
  // ✕ if the third argument is set, should replace the IDs with the value of the given key
  // ✕ if the third argument is set, but to a key that doesn't return a value, should return the IDs (1 ms)

  
  
  

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya
};
