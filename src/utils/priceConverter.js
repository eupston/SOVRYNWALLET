const priceList = [
    {from: 'bitcoin', to: 'usd', pairs: ['rbtc/usd', 'wrbtc/usd']},
    {from: 'ethereum', to: 'usd', pairs: ['eths/usd']},
    {from: 'rif-token', to: 'usd', pairs: ['rif/usd']},
    {from: 'binancecoin', to: 'usd', pairs: ['bnbs/usd']},
    {from: 'sovryn', to: 'usd', pairs: ['sov/usd']},
    // use usdt value for DoC and xusd as they are not listed on coingecko
    {from: 'tether', to: 'usd', pairs: ['rusdt/usd', 'xusd/usd', 'doc/usd']}
]


export const callPriceApi = async (fromCurrency, toCurrency)  => {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`
        https.get(apiUrl, (res) => {
            let body = ''
            res.on('data', (chunk) => { body += chunk })
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body))
                } catch (error) {
                    reject(error)
                }
            })
        }).on('error', (error) => reject(error))
    })
}