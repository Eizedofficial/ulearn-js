var global = typeof window !== 'undefined' ? window : global
var document =  global ? window.document : getJsDom()

function getJsDom(){
    var jsdom = require('jsdom')
    const dom = new jsdom.JSDOM(`<!DOCTYPE html><body><p id="fieldWrapper"></p></body>`);
    return dom.window.document
}
addListeners();

function getElement(id){

    let element = document.getElementById && document.getElementById(id)
    if (!element){
        element = document.createElement && document.createElement("div")
        element.id = id
        document.body.append(element)
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


//     const customAnimation = animaster()
//         .addMove(200, {x: 40, y: 40})
//         .addScale(800, 1.3)
//         .addMove(200, {x: 80, y: 0})
//         .addScale(800, 1)
//         .addMove(200, {x: 40, y: -40})
//         .addScale(800, 0.7)
//         .addMove(200, {x: 0, y: 0})
//         .addScale(800, 1);
//
//     let customAnimationHandle = null;
//     document.getElementById('customAnimationPlay')
//         .addEventListener('click', function () {
//             customAnimationHandle = customAnimation.play(document.getElementById('customAnimationBlock'));
//         });
//     document.getElementById('customAnimationReset')
//         .addEventListener('click', function () {
//             customAnimationHandle && customAnimationHandle.reset();
//         });
//
//     const worryAnimationHandler = animaster()
//         .addMove(200, {x: 80, y: 0})
//         .addMove(200, {x: 0, y: 0})
//         .addMove(200, {x: 80, y: 0})
//         .addMove(200, {x: 0, y: 0})
//         .buildHandler();
//
//     document.getElementById('worryAnimationBlock')
//         .addEventListener('click', worryAnimationHandler);
 }

function animaster() {
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

    function playSteps(element, steps, cycled) {
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
                resetActions.moveAndScale = resetMoveAndScale;
            }

            element.style.transform = getTransform(step.translation, step.ratio);

            element.style.transitionDuration =  step.duration ? `${step.duration}ms` : null;

            if (step.fadeIn) {

                changeElementStats('hide','show','fadeIn',resetFadeIn)
            }
            if (step.fadeOut) {

                changeElementStats('show','hide','fadeOut',resetFadeOut)
            }

            function changeElementStats(removeClass,addClass,addProperty,resetProperty){
                element.classList.remove(removeClass);
                element.classList.add(addClass);
                resetActions[addProperty] = resetProperty;
            }

            setTimeout(() => {
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

    function play(element, cycled = false) {
        return playSteps(element, this._steps, cycled);
    }


    function resetFadeIn(element) {
        element.style.transitionDuration = null;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function resetFadeOut(element) {
        element.style.transitionDuration = null;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function resetMoveAndScale(element) {
        element.style.transitionDuration =  null;
        element.style.transform = null;
    }

    function addDelay(duration) {
        this._steps.push({
            duration: duration,
        });
        return this;
    }

    function addFadeIn(duration) {
        this._steps.push({
            fadeIn: true,
            duration: duration,
        });
        return this;
    }

    function fadeIn(element, duration) {
       return this.addFadeIn(duration).play(element);
    }

    function addFadeOut(duration) {
        this._steps.push({
            fadeOut: true,
            duration: duration,
        });
        return this;
    }

    function fadeOut(element, duration) {
        return this.addFadeOut(duration).play(element);
    }

    function addMove(duration, translation) {
        this._steps.push({
            duration: duration,
            translation: translation,
        });
        return this;
    }

    function move(element, duration, translation) {
       return this.addMove(duration, translation).play(element);
    }

    function addScale(duration, ratio) {
        this._steps.push({
            duration: duration,
            ratio: ratio,
        });
        return this;
    }

    function scale(element, duration, ratio) {
        return this.addScale(duration, ratio).play(element);
    }

    function moveAndHide(element, duration) {
        return this
            .addMove(duration*2/5, {x: 100, y: 20})
            .addFadeOut(duration*3/5)
            .play(element);
    }

    function showAndHide(element, duration) {
        return this
            .addFadeIn(duration*1/3)
            .addDelay(duration*1/3)
            .addFadeOut(duration*1/3)
            .play(element);
    }

    function heartBeating(element) {
        return this
            .addScale(500, 1.4)
            .addScale(500, 1.0)
            .play(element, true);
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
    };
}
if (global == undefined || !global.window){
    module.exports = {
        document,
        animaster
    }
}

