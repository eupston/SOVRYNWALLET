import https from 'http';

export const coinGeckoTokenIds = [
    {token: 'rootstock', alias: ['trbtc']},
    {token: 'rif-token',  alias: ['trif']},
    {token: 'sovryn',  alias: ['sov']},
    {token: 'renbtc',  alias: ['renbtc']},
    {token: 'tether', alias: ['usdt']}
]

export const getMarketTokenPrice = async (tokenId, currency) => {
    const coinGeckoTokenID = coinGeckoTokenIds.filter(ids => ids.alias.includes(tokenId.toLowerCase()))[0].token;
    return new Promise((resolve, reject) => {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoTokenID}&vs_currencies=${currency}`
        https.get(apiUrl, (res) => {
            let body = ''
            res.on('data', (chunk) => { body += chunk })
            res.on('end', () => {
                try {
                    const bodyJson = JSON.parse(body);
                    resolve(bodyJson[coinGeckoTokenID][currency])
                } catch (error) {
                    reject(error)
                }
            })
        }).on('error', (error) => reject(error))
    })
}