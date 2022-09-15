import NextCors from 'nextjs-cors';
const axios = require('axios')
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {



    const result = await axios({
        method:"post",
        url:"https://scrapper-next.herokuapp.com/api/scrapper",
        data:{
            url:req.body.url,
        },
    }).then(res => {
        return res
    }).catch(e => {
        console.log(e.message)
    })
    // Rest of the API logic
    console.log(result.data)
    res.send(result.data);
}