const cheerio = require('cheerio');
const axios = require('axios')
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req,res) {
        const response = await axios.get(req.body)
            .then(res => {
                const $ = cheerio.load(res.data);
                $('.title-info-title-text').each((i, e) => {
                    const test = $(e).text();
                    console.log('Title: ', test);
                })
                $('li[class=params-paramsList__item-appQw]').each((i, e) => {
                    const style = $(e).find('style').remove()
                    const text = $(e).text()
                    console.log(text)
                })
                $('.style-price-value-main-TIg6u').each((i, e) => {
                    const price = $(e).find('span').attr('content')
                    console.log(price)
                })
                $('.style-item-address__string-wt61A').each((i, e) => {
                    const location = $(e).text()
                    console.log('Расположение: ', location)
                })
            }).then(data => data).catch((e) => console.log('error'))
        res.json(response)
}

