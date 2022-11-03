
const ACCURACY = 0.55
const tokens = {
    ETH: {
        price: '3400.92$',
        priceChange24h: '4.18%',
    },
    DOGE: {
        price: '3.2219$',
        priceChange24h: '1.17%',
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
class Coin{
    constructor(token) {
        this.price = parseFloat(tokens[token].price)
        this.priceChange24h = parseFloat(tokens[token].priceChange24h);
        this.getPrice = this.getCoinPrice
    }
    getCoinPrice(days, percentPerDay, accuracy = 0, random = 0){
        const countAmount = 5000/this.price;
        let accumulator = this.price;
        let priceChange = percentPerDay
        for (let i = 0; i < Math.floor(days); i++) {
            accumulator = priceChange > 0
                ? (accumulator * Math.abs(priceChange/100)) + accumulator
                : accumulator - (accumulator * Math.abs(priceChange/100))
            if (accuracy !== 0) {
                priceChange +=  (Coin.getRandom(0.5,-0.5))
                random = Math.random();
            }
        }

        return accumulator * countAmount;
    }
        //let price = this.price;
    static getRandom (max,min) {
            return Math.random() * (max - min) + min;
    }
     static getDateInterval(months){
        const start = new Date(months[0].year,months[0].month).getTime();
        const end = new Date(months[months.length-1].year,months[months.length-1].month).getTime();
        const transferMillisecondsToDays = 1000*60*60*24

        return ((end-start) / transferMillisecondsToDays)+30;
    }

    static tokenChoice(months) {

        let bestStatistic = 0;
        for (const token in tokens){
            const coin = new Coin(token);
            const currentStatistic = coin.calculateStatistic(this.getDateInterval(months),coin.priceChange24h,coin,...coin.returnDelegates())
            if(currentStatistic > bestStatistic){
                bestStatistic = currentStatistic
                var bestToken = token
            }
        }

        return bestToken

    }

}

/**
 *
 * @function getMaxPrice
 * @function getMinPrice
 * @function getRandomPrice
 */
Coin.prototype.getMaxPrice = (days,price,coin) => coin.getPrice(days,price)

Coin.prototype.getMinPrice = (days,price,coin) => coin.getPrice(days,-price);

Coin.prototype.getAveragePrice = (days,price,coin) => coin.getPrice(days/2,price) + coin.getPrice(days/2,-price)

Coin.prototype.getRandomPrice = (days,price,coin) => coin.getPrice(days,price,ACCURACY,Math.random());

Coin.prototype.calculateStatistic = function (days, price,coin, ...params){
    let res = 0;
    for (const func of params) {
        res+=func(days,price,coin)
    }

    return res;
}
/**
 *
 * @returns {[(function(*=, *=, *): *)]} : Делегаты прототипа Coin
 */
Coin.prototype.returnDelegates = function (){
    return [this.getAveragePrice,this.getMaxPrice,this.getMinPrice];
}


/**
 *
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */






module.exports = {
    Coin,
    tokens
}
