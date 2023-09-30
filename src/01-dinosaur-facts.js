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
  // we need to aquire all of the dinosaur lengths, convert them to feet, and return the longest one
  // store the dinosaur names and lengths in an object
  //compare all of the lengths of the dinosaurs and return the longest one IN FEET
  //remeber how to push data into an object

  let dinoLength = 0
  //iterator that updates the longest length
  let longestDino = ""
  //longest dino as a string to prevent the object adding a new key over and over instead of updating the name
  let dinoObj = {}
  // the object that we need to return
  if (dinosaurs.length === 0 ){
    return dinoObj
  // no dinosaurs edge case
  }
  dinosaurs.forEach(function(dino){
    if (dino.lengthInMeters > dinoLength){
      dinoLength = dino.lengthInMeters
      longestDino = dino.name
      // for each dino in the dinosaurs object, if the length of the dino is greater than the current
      //dino length, update the dino length or longest dino and the name of longest dino
    }
  })
  dinoObj[longestDino] = (dinoLength)*3.281
  // this is how you push data into an object manually
  // the object AT ([]) the key you want is EQUAL to the value you want
  return dinoObj
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
  let statement = `A dinosaur with an ID of '${id}' cannot be found.`
  dinosaurs.forEach(function(dino){
    if (dino.dinosaurId === id) {
    statement = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length -1]} million years ago.`
    }
  })
  return statement
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") 
 * value. If a `key` argument is provided when the function is called, returns the value of that 
 * key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to 
 * the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the 
 * dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file 
 * for an example of the input.
 * 
 * @param {number} mya - "Millions of years ago."
 * 
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the 
 * `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * 
 * @returns {*[]} An array of values, which depend on the key given. The array should only include 
 * data of dinosaurs who lived during the given time period.
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
function getDinosaursAliveMya(dinosaurs, millionya, key) {
  // returns an array of all dinosaurs that were alive at the given millionya
  // for each dino, if dino.mya is only one number millionya has to be equal to of -1 than mya. return info
  // for each dino, if dino.mya has two numbers and millionya is between the two numbers of mya, return info
  // if the given key exists in the data, return the key value in the new array
  // if the given key does not exist in the data, return the ID of the dino instead
  // if there is no key, return the ID of the dino
  let validDinos = []
  let aliveArr = []
  dinosaurs.forEach(function(dino){
   if (dino.mya.length === 2){
    // if array.length is 2, then the given value must fit between the two values of the array
   if (millionya <= dino.mya[0] && millionya >= dino.mya[1]){
    validDinos.push(dino)
   } 
   }
   if (dino.mya.length === 1){
    if (millionya === dino.mya[0] || millionya === (dino.mya[0]) -1 ){
     validDinos.push(dino)
    }
   }
  })
  // now we check for keys
   // if there is no key, push the id of the dino into aliveArr
   // if the key doesn't exist, push the id of the dino ino aliveArr
   // if the key of the dinos in validDinos matches a key in the data, push the key value into aliveArr
   
    for (const dino of validDinos) {
      if (dino[key]){
        aliveArr.push(dino[key]);

    } else {
      aliveArr.push(dino.dinosaurId);
    }
   }
   console.log(aliveArr)
  return aliveArr
  
}


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya
};
