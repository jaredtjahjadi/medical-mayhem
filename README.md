# Medical Mayhem

**Medical Mayhem** is an in-development multiplayer 2D top-down game.

You are a recent hire at a hospital, and have to make it through a hectic work day with a constant stream of patients flooding in. You may or may not team up with other employees to diagnose and treat patients in a timely manner.

Your objective is to diagnose and treat all patients that come into the hospital during your busy work day. When patients are brought in, you will have to bring them to a hospital bed, diagnose what is wrong with them, then give them the correct treatment. If you and your fellow doctors cannot save enough patients, your hospital will get shut down!

## Setup

### Prerequisities

- Node.js and npm (npm comes with Node.js)
- [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/)

### Instructions

1. In a terminal, run MongoDB Community Edition.
```shell
# Windows
$ "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="c:\data\db"

# Mac
$ brew services start mongodb-community@7.0
```

2. In another terminal, clone this repository:
```shell
$ git clone https://github.com/Isabella-Misanes/Medical-Mayhem.git
```

3. Navigate to this repository in the terminal.
```shell
$ cd medical-mayhem
```

4. Install dependencies in the root, client, and server folders using npm.
```shell
$ npm install
$ cd client
$ npm install
$ cd ../server
$ npm install
```

5. While in the `server` folder, initialize the database and populate it with dummy data.
```shell
# In the medical-mayhem/server folder
$ ts-node db/populate.ts
```

6. In the `server` folder, start the server.
```shell
$ ts-node server.ts
```

7. In another terminal, navigate to the client folder and run the client.
```shell
# In the medical-mayhem/client folder
$ npm start
```