/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  // Check if the value of 'ticketInfo.ticketType' exists as a nested object in the ticketData object, using it as a key to access ticketData.
  if (!ticketData[ticketInfo.ticketType]) {

    // Return an error message if not found
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }

  // Check if the value of 'ticketInfo.entrantType' exists as a nested object in 'ticketData.general.priceInCents' using it as a key to access 'ticketData.general.priceInCents'.
  if (!ticketData.general.priceInCents[ticketInfo.entrantType]) {

    // Return an error message if not found
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.` 
  }

  // Iterates through the 'ticketInfo.extras' array to check if any of the elements do not exist in the ticketData object, using the parameter of the callback function as a key to access the 'ticketData.extras" array. Assigns the value to 'notFoundExtra'.
  const notFoundExtra = ticketInfo.extras.find(extra => !ticketData.extras[extra])

  // If 'notFoundExtra' is truthy, return an error message.
  if (notFoundExtra) {
    return `Extra type '${notFoundExtra}' cannot be found.`
  }

  // Create a variable to store the total price of extras
  let extrasTotalPrice = 0;

  // If the length of 'ticketInfo.extras' is 0, no extras are in the array, so return the price for the ticket type and entrant type.
  if (ticketInfo.extras.length === 0) {
    // Access the price in the ticketData object, using 'ticketInfo.ticketType' and 'ticketInfo.entrantType' as keys. 
    return ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
  }

  // If the length of 'ticketInfo.extras' is more than 0, calculate their total price and return the combined price.
  if (ticketInfo.extras.length > 0) {

    // Loop through 'ticketInfo.extras' using the '.forEach()' method, and access their prices in the ticketData object, using the callback function parameter and 'ticketInfo.entrantType' as keys to access the specified prices. Increment the prices onto 'extrasTotalPrice'

    ticketInfo.extras.forEach(extra => extrasTotalPrice += ticketData.extras[extra].priceInCents[ticketInfo.entrantType])

    // Return the price of the ticket purchased.
    return ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] + extrasTotalPrice
  }
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
let ticketTypeFalse = null
let entrantTypeFalse = null 
let extraTypeFalse = null
let netPrice = 0
let extrasTotalPrice = 0

purchases.forEach(purchase => {
if (!ticketData[purchase.ticketType]){
  ticketTypeFalse = purchase.ticketType
  }
if (!ticketData.general.priceInCents[purchase.entrantType]){
  entrantTypeFalse = purchase.entrantType
  }
})

if (ticketTypeFalse) {
  return `Ticket type '${ticketTypeFalse}' cannot be found.`
}

if (entrantTypeFalse) {
  return `Entrant type '${entrantTypeFalse}' cannot be found.`
}

purchases.forEach(purchase => {
  const notFoundExtra = purchase.extras.find(extra => !ticketData.extras[extra])
  if (notFoundExtra) {
    extraTypeFalse = notFoundExtra
  }
})

if (extraTypeFalse) {
  return `Extra type '${extraTypeFalse}' cannot be found.`
  }

let receiptText = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`

purchases.forEach(purchase => {
  const capitalizedEntrantType = purchase.entrantType.charAt(0).toUpperCase() + purchase.entrantType.slice(1)
  let capitalizedExtraString = ''
  let indivExtra = null

  if (purchase.extras.length === 0) {
    netPrice += ticketData[purchase.ticketType].priceInCents[purchase.entrantType]

    receiptText += `\n${capitalizedEntrantType} ${ticketData[purchase.ticketType].description}: $${((ticketData[purchase.ticketType].priceInCents[purchase.entrantType]) / 100).toFixed(2)}`
  }
  if (purchase.extras.length > 0) {
    netPrice += ticketData[purchase.ticketType].priceInCents[purchase.entrantType]
    purchase.extras.forEach(extra => {
      if (purchase.extras.indexOf(extra) !== 0){
        capitalizedExtraString += `, `
      }
      capitalizedExtraString += `${extra.charAt(0).toUpperCase() + extra.slice(1)} Access`
      
      extrasTotalPrice += ticketData.extras[extra].priceInCents[purchase.entrantType]
      indivExtra += ticketData.extras[extra].priceInCents[purchase.entrantType]

    })
    receiptText += `\n${capitalizedEntrantType} ${ticketData[purchase.ticketType].description}: $${((ticketData[purchase.ticketType].priceInCents[purchase.entrantType] + indivExtra) / 100).toFixed(2)} (${capitalizedExtraString})`
    indivExtra = 0

  }
})
netPrice += extrasTotalPrice
receiptText += `\n-------------------------------------------\nTOTAL: $${(netPrice / 100).toFixed(2)}`
return receiptText
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
