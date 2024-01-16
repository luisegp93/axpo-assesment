# AXPO Tech Assessment by Luis Eduardo Garcia Palomares

## How to Run Tests

The configuration files, "playwright.config.ts," and "package.json" are included in the repository, simplifying the setup of a local environment. To trigger the test cases, follow these steps:

(All of the following commands should be executed in a terminal)

Also as I note I would like to add that on my local environment this is running on node v14.19.2

- git clone https://github.com/luisegp93/axpo-assesment.git
- cd axpo-assesment
- npm install or npm i
- npx playwright install (Here you will be prompt to install all webdrivers, please do)
- npm test

The configuration is set to trigger tests in a headed mode for easy visualization.

## Reporting

The configuration also captures and records a video of the entire execution upon completion. These files are stored alongside an HTML report containing all executed functions during the test case. To view the report, use the following command after the test run:

- npx playwright show-report

## Personal Note

Firstly, thank you for taking the time to review my application. It was a fun challenge, and I greatly appreciate constructive feedback as there's always room for improvement. I'm eagerly looking forward to hearing back from you!
