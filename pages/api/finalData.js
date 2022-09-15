import NextCors from 'nextjs-cors';
const axios = require('axios')
import Cors from 'cors'
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
})
export default async function handler(req, res) {
    function runMiddleware(
        req,
        res,
        fn,
    ) {
        return new Promise((resolve, reject) => {
            fn(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result)
                }

                return resolve(result)
            })
        })
    }

    await runMiddleware(req, res, cors)

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