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
   // Create a mapping of dinosaur names to room names
   // Find the dinosaur in the list
    const dinosaur = dinosaurs.find((dino) => dino.name === dinosaurName);
  
    if (dinosaur) {
      // Find the room that contains the dinosaur
      const room = rooms.find((room) => room.dinosaurs.includes(dinosaur.dinosaurId));
  
      if (room) {
        return room.name; // Return the room name if found
      } else {
        return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
      }
    } else {
      return `Dinosaur with name '${dinosaurName}' cannot be found.`;
    }
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
  
  // Find the index of the room with the given id
  const targetRoomIndex = rooms.findIndex(room => room.roomId === id);
  
  if (targetRoomIndex !== -1) {
     // If the room is found, return the names of connected rooms
      const targetRoom = rooms[targetRoomIndex];
      const connectedRoomNames = [];
      
    // Loop through each connected room ID
      for (const connectId of targetRoom.connectsTo) {
        // Find the index of the connected room
        const connectedRoomIndex = rooms.findIndex(room => room.roomId === connectId);
        if (connectedRoomIndex !== -1) {
          // if connected room is found, add its name to the list
          connectedRoomNames.push(rooms[connectedRoomIndex].name);
        } else {
          // if a connected room ID is incorrect, return an error message
          return `Room with ID of '${connectId}' could not be found.`
        }
      }
    // Return the names of connected rooms
    return connectedRoomNames;
      
   } else {

    // if the primary room ID is incorrect, return an error message.
    return `Room with ID of '${id}' could not be found.`;
    }
  }
  


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
