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
  // Store the entrant type from ticketInfo
  let customerType = ticketInfo.entrantType

  // Store the admission type object based on the ticket type in ticketInfo
  let admissionType = ticketData[ticketInfo.ticketType]

  // Store the extras on the ticket from ticketInfo
  let extrasOnTicket = ticketInfo.extras

  // Check if the value of 'ticketInfo.ticketType' exists as a nested object in the ticketData object
  if (!admissionType) {
    // Return an error message if not found
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }
  
  // Check if customerType exists inside 'ticketData.general.priceInCents'
  if (!ticketData.general.priceInCents[customerType]) {
    // Return an error message if not found
    return `Entrant type '${customerType}' cannot be found.`
  }
  
  // Iterates through the 'extrasOnTicket' array to check if any of the elements do not exist in the ticketData object, using the parameter of the callback function as a key to access the 'ticketData.extras" array. Assigns the value to 'notFoundExtra'.
  const notFoundExtra = extrasOnTicket.find(extra => !ticketData.extras[extra])
  
  // If 'notFoundExtra' is truthy, return an error message.
  if (notFoundExtra) {
    return `Extra type '${notFoundExtra}' cannot be found.`
  }
  
  // Create a variable to store the total price of extras
  let extrasTotalPrice = 0
  
  // If the length of 'extrasOnTicket' is 0, no extras are in the array, so return the price for the ticket type and entrant type.
  if (extrasOnTicket.length === 0) {
    // Access the price in 'admissionType.priceInCents', using 'customerType' as a key. 
    return admissionType.priceInCents[customerType]
  }
  
  // If the length of 'extrasOnTicket' is more than 0, calculate their total price and return the combined price.
  if (extrasOnTicket.length > 0) {
    // Loop through 'extrasOnTicket' using the '.forEach()' method, and access their prices in the ticketData object, using the callback function parameter and 'customerType' as keys to access the specified prices. Increment the prices onto 'extrasTotalPrice'
    extrasOnTicket.forEach(extra => extrasTotalPrice += ticketData.extras[extra].priceInCents[customerType])
    
    // Return the price of the ticket purchased.
    return admissionType.priceInCents[customerType] + extrasTotalPrice
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
  // Create variables to track invalid ticket, entrant, and extra types
  let ticketTypeFalse = null 
  let entrantTypeFalse = null 
  let extraTypeFalse = null
  
  // Create variables for calculating the net price and the total price of the extras
  let netPrice = 0
  let extrasTotalPrice = 0 
  
  // Initialize the receipt text
  let receiptText = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`
  
  // Iterate through each element in the 'purchases' array and check if the specified ticket type exists in the ticketData object.
  purchases.forEach(purchase => {
    // Create a string to store capitalized extra descriptions
    let capitalizedExtraString = ''
  
    // Create a variable to track the total price of individual extras
    let indivExtra = null
  
    // Store the entrant type from the current purchase
    let customerType = purchase.entrantType
  
    // Store the admission type object based on the current purchase's ticket type
    let admissionType = ticketData[purchase.ticketType]
  
    // Check if the specified ticket type exists in the ticketData object
    if (!admissionType) {
      ticketTypeFalse = purchase.ticketType // Store the invalid ticket type
    }
  
    // Check if 'customerType' exists in the ticketData object, using customerType as a key to access the ticketData.general.priceInCents nested object.
    if (!ticketData.general.priceInCents[customerType]) {
      entrantTypeFalse = customerType
    }
  
    // Check if any of the specified extras do not exist in the ticketData object
    const notFoundExtra = purchase.extras.find(extra => !ticketData.extras[extra])
  
    //if 'notFoundExtra' is truthy, store the invalid extra type to extraTypeFalse.
    if (notFoundExtra) {
      extraTypeFalse = notFoundExtra 
    }
  
    // If all types are valid, calculate prices and build the receipt
    if (!ticketTypeFalse && !entrantTypeFalse && !extraTypeFalse) {

      // Create a string with the entrant type capitalized
      const capitalizedEntrantType = customerType.charAt(0).toUpperCase() + customerType.slice(1)
  
      // Store the price object based on the current purchase's ticket type
      let admissionPriceObject = ticketData[purchase.ticketType].priceInCents
  
      if (purchase.extras.length === 0) {
        // Calculate the price for the ticket without extras
        netPrice += admissionPriceObject[customerType]
  
        // Generate a line in the receipt for the ticket without extras
        receiptText += `\n${capitalizedEntrantType} ${admissionType.description}: $${((admissionPriceObject[customerType]) / 100).toFixed(2)}`
      }
  
      if (purchase.extras.length > 0) {
        // Calculate the price for the ticket with extras
        netPrice += admissionPriceObject[customerType]

        // Iterate through the extras of the current purchase
        purchase.extras.forEach(extra => {
          // Store the extras price object for the current extra
          let extrasPriceObj = ticketData.extras[extra].priceInCents
  
          // Add a comma at the end of each extra if there is more than one
          if (purchase.extras.indexOf(extra) !== 0) {
            capitalizedExtraString += ', '
          }
          //Capitalize each extra string, with 'Access' at the end
          capitalizedExtraString += `${extra.charAt(0).toUpperCase() + extra.slice(1)} Access`
  
          // Accessing extra price based on 'customerType'
          extrasTotalPrice += extrasPriceObj[customerType]

          // 'indivExtra' used to calculate all extra prices to one ticket
          indivExtra += extrasPriceObj[customerType]
        })
  
        // Generate a line in the receipt for the ticket with extras
        receiptText += `\n${capitalizedEntrantType} ${admissionType.description}: $${((admissionPriceObject[customerType] + indivExtra) / 100).toFixed(2)} (${capitalizedExtraString})`
  
        // Reset indivExtra to zero for the next iteration/ticket
        indivExtra = 0
      }
    }
  })
  
  // Calculate the total price, add it to the receipt text, and format it as currency
  netPrice += extrasTotalPrice
  receiptText += `\n-------------------------------------------\nTOTAL: $${(netPrice / 100).toFixed(2)}`
  
  // Return error messages for invalid ticket, entrant, or extra types, if any
  if (ticketTypeFalse) {
    return `Ticket type '${ticketTypeFalse}' cannot be found.`
  }
  if (entrantTypeFalse) {
    return `Entrant type '${entrantTypeFalse}' cannot be found.`
  }
  
  // Return an error message for an invalid extra type, if any
  if (extraTypeFalse) {
    return `Extra type '${extraTypeFalse}' cannot be found.`
  }
  
  // Return the complete receipt text if there are no errors
  return receiptText
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
