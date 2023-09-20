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
      // Check if the ticket type exists in ticketData
      if (!ticketData.hasOwnProperty(ticketInfo.ticketType)) {
        return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
      }
    
      const selectedTicketType = ticketData[ticketInfo.ticketType];
    
      // Check if the entrant type exists in the selected ticket type
      if (!selectedTicketType.priceInCents.hasOwnProperty(ticketInfo.entrantType)) {
        return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
      }
    
      // Check if the extras are valid
      const validExtras = Object.keys(ticketData.extras);
      for (const extra of ticketInfo.extras) {
        if (!validExtras.includes(extra)) {
          return `Extra type '${extra}' cannot be found.`;
        }
      }
    
      // Calculate the base ticket price
      const baseTicketPrice = selectedTicketType.priceInCents[ticketInfo.entrantType];
    
      // Calculate the prices for each extra
      const extraPrices = ticketInfo.extras.map((extra) => ticketData.extras[extra].priceInCents[ticketInfo.entrantType]);
    
      // Calculate the total price
      const totalPrice = extraPrices.reduce((total, price) => total + price, baseTicketPrice);
    
      return totalPrice;
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
      // Initialize an empty array to store ticket purchase details
      const purchaseDetails = [];
    
      // Initialize a variable to keep track of the total price
      let totalPriceInCents = 0;
    
      // Define mappings for ticket types and entrant types
      const ticketTypeMappings = {
        general: "General Admission",
        child: "Child Admission",
        senior: "Senior Admission",
        membership: "Membership Admission",
      };
    
      const entrantTypeMappings = {
        adult: "Adult",
        child: "Child",
        senior: "Senior",
      };
    
      // Define mappings for extras
      const extrasMappings = {
        movie: "Movie Access",
        terrace: "Terrace Access",
        education: "Education Access",
      };
    
      // Iterate through each purchase in the purchases array
      for (const purchase of purchases) {
        // Calculate the ticket price for the current purchase
        const ticketPriceInCents = calculateTicketPrice(ticketData, purchase);
    
        // If there was an error in calculating the ticket price, return the error message
        if (typeof ticketPriceInCents === 'string') {
          return ticketPriceInCents;
        }
    
        // Convert the ticket price to dollars (2 decimal places)
        const ticketPriceInDollars = (ticketPriceInCents / 100).toFixed(2);
    
        // Map ticket type and entrant type to their respective strings
        const ticketType = ticketTypeMappings[purchase.ticketType] || "Ticket Type Not Found";
        const entrantType = entrantTypeMappings[purchase.entrantType] || "Entrant Type Not Found";
    
        // Map extras to their respective strings
        const extras = purchase.extras.map(extra => extrasMappings[extra]).filter(Boolean);
    
        // Create strings representing the ticket purchase details
        const extrasString = extras.length > 0 ? ` (${extras.join(', ')})` : "";
        const purchaseDetail = `${entrantType} ${ticketType}: $${ticketPriceInDollars}${extrasString}`;
    
        // Push the purchase detail to the purchaseDetails array
        purchaseDetails.push(purchaseDetail);
    
        // Add the ticket price to the total price
        totalPriceInCents += ticketPriceInCents;
      }
    
      // Convert the total price to dollars (2 decimal places)
      const totalPriceInDollars = (totalPriceInCents / 100).toFixed(2);
    
      // Create the receipt message
      const receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${purchaseDetails.join('\n')}\n-------------------------------------------\nTOTAL: $${totalPriceInDollars}`;
    
      // Return the receipt
      return receipt;
    }
    
    
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
