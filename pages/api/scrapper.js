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
                const img = []
                const about = []
                const obj = {}
                const list = []
                list.push(obj['description'] = about)
                list.push(obj['images'] = img)
                const $ = cheerio.load(res.data);
                $('.title-info-title-text').each((i, e) => {
                    const test = $(e).text();
                    list.push(obj['title'] = test)
                })
                $('.images-preview-previewImageWrapper-RfThd img').each((i,e )=>{
                    const src = $(e).attr('src')
                    img.push(src)
                    console.log(src)
                })
                $('li[class=params-paramsList__item-appQw]').each((i, e) => {
                    const style = $(e).find('style').remove()
                    const text = $(e).text()
                    about.push(text)
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

