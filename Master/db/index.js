const mysql = require('mysql');
const util = require('util')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sqlsql',
    database: 'employees'
})


connection.connect(err=>{
    if(err){
        console.log(err)
    }
})

connection.query = util.promisify(connection.query)

module.exports = {
    findAllEmployees: function(){
        return connection.query('SELECT * FROM employee')
    },
    findAllDepartments: function(){
        return connection.query('SELECT * FROM department')
    },
    findAllRoles: function(){
        return connection.query('SELECT * FROM role')
    },
    createRole: function(role){
        return connection.query('INSERT INTO role SET ? ', role)
    },
    createEmployee: function(employee){
        return connection.query('INSERT INTO employee SET ?', employee)

    },
    createDepartment: function(department){
        return connection.query('INSERT INTO department SET ?', department)
    },
    findAllEmployeesByDepartment: function(id){
        return connection.query(`SELECT employee.id, employee.first_name, employee.last_name, 
        role.title FROM employee LEFT JOIN role on employee.role_id = role.id WHERE 
        role.department_id = ?`, id)
    },

    findAllEmployeesByManager: function(managerId){
        return connection.query(`SELECT * FROM employee WHERE manager_id = ?`, managerId)

    },

    findAllPossibleManagers: function(employeeId){
        return connection.query('SELECT * FROM managers', employeeId)
    },
    removeEmployee: function(employee){
        return connection.query('DELETE FROM employee WHERE id = ?', employee)
    },
    
    updateEmployeeRole(employeeId, roleId){
        return connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [employeeId, roleId])
    }
}