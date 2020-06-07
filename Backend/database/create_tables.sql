-- drop all tables if already exists
DROP TABLE processes;
DROP TABLE processExecutions;
DROP TABLE finalStates;

-- create processes table
CREATE TABLE IF NOT EXISTS processes (
	id INT NOT NULL PRIMARY KEY, 
	name VARCHAR(255), 
	description TEXT, 
	periodicity VARCHAR(255)
);

-- create process executions table
CREATE TABLE IF NOT EXISTS processExecutions (
	id INT NOT NULL PRIMARY KEY, 
	processId INT,
	finalState INT,
	executionDate DATETIME,
	FOREIGN KEY(processId) REFERENCES processes(id),
	FOREIGN KEY(finalState) REFERENCES finalStates(id)
);

-- create states value table
CREATE TABLE IF NOT EXISTS finalStates (
	id INT NOT NULL PRIMARY KEY, 
	value VARCHAR(255)
);