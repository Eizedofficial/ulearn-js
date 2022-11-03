import actualChoice from '/app/task';
import solvedChoice from '/app/task.solved'
import { expect } from 'chai';


describe('Method works fine', () => {
    it('Coin is class',()=>{
        actualChoice.tokens.ETY = {
            price: '190.91$',
            priceChange24h: '1.63%',
        }
        expect(new actualChoice.Coin('ETY') instanceof solvedChoice.Coin)
    })
    it('token choice',()=>{
        expect(actualChoice.Coin.tokenChoice([{ month: 11, year: 2002 },{month: 11,year:2025}])).to.be.equal("ETH");
        expect(actualChoice.Coin.tokenChoice([{ month: 11, year: 2002 }])).to.be.equal("ETH");
    })
    it('Date Interval',()=>{
        expect(actualChoice.Coin.getDateInterval([{ month: 11, year: 2002 },{month: 11,year:2025}]))
             .to.be.equal(solvedChoice.Coin.getDateInterval([{ month: 11, year: 2002 },{month: 11,year:2025}]))
        expect(actualChoice.Coin.getDateInterval([{ month: 11, year: 2002 }]))
            .to.be.equal(solvedChoice.Coin.getDateInterval([{ month: 11, year: 2002 }]))

    })

    it('Max',()=>{
        solvedChoice.tokens.ETY = {
            price: '190.91$',
            priceChange24h: '1.63%',
        }
        const coin = new solvedChoice.Coin('ETY')
        expect(actualChoice.Coin.prototype.getMaxPrice(10,coin.price,coin))
            .to.be.equal(solvedChoice.Coin.prototype.getMaxPrice(10,coin.price,coin))
    })

    it('Min',()=>{
        solvedChoice.tokens.ETY = {
            price: '190.91$',
            priceChange24h: '1.63%',
        }
        const coin = new solvedChoice.Coin('ETY')
        expect(actualChoice.Coin.prototype.getMinPrice(10,coin.price,coin))
            .to.be.equal(solvedChoice.Coin.prototype.getMinPrice(10,coin.price,coin))
    })

    it('Average',()=>{
        solvedChoice.tokens.ETY = {
            price: '190.91$',
            priceChange24h: '1.63%',
        }
        const coin = new solvedChoice.Coin('ETY')
        expect(actualChoice.Coin.prototype.getAveragePrice(10,coin.price,coin))
            .to.be.equal(solvedChoice.Coin.prototype.getAveragePrice(10,coin.price,coin))
    })

    it('Random',()=>{

        function helperGetMaxMin(coin,percentPerDay,days,priceOffset){
            const countAmount = 5000/coin.price;
            let accumulator = coin.price;
            let priceChange = percentPerDay
            for (let i = 0; i < Math.floor(days); i++) {
                accumulator = priceChange > 0
                    ? (accumulator * Math.abs(priceChange/100)) + accumulator
                    : accumulator - (accumulator * Math.abs(priceChange/100))
                    priceChange +=  priceOffset
            }

            return accumulator * countAmount;
        }

        solvedChoice.tokens.ETY = {
            price: '190.91$',
            priceChange24h: '1.63%',
        }
        const coin = new actualChoice.Coin('ETY')
        const max = helperGetMaxMin(coin,coin.priceChange24h,10,0.5)
        const min = helperGetMaxMin(coin,coin.priceChange24h,10,-0.5)

        const random = actualChoice.Coin.prototype.getRandomPrice(10,coin.priceChange24h,coin)
        expect(random).to.be.within(min,max)

    })
});
