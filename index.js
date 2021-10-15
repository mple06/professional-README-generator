const inquirer = require("inquirer");
const fs = require('fs');

function getLicense(license) {
    if ("MIT" === license) {
        return ("![Image of MIT License](https://img.shields.io/badge/License-MIT-blue.svg)");
    } else if ("BSD 2-Clause" === license) {
        return ("![Image of BSD 2-Clause License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)");
    } else if ("GPL" === license) {
        return ("![Image of GPL License](https://img.shields.io/badge/License-GPLv3-blue.svg)")
    }
}

function genMarkdown(ans) {
    return `
# ${ans.title}

## Description

${ans.description}

---

## Table of Contents (Optional)
- [Installation](#installation)
- [Usage](#usage)
- [How to Contribute](#contribute)
- [Tests](#tests)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

---

## Installation

${ans.installation}

---

## Usage

${ans.usage}

---

## Contribute

${ans.contribute}

---

## Tests

${ans.tests}

---

## Credits

${ans.credits}

---

## License

${ans.license} ${getLicense(ans.license)}

---

## Questions?

GitHub: https://www.github.com/${ans.github} \n

Reach me at ${ans.email}
    `
}

inquirer.prompt([
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title"
    },
    {
        type: "input",
        message: "Provide a short description explaining your project.\n Think of questions such as 'what was your motivation, why did you build this project, what did you learn, and what did you solve' as a guide.",
        name: "description"
    },
    {
        type: "input",
        message: "What steps are required to install your project? Provide a step-by-step guide of how to get the development environment running.",
        name: "installation"
    },
    {
        type: "input",
        message: "Provide instructions and examples for use. Include screenshots and images as needed by adding them to a new folder.",
        name: "usage"
    },
    {
        type: "input",
        message: "List your collaborators with links to their GitHub profiles, if any.\n Also include any third-party assets or creators with links to their primary web presence in this section, if any.",
        name: "credits"
    },
    {
        type: "list",
        message: "The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).",
        name: "license",
        choices: ["BSD 2-Clause", "MIT", "GPL"]
    },
    {
        type: "input",
        message: "If you created an application or package and would like other developers to contribute it, you can include guidelines on how to do so.",
        name: "contribute"
    },
    {
        type: "input",
        message: "Go the extra mile and write tests for your application. Then provide examples on how to run them here.",
        name: "tests"
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "github"
    },
    {
        type: "input",
        message: "Enter your Email address.",
        name: "email"
    },


]).then(ans => {
    console.log(ans)
    fs.writeFile('README.md', genMarkdown(ans), function (err) {
        if (err) throw err;
        console.log("Success!")
    })
})

