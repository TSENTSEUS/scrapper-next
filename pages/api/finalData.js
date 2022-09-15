import NextCors from 'nextjs-cors';
const axios = require('axios')

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        host:"https://scrapper-next.herokuapp.com",
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const result = await axios({
        method:"post",
        url:"/api/scrapper",
        data:{
            url:req.body.url,
        },
    }).then(res => {
        return console.log('res is', res)
    }).catch(e => {
        console.log(e.message)
    })
    console.log('req body is :',req.body.url)
    // Rest of the API logic
    res.json(result);
}