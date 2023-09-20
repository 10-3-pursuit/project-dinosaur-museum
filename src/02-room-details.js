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
  const findDino = dinosaurs.find((dinosaur) => dinosaur.name === dinosaurName);

  //Checks if there's no dinosaurs with that name
  if(!findDino){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  // Look through the rooms for the room the dinosaur is kept
  for(let room of rooms){
    if(room.dinosaurs.includes(findDino.dinosaurId)){
      return room.name;
    }
  }

  // If it can't find any room then it returns this statement
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
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
  // Declare empty array to push connectsTo rooms in
  let arrayConnectsTo = [];

  // Iterate through the rooms and find the first one that matches the given id
  const connectedRooms = rooms.find((room) => room.roomId === id);
  //If connectedRooms is falsy return error message
  if(!connectedRooms){
    return `Room with ID of 'incorrect-id' could not be found.`
  }
  // When room is found store the connected rooms in to this variable
  const connectedRoomIds = connectedRooms.connectsTo;

  //Iterate through the connectedRoom id's
  for(const roomId of connectedRoomIds) {
    //Find the room that matches the roomId
    const connectedRoom = rooms.find((room) => room.roomId === roomId);

    if (connectedRoom) {
      arrayConnectsTo.push(connectedRoom.name);
    }
    else{
      return `Room with ID of 'incorrect-id' could not be found.`;
    }
  }

  //return array;
  return arrayConnectsTo;

}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
