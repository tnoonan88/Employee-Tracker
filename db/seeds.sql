INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Accounting"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 8320.00, 1), 
       ("Sales Manager", 140000.00, 1), 
       ("Software Architect", 160000.00, 2), 
       ("Senior Engineer", 120000.00, 2),
       ("Junior Engineer", 90000.00, 2),
       ("Chief Financial Officer", 250000.00, 3),
       ("Accountant", 95000.00, 3),
       ("Head of Legal", 250000.00, 4),
       ("Attorney", 175000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, NULL),
       ("Jim", "Bo", 1, 1),
       ("Tom", "Noonan", 3, NULL),
       ("Kait", "Witnach", 4, 3),
       ("David", "Blane", 5, 3),
       ("Stevie", "Nicks", 6, NULL),
       ("Montell", "Williams", 7, 6),
       ("Bilbo", "Baggins", 8, NULL),
       ("Dante", "Lingus", 9, 8);

