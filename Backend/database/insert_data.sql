-- insert fake processes into db
INSERT INTO processes (id, name, description, periodicity)
VALUES (1, 'Process 1', 'Description for Process 1', 'Periodicity for Process 1'); 
INSERT INTO processes (id, name, description, periodicity)
VALUES (2, 'Process 2', 'Description for Process 2', 'Periodicity for Process 2'); 
INSERT INTO processes (id, name, description, periodicity)
VALUES (3, 'Process 3', 'Description for Process 3', 'Periodicity for Process 3'); 

-- insert fake execussions into db
INSERT INTO processExecutions (id, processId, finalState, executionDate)
VALUES (1, 1, 2, '2020-06-07 16:09:25'); 
INSERT INTO processExecutions (id, processId, finalState, executionDate)
VALUES (2, 3, 1, '2020-06-07 16:11:21'); 
INSERT INTO processExecutions (id, processId, finalState, executionDate)
VALUES (3, 2, 3, '2020-06-07 16:16:59'); 

-- insert fake states into db
INSERT INTO finalStates (id, value)
VALUES (1, 'Completed'); 
INSERT INTO finalStates (id, value)
VALUES (2, 'Completed with Error,'); 
INSERT INTO finalStates (id, value)
VALUES (3, 'Not Started'); 