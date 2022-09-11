const cheerio = require('cheerio');
const axios = require('axios')
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req,res) {

    const response = await axios.get(req.body.url)
            .then(res => {
                const $ = cheerio.load(res.data);
                const title = $('.title-info-title-text').each((i, e) => {
                   const tit = $(e).text();
                   return tit
                })
                const li = $('li[class=params-paramsList__item-appQw]').each((i, e) => {
                    const style = $(e).find('style').remove()
                    const list =  $(e).text()
                    return list
                })
                const price = $('.style-price-value-main-TIg6u').each((i, e) => {
                     const pr = $(e).find('span').attr('content')
                    return pr
                })
                const location = $('.style-item-address__string-wt61A').each((i, e) => {
                     const loc = $(e).text()
                    return loc
                })
                return {
                    title,
                    li,
                    price,
                    location
                }
            }).then(data => console.log(data)).catch((e) => console.log('error'))
        res.json(response)
}

