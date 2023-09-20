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
  //Created variable called 'dinosaurSearchId'
  let dinosaurSearchId = null
  //Variable 'whereIsDinosaur' created with a default message in case 'dinosaurName' in the parameters cannot be found
  let whereIsDinosaur = `Dinosaur with name '${dinosaurName}' cannot be found.`

  //'.forEach()' method will iterate through the 'dinoasurs' array, each element being an object represented by the callback function parameter 'dinosaur'.
  dinosaurs.forEach(dinosaur => {
    //If the value of 'dinosaurName' equals the value of 'dinosaur.name' in the object,'dinosaurSearchId' will be set equal to the value of 'dinosaur.dinosaurId'.
    if (dinosaurName === dinosaur.name) {
      dinosaurSearchId = dinosaur.dinosaurId
      //The 'whereIsDinosaur' default message is now changed, since the value of 'dinosaurName' was found in the object.
      whereIsDinosaur = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
    }
  })
  // Use the '.find()' method to discover the room in the 'rooms' array of objects where the value of 'dinosaurSearchId' is found among the 'room.dinosaurs' array, using '.includes()'.
  roomWithDinosaur = rooms.find(room => room.dinosaurs.includes(dinosaurSearchId))
    //If 'roomWithDinosaur' is truthy, the default message is replaced with the value of 'roomWithDinosaur.Name'.
    if (roomWithDinosaur){
      whereIsDinosaur = roomWithDinosaur.name
    }
  //Will return either one of the error messages, or the room name where the 'dinosaurName' is found.  
  return whereIsDinosaur
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
  //use the '.find()' method to iterate through the 'rooms' array, and find the first value of the 'room.roomId' object property that is equal to the value of 'id' in the parameters. Assigns that entire object to 'foundRoom'.
  let foundRoom = rooms.find(room => room.roomId === id)

  //if 'foundRoom' is falsy, a room was not found, and an error message is returned.
  if (!foundRoom) {
    return `Room with ID of '${id}' could not be found.`
  }

  //3 variables are created that will be used in the following code, assigned two arrays and a value 'null' respectively.
  let connectedRoomsArr = []
  let roomIdArr = []
  let errorRoom = null

  //The '.forEach()' method iterates through the 'rooms' array.
  rooms.forEach(room => {

    //If the array 'foundRoom.connectsTo' inside the 'foundRoom' object includes the value of 'room.roomId', push the room name into 'connectedRoomsArr'.
    if (foundRoom.connectsTo.includes(room.roomId)) {
      connectedRoomsArr.push(room.name)
    }
    
    //Push the ID of each room iterated through into 'roomIdArr'.
    roomIdArr.push(room.roomId)
  })

  //Iterate through the 'foundRoom.connectsTo' array using the .forEach() method. The callback function parameter 'connectRoomId' represents each element.
  foundRoom.connectsTo.forEach(connectRoomId => {

    //'errorRoom' is assigned the value 'connectRoomId', if 'roomIdArr' does not include it.
    if (!roomIdArr.includes(connectRoomId)) {
      errorRoom = connectRoomId
    }
  })

  //If 'errorRoom' is truthy, it means one of the connected rooms in the 'foundRoom' object does not exist, and an error message is returned.
  if (errorRoom) {
    return `Room with ID of '${errorRoom}' could not be found.`
  }

  //If no 'errorRoom' is found, returns the array of room names 'connectedRoomsArr'.
  return connectedRoomsArr
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
