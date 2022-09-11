const cheerio = require('cheerio');
const axios = require('axios')
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default function handler(req,res) {
    try {
        const result = axios.get('https://www.avito.ru/sverdlova/kvartiry/1-k._kvartira_406m_69et._2545899306')
            .then(res => {
                const obj = []
                const $ = cheerio.load(res.data);
                $('.title-info-title-text').each((i, e) => {
                    const test = $(e).text();
                    obj.push(test)
                })
                $('li[class=params-paramsList__item-appQw]').each((i, e) => {
                    const style = $(e).find('style').remove()
                    const text = $(e).text()
                    obj.push(text)
                })
                $('.style-price-value-main-TIg6u').each((i, e) => {
                    const price = $(e).find('span').attr('content')
                    obj.push(price)
                })
                $('.style-item-address__string-wt61A').each((i, e) => {
                    const location = $(e).text()
                    obj.push(location)
                })
                console.log(obj)
                return obj
            }).catch(err => console.log(err));
        res.json(result)
    }catch (e){
        console.log(e)
    }
}

console.log('http request end...')