const cheerio = require('cheerio');
const axios = require('axios')
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req,res) {

    const response = await axios.get(req.body.url)
            .then(res => {
                let text;
                let li;
                let price;
                let location;
                const data = {
                    text,
                    li,
                    price,
                    location
                }
                const $ = cheerio.load(res.data);
                $('.title-info-title-text').each((i, e) => {
                     text += $(e).text();
                })
                $('li[class=params-paramsList__item-appQw]').each((i, e) => {
                    const style = $(e).find('style').remove()
                     li += $(e).text()
                })
                $('.style-price-value-main-TIg6u').each((i, e) => {
                     price += $(e).find('span').attr('content')
                })
                $('.style-item-address__string-wt61A').each((i, e) => {
                     location += $(e).text()
                })
                console.log(data)
                return data
            }).catch((e) => console.log('error'))
        res.json(response)
}

