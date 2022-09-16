// pages/api/[...all].ts
import {NextApiRequest, NextApiResponse} from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
    api: {
        // Enable `externalResolver` option in Next.js
        externalResolver: true,
    },
}

export default (req: NextApiRequest, res: NextApiResponse) => (

        httpProxyMiddleware(req, res, {
            // You can use the `http-proxy` option
            target: 'https://www.avito.ru/sankt-peterburg_kolpino/kvartiry/1-k._kvartira_36m_79et._2522049756',
            // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
            pathRewrite: {
                '^/api/scrapper':'https://google.com/'
            },
        })
);