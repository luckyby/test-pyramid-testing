const Users = async (req, res) => {
    const method = req.method;
    const reqBody = req.body
    const reqUrl = req.url
    const url = `http://localhost:3010`;
    // const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_DB_SERVER;
    switch (method) {
        case "GET":
            // const url = `http://localhost:4003/api/person`;
            // console.log('url in process.env.NEXT_PUBLIC_BASE_URL_LOCAL_DB_SERVER', url)
            // console.log('url in reqUrl', reqUrl)
            const fetchUrl = url + "/api/db/person"
            // console.log('fetchUrl =', fetchUrl)
            let response
            try {
                response = await fetch(fetchUrl);
                // console.log('response = ',response )
                // console.log('response.headers = ',response.headers )
            } catch (error) {
                console.log('error in response in GET in Users:', error.message)
                return res.status(400).json({
                    success: false,
                    message: "error in response in GET in Users",
                    data: error.message
                });
            }
            let json
            try {
                json = await response.json();
                // console.log('json = ',json )
            }catch (error) {
                console.log('error in response.json() in GET in Users:', error.message)
                return res.status(400).json({
                    success: false,
                    message: "error in response.json() in GET in Users",
                    data: error.message
                });
            }


            res.status(200).json(json);


            break
        case "POST":
            try {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                let raw = JSON.stringify(reqBody);

                let requestOptions = {
                    method: method,
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                try {
                    const fetchRes = await fetch(url+"/api/db/person", requestOptions)
                    const resJson = await fetchRes.json()
                    res.status(200).json(resJson)
                }catch (error) {
                    console.log('error in fetch in POST in Users:', error.message)
                }

            } catch (error) {
                console.log('error in POST in Users:', error.message)
                return res.status(400).json({
                    success: false,
                });
            }
            break
        case "DELETE":
            try {

                let requestOptions = {
                    method: method,
                    redirect: 'follow'
                };
                // console.log('requestOptions =', requestOptions)
                try {
                    const fetchRes = await fetch(url+"/api/db/person", requestOptions)
                    const resJson = await fetchRes.json()
                    // console.log('resJson =', resJson)

                    res.status(200).json([resJson])
                }catch (error) {
                    console.log('error in fetch in DELETE in Users:', error.message)
                }

            } catch (error) {
                console.log('error in DELETE in Users:', error.message)
                return res.status(400).json({
                    success: false,
                });
            }
            break
        default:
            res.setHeader("Allow", ["GET", "POST", "DELETE"]);
            return res
                .status(405)
                .json({ success: false, "message": `Method ${method} Not Allowed` })
    }
}

export default Users