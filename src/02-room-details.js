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
    
   // initialize roomNaem to an empty string
   let roomName = '';

    // used for loop to loop through the array of dinosaurs

    for(let i = 0; i < dinosaurs.length; i++){

      // checking if the current dinosaur's name matches the provided dinosaurName

      if (dinosaurs[i].name === dinosaurName){

        //if dinosaur found assign the current dinosaur's id to roomName and break

        roomName = dinosaurs[i].dinosaurId;
        break;
      }
    }
      // used an if statement to check if roomName is still empty 

    if (!roomName){

      // if the dinosaur wasn't found return can't be found

      return `Dinosaur with name '${dinosaurName}' cannot be found.`
    }
        // used for loop to loop through the array of rooms

      for (let j = 0; j< rooms.length; j++){

        // checking if the current room's dinosaurs array includes roomName

       if (rooms[j].dinosaurs.includes(roomName)){

        // if dinosaur was found in the room, return the name of the room

        return rooms[j].name;
      }
    }

    // if the dinosaur was found but not not in  the rooms, return an error message
    
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
  
  // create an array to store the id of connected rooms

  let connectedRoomIds = [];

  // checking if the provided id exists in the rooms array

   let targetRoom = rooms.find(room => room.roomId === id);

   // if the provided id is not found return an error messege

    if(!targetRoom){
      return `Room with ID of '${id}' could not be found.`
    }

    // adding the ids of connected rooms to the connectedRoomIds array

    connectedRoomIds = targetRoom.connectsTo;

    // created an array to store the names of connected rooms
    let connectedRoomNames = [];

    // iterating through the connectedRoomIds 

    for (let i = 0; i < connectedRoomIds.length; i++){
      
      // created a variable to store the value rooms.find
      
      let connectedRoom = rooms.find(room => room.roomId === connectedRoomIds[i]);


      // if a connected room is found push its name to the connectedRoomNames array
      if (connectedRoom){
        connectedRoomNames.push(connectedRoom.name);
      
      } else {
        
        // if a connected room is not found return an error message

        return `Room with ID of '${connectedRoomIds[i]}' could not be found.`;

      }
    }
return connectedRoomNames

}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
