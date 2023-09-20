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
// should return the name of the room where the given dinosaur can be found (1 ms)
// should work for other dinosaurs
// should return an error message if the dinosaur cannot be found at all
// should return an error message if the dinosaur cannot be found in any room
  
// STEP 1 FIND THE DINOSAUR OBJECT BY NAME
    // .find 
    const dinosaur = dinosaurs.find((dino) => dino.name === dinosaurName); 
  
    if (dinosaur) {
      // STEP 2 INITIALIZE A VARIABLE TO STORE THE ROOM NAME
      let roomName = "";
  
      // STEP 3 LOOP THROUGH THE ROOMS TO FIND THE ROOM CONTAINING THE DINOSAUR
      for (const room of rooms) {
        // STEP 4 MAKE A CHECKPOINT TO CHECK IF THE DINOSAUR WAS FOUND IN THE ROOM
        let dinosaurFound = false; 
  
        // STEP 5 LOOP THROUGH THE DINOSAURS IN THE ROOM
        for (const dinoId of room.dinosaurs) {
          // STEP 6 CHECK IF DINOSAURID MATCHES THE CURRENT DINOSAUR ID ----------------!!!!!
          if (dinoId === dinosaur.dinosaurId) {
            dinosaurFound = true; // STEP 7 MAKE ANOTHER CHECKPOINT TO CHECK IF TH DINOSAUR WAS FOUND
            ; // EXIT THE INNER LOOP
          }
        }
          if (dinosaurFound) {
          roomName = room.name;
          ; // Exit the outer loop once the room is found
        }
      }
       // STEP 8 CHECK IF DINOSAUR WAS FOUND IN ROOM  
      if (roomName) {
      
        return roomName; // STEP 9 RETURN THE ROOM NAME IF FOUND
     
      } else { // FIRST ERROR MESSAGE
        return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
      }
      // LAST ERROR MESSAGE
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
  
  // should return the names of all rooms connected to the given room by ID (1 ms)
  // should work for other rooms
  // if initial room ID is incorrect, should return an error message
  // if connected room ID is incorrect, should return an error message


  // Find the index of the room with the given id
  // MAKE A VARIABLE USING FIND INDEX
  
  const targetRoomIndex = rooms.findIndex(room => room.roomId === id);
  

  //MAKE IF STATMENT FOR TARGET ROOM INDEX START WITH -1 (It will iterate through each element of the array starting at ZERO)
  if (targetRoomIndex > -1) {
  // If the room is found, return the names of connected rooms
     
  
      const targetRoom = rooms[targetRoomIndex];
      const connectedRoomNames = [];
      
    // LOOP THROUGH CONNECTED ROOMS
    //ADD .CONNECTTO TO TARGETED ROOM TO EXCESS CONNECT TO
      for (const connectId of targetRoom.connectsTo) {
        
        // USE FIND INDEX OF CONNECTED ROOM
        const connectedRoomIndex = rooms.findIndex(room => room.roomId === connectId);
        
        // MAKE A IF STATMENT LIKE ABOVE FOR CONNECT ROOMS START WITH -1
        if (connectedRoomIndex > -1) {
          
          // USE PUSH METHOD?
          // if connected room is found, add its name to the list
        
          connectedRoomNames.push(rooms[connectedRoomIndex].name);
        
        } else {
          // THEN JUST RETURN ERROR MESSAGE
          // if a connected room ID is incorrect, return an error message
          return `Room with ID of '${connectId}' could not be found.`
        }
      }
    // RETURN IT BACK TO THE VARIABLE
    // Return the names of connected rooms
    return connectedRoomNames;
      
   } else {
    
    // RETURN FINAL ERROR MESSAGE
    // if the primary room ID is incorrect, return an error message.
    return `Room with ID of '${id}' could not be found.`;
    }
  }
  


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
