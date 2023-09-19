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
  // created a variable called dinooo that uses the find method to check if dinosaurName matches with any of the name values at dino.key (for each dino) by returning the first instance of this being true 
  const dinooo = dinosaurs.find((dino) => dino.name === dinosaurName); 
  // if dinosaurName is found in the dinosaurs array, the logic continues
  if (dinooo) {
    // created a variable called room, it uses the find method and checks if there is an object with the properties needed 
    // In this case, if in any rooms the key of dinosaurs includes a dinooo Id, the logic will be true and continue to next step
    const room = rooms.find((room) => room.dinosaurs.includes(dinooo.dinosaurId));
    // if a dinooo Id is found in one of the arrays of room.dinosaurs
    if (room) {
      // return the name of the room with the dinosaur
      return room.name;  
      // if room.dinosaurs does not have the dinooo ID  
    } else { 
      // return error statement
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
    }
    // if dinsaurName cannot be found in the dinosaurs array
  } else {
    // return error statement
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
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
function getConnectedRoomNamesById(rooms, id) {
  //initialized a variable roomIsFound using the find method and checking if id given matches a room.id in the rooms array
  const roomIsFound = rooms.find((room) => room.roomId === id); 
  
  //checks if the target room ID is not found
  if (!roomIsFound) {
    //return error message 
    return `Room with ID of '${id}' could not be found.`
  } 

  const connectedRoomNames = roomIsFound.connectsTo.map(connectId => { 
    const connectedRoom = rooms.find(room => room.roomId === connectId);

    if (!connectedRoom) {
      return `Room with ID of '${connectId}' could not be found.`
    }
    return connectedRoom.name
  }); 

  return connectedRoomNames; 
};  

//   //intitialized a variable, idIsReal, and set it equal to the first object that shares the properties of the id given and room id (this finds room object with given ID)
//   const idIsReal = rooms.find((room) => room.roomId === id); 
//   //if the id is real, continue logic 
//   if (idIsReal) {
//     for (const room of rooms) {
//       //create an empty array for listOfConnectedRooms
//       const listOfConnectedRooms = [];
//       for (const connectedId of room.connectsTo) {   
//         // const connectedRoom = rooms.find((room) => room.roomId === connectedId); 
//         const connectedRoom = rooms.find((room) => idIsReal.roomId === connectedId); 
//         if (connectedRoom) {
//           //current issue is that it doesn't go throguh all of the elements of
//           listOfConnectedRooms.push(connectedRoom.name);  
//           return listOfConnectedRooms; 
//         } else {
//             return `Room with ID of 'incorrect-id' could not be found.`
//         }
//       }
//     }  
//   //if id given isn't real 
//   } else { 
//     //return this error message
//       return `Room with ID of '${id}' could not be found.`
//   }
// }; 

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
 