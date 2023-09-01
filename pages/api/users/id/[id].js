import {response} from "msw";

const UserById = async (req, res) => {
    const { id } = req.query
    const method = req.method;
    // const hostDbServer = process.env.HOST_DB_SERVER || "localhost"
    const hostDbServer = "localhost"
    // const portDbServer = process.env.PORT_DB_SERVER || "4003"
    const portDbServer = "3010"
    switch (method) {
        case "GET":
            try {

                const url = `http://${hostDbServer}:${portDbServer}/api/db/person/id/${id}`;
                let requestOptions = {
                    method: method,
                    redirect: 'follow'
                };

                const response = await fetch(url, requestOptions);
                const responceJson = await response.json();

                res.status(200).json(responceJson)
            } catch (error) {
                console.log('error in GET by id:', error )
            }
            break
        case "PUT":
            try {
                const url = `http://${hostDbServer}:${portDbServer}/api/db/person/id/${id}`;
                const reqBody = req.body

                let myHeaders = new Headers();
                myHeaders.append("Content-Type", 'application/json');

                let raw = JSON.stringify(reqBody);

                let requestOptions = {
                    method: method,
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                try {
                    const fetchRes = await fetch(url, requestOptions)
                    const resJson = await fetchRes.json()
                    res.status(200).json([resJson])
                }catch (error) {
                    console.log('error in fetch in PATCH in Users by id:', error)
                }
            } catch (error) {
                console.log('error in PATCH by id:', error )
            }
            break
        case "DELETE":
            try {
                const url = `http://${hostDbServer}:${portDbServer}/api/db/person/id/${id}`;

                let requestOptions = {
                    method: method,
                    redirect: 'follow'
                };

                try {
                    const fetchRes = await fetch(url, requestOptions)
                    const resJson = await fetchRes.json()

                    res.status(200).json([resJson])
                }catch (error) {
                    console.log('error in fetch in DELETE by id:', error)
                    return res.status(400).json({
                        success: false,
                    });
                }

            } catch (error) {
                console.log('error in DELETE by id:', error.message)
            }
            break
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({ success: false, "message": `Method ${method} Not Allowed in Users by id` })
    }
}

export default UserById