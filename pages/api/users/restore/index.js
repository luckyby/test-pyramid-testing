const UserRestore =  async (req, res) => {
    const method = req.method;

    switch (method) {
        case "POST":
            try {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const reqBody = req.body
                // console.log('reqBody in POST RESTORE = ', reqBody)
                const rawBody = JSON.stringify(reqBody)
                let requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: rawBody,
                    redirect: 'follow'
                };

                const response = await fetch("http://localhost:3010/api/db/person/restore", requestOptions)
                const responseJson = await response.json()
                // console.log('responseJson = ', responseJson)
                res.status(200).json(responseJson)

            } catch (error) {
                console.log('error in POST in UserRestore:', error.message)
                return res.status(400).json({
                    success: false,
                });
            }
            break
        default:
            res.setHeader("Allow", ["GET", "POST", "DELETE"]);
            return res
                .status(405)
                .json({ success: false, "mesage": `Method ${method} Not Allowed` })
    }
}

export default UserRestore