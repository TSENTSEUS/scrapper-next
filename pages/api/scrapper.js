const cheerio = require('cheerio');
const axios = require('axios')
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

import NextCors from 'nextjs-cors';

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}


async function handler(req,res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE',"OPTIONS"],
        origin: 'https://scrapper-next.herokuapp.com',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const result = await axios({
            method:"get",
            url:req.body.url,
        })
            .then(res => {
                const about = []
                const obj = {}
                const list = [obj]
                obj['description'] = about
                const $ = cheerio.load(res.data);
                $('.title-info-title-text').each((i, e) => {
                    const title = $(e).text();
                    obj['title'] = title
                })
                $('body > script:nth-child(5)').each((i,e) => {
                    const initialData = $(e).text()
                    console.log(initialData)
                    obj['initialData'] = initialData
                })
                $('li[class=params-paramsList__item-appQw]').each((i, e) => {
                    const style = $(e).find('style').remove()
                    const text = $(e).text()
                    about.push(text)
                })
                $('.style-price-value-main-TIg6u').each((i, e) => {
                    const price = $(e).text()
                  obj['price'] = price
                })
                $('.style-item-address__string-wt61A').each((i, e) => {
                    const location = $(e).text()
                   obj['location'] = location
                })
                console.log(list)
                return list
            }).catch(err => console.log(err));
         res.setHeader('Allow-Control-Allow-Methods', "OPTIONS")
         res.json(result)
}
export default handler

