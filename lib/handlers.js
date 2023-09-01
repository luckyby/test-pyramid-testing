export let dbOpenConnection = async (sqlite3)=> {
    return await new Promise((resolve, reject)=>{
        let db = new sqlite3.Database(
            './users.db',
            ( sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE ),
            (err) => {
                if (err) {
                    console.log('Oops...')
                    console.error(err.message);
                }
                resolve(db)
            }
        );
    })
}

export let dbDropTable = async (db, sql)=>{
    return await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            }
            resolve();
        });
    });
}

export let dbCreateTable = async (db, sql) => {
    return await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            }
            resolve();
        });
    });
}

export let dbRestoreTable = async (db, sql) => {
    return await new Promise((resolve, reject)=>{
        db.run(sql, function (err) {
            if(err){
                res.status(400).json({"error": err.message})
            }
            resolve()
        })
    })
}

export let dbReadAllData = async (db, sql)=>{
    // console.log('sql in dbReadAllData = ', sql)
    return await new Promise((resolve, reject)=>{
        db.all(sql, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            // console.log('row = ', row)
            resolve(row)
        })
    })
}

export const dbDeleteAllData = async (db, sql)=>{
    return                 await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                res.status(400).json({error: err.message});
            } else {
                // console.log('after DELETE before resolve')
                console.log(`Row(s) deleted: ${this.changes}`);
                const message = `Row(s) deleted: ${this.changes}`
                resolve(message);
            }
        });
    })
}

export const dbCloseConnection = async (db)=>{
    return await new Promise((resolve, reject)=>{
        db.close((err) => {
            if (err) {
                console.error(err.message);
                reject()
            }else {
                // console.log('Close the database connection.');
                resolve()
            }
        });
    })
}


export const dbRunSql = async (db, sql, message) => {
    return await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                return res.status(400).json({
                    'sql': sql,
                    error: err.message
                });
            }else{
                if(message!==''){
                    console.log(message)
                }
                resolve();
            }
        });
    });
}


export const dbCreateOnePerson = async (db, sql) => {
    return await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                // return console.log(err.message)
                if (
                    err.message ===
                    "SQLITE_CONSTRAINT: UNIQUE constraint failed: person.code"
                ) {
                    // return res.status(400).json({
                    //     error: `person ${data.firstname} ${data.lastname} with role ${data.role} already exists`,
                    // });
                    // console.log({"error": `person already exists` })
                    resolve({"error": `person already exists` })
                }
                return { error: err.message };
            }else{
                resolve();
            }
        });
    });
}

