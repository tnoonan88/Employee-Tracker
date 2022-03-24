INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Accounting"),
       ("Legal"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 8320.00, 001), --1
       ("Sales Manager", 140000.00, 001), --2
       ("Software Architect", 160000.00, 002), --3
       ("Senior Engineer", 120000.00, 002), --4
       ("Junior Engineer", 90000.00, 002), --5
       ("Chief Financial Officer", 250000.00, 003), --6
       ("Accountant", 95000.00, 003), --7
       ("Head of Legal", 250000.00, 004), --8
       ("Attorney", 175000.00, 004), --9
       ("CEO", 350000.00, 005); --10

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 002, 010),
       ("Jim", "Bo", 001, 002),
       ("Tom", "Noonan", 003, 010),
       ("Kait", "Witnach", 004, 003),
       ("David", "Blane", 005, 003),
       ("Stevie", "Nicks", 006, 010),
       ("Montell", "Williams", 007, 006),
       ("Bilbo", "Baggins", 008, 010),
       ("Dante", "James", 009, 008),
       ("Henry", "Bop", 010, null);

