/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  const dinoNameIdObj ={}; //make another object to reference dinosaur names along with their ids
  // to get dino names need to iterate through dinosaur array
  for (const dino of dinosaurs) {
  // "pushes" dino.name as key into dinoNameIdObj object with dino.dinosaurId as value (which are the dinosaur names and IDs found in dinosaurs input)
    dinoNameIdObj[dino.name] = dino.dinosaurId;
  } 
  //exit loop now that there is an object to reference instead dinoNameIdObj which is easier to extract and use in function since we need to get room using dinosaurNames that match up with their id numbers which in turn match up with corresponding rooms
  let dinosaurId;
  if (dinoNameIdObj.hasOwnProperty(dinosaurName)) { // checks if object has dinosaurName as a key if it does
    dinosaurId = dinoNameIdObj[dinosaurName]; // value of dinosaurId can be accessed with dinosaurName input as the key
  } else {
    return `Dinosaur with name '${dinosaurName}' cannot be found.` // error message if corresponding dino can't be accessed AT ALL (because input doesn't match referenced data)
  } console.log (dinosaurId);
  // to get room names must iterate through rooms array
  for (const room of rooms) {
    if (room.dinosaurs.includes(dinosaurId)) { // room.dinosaurs is an array so .includes() can be used to find a specific value in this case dinosaurId (a string)
      return room.name; // name of room dino can be found
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`; //error statement after function finishes loop bc otherwise will exit function after first iteration without checking other rooms
};

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
