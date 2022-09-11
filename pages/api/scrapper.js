const cheerio = require('cheerio');
const axios = require('axios')
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default function handler(req,res) {
       const result = axios.get('https://www.avito.ru/sverdlova/kvartiry/1-k._kvartira_406m_69et._2545899306')
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
            }).catch(err => console.log(err));
        res.json(result)
}

console.log('http request end...')