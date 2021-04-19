/* Example in Node.js ES6 using request-promise */

const rp = require('request-promise');
const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs: {
        // 'start': '1',
        // 'limit': '5000',
        'convert': 'USD',
        'symbol': 'BTC,ETH'
    },
    headers: {
        'X-CMC_PRO_API_KEY': '25dac9be-cd69-434c-b51a-96e4e5a56d15'
    },
    json: true,
    gzip: true
};


function freshGolbalPrice() {
    return new Promise((res, rej) => {
        rp(requestOptions).then(response => {

            let eth = response.data.ETH
            global.ethPrice = eth.quote.USD.price
            // console.log(new Date() + 'coinmarketcap API call response:', eth.quote.USD.price);
            res(global.ethPrice)
        }).catch((err) => {
            console.log('coinmarketcap API call error:', err.message);
            rej(err.message)
        });
    })

}

module.exports = freshGolbalPrice