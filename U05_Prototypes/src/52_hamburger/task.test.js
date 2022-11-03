const { Hamburger,HamburgerException } = require('/app/task.js');
const solvedHamburger = require('/app/task.solved')
const {expect} = require('chai')

describe('Hamburger Tests',()=> {
    describe('Method works fine', () => {
        it('Hamburger is class',()=>{
            const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
                expect(hamburger instanceof solvedHamburger.Hamburger)

        })
        it('1', () => {
            const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
            hamburger.addTopping(Hamburger.TOPPING_MAYO);
            expect(hamburger.calculateCalories()).to.be.equal(45)
            expect(hamburger.calculatePrice()).to.be.equal(80)
        })
    });


    describe('Recalculate is works', () => {
        it('2', () => {
            const newHamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
            newHamburger.addTopping(Hamburger.TOPPING_MAYO);
            newHamburger.addTopping(Hamburger.TOPPING_SPICE);
            expect(newHamburger.calculatePrice()).to.be.equal(95)
            expect(newHamburger.getSize() === Hamburger.SIZE_LARGE).to.be.equal(false)
        })
    })


    describe('Remove something', () => {
        it('3', () => {
            const newHamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
            newHamburger.addTopping(Hamburger.TOPPING_MAYO);
            newHamburger.addTopping(Hamburger.TOPPING_SPICE);
            expect(newHamburger.getToppings().length).to.be.equal(2)
            newHamburger.removeTopping(Hamburger.TOPPING_SPICE);
            expect(newHamburger.getToppings().length).to.be.equal(1);
        })
    })


    describe('Throw Error', () => {
        it('4', () => {

            let newHamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
            expect(() => {
                newHamburger.addTopping(Hamburger.TOPPING_KETCHUP ?? 'TOPPING_KETCHUP')
            }).to.throw(/TOPPING_KETCHUP/);
            expect(() => {
                newHamburger.removeTopping(Hamburger.TOPPING_MAYO)
            }).to.throw(/TOPPING_MAYO/);
            expect(() => {
                ;
                newHamburger = new Hamburger(Hamburger.SIZE_MEDIUM ?? 'STUFFING_MEDIUM' , Hamburger.STUFFING_MEAT ?? 'STUFFING_MEAT');
            }).to.throw(/(^.*(STUFFING_MEAT.*STUFFING_MEDIUM)|(STUFFING_MEDIUM.*STUFFING_MEAT).* $)/g);
        })
    })
    describe('Hamburger Exception has Prototype of Error',()=>{
        it('Check Prototype',()=>{
            const exception = new HamburgerException(' ')
            expect(exception).to.have.property('name')
            expect(exception).to.have.property('stack')
            expect(exception).to.have.property('message')
            Object.setPrototypeOf(HamburgerException, Error)
            expect('captureStackTrace' in exception).to.be.equal(true)
            expect('stackTraceLimit' in exception).to.be.equal(true)


        })
    })
})
