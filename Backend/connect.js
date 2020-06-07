// Create sqlite database and make connection to it
var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "database/database.sqlite"

// open database and try to connect to it
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')

        // manage processes table
        db.run(`CREATE TABLE processes (
            id INT NOT NULL PRIMARY KEY, 
            name VARCHAR(255), 
            description TEXT, 
            periodicity VARCHAR(255)
        )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = "INSERT INTO processes (id, name, description, periodicity) VALUES (?,?,?,?)"
                db.run(insert, [1, 'Process 1', 'Description for Process 1', 'Periodicity for Process 1'])
                db.run(insert, [2, 'Process 2', 'Description for Process 2', 'Periodicity for Process 2'])
                db.run(insert, [3, 'Process 3', 'Description for Process 3', 'Periodicity for Process 3'])
            }
        });  

        // manage proces executions table
        db.run(`CREATE TABLE processExecutions (
            id INT NOT NULL PRIMARY KEY, 
            processId INT,
            finalStateId INT,
            executionDate DATETIME,
            FOREIGN KEY(processId) REFERENCES processes(id),
            FOREIGN KEY(finalStateId) REFERENCES finalStates(id)
        )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = "INSERT INTO processExecutions (id, processId, finalStateId, executionDate) VALUES (?,?,?,?)"
                db.run(insert, [1, 1, 1, '2020-06-07 16:09:25'])
                db.run(insert, [2, 2, 2, '2020-06-07 16:11:21'])
                db.run(insert, [3, 3, 3, '2020-06-07 16:16:59'])
            }
        });  

        // manage final states table
        db.run(`CREATE TABLE finalStates (
            id INT NOT NULL PRIMARY KEY, 
            finalState VARCHAR(255)
        )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = "INSERT INTO finalStates (id, finalState) VALUES (?, ?)"
                db.run(insert, [1, 'Completed'])
                db.run(insert, [2, 'Completed with Error'])
                db.run(insert, [3, 'Not Started'])
            }
        });  

    }
});


module.exports = db