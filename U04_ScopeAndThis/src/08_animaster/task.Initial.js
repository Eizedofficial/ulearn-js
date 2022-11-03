var global = typeof window !== 'undefined' ? window : global
var document =  global ? window.document : getJsDom()

function getJsDom(){

        var jsdom = require('jsdom')
        const dom = new jsdom.JSDOM(`<!DOCTYPE html><body><p id="fieldWrapper"></p></body>`);
        return dom.window.document
}

addListeners()

function getElement(id){

    let element = document.getElementById && document.getElementById(id)
    if (!element){
        element = document.createElement && document.createElement("div")
        element.id = id
        document.body.appendChild(element)
    }
    return element
}
function addListeners() {
    let fadeInHandler = null
    getElement('fadeInPlay')
        .addEventListener('click', function () {
            fadeInHandler && fadeInHandler.reset()
            const block = getElement('fadeInBlock')
            fadeInHandler = animaster().fadeIn(block, 5000);
        });
    getElement('fadeInReset')
        .addEventListener('click', function () {
            fadeInHandler && fadeInHandler.reset();
        });

    let fadeOutHandler = null
    getElement('fadeOutPlay')
        .addEventListener('click', function () {
            fadeOutHandler && fadeOutHandler.reset()
            const block = getElement('fadeOutBlock')
            fadeOutHandler = animaster().fadeOut(block, 5000);
        });
    getElement('fadeOutReset')
        .addEventListener('click', function () {
            fadeOutHandler && fadeOutHandler.reset();
        });

    let moveHandler = null
    getElement('movePlay')
        .addEventListener('click', function () {
            moveHandler && moveHandler.reset()
            const block = getElement('moveBlock')
            moveHandler =  animaster().move(block, 1000, {x: 100, y: 10});
        });
    getElement('moveReset')
        .addEventListener('click', function () {
            moveHandler && moveHandler.reset();
        });

    let scaleHandler = null
    getElement('scalePlay')
        .addEventListener('click', function () {
            scaleHandler && scaleHandler.reset()
            const block = getElement('scaleBlock')
            scaleHandler = animaster().scale(block, 1000, 1.25);
        });
    getElement('scaleReset')
        .addEventListener('click', function () {
            debugger
            scaleHandler && scaleHandler.reset();
        });

    let moveAndHideHandle = null;
    getElement('moveAndHidePlay')
        .addEventListener('click', function () {
            moveAndHideHandle && moveAndHideHandle.reset();
            moveAndHideHandle = animaster().moveAndHide(getElement('moveAndHideBlock'), 5000);
        });
    getElement('moveAndHideStop')
        .addEventListener('click', function () {
            moveAndHideHandle && moveAndHideHandle.stop();
        });
    getElement('moveAndHideReset')
        .addEventListener('click', function () {
            moveAndHideHandle && moveAndHideHandle.reset();
        });
    let showAndHideHandler = null

    getElement('showAndHidePlay')
        .addEventListener('click', function () {

            showAndHideHandler && showAndHideHandler.reset();
            showAndHideHandler = animaster().showAndHide(getElement('showAndHideBlock'), 5000);
        });
    getElement('showAndHideStop')
        .addEventListener('click', function () {
            debugger
            showAndHideHandler && showAndHideHandler.stop();
        });


    let heartBeatingHandle = null;
    getElement('heartBeatingPlay')
        .addEventListener('click', function () {
            heartBeatingHandle && heartBeatingHandle.reset();
            heartBeatingHandle = animaster().heartBeating(getElement('heartBeatingBlock'));
        });
    getElement('heartBeatingStop')
        .addEventListener('click', function () {
            heartBeatingHandle && heartBeatingHandle.stop();
        });
}



//#region Task
function animaster(){
    function getTransform(translation, ratio) {
        const result = [];
        if (translation) {
            result.push(`translate(${translation.x}px,${translation.y}px)`);
        }
        if (ratio) {
            result.push(`scale(${ratio})`);
        }
        return result.join(' ');
    }


    /**
     * Блок плавно появляется из прозрачного.
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */
    function fadeIn(element, duration) {

       return this.addFadeIn(duration).play(element)
    }
    /**
     * Блок плавно переходит в прозрачный.
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */
    function fadeOut(element, duration) {
        //TODO...
        return null
    }

    /**
     * Функция, передвигающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param translation — объект с полями x и y, обозначающими смещение блока
     */
    function move(element, duration, translation) {
        //TODO...
       return null
    }

    /**
     * Функция, увеличивающая/уменьшающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
     */
    function scale(element, duration, ratio) {
        //TODO...
       return null
    }
    /**
     * Функция, перемещающая и прятающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */

    function moveAndHide(element, duration){
        //TODO...
        return null
    }

    /**
     * Функция, сначала выводящая элемент из прозрачного, а затем прячет его (делает прозрачным)
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */

    function showAndHide(element, duration){
        //TODO...
        return null
    }
    /**
     * Функция, величивающая и уменьшающая элемент
     * @param element — HTMLElement, который надо анимировать
     * Обратите внимание: данная анимация зациклена
     */
    function heartBeating(element) {
        //TODO...
        return null
    }
    /**
     * Функция, добавляющая в массив _steps объект с полями fadeIn и duration
     * @param duration — Продолжительность анимации в миллисекундах
     * @return Объект анимастера, который вернулся из вызова animaster
     */
    function addFadeIn(duration) {
        this._steps.push({
            fadeIn: true,
            duration: duration,
        });
        return this;
    }

    /**
     * Функция, добавляющая в массив _steps объект с полями fadeOut и duration
     * @param duration — Продолжительность анимации в миллисекундах
     * @return Объект анимастера, который вернулся из вызова animaster
     */
    function addFadeOut(duration) {
        //TODO...
        return null;
    }
    /**
     * Функция, добавляющая в массив _steps объект с полями ratio и duration
     * @param duration — Продолжительность анимации в миллисекундах
     * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
     * @return Объект анимастера, который вернулся из вызова animaster
     */

    function addScale(duration, ratio) {
        //TODO...
        return null;
    }
    /**
     * Функция, добавляющая в массив _steps объект с полями translation и duration
     * @param duration — Продолжительность анимации в миллисекундах
     * @param translation — объект с полями x и y, обозначающими смещение блока
     * @return Объект анимастера, который вернулся из вызова animaster
     *
     */

    function addMove(duration, translation) {
        //TODO...
        return null
    }
    /**
     * Функция, добавляющая в массив _steps объект с полем duration
     * @param duration — Продолжительность анимации в миллисекундах
     * @return Объект анимастера, который вернулся из вызова animaster
     */

    function addDelay(duration) {
        //TODO...
        return null;
    }

    /**
     * Функция, обнуляющая стиль у элемента со свойством "transitionDuration", а также скрывающая его
     * @param element — HTMLElement, который надо анимировать
     */
    function resetFadeIn(element) {
        element.style.transitionDuration = null;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    /**
     * Функция, обнуляющая стиль у элемента со свойством "transitionDuration", а также показывающая его
     * @param element — HTMLElement, который надо анимировать
     */
    function resetFadeOut(element) {
        //TODO...
    }

    /**
     * Функция, обнуляющая стили у элемента со свойстовом "transitionDuration" и "transform"
     * @param element — HTMLElement, который надо анимировать
     */
    function resetMoveAndScale(element) {
        //TODO...
    }
    /**
     * Функция - обертка, запускающая анимацию по шагам
     * @param element — HTMLElement, который надо анимировать
     * @param cycled - Будет ли анимация зациклена
     */
    function play(element, cycled = false) {
        return playSteps(element, this._steps, cycled);
    }
    /**
     * Функция, которая проигрывает все анимации по шагам
     * @param element — HTMLElement, который надо анимировать
     * @param steps - массив шагов с анимациями
     * @param cycled - Будет ли анимация зациклена
     */
    function playSteps(element, steps, cycled){
        let stopped = false;
        const resetActions = {};
        let restSteps = null;
        let counter = 0
        /**
         * Функция, которая обрабатывает отдельный шаг анимации
         */
        function playStep() {
            if (stopped || steps.length === 0) {
                return;
            }
            //TODO...

            setTimeout(() => {
                counter++
                if (counter >= steps.length * 3){
                    stopped = true
                }
                playStep();
            }, /*TODO...*/);
        }
        setTimeout(() => {
            playStep();
        }, 0);

        return {
            stop: () => {
                //TODO...
            },
            reset: () => {
                //TODO...
            }
        };
    }



    return {

        _steps: [],
        play,
        addDelay,
        addFadeIn,
        addFadeOut,
        addMove,
        addScale,
        fadeIn,
        fadeOut,
        move,
        scale,
        moveAndHide,
        showAndHide,
        heartBeating

    }
}
//#endregion Task
if (global == undefined || !global.window){
    module.exports = {
        document,
        animaster
    }
}
