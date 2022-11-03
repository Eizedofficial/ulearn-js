//#region Task
const tokens = {
    ETH: {
        price: '3400.92$',
        priceChange24h: '4.18%',
    },
    DOGE: {
        price: '0.2219$',
        priceChange24h: '1.99%',
    },
    CAKE: {
        price: '19.81$',
        priceChange24h: '1.63%',
    },
    LTC: {
        price: '159.11$',
        priceChange24h: '1.88%',
    }
}


/**
 *
 * @param {*} token токен
 */
function Coin(token) { }

/**
 *
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) { }

/**
 *
 * @function getMaxPrice
 * @function getMinPrice
 * @function getRandomPrice
 * @function getAveragePrice
 */
//#endregion Task

module.exports = {
    Coin,
    tokens
}
