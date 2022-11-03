//#region Task
/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 */

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = 'SIZE_SMALL'; //kal 20 price 50
Hamburger.SIZE_LARGE = 'SIZE_LARGE'; //kal 40 price 100
Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE'; //price 10 kal 20
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD' //price 20 kal 5
Hamburger.STUFFING_POTATO = 'STUFFING_POTATO' //price 15 kal 10
Hamburger.TOPPING_MAYO = 'TOPPING_MAYO'; //price 20 kal 5
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE'; //price 15

function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing
    this.dictValues ={
        SIZE_SMALL:[20,50],
        SIZE_LARGE:[40,100],
        STUFFING_CHEESE:[20,10],
        STUFFING_SALAD:[5,20],
        STUFFING_POTATO:[10,15],
        TOPPING_MAYO:[5,20],
        TOPPING_SPICE:[0,15]
    };
    if(!Object.keys(this.dictValues).includes(size) || !Object.keys(this.dictValues).includes(stuffing)){
        throw new HamburgerException(`Invalid parameters size:${size} or stuffing: ${stuffing} were been given in function`)
    }
    this.listValues = [[this.size,...this.dictValues[this.size]],[this.stuffing,...this.dictValues[this.stuffing]]];

}


/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    const keysDictionary = Object.keys(this.dictValues);
    this.AddOrRemoveToppings(keysDictionary.filter((x)=>x.startsWith("TOPPING")),[topping],(element)=>this.listValues.push([element,...this.dictValues[element]]))
}

Hamburger.prototype.AddOrRemoveToppings= function (keys,topping,func){
    for(const element of new Set(topping)){
        if(keys.includes(element)){
            func(element)
            continue;
        }
        throw new HamburgerException(`"Element ${element} wasn't in List of toppings`)
    }
}

/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    const toppingsName = this.getToppings();
    this.AddOrRemoveToppings(toppingsName,[topping],(element)=> this.listValues.splice(this.listValues.indexOf(this.dictValues[element]),1))

}

/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
Hamburger.prototype.getToppings = function () {
    return this.listValues.map(x=>x[0]).slice(2);
}

/* Узнать размер гамбургера */
Hamburger.prototype.getSize = function (size) {
    return this.size;
}

/* Узнать начинку гамбургера */
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}

/* Узнать цену гамбургера
 * @return {Number} Цена в тугриках */
Hamburger.prototype.calculatePrice = function () {
    return  this.listValues.map(x=>x[2]).reduce((x,y)=>x+y)
}


/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    return  this.listValues.map(x=>x[1]).reduce((x,y)=>x+y)
}

function HamburgerException(string){
    this.name = "Hamburger Exception"
    this.stack = (new Error()).stack
    this.message = `New ${this.name} ${string}: `;
}

HamburgerException.prototype = Object.create(Error.prototype);

//#endregion Task
module.exports.Hamburger = Hamburger;
module.exports.HamburgerException = HamburgerException
