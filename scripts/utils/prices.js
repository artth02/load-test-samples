const faker = require('faker')
const symbols = require('./symbols')

function getMarketPrices() {
    const lastPrice = faker.finance.amount(300, 500, 2)
    let operations = []
    for (let index = 0; index < 5; index++) {
        operations.push({
            buyPrice: faker.finance.amount(300, 500, 2),
            buyQuantity: 5,
            sellPrice: faker.finance.amount(300, 800, 2),
            sellQuantity: 5
        })
    }

    return {
        symbol: {
            name: faker.random.arrayElement(symbols.map(x => x.channel)),
            lastPrice: lastPrice,
            quantity: 10,
            oscilationRate: 6,
        },
        operations,
        dailyPrice: {
            min: lastPrice,
            max: 500
        },
        makertPrice: {
            open: lastPrice,
            close: undefined
        },
        timestamp: new Date().getTime()
    }
}

module.exports = {
    getMarketPrices
}
