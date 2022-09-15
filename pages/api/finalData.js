import CorsMiddleware from "../../middlewares/NextCors";
const axios = require('axios')

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

const handler = async (req, res) => {
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

export default CorsMiddleware(handler)