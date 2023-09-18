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
 * //These examples are kind of like having a GUI or graphic user interface (what would be inputted into the function). In the function I renamed the constant ticketInfo to ticketPersonBought for clarity since it's too similar to ticketData (since info and data are synonyms)
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
  const {ticketType, entrantType} = ticketPersonBought; // Corresponds to customer input which is structured like an object. ticketType variable is ticketPersonBought.ticketType a string, entrantType variable is ticketPersonBought.entrantType. If user input matches keys in ticketsData, it'll be able to reference ticketsData
  // rewrote ticketInfo as ticketPersonBought because Info and Data are synonyms so very confusing
  // may have to iterate over extras because dataType in ticketPersonBought is array because customer can choose more than one extra (extras in ticketData is object type) has to work in case there is more than 2 elements in extra
  // ticketType is a string in ticketPersonBought but an object either general or membership in ticketData
  // entrantType is a string in ticketPersonBought but in ticketData it is an object inside the object called general or membership. It's either child, adult, senior
 

// step 3: Now that all edge/error cases are satisfied, initialize total cost (this function will return total cost)
let totalCost = 0; //necessary in case gotta add extras to baseCost
let baseCost = 0; // cost without extras
let extraCost = null; // total cost of extras

// step 1 and 2 are for error messages
// step 1: if statement for the case where customer orders stuff not on the menu
// ticketInfo = ticketPersonBought for clarity
  if (!ticketData.hasOwnProperty(ticketPersonBought.ticketType)) {
    return `Ticket type 'incorrect-type' cannot be found.`;
  } if (ticketPersonBought.entrantType !== "child" && ticketPersonBought.entrantType !== "adult" && ticketPersonBought.entrantType !== "senior") {
    return `Entrant type 'incorrect-entrant' cannot be found.`;
  }

// step 2: for each extra in ticketPersonBought.extras check if the extra is a key in extras, if not return error
  for (let extra of ticketPersonBought.extras) {
    if (!ticketData.extras[extra]) { // ticketData.extras[extra]: This tries to access the value associated with the key 
      return `Extra type '${extra}' cannot be found.`;
    }
  }


// step 4: calculating base cost (without extras) which depends on both the type of tix bough and type of entrant. After calculating baseCost I can add extras to running totalCost
  // ticketPersonBought object is created and populated with data based on customer's selections (see examples). That's what's getting extracted with this deconstruction

  const ticketTypeInfo = ticketData[ticketType]; // Accesses the object in ticketData that corresponds to ticketType (ticketData.general for example)
  if (ticketTypeInfo) { // if it exists will evaluate true
   baseCost = ticketTypeInfo.priceInCents[entrantType]; // if ticketTypeInfo has truthy value will store the value of entrantType (which is a number) to baseCost
    totalCost += baseCost; // adds baseCost to running totalCost
  
  } 
// step 5: Calculating extras cost

    if (ticketPersonBought.extras.length !== 0) { // if customer ordered extras
      for (let extra of ticketPersonBought.extras) { // iterate through ticketPersonBought.extras array to get values of elements which are the extras the customer added to their order
        extraCost = ticketData.extras[extra].priceInCents[entrantType]; // depending on customer's chosen extras and entrantType from inputs in ticketPersonBought.extras array look up the cost in ticketData.extras
        totalCost += extraCost; //add extra cost to totalCost
    }
 }
 return totalCost;
};
//to test function calculateTicketPrice():
// const ticketPersonBought = {
//   ticketType: "membership",
//   entrantType: "child",
//   extras: ["movie"],
// };
//  console.log(calculateTicketPrice(tickets, ticketPersonBought));

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
