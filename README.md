# Backend Files Application
---
:rocket: Go to the deployed app: [![Deployed](https://img.shields.io/badge/Deployed-Live-green.svg)](https://server-cube-app-production.up.railway.app/files/data)


This is the backend side of Files Web Application.

## Config-environment
Thecnologies used to build and run this project.

- Node.js v14
- Express.js
- Mocha + Chai (Unit test)

## Getting Started

If you like to run this amazing app in you local machine. These are the steps you should follow:
### Prerequisites
In order to execute the project, it is necessary Node.js v14.

```sh
brew install nvm
nvm install v14.4.0
nvm use v14.0.0
```

## Installation
Perfect! Let's clone the repo, and install the dependencies of the project.

1. Clone the repo
    ```sh
    git clone git@github.com:LilianaRestrepoTorres/server-cube-app.git
    ```
2. Install NPM packages
    ```sh
    npm install 
    ```
3. Run the project
    ```sh
    npm start
    ```
4. Run the test
    ```sh
    npm test
    ```

## Endpoints Created

1. List of files 
    ```sh
    http://${host}/files/list
    ```
2. Formatted files data
    ```sh
    http://${host}/files/data
    ```
3. Specific formatted file data
    ```sh
    http://${host}/files/data?fileName=${fileName}
    ```
   
 
 ## Preview
 
 1. List of files 
<img width="854" alt="filesListEndpoint" src="https://user-images.githubusercontent.com/17114826/236246028-c5a5ecf8-969e-44c8-90ca-39d966f0818c.png">


2. Formatted files data


https://user-images.githubusercontent.com/17114826/236245849-20339c1f-023d-4e47-bdb9-bfb4464f2e37.mov


3. Specific formatted file data (By query params)



https://user-images.githubusercontent.com/17114826/236245915-6218caa3-5049-4a2f-949d-75e6a5b57562.mov



4. Unit Test

<img width="654" alt="server-test" src="https://user-images.githubusercontent.com/17114826/236245800-d16d7e88-1089-4f14-9c28-dd05619be8ec.png">



---
 This project was built with 💚 by me.
