import NextCors from "nextjs-cors";

const CorsMiddleware = (handler) => {
    return async(req, res) => {
            await NextCors(req, res, {
                // Options
                methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', "OPTIONS"],
                origin: '*',
                optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            })
        return handler(req,res)
    }
}

export default CorsMiddleware