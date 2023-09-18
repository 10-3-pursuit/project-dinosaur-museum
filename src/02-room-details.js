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
  let dinoId;
  let dinoRoom;

  for (let dinoObject of dinosaurs) {
    const { dinosaurId, name, mya } = dinoObject;
    if (name === dinosaurName) {
      dinoId = dinosaurId;
    }
  }

  if (!dinoId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  for (let roomObject of rooms) {
    const { roomId, name, dinosaurs } = roomObject;

    if (dinosaurs.includes(dinoId)) {
      dinoRoom = name;
      return dinoRoom;
    }
  }

  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  // console.log(info);
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
  // Initialize an array to store the names of connected rooms.
  let connectedRooms = [];

  // Loop through the 'rooms' array to find a room with a matching 'roomId'.
  for (let i = 0; i < rooms.length; i++) {
    if (id === rooms[i].roomId) {
      // If a room with a matching 'roomId' is found, loop through its 'connectsTo' array.
      for (let j = 0; j < rooms[i].connectsTo.length; j++) {
        // Add each connected room's ID to the 'connectedRooms' array.
        connectedRooms.push(rooms[i].connectsTo[j]);
      }
    }
  }

  // Initialize a variable to store the ID of connected rooms.
  let connectedRoomId;

  // Loop through the 'connectedRooms' array to find the names of connected rooms.
  for (let k = 0; k < connectedRooms.length; k++) {
    // Get the ID of the current connected room.
    connectedRoomId = connectedRooms[k];

    // Loop through the 'rooms' array to find a room with a matching 'roomId'.
    for (let l = 0; l < rooms.length; l++) {
      if (connectedRoomId === rooms[l].roomId) {
        // If a room with a matching 'roomId' is found, replace the ID with the room's name.
        connectedRooms[k] = rooms[l].name;
      } else if (connectedRooms[k] === "incorrect-id") {
        // If the connected room has an ID of "incorrect-id," return an error message.
        return `Room with ID of '${connectedRooms[k]}' could not be found.`;
      }
    }
  }

  // If connected rooms are found, return the names; otherwise, return an error message.
  return connectedRooms.length
    ? connectedRooms
    : `Room with ID of '${id}' could not be found.`;
}
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
