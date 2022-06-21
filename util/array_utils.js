const _ = require('lodash');


const loop = (times, callback) => {
    for (let i = 0; i < times; i++) {
        callback(i);
    }
};

function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function remove_first(array) {
    array.shift()
    return array;
}

function remove_last(array) {
    array.pop()
    return array;
}

function merge_unique(array = []) {
    return _.union(_.flatten(array))
}


/**
 * Remove item(s) from Array
 *
 * @param {Array} array Array to Remove item.
 * @param {*} toRemove Item to remove from Array.
 * @param {Object} options - Function options.
 * @param {Boolean} options.backwards - Remove elements backwards
 * @param {Number} options.occurrences - Remove N elements from array
 * @throws {TypeError} In case data or num do not have the expected type
 * @returns {Array} Array filtered.
 */
function remove_item(toRemove, array, options = {}) {

    const backwards = options.backwards || false;
    const occurrences = options.occurrences || undefined;

    let single = true;
    if (Array.isArray(toRemove)) single = false

    if (occurrences) {
        loop(occurrences, () => {
            if (!single) {
                loop(array.length, (j) => {
                    (backwards) ?
                        delete array[array.lastIndexOf(toRemove[j])] :
                        delete array[array.indexOf(toRemove[j])];
                });
            } else {
                (backwards) ?
                    delete array[array.lastIndexOf(toRemove)] :
                    delete array[array.indexOf(toRemove)];
            }
        })
    } else {
        loop(array.length, (i) => {
            if (single) {
                if (array[i] == toRemove)
                    delete array[i];
            } else {
                if (toRemove.includes(array[i])) delete array[i];
            }
        })
    }

    return _.without(array, undefined);

}

/*
let test = remove_item([1, 2, 3], [-1, 0, 1, 4, 3, 1, 1, 2, 1, 2], { backwards: true, occurrences: 3 });
console.log(test)*/


module.exports = { random_item, remove_first, remove_last, merge_unique, remove_item }