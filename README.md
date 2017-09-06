# Modular Todos

An example of how to write a (sort of) RESTful API server and a separate client
that talks to it. All responses from the server are JSON.

The instructions here assume a Mac since all students at The Iron Yard are
expected to have one.

# Dependencies
## Backend
```bash
npm install -g sequelize-cli
brew install postgresql
brew services start postgresql
createdb todos
```

## Frontend


# Running the Backend
```bash
cd backend
npm install
sequelize db:migrate
npm start # or npm watch
```

# Running the Frontend
```bash
cd frontend
open index.html
```
