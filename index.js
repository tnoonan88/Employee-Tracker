// const express = require('express');
const inquirer =  require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employees_db'
},
console.log('You are connected to the Employee Database.')
);

db.connect((err) => {
    if (err) 
    throw err;
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
        if (response.prompts === 'View all departments'){
            viewAllDepts();
        }
        else if (response.prompts === 'View all roles'){
            viewAllRoles();
        }
        else if (response.prompts === 'View all employees'){
            viewAllEmps();
        }
        else if (response.prompts === 'Add a department'){
            addDept();
        }
        else if (response.prompts === 'Add a role'){
            addRole();
        }
        else if (response.prompts === 'Add an employee'){
            addEmp();
        }
        else {
            updateEmpRole()
        }
        console.log(response);
    });
};

function viewAllDepts() {
    db.query(`SELECT * FROM department`)
        return console.table(response)
};