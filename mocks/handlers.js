import { rest } from "msw";
import * as path from "path";
import * as fs from "fs";
import {urlQueryToSearchParams} from "next/dist/shared/lib/router/utils/querystring";
// import fsPromise from "fs/promises";

export const handlers = [
  rest.get("http://localhost:3010/api/users/id/3", (req, res, context) => {
    return res(
      context.status(200),
      context.json({
        id: "3",
          firstname: "Quinto",
          lastname: "Edwards",
          role: "Lead Team Planner",
      })
    );
  }),
  rest.get(
    // "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange",
    async (req, res, context) => {

        // const reqUrlhost= req.url.host
        // console.log('rreqUrlhost',reqUrlhost)
        // const reqUrlpathname = req.url.pathname
        // console.log('reqUrlpathname',reqUrlpathname)
        // const reqUrlsearchParamsTostring = req.url.searchParams.toString()
        // console.log('reqUrlsearchParamsTostring:',reqUrlsearchParamsTostring)
        // const reqUrlSearchParamsGet =  req.url.searchParams.get('json')
        // console.log('reqUrlSearchParamsGet = ', reqUrlSearchParamsGet)

        const searchParamsByNameJson =  req.url.searchParams.get('json')

        async function getData ( ) {
            const fsPromise = require('fs/promises');
            try {
                const data = await fsPromise.readFile('./pages/exchange.json');
                // console.log('data:', data)
                return JSON.parse(data.toString())
            } catch (err) {
                console.log(err)
            }
        }

        let jsonData
        if(searchParamsByNameJson === ''){
            jsonData = await getData()
            console.log('in JSON format')
            return res(
                context.status(200),
                context.json(
                    jsonData
                )
            );
        }else{
            console.log('error in requset')
            return res(
                context.status(400),
                context.json(
                    {'error': 'search param is not json'}
                )
            );
        }
        // console.log('returned json from handler', jsonData)
    }
  ),
];
