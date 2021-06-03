
// Returns true if the coin function parameter is a valid coin value of either 1, 5, 10, 25, 50, or 100
const array = [1, 5, 10, 25, 50, 100]
function validDenomination(coinDenom) {
    return false !== array.indexOf(coinDenom) >= 0
}

console.log("isDenom:", validDenomination(5));

// Returns the calculated value of a single coin object from the obj function parameter
function valueFromCoinObject(obj) {
    let  {denom = 0, count = 0} = obj;
    return denom * count;
}

myCoinObj = {
    denom: 25,
    count: 5
};

console.log("5 quater:", valueFromCoinObject(myCoinObj));

// Iterates through an array of coin objects and returns the final calculated value of all coin objects
function valueFromArray(arr) {
    return arr.reduce((accumulator, currentValue) => {
       return accumulator + valueFromCoinObject(currentValue)
    }, 0);
};

tester = [
    {
        denom: 25,
        count: 2
    },
    {
        denom: 5,
        count: 4
    },
    {
        denom: 10,
        count: 6
    }
]

console.log("value of an array of coinObject:", valueFromArray(tester));

// Calls and returns the result of valueFromArray() function
function coinCount(...coinage) {
    return valueFromArray(coinage);
}

console.log("coinCount value:", coinCount(...tester));

// testing calls
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));

const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));

module.exports = {
    coinCount
};

