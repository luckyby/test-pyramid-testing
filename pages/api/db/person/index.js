import {
    dbCloseConnection,
    dbCreateOnePerson, dbCreateTable,
    dbDropTable,
    dbOpenConnection,
    dbReadAllData
} from "../../../../lib/handlers";

const sqlite3 = require("sqlite3").verbose();

const Person = async (req, res) => {

    const method = req.method;
    switch (method) {
        case "GET":
            try {
                let db = await dbOpenConnection(sqlite3)

                const sqlReadAllPersons = "SELECT id, firstname, lastname, role FROM person";
                let data= await dbReadAllData(db, sqlReadAllPersons)

                await dbCloseConnection(db)
                if(data.length === 0){
                    data = [{"success": "true", "message": "table 'person' is empty", "data": [null]}]
                }
                return data
                    ? res.status(200).json({"success": "true", "message": "all data in table 'person'", "data": data})
                    : res.end(`Database don't return any data`);

            }catch (e) {
                return res.status(400).json({
                    success: false,
                });
            }
        case "POST":
            try {
                let db = await dbOpenConnection(sqlite3)

                let data = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    role: req.body.role
                };

                let dataStringify = JSON.stringify(data.firstname + data.lastname + data.role)
                let buff = new Buffer(dataStringify);
                let base64data = buff.toString('base64');
                const sqlGetBycode = `SELECT id, firstname, lastname, role FROM person WHERE code = "${base64data}";`
                // console.log('sqlGetBycode = ', sqlGetBycode)
                let row
                try {console.log('sqlGetBycode before row = ', sqlGetBycode)
                    row = await dbReadAllData(db, sqlGetBycode)
                    // console.log('row in post in person/index', row)
                }catch (e) {
                    console.error(e)
                }
                if(row.length === 0){
                    const sqlCreateOnePerson = `INSERT 
                            INTO person (firstname, lastname, role, code) 
                            VALUES ("${data.firstname}","${data.lastname}","${data.role}", "${base64data}");`;
                    // console.log('sqlCreateOnePerson = ', sqlCreateOnePerson)
                    const createdPersonInfo = await dbCreateOnePerson(db, sqlCreateOnePerson)

                    let sqlReadPersonByCode = `SELECT 
                            id, 
                            firstname, 
                            lastname, 
                            role 
                       FROM person 
                       WHERE code="${base64data}"`;
                    let createdPerson = await dbReadAllData(db, sqlReadPersonByCode)
                    // console.log('createdPerson = ', createdPerson)

                    await dbCloseConnection(db)

                    return res.status(200).json(
                        {
                            "success": true,
                            "message": "in table 'person'was created row with data",
                            "data": createdPerson
                        }
                    )
                }

                let dataReaded = {
                    firstname: row[0].firstname,
                    lastname: row[0].lastname,
                    role: row[0].role
                }
                dataStringify = JSON.stringify(dataReaded.firstname + dataReaded.lastname + dataReaded.role)
                buff = new Buffer(dataStringify);
                let base64dataReaded = buff.toString('base64');
                // console.log('base64dataReaded = ', base64dataReaded)
                if(base64data === base64dataReaded){
                    return res.status(422).json(
                        {
                            "success": false,
                            "message": `person with this data already exists`,
                            "data": {
                                "id": row[0].id,
                                "firstname": row[0].firstname,
                                "lastname": row[0].lastname,
                                "role": row[0].role
                            }
                        }
                    )
                }



            }catch (e) {
                return res.status(400).json({
                    "success": false,
                    "message": "error after try post one person",
                    "data": null
                });
            }
            break
        case "DELETE":
            try {
                let db = await dbOpenConnection(sqlite3)

                const sqlDropTable= "DROP TABLE IF EXISTS person"
                await dbDropTable(db, sqlDropTable)

                const sqlCreateTable = "CREATE TABLE " +
                                    "IF NOT EXISTS " +
                    "                               person (" +
                    "                                       id INTEGER PRIMARY KEY, " +
                    "                                       firstname TEXT, " +
                    "                                       lastname TEXT, " +
                    "                                       role TEXT, " +
                    "                                       code TEXT UNIQUE)"
                await dbCreateTable(db, sqlCreateTable)

                await dbCloseConnection(db)

                return res
                    ? res.status(200).json({
                        "success": true,
                        "message": "all rows deleted in table 'person'",
                        "data": []
                    })
                    : res.end(`No person with the lastname ${lastname}`);
            } catch (error) {
                return res.status(400).json({
                    "success": false,
                    "message": "cann't delete all rows in table 'person'",
                    "data": null
                });
            }
        default:
            res.setHeader("Allow", ["GET", "POST", "DELETE"]);
            return res
                .status(405)
                .json({
                    "success": false,
                    "message": `Method ${method} not allowed in sqlite server API`,
                    "data": []
                })
                // .end(`Method ${method} Not Allowed`);
    }
}

export default Person
