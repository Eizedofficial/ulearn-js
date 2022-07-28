function makeCounter() {
    let countNum = 0;
    return function Count() {
        countNum++;
        return countNum;
    }
}

counter = makeCounter()
    for(let i = 0; i < 5; i++) {
    console.log(counter())
}