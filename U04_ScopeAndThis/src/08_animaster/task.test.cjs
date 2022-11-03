const {expect, assert} = require('chai')
var fs = require('fs');
var path = require('path');



const solvedAnimaster = require('/app/task.solved.js')
const actualAnimaster = require('/app/task.js')
var FakeTimers = require("@sinonjs/fake-timers");




let clock
clock = FakeTimers.install()

after(() => {
    clock.uninstall()
})

const handleGetResults = (blocks) => {
    clock.runAll()
    const actualResults = getStylesValues(blocks.actualNode)
    const solvedResults = getStylesValues(blocks.solvedNode)
    return {actualResults, solvedResults}
}

function getHtmlNode(idButton, idBlock) {
    actualAnimaster.document.getElementById(idButton).click()
    solvedAnimaster.document.getElementById(idButton).click()
    return {
        actualNode: actualAnimaster.document.getElementById(idBlock),
        solvedNode: solvedAnimaster.document.getElementById(idBlock)
    }
}

function getStylesValues(node) {
    const classes = []
    for (const classElement of node.classList) {
        classes.push(classElement)
    }
    return [
        classes,
        node.style.transitionDuration,
        node.style.transform,
        node.offsetWidth,
        node.offsetTop,
        node.offsetHeight,
        node.offsetLeft
    ]
}

describe('Structure of task is cool',()=>{
    it ('PlaySteps is return 2 functions',()=>{
        // var getFiles = function (dir, files_){
        //
        //     files_ = files_ || [];
        //     var files = fs.readdirSync(dir);
        //     for (var i in files){
        //         var name = dir + '/' + files[i];
        //         if (fs.statSync(name).isDirectory()){
        //             getFiles(name, files_);
        //         } else {
        //             files_.push(name);
        //         }
        //     }
        //     return files_.join('\\n');
        // };
        // assert.equal(getFiles(process.cwd()),1)
        actualAnimaster.document.getElementById('fadeInPlay').click()
        const block = actualAnimaster.document.getElementById('fadeInBlock')
        const result = actualAnimaster.animaster().fadeIn(block,1000)
        assert.equal(Object.keys(result).length,2)
        expect(typeof Object.values(result)[0]).to.be.equal('function')
        expect(typeof Object.values(result)[1]).to.be.equal('function')
    })

    it('Animaster return needed functions',()=>{
        assert.hasAllKeys(actualAnimaster.animaster(),solvedAnimaster.animaster())
    })

})
describe('Simple Async Functions with Timer working', () => {

    function getDeepAssertion(idPlayButton,idBlock){
        const blocks = getHtmlNode(idPlayButton, idBlock)
        const results = handleGetResults(blocks)

        assert.deepEqual(results.actualResults, results.solvedResults)
    }

    it('FadeIn работает', () => {
        getDeepAssertion('fadeInPlay','fadeInBlock')
    })
    it('FadeOut работает ', function () {
        getDeepAssertion('fadeOutPlay','fadeOutBlock')
    });
    it('Move работает',()=>{
        getDeepAssertion('movePlay','moveBlock')
    })
    it('Scale работает',()=>{
        getDeepAssertion('scalePlay','scaleBlock')
    })
})
describe('Simple Reset Functions is working', () => {

    function getDeepAssertion(idPlayButton, idBlock, idReset) {
        const blocks = getHtmlNode(idPlayButton, idBlock)
        handleGetResults(blocks)
        const resetBlocks = getHtmlNode(idReset, idBlock)
        const resetResults = handleGetResults(resetBlocks)

        assert.deepEqual(resetResults.actualResults, resetResults.solvedResults)
    }

    it('FadeIn Reset работает', () => {
        getDeepAssertion('fadeInPlay', 'fadeInBlock', 'fadeInReset')
    })
    it('FadeOut Reset работает', () => {
        getDeepAssertion('fadeOutPlay', 'fadeOutBlock', 'fadeOutReset')
    })
    it('Move Reset работает', () => {
        getDeepAssertion('movePlay', 'moveBlock', 'moveReset')
    })
    it('Scale Reset работает', () => {
        getDeepAssertion('scalePlay', 'scaleBlock', 'scaleReset')
    })
})
describe('Complex Async Functions with Timer working',()=>{
    function getDeepAssertion(idPlayButton,idBlock){
        const blocks = getHtmlNode(idPlayButton, idBlock)
        const results = handleGetResults(blocks)

        assert.deepEqual(results.actualResults, results.solvedResults)
    }

    it('HeartBeating работает',()=>{
        getDeepAssertion('heartBeatingPlay','heartBeatingBlock')
    })
    it('moveAndHide работает',()=>{
        getDeepAssertion('moveAndHidePlay','moveAndHideBlock')
    })
    it('ShowAndHide работает',()=>{
        getDeepAssertion('showAndHidePlay','showAndHideBlock')
    })
})



