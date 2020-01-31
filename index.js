var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "tracker_db"

});

connection.connect(function(err) {
  if (err) throw err;
  
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments, roles, employees",
        "View departments, roles, employees",
        "Update employee roles" 
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add departments, roles, employees":
        addToTable();
        break;

      case "View departments, roles, employees":
        viewTable();
        break;

      case "Update employee roles":
        updateRoles();
        break;
      }
    });
}

function addToTable() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Which table would you like to add to?",
      choices: [
          "department",
          "roles",
          "employee"
      ]
    })
    .then (function(answer) {
        switch (answer.action) {
        case "department":
         upDepart();
         break;

         case "roles":
             upRoles();
             break;
            
         case "employee":
             upEmploy();
             break;
        }
    });
}

function viewTable() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "Which table would you like to view?",
        choices: [
            "department",
            "roles",
            "employee"
        ]
      })
      .then (function(answer) {
          switch (answer.action) {
          case "department":
           viewDepart();
           break;
  
           case "roles":
               viewRoles();
               break;
              
           case "employee":
               viewEmploy();
               break;
          }
      });
    }

function updateRoles() {
    console.log("Updating all Employee Roles...\n");
        var query = connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.role_id
            },
            {
              role_id: answer.role_id
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role updated!\n");
    
          }
        );
    
        console.log(query.sql);
      }


function upDepart() {
    inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department?"
      }
    ])
    .then(function(answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {name: answer.name},
    function(err) {
      if (err) throw err;
      console.log("Created successfully!");
            }
        );
    });
}

function upRoles() {
    inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message:"title: "
      },
      {
          name: "name",
          type:"input",
          message:"salary: "
      },
      {
          name:"name",
          type:"input",
          message:"department_id: "
      }
    ])
    .then(function(data) {
        connection.query(
        "INSERT INTO roles SET ?",
        {
         title: data.title,
         salary: data.salary,
         department_id: data.department_id
        },
        function(err) {
            if(err) throw err;
        console.log("Created successfully!");
        }
     );
    runSearch();
  });
}

function upEmploy() {
    inquirer 
    .prompt([
        {
            name:"name",
            type:"input",
            message:"firstname: "
        },
        {
            name:"name",
            type:"input",
            message:" lastname"
        },
        {
            name:"name",
            type:"input",
            message:"roleId"
        },
        {
            name:"name",
            type:"input",
            message:"manager_id"
        }
    ])
    .then(function(res) {
        connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: res.role_id,
            manager_id: res.manager_id
        },
        function(err) {
            if(err) throw err;
        console.log("Created successfully!");
        }
     );
        runSearch();
  });
}

function viewDepart() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }

  function viewRoles() {
    console.log("Selecting all role...\n");
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }

  function viewEmploy() {
    console.log("Selecting all employee...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });  
  }