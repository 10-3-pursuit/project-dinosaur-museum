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
   
    // checking if the dinosaurs array is empty

   if (
         dinosaurs.length === 0
        ){

          // if the array is empty return an empty object

          return {};
        }
        
         // initialize longestDinosaur with the first dinosaur in the arry

       let longestDinosaur = dinosaurs[0];
      
         // used for loop to loop through the remaining dinosaur in the array

       for (let i = 1; i < dinosaurs.length; i++ ){
         
        // get the current dinosaur

        let dinoOne = dinosaurs[i];

        //used an if statement to compare the length of the current dinosaur with the longest dinosaur found

        if ( dinoOne.lengthInMeters > longestDinosaur.lengthInMeters){

          // if the current dinosaur is longer update longestDinosaur to the current dinosaur
          longestDinosaur = dinoOne;
        }
        
       }

       // declere  a variable to store the convertion of the length of the longest dinosaur from meters to feet

       let dinoFeet = longestDinosaur.lengthInMeters * 3.281

       // return an object with the name of the longest dinosaur as the key and the length in feet as the value
       
       return  { [longestDinosaur.name]: dinoFeet }
       

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
   
      // declere variables to store dinosaur information
 
      let dinoName; 
      let dinoPronunciation; 
      let dinoDescription; 
      let dinoPeriod; 
      let dinoMya; 
      
      // used for loop, to loop through the array of dinosaurs

    for (let i = 0; i < dinosaurs.length; i++){

      // used a if statement to check if the current dinoaur's id matches the provided id
    
      if (dinosaurs[i].dinosaurId === id){

       // if there is a macth assign the dinosaur's information to the variables

       dinoName = dinosaurs[i].name;
       dinoPronunciation = dinosaurs[i].pronunciation;
       dinoDescription = dinosaurs[i].info;
       dinoPeriod = dinosaurs[i].period;
       
       // get the last value from the mya array to determine when it lived
       
       dinoMya = dinosaurs[i].mya[dinosaurs[i].mya.length - 1];
 }
}
       //if dinoName is undefined, return an error message

      if (dinoName === undefined){
        return "A dinosaur with an ID of 'incorrect-id' cannot be found."
}
       // return a formatted description of the dinosaur

      return `${dinoName} (${dinoPronunciation})\n${dinoDescription} It lived in the ${dinoPeriod} period, over ${dinoMya} million years ago.`
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

  // initialize an empty array to store the result
  let result = [];

  // loop through the array of dinosaurs
  
  for (let i = 0; i < dinosaurs.length; i++){

    // check if the dinosaur's mya arrray includes the provided mya value
    // or if the may value is one less than the provided mya
    // or if the dinosaur's mya range covers the provided mya value

    if (dinosaurs[i].mya.includes(mya) || dinosaurs[i].mya - 1 === mya || dinosaurs[i].mya[0] > mya && dinosaurs[i].mya[1] < mya){

      // check if key is provided and if the dinosaur has the specified property
       
      if (key && dinosaurs[i][key] !== undefined){
        
        // if key is provided and the property exists push its value to the rsult array

        result.push(dinosaurs[i][key])

        // else if key is not provided or the property doesn't exist push the dinosaur's id to the result array

      } else {
        result.push(dinosaurs[i].dinosaurId)
      }
    }
  }
        // return the result array 
  return result;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya
};
