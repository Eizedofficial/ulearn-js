const  {assert,expect}  = require("chai");
const actualRequire = require('/app/task')
const solvedRequire = require('/app/task.solved')
// import solvedRequire from './task.Initial.js'
describe("ToDo Statistic tests",  () => {

    function getResults(funcActual,funcSolved,...params){
        let a,b
            if (params && params.length!==0) {
                a = funcActual(params)
                b = funcSolved(params)
            }
            else {
                a = funcActual()
                b = funcSolved()
            }
        expect(a.length).to.equal(b.length);
        try{
            expect(a).to.have.deep.members(b);
        }catch(e){
            expect(a).to.deep.contain(b);
        }
    }
    it("parseTodo is working simple",  () => {
        const result = solvedRequire.parseTodo('expect.js',
            'TODO Anonymous Developer; 2016-03-17; Необходимо');
        const actual = actualRequire.parseTodo('expect.js',
            'TODO Anonymous Developer; 2016-03-17; Необходимо');
         assert.deepEqual(actual,result)
    });
    it("formatDate is working", () => {
        assert.equal(actualRequire.formatDate(new Date('2021-12-17T03:24:00')),solvedRequire.formatDate(new Date('2021-12-17T03:24:00')))
        assert.equal(actualRequire.formatDate(new Date('December 17, 1995 03:24:00') ),solvedRequire.formatDate(new Date('December 17, 1995 03:24:00')))
    });

    it("Show|ReadAllToDos is working", () => {
       getResults(actualRequire.handleShow,solvedRequire.handleShow)

    });

    it("handleImportant is working", () => {

        getResults(actualRequire.handleImportant,solvedRequire.handleImportant)
    });

    it("handleUser is working ", () => {
        getResults(actualRequire.handleUser,solvedRequire.handleUser,'Veronika')
        getResults(actualRequire.handleUser,solvedRequire.handleUser,'Anonymous Developer')
        getResults(actualRequire.handleUser,solvedRequire.handleUser,'digi',1)

    });

    it("handleSort is working ", () => {
        assert.deepEqual(actualRequire.handleSort(['importance']),solvedRequire.handleSort(['importance']))
        assert.deepEqual(actualRequire.handleSort(['user']),solvedRequire.handleSort(['user']))
        assert.deepEqual(actualRequire.handleSort(['date']),solvedRequire.handleSort(['date']))
        assert.deepEqual(actualRequire.handleSort(['wrong']),solvedRequire.handleSort(['wrong']))
        assert.deepEqual(actualRequire.handleSort(['importance',1]),solvedRequire.handleSort(['importance',1]))

        // getResults(actualRequire.handleSort,solvedRequire.handleSort,'importance')
        // getResults(actualRequire.handleSort,solvedRequire.handleSort,'importance',1)
        // getResults(actualRequire.handleSort,solvedRequire.handleSort,'user')
        // getResults(actualRequire.handleSort,solvedRequire.handleSort,'date')
        // getResults(actualRequire.handleSort,solvedRequire.handleSort,'wrong')

    });

    it("handleDate is working", () => {
        getResults(actualRequire.handleDate,solvedRequire.handleDate,'2018-03-02')
        getResults(actualRequire.handleDate,solvedRequire.handleDate,'2017')
        getResults(actualRequire.handleDate,solvedRequire.handleDate,'2016')
        getResults(actualRequire.handleDate,solvedRequire.handleDate,'2021',1)

    });

    it("getImportance is working", () => {
        assert.equal(
            actualRequire.getImportance('TODO Digi; Dec 24, 22 13:20:18; Добавить функцию getFileName!, которая по пути файла! будет возвращать его имя! Воспользоваться модулем path из Node.js!'),
            solvedRequire.getImportance('TODO Digi; Dec 24, 22 13:20:18; Добавить функцию getFileName!, которая по пути файла! будет возвращать его имя! Воспользоваться модулем path из Node.js!')
        )
    });

});
