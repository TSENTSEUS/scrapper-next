const cheerio = require('cheerio');
const axios = require('axios')
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req,res) {
    try {
        const result = await axios.get(req.body.url)
            .then(res => {
                const about = []
                const obj = {}
                const list = []
                const $ = cheerio.load(res.data);
                $('.title-info-title-text').each((i, e) => {
                    const test = $(e).text();
                    list.push(obj['title'] = test)
                })
                $('li[class=params-paramsList__item-appQw]').each((i, e) => {
                    const style = $(e).find('style').remove()
                    const text = $(e).text()
                    about.push(text)
                    obj['description'] = about
                })
                $('.style-price-value-main-TIg6u').each((i, e) => {
                    const price = $(e).text()
                    list.push(obj['price'] = price)
                })
                $('.style-item-address__string-wt61A').each((i, e) => {
                    const location = $(e).text()
                    list.push(obj['location'] = location)
                })
                console.log(list)
                return list
            }).catch(err => console.log(err));
        res.json(result)
    }catch (e){
        console.log(e)
    }
}

