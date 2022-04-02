const NseIndia = require("stock-nse-india");

const nseIndia = NseIndia();

// To get all symbols from NSE
nseIndia.getAllStockSymbols().then(symbols => {
    console.log(symbols)
})

// To get equity details for specific symbol
nseIndia.getEquityDetails('IRCTC').then(details => {
    console.log(details)
})

const getCurrentPrice = async (symbol) => {
    const equityDetails = await nseIndia.getEquityDetails(symbol);
    return equityDetails.lastPrice;
}

console.log(getCurrentPrice('Wipro'))