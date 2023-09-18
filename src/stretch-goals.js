const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");

// QUESTION: Which dinosaurs only eat meat?
// find all the names of dinosaurs that only eat meat. 
// returns an array of names of dinosaurs that eat meat.
function getAllMeatEaters(dinosaurs){
    const meatEaters = dinosaurs.filter(dinosaur => dinosaur.diet === 'carnivorous')
    const meatEatersNames = meatEaters.map(dinosaur => dinosaur.name)
    return meatEatersNames
}
console.log(getAllMeatEaters(dinosaurs))


// Question: Which dinosaurs lived during the Late Jurassic period and how do you pronouce their names?
// find name and pronunciation of all dinosuars that lived during the Late Jurassic period. 
// returns an array where each value is a name of a dinosaur and it's pronunciation
function getDinosaursFromLateJurrasic(dinosaurs){
    const lateJurrassicDinosaurs = dinosaurs.filter(dinosaur => dinosaur.period === "Late Jurassic")
    const resultNamesArr = lateJurrassicDinosaurs.map(dinosaur => `${dinosaur.name} (${dinosaur.pronunciation})`)
    return resultNamesArr
}
console.log(getDinosaursFromLateJurrasic(dinosaurs))


// QUESTION: Which herbivores lived during a specified time period?
// get all the names of herbivores that lived during a specified period
// returns a string
function getAllHerbivorousFromPeriod(dinosaurs, period){
  const dinosaursInPeriod = dinosaurs.filter(dinosaur => dinosaur.period === period)
  const herbivoresInPeriod = dinosaursInPeriod.filter(dinosaur => dinosaur.diet === "herbivorous")
  const resultNames  = herbivoresInPeriod.map(dinosaur => dinosaur.name)
  if(resultNames.length === 1){
    return `${resultNames.toString()} is an herbivore that lived during the ${period} period.`
  } else {
    return `Herbivores that lived during the ${period} period:\n${resultNames.join(', ')}`
  }
}
console.log(getAllHerbivorousFromPeriod(dinosaurs, "Early Cretaceous"))
console.log(getAllHerbivorousFromPeriod(dinosaurs, "Late Cretaceous"))
console.log(getAllHerbivorousFromPeriod(dinosaurs, "Early Jurassic"))
console.log(getAllHerbivorousFromPeriod(dinosaurs, "Late Jurassic"))


// QUESTION: Which roooms do not have any dinosaurs?
// find the rooms that don't have any dinosaurs
// returns a string listings the names of rooms that don't have any dinosaurs
function roomsWithNoDinosaurs(rooms){
    const noDinoRooms = rooms.filter(room => room.dinosaurs.length === 0)
    const noDinoRoomNames = noDinoRooms.map(room => room.name)
    if(!noDinoRooms){
        return `All the rooms have dinosaurs.`
    } else if (noDinoRooms.length === 1){
        return `This room does not hve any dinosaurs: ${noDinoRoomNames}`
    } else {
        return `These rooms do not have any dinosaurs: ${noDinoRoomNames.join(', ')}`
    }
}
  console.log(roomsWithNoDinosaurs(rooms))


// QUESTION: Does the room specified have any ticket requirements to enter?
// find if a room has any required ticket permissions to enter
// returns a string
function getRequiredTicketTypeByRoomName(rooms, roomName){
    const resultRoom = rooms.find(room => room.name === roomName)
    if(!resultRoom){
        return `There is no room called ${roomName}`
    }
    const ticketType = resultRoom.requiredTicketPermissions

    if(resultRoom.requiredTicketPermissions.length === 0){
        return `There are no ticket requirements to enter this room`
    } else {
        return `Tickets with ${ticketType} access required to enter this room`
    }
}
console.log(getRequiredTicketTypeByRoomName(rooms, "Cabrera Hall"))
console.log(getRequiredTicketTypeByRoomName(rooms, "Terrell Leon Lecture Room"))
console.log(getRequiredTicketTypeByRoomName(rooms, "Blackwell Amphitheater"))
console.log(getRequiredTicketTypeByRoomName(rooms, "Paxton Decker Terrace"))



