/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const tickets = require("../data/tickets");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketPersonBought` will be in the following shape. See below for more details on each key.
 * const ticketPersonBought = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketPersonBought.ticketType` value or `ticketPersonBought.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketPersonBought - An object representing data for a single ticket (that a person bought/is going to buy)
 * @param {string} ticketPersonBought.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketPersonBought.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketPersonBought.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * //These examples are kind of like having a GUI or graphic user interface (what would be inputted into the function). In the function I renamed the constant ticketInfo to ticketPersonBought for clarity since it's too similar to ticketData (since info and data are synonyms).
 * EXAMPLE:
 *  const ticketPersonBought = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketPersonBought);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketPersonBought = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketPersonBought);
    //> 2500

 * EXAMPLE:
 *  const ticketPersonBought = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketPersonBought);
    //> "Entrant type 'kid' cannot be found."
 */ //user
function calculateTicketPrice(ticketData, ticketPersonBought) {
  // Destructuring extracts values that corresponds to customer input which is structured like an object.
  const {ticketType, entrantType} = ticketPersonBought; 
  // ticketType is a string in ticketPersonBought but an object with keys called "general" or "membership" in ticketData
  // entrantType is a string in ticketPersonBought but in ticketData it is a number with keys "child", "adult", "senior" inside an object with key "priceInCents" inside the object called "general" or "membership".
 
  //initializing total cost (this function will return total cost), baseCost, and extraCost
  let totalCost = 0; // totalCost = baseCost unless customer adds extras. If extras then extraCost will be added to baseCost.
  let baseCost = 0; // cost without extras
  let extraCost = null; // total cost of extras

  // creating error message for invalid inputs. Invalid inputs are inputs in ticketPersonBought that can't be referenced using ticketsData
  // if statement for the case where customer places an order for values not found in ticketsData
  if (!ticketData.hasOwnProperty(ticketPersonBought.ticketType)) {
    return `Ticket type 'incorrect-type' cannot be found.`;
  } if (ticketPersonBought.entrantType !== "child" && ticketPersonBought.entrantType !== "adult" && ticketPersonBought.entrantType !== "senior") {
    return `Entrant type 'incorrect-entrant' cannot be found.`;
  }
  // for loop to access each extra in ticketPersonBought.extras. 
  for (let extra of ticketPersonBought.extras) {
    if (!ticketData.extras[extra]) { // ticketData.extras[extra]: This tries to access the value associated with the key.
      return `Extra type '${extra}' cannot be found.`; // if the extra that customer put in ticketPersonBought doesn't exist as a key in ticketData.extras[extra] it will return this error
    }
  }
  // calculating base cost (without extras) which depends on both the type of tix bought and type of entrant. 
  const ticketTypeInfo = ticketData[ticketType]; // accesses the object in ticketData that corresponds to ticketType (ticketData.general for example)
    if (ticketTypeInfo) { // if input for ticketType in ticketPersonBought matches key in ticketData this evaluates to true
      baseCost = ticketTypeInfo.priceInCents[entrantType]; // if ticketTypeInfo has truthy value will store the value of entrantType (which is a number) to baseCost
      totalCost += baseCost; // adds baseCost to running totalCost
    } 
    // if customers input extras, this will calculating extras cost. After calculating baseCost I can add extras to running totalCost
    if (ticketPersonBought.extras.length !== 0) { // if customer ordered extras
      for (let extra of ticketPersonBought.extras) { // iterate through ticketPersonBought.extras array to get values of elements which are the extras the customer added to their order
        extraCost = ticketData.extras[extra].priceInCents[entrantType]; // depending on customer's chosen extras and entrantType from inputs in ticketPersonBought.extras array, look up the cost in ticketData.extras by navigating (dotting into) to  the key priceInCents (an object of numbers)
        totalCost += extraCost; //add extraCost to totalCost otherwise extraCost will just = 0
    }
 }
 return totalCost; // this function is supposed to return total price based on customer's input in ticketPersonBought
};

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketPersonBought` in the previous function.
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
function purchaseTickets(ticketData, purchases) {}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
