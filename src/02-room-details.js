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
  // Find the dinosaur object with the given name, if it exists.
  const dinosaurNameObj = dinosaurs.find((dino) => dino.name === dinosaurName);

  // Find the room where the dinosaur can be found, if it exists.
  const resultRoomObj = rooms.find(
    (room) => room.dinosaurs.includes(dinosaurNameObj?.dinosaurId)
  );

  // Check if a room was found for the dinosaur.
  if (resultRoomObj) {
    // If a room was found, return the name of the room.
    return resultRoomObj.name;
  } else {
    // If a room wasn't found, check if the dinosaur exists at all.
    if (dinosaurNameObj) {
      // If the dinosaur exists but no room was found, return an error message.
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    } else {
      // If the dinosaur doesn't exist, return an error message.
      return `Dinosaur with name '${dinosaurName}' cannot be found.`;
    }
  }
}


/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room.
 * If a room ID cannot be found, an error message is returned.
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
 *      "Entrance Room",
 *      "Coat Check Room",
 *      "Ellis Family Hall",
 *      "Kit Hopkins Education Wing"
 *    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  const connectedRooms = [];

  // Loop through each room in the rooms array
  for (const room of rooms) {
    // Check if the current room's ID matches the provided ID
    if (room.roomId === id) {
      // If it matches, loop through the room's connections
      for (const connectedId of room.connectsTo) {
        // Find the connected room based on its ID
        const connectedRoom = rooms.find((r) => r.roomId === connectedId);

        // If a connected room is found, add its name to the connectedRooms array
        if (connectedRoom) {
          connectedRooms.push(connectedRoom.name);
        } else {
          // If a connected room is not found, return an error message
          return `Room with ID '${connectedId}' not found.`;
        }
      } 

      // Return the array of connected room names
      return connectedRooms;
    } else {
      return `Room with ID of '${id}' could not be found.`
    }
  }

  // If the provided room ID is not found, return an error message
  return `Room with ID '${id}' not found.`;
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
