var promiseRetry = require('promise-retry');
const pTimeout = require('./p-timeout');
const delay = require('delay');

/**
 * Promise retry and timeout
 *
 * @param {Object} pRetry Configuration object
 * @param {Promise} pRetry.promise Promise to use retry and timeout
 * @param {Array<*>} pRetry.params Parameters of the promise in array
 * @param {Object} pRetry.options - Function options.
 * @param {Number} pRetry.options.timeout - Promise timeout in milliseconds.
 * @param {Number} pRetry.options.wait - Delay between retries in milliseconds.
 * @param {Number} pRetry.options.retries - Number of retries.
 * @param {Number} pRetry.options.factor - Factor retry.
 * @param {String} pRetry.options.message - Custom timeout message.
 * @throws {TypeError} In case data or num do not have the expected type
 * @returns {*} Result of promise if succeeded
 * 
 * @example
 * // promise function
 * async function sumNum(...numbers){
 *      return new Promise((resolve, reject) => { 
 *          numbers = numbers.flat(Infinity)
 *          if(numbers.filter(i=>typeof i === 'number').length != numbers.length)
 *              reject('Use only numbers')
 *          resolve(args.reduce((prv,cur)=> prv+cur)) 
 *      })
 * }
 * // retry + timeout 
 * pRetry({
 *      promise: sumNum,
 *      params: [1,2,3],
 *      options: { 
 *          wait: 5000, //wait between retries in ms
 *          timeout: 10000, //promise timeout in ms
 *          retries: 5, //N of retries
 *          factor: 1, //retry factor
 *          message: 'somehow the sumNum has timedout' //custom timeout message
 *      }
 * })
 * .then((result) => console.log(result)) // output 6
 * .catch((error) => console.log(error.message)); // 'Use only numbers' or some other error
 * 
 */
async function pRetry({ promise, params = [], options = {} }) {
    console.log(params)
    const timeout = options.timeout || Infinity;
    const wait = options.wait || 1000;
    const retries = options.retries - 1 || 4;
    const factor = options.factor || 1;
    const message = options.message || 'Attempts timedout'
    return await promiseRetry(async function (retry, number) {
        await delay(wait);
        console.log('Attempt number', number);
        return pTimeout(promise(...params), timeout, message).catch(retry);
    }, { retries, factor })

}

module.exports = { pRetry };

