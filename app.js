const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee")
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var newemployees = [];
function startApp() {

    // generateHTML();
    addteamMember();
}
const Questions = [
    {
        type: "input",
        name: "name",
        message: "What's your team member first and last name?",
    },
    {
        type: "input",
        name: "id",
        message: "Enter your team member id:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your team member email address:"
    },
    {
        type: "list",
        name: "role",
        message: "Select your team member role:",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ]
    }]
function addteamMember() {
    inquirer.prompt(Questions)
        .then(function ({ name, id, email, role }) {
            let getRole = "";
            if (role === "Manager") {
                getRole = "Enter office phone Numbers";
            } else if (role === "Engineer") {
                getRole = "Github username";
            } else {
                roleInfo = "School name"
            }
            inquirer.prompt([{
                type: "input",
                name: "getRole",
                message: `Enter your team member ${getRole}:`,
            }, {
                type: "list",
                name: "addmoreMembers",
                message: "Would you like to add more team members?",
                choices: [
                    "yes",
                    "no",
                ],
            }])
                .then(function ({ getRole, addmoreMembers }) {
                    let newMember;
                    if (role === "Manager") {
                        newMember = new Manager(name, id, email, getRole);
                    } else if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, getRole);
                    } else {
                        newMember = new Intern(name, id, email, getRole);
                    }
                    newemployees.push(newMember);
                    // addtoHTML(newMember)
                    // .then(function () {

                    if (addmoreMembers === "yes") {
                        addteamMember();
                    } else {
                        writeHTML();

                        // render(newemployees);

                    }
                });

        });
}

function writeHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)

    }
    fs.writeFileSync(outputPath, render(newemployees), "utf-8")
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    //     console.log("start");
    // }
}
startApp();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
