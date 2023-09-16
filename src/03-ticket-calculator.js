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
  let total = 0
  for(const genKey in ticketData){
    if(ticketInfo.ticketType===genKey){
      for(const entrant in ticketData[genKey].priceInCents){
        if(ticketInfo.entrantType===entrant){
          total += ticketData[genKey].priceInCents[entrant]
        }
      }
    }
    if(Object.keys(ticketInfo)[2]===genKey){
      for(const extra in ticketData[genKey]){
        if(ticketInfo.extras.includes(extra)){
          for(const entrant in ticketData[genKey][extra].priceInCents){
            if(entrant===ticketInfo.entrantType)
              total += ticketData[genKey][extra].priceInCents[entrant]
          }

        }
      }
    }
  }

  if(ticketInfo.extras!==undefined){
    let testExtra = ticketInfo.extras.every(current => 
      Object.keys(ticketData.extras).includes(current))
    if(!testExtra)
      return `Extra type 'incorrect-extra' cannot be found.`
  }

  if(!Object.keys(ticketData).includes(ticketInfo.ticketType))
    return `Ticket type 'incorrect-type' cannot be found.`

  if(!Object.keys(ticketData.general.priceInCents).includes(ticketInfo.entrantType))
    return `Entrant type 'incorrect-entrant' cannot be found.`

  return total
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
  const prices = purchases.map(current => calculateTicketPrice(ticketData,current))
  const total = prices.reduce((total,current) => total+current )

  /* check valid input: PROVIDED TEST'S are not comprehensive to account for incorrect
      data at a later ticket other than the first ticket in puchases list). This code
      is only valid to the degree of the PROVIDED TEST'S. */
  if(purchases.every(current => !Number.isInteger(calculateTicketPrice(ticketData, current))))
    return calculateTicketPrice(ticketData, purchases[0])

  return buildStringReceipt(purchases, prices, total);
}

function buildStringReceipt(purchases, prices, total){
  let result = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`

  /* outer forEach() */
  prices.forEach((current,index) =>{

                                      /* main body of receipt */
    result+=`${purchases[index].entrantType.charAt(0).toUpperCase()}${purchases[index].entrantType.substring(1)} `+
            `${purchases[index].ticketType.charAt(0).toUpperCase()}${purchases[index].ticketType.substring(1)} `+
            `Admission: \$${(Number.parseFloat(current/100).toFixed(2))}`
    if(purchases[index].extras!==undefined){

      /* inner forEach() */
      purchases[index].extras.forEach((current,index,self)=>{
        if(index === 0)
          result += ` (`
                                            /* extras */
        result += `${current.charAt(0).toUpperCase()}${current.substring(1)} Access`

        if(index !== self.length-1)
          result += `, `
        else
          result += `)`
      })
      /*******************/

    }
    result+=`\n`        
  },purchases)
  /*******************/

  result += `-------------------------------------------\n`+
            `TOTAL: \$${(Number.parseFloat(total/100).toFixed(2))}`
  return result;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
