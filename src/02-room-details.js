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
  // initialize a variable to store the unique ID of the dinosaur
  let uniqueId;
  // iterate through the list of dinosaurs
  for (let dino of dinosaurs) {
    // check if the dinosaur name matches the parameter dinosaurName
    if (dino.name === dinosaurName) {
      // store the dinosaur's unique ID
      uniqueId = dino.dinosaurId;
    }
  }
  // if a unique ID is found
  if (uniqueId) {
    // iterate through the list of rooms
    for (let room of rooms) {
      // check if the room's dinosaurs include the unique ID
      if (room.dinosaurs.includes(uniqueId)) {
        // return the name of the room
        return room.name;
      }
    }
  }
  // if no unique ID is found
  if (!uniqueId) {
    // iterate through the list of rooms
    for (let room of rooms) {
      // check if the room's dinosaurs do not include the unique ID
      if (!room.dinosaurs.includes(uniqueId)) {
        // return an error message
        return `Dinosaur with name '${dinosaurName}' cannot be found.`;
      }
    }
  }

  // return an error message if the dinosaur is not found in any rooms
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
}


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
function getConnectedRoomNamesById(rooms, id) {
  // find the main room with the given id
  const mainRoom = rooms.find((room) => room.roomId === id);
  // if the main room doesn't exist, return an error message
  if (!mainRoom) {
    return `room with id of '${id}' could not be found.`;
  }
  // get the list of neighbors connected to the main room
  let neighbors = mainRoom.connectsTo;
  let neighborsNames = [];
  // loop through the neighbors
  for (let i = 0; i < neighbors.length; i++) {
    // find the connected room in the list of rooms
    const connectedRoom = rooms.find((room) => room.roomId === neighbors[i]);
    // if the connected room exists, add its name to the list
    if (connectedRoom) {
      neighborsNames.push(connectedRoom.name);
    } else {
      // if the connected room doesn't exist, return an error message with the specific id
      return `room with id of '${neighbors[i]}' could not be found.`;
    }
  }
  // if there are neighbor names in the list, return them
  if (neighborsNames.length > 0) {
    return neighborsNames;
  }
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
