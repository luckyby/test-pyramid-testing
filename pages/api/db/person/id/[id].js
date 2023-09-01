import { dbOpenConnection, dbDeleteAllData, dbReadAllData, dbCloseConnection } from "../../../../../lib/handlers";

const sqlite3 = require('sqlite3').verbose()

const PersonById = async (req, res) => {
    const id = req.query.id;
    const method = req.method;

    let db = await dbOpenConnection(sqlite3)

    const sqlGetById = `SELECT id, firstname, lastname, role FROM person WHERE id = ${id}`
    let row = await dbReadAllData(db, sqlGetById)
    // console.log('row before start PersonBy id = ', row)
    // console.log('row.length = ', row.length )
    if(row.length === 0){
        // console.log('in if after read all in start')
        return res.status(422).json({
            "success": false,
            "message:":`Does not exist row with the id=${id} in table 'person'`,
            "data": null
        });
    }
    // console.log('before switch')
    switch (method) {
        case "GET":
            await dbCloseConnection(db)

            return res
                    .setHeader('Content-Type', 'application/json')
                    .status(200)
                    .json({
                        "success": "true",
                        "message": "data read by id in table 'person'",
                        "data": [{
                            "id": `${id}`,
                            "firstname": `${row[0].firstname}`,
                            "lastname": `${row[0].lastname}`,
                            "role": `${row[0].role}`
                            }]
                    })
        case "PUT":
            try {
                let data = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    role: req.body.role
                };

                const dataStringify = JSON.stringify(data.firstname + data.lastname + data.role)
                let buff = new Buffer(dataStringify);
                let base64data = buff.toString('base64');

                let sqlPutById =  `UPDATE person
                            SET firstname="${data.firstname}",
                                lastname ="${data.lastname}",
                                role     ="${data.role}",
                                code     ="${base64data}"
                            WHERE id=${id}`

                try {
                    await new Promise((resolve, reject) => {
                        db.run(sqlPutById, function (err) {
                            if (err) {
                                return res.status(400).json({ error: err.message });
                            }else {
                                resolve();
                            }
                        });
                    });
                }catch (e) {
                    console.log('error:', e.message)
                }

                const sqlReadById = `SELECT id, firstname, lastname, role FROM person WHERE id = ${id};`
                let row = await dbReadAllData(db, sqlReadById)

                await dbCloseConnection(db)

                return row?
                        res
                            .status(200)
                            .json({
                                "secsess": true,
                                "message": "data updated by id in table 'person'",
                                "data": [
                                    {
                                        "id": `${id}`,
                                        "firstname": `${row[0].firstname}`,
                                        "lastname": `${row[0].lastname}`,
                                        "role": `${row[0].role}`
                                    }
                                ]
                            })
                        : res
                            .json({
                                "message":`Row(s) updated: ${this.changes}. No person with the id ${id}`
                            });
            }catch (error) {
                return res.status(400).json({
                    "error": error.message,
                    success: false,
                });
            }
        case "DELETE":
            // console.log('row in personById = ', row)
            const sqlDeleteById = `DELETE FROM person WHERE id=${id};`
            try {
                await dbDeleteAllData(db, sqlDeleteById)
            }catch (e) {
                console.log('error in dbDeleteAllData in delete by id', e)
            }


            const sqlGetById = `SELECT id, firstname, lastname, role FROM person WHERE id = ${id}`
            const row = await dbReadAllData(db, sqlGetById)
            try {
                await dbCloseConnection(db)
            }catch (e) {
                console.log('error in dbReadAllData in delete by id', e)
            }

            if(row.length === 0){
                return  res.status(200).json({
                    "success": true,
                    "message": `data deleted by id=${id} in table 'person'`,
                    "data": row

                })
            }

            return res.json({
                "success": false,
                "message": `data not deleted by id=${id} in table 'person'`,
                "data": row
            })
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({
                    success: false,
                    "message": `Method ${method} Not Allowed in sqlite server API`,
                    "data": []
                })
    }
};

export default PersonById