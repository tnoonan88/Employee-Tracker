const inquirer =  require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const res = require('express/lib/response');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employees_db'
},
console.log('You are now connected to the Employee Database.')
);

db.connect((err) => {
    if (err) throw err;
    startApp();
});

function startApp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'startMenu',
            choices:
            [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an existing employee role'
            ],
        },
    ])
    .then((response) => {
        if (response.startMenu === 'View all departments'){
            viewAllDepts();
        }
        else if (response.startMenu === 'View all roles'){
            viewAllRoles();
        }
        else if (response.startMenu === 'View all employees'){
            viewAllEmps();
        }
        else if (response.startMenu === 'Add a department'){
            addDept();
        }
        else if (response.startMenu === 'Add a role'){
            addRole();
        }
        else if (response.startMenu === 'Add an employee'){
            addEmp();
        }
        else {
            updateEmpRole()
        }
        // console.log(response);
    });
};

function viewAllDepts() {
    db.query(
        'SELECT * FROM department',
        function(err, results) {
            console.table(results);
            if (err) throw err;
            startApp();
        })
};

function viewAllRoles() {
    db.query(
        'SELECT * FROM role',
        function(err, results) {
            console.table(results);
            if (err) throw err;
            startApp();
        })
};

function viewAllEmps() {
    db.query(
        'SELECT * FROM employee',
        function(err, results) {
            console.table(results);
            if (err) throw err;
            startApp();
        })
};

function addDept() {
    inquirer.prompt([ 
        {
            type: 'input',
            name: 'deptName',
            message: 'Enter a department name:'
        }
    ])

    .then((response) => {
    db.query(
        `INSERT INTO department (name) VALUES (?)`,
        response.deptName,
        function(err, results) {
            console.table('New department added.');
            if (err) throw err;
            startApp();
        })
    })
};

function addRole() {
    db.query(
        'SELECT * FROM department',
        function(err, results) {
            const dept = results.map(dept => {
                return {name: dept.name, value: dept.id}
                });
                if (err) throw err;
                inquirer.prompt([ 
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Choose a department:',
                        choices: dept
                    },
                    {
                        type: 'input',
                        name: 'title',
                        message: 'New role name:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'New role salary:'
                    }
                ])
                .then((response) => {
                    db.query(
                        `INSERT INTO role SET ?`,
                        response,
                        function(err, results) {
                            console.table('New role added.');
                            if (err) throw err;
                            startApp();
                        })
                    })
})};

function addEmp() {
    db.query(
        'SELECT * FROM role',
        function(err, results) {
            const role = results.map(role => {
                return {name: role.title, value: role.id}
                });
                if (err) throw err;
    db.query(
        'SELECT * FROM employee WHERE manager_id IS NULL',
        function(err, results) {
            const manager = results.map(manager => {
                return {name: manager.first_name+' '+manager.last_name, value: manager.id}
                });
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'New employees first name:'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'New employees last name:'
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Assign a role:',
                        choices: role
                    },
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Assign a manager:',
                        choices: manager
                    }
                ])
                .then((response) => {
                    db.query(
                        `INSERT INTO employee SET ?`,
                        response,
                        function(err, results) {
                            console.table('New employee added.');
                            if (err) throw err;
                            startApp();
                        })
                    })
})})};

function updateEmpRole() {
    db.query(
        'SELECT * FROM role',
        function(err, results) {
            const role = results.map(role => {
                return {name: role.title, value: role.id}
                });
                if (err) throw err;
    db.query(
        'SELECT * FROM employee',
        function(err, results) {
            const employee = results.map(employee => {
                return {name: employee.first_name+' '+employee.last_name, value: employee.id}
                });
                if (err) throw err;
    db.query(
        'SELECT * FROM employee WHERE manager_id IS NULL',
        function(err, results) {
            const manager = results.map(manager => {
                return {name: manager.first_name+' '+manager.last_name, value: manager.id}
                });
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: 'Select an employee to update:',
                        choices: employee
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Please assign a new role:',
                        choices: role
                    },
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Please assign a manager:',
                        choices: manager
                    }
                ])
                .then((response) => {
                    console.log(response)
                    db.query(
                        `UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?`,
                        [response.role_id, response.manager_id, response.id],
                        function(err, results) {
                            console.table('Role successfully updated.');
                            if (err) throw err;
                            startApp()
                        })
                    })
})})})};