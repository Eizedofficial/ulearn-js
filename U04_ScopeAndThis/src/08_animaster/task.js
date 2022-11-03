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
            debugger
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

       return  this.addFadeIn(duration).play(element)
    }
    /**
     * Блок плавно переходит в прозрачный.
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */
    function fadeOut(element, duration) {
        return this.addFadeOut(duration).play(element);
    }

    /**
     * Функция, передвигающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param translation — объект с полями x и y, обозначающими смещение блока
     */
    function move(element, duration, translation) {
        return this.addMove(duration, translation).play(element);
    }

    /**
     * Функция, увеличивающая/уменьшающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
     */
    function scale(element, duration, ratio) {
        return this.addScale(duration, ratio).play(element);
    }
    /**
     * Функция, перемещающая и прятающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */

    function moveAndHide(element, duration){
        return this
            .addMove(duration*2/5, {x: 100, y: 20})
            .addFadeOut(duration*3/5)
            .play(element);
    }

    /**
     * Функция, сначала выводящая элемент из прозрачного, а затем прячет его (делает прозрачным)
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */

    function showAndHide(element, duration){
        return this
            .addFadeIn(duration*1/3)
            .addDelay(duration*1/3)
            .addFadeOut(duration*1/3)
            .play(element);
    }
    /**
     * Функция, величивающая и уменьшающая элемент
     * @param element — HTMLElement, который надо анимировать
     * Обратите внимание: данная анимация зациклена
     */
    function heartBeating(element) {
        return this
            .addScale(500, 1.4)
            .addScale(500, 1.0)
            .play(element, true);
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
        this._steps.push({
            fadeOut: true,
            duration: duration,
        });
        return this;
    }
    /**
     * Функция, добавляющая в массив _steps объект с полями ratio и duration
     * @param duration — Продолжительность анимации в миллисекундах
     * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
     * @return Объект анимастера, который вернулся из вызова animaster
     */

    function addScale(duration, ratio) {
        this._steps.push({
            duration: duration,
            ratio: ratio,
        });
        return this;
    }
    /**
     * Функция, добавляющая в массив _steps объект с полями translation и duration
     * @param duration — Продолжительность анимации в миллисекундах
     * @param translation — объект с полями x и y, обозначающими смещение блока
     * @return Объект анимастера, который вернулся из вызова animaster
     *
     */

    function addMove(duration, translation) {
        this._steps.push({
            duration: duration,
            translation: translation,
        });
        return this;
    }
    /**
     * Функция, добавляющая в массив _steps объект с полем duration
     * @param duration — Продолжительность анимации в миллисекундах
     * @return Объект анимастера, который вернулся из вызова animaster
     */

    function addDelay(duration) {
        this._steps.push({
            duration: duration,
        });
        return this;
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
        element.style.transitionDuration = null;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    /**
     * Функция, обнуляющая стили у элемента со свойстовом "transitionDuration" и "transform"
     * @param element — HTMLElement, который надо анимировать
     */
    function resetMoveAndScale(element) {
        element.style.transitionDuration =  null;
        element.style.transform = null;
    }

    function play(element, cycled = false) {
        return playSteps(element, this._steps, cycled);
    }

    function playSteps(element, steps, cycled){
        debugger
        let stopped = false;
        const resetActions = {};
        let counter = 0

        // let transform = {};
        let restSteps = null;

        function playStep() {
            if (stopped || steps.length === 0) {
                return;
            }

            if (!restSteps || restSteps.length === 0 && cycled) {
                restSteps = [...steps];
            } else if (restSteps.length === 0) {
                return;
            }

            const step = restSteps.shift();

            if (step.translation || step.ratio) {
                // transform.translation = step.translation;
                resetActions.moveAndScale = resetMoveAndScale;
            }

            element.style.transform = getTransform(step.translation, step.ratio);

            element.style.transitionDuration =  step.duration ? `${step.duration}ms` : null;

            if (step.fadeIn) {
                // element.classList.remove('hide');
                // element.classList.add('show');
                // resetActions.fadeIn = resetFadeIn;
                changeElementStats('hide','show','fadeIn',resetFadeIn)
            }
            if (step.fadeOut) {
                // element.classList.remove('show');
                // element.classList.add('hide');
                // resetActions.fadeOut = resetFadeOut;
                changeElementStats('show','hide','fadeOut',resetFadeOut)
            }

            function changeElementStats(removeClass,addClass,addProperty,resetProperty){
                element.classList.remove(removeClass);
                element.classList.add(addClass);
                resetActions[addProperty] = resetProperty;
            }

            setTimeout(() => {
                debugger
                counter++
                if (counter >= steps.length * 3){
                    stopped = true
                }
                playStep();

            }, step.duration || 0);
        }

        setTimeout(() => {


            playStep();

        }, 0);

        return {
            stop: () => {

                stopped = true;

            },
            reset: () => {
                stopped = true;
                for(const action of Object.values(resetActions)) {
                    action(element);
                }
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
