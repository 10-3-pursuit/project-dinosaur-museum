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
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in 
 * any room, return an error message that says so.
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
//finds dinosaur object with the same given name
let validDino = dinosaurs.find((dino)=> dino.name === dinosaurName)
 if (validDino === undefined){
  // dino name doesnt exist edge case
  return `Dinosaur with name '${dinosaurName}' cannot be found.`
 } 
// find the room object that has the id of the current validDino (rooms.dinosaurs)
// return error message if room cannot be found
// return the name of the room with the dino
//validRoom is the room we need to find. find the first room thats has a dino with the same (.includes ?) id as validDino
let validRoom = rooms.find((room)=> room.dinosaurs.includes(validDino.dinosaurId))
 if (validRoom === undefined){
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
 }
 return validRoom.name
}

/**`
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room.
 *  If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example 
 * of the input.
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
  //returns an array of strings aka the names of all rooms connected to given room
  //first, find the room that matches the given id
  validRoom = rooms.find((room)=> room.roomId === id)
  if(validRoom === undefined){
    return `Room with ID of '${id}' could not be found.`
  }
  //now we have a room
  //validRoom.connectsTo has an array of room IDs that connect to validRoom
  //for each value in validRoom.connectsTo, .find the room where the id is equal to that current Id
  // then push it to a new array
  let connectedRoomsArr = []
  // connectedRoomsArr.push(validRoom.connectsTo.forEach((id)=> rooms.find((room)=> room.roomId === id)))
  //would have been so cool if that worked
  let validConnectionsArr = []
  for (let id of validRoom.connectsTo){
    validConnectionsArr.push(rooms.find((room)=> room.roomId === id))
  }
  for (let room of validConnectionsArr){
    connectedRoomsArr.push(room.name)
  }
  return connectedRoomsArr
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
