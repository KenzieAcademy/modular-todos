# Modular Todos

An example of how to write a (sort of) RESTful API server and a separate client
that talks to it. All responses from the server are JSON.

# Running the Server
```bash
createdb todos
cd backend
npm install
sequelize db:migrate
npm start # or npm watch
```

# Running the Client
```bash
cd frontend
```

Then, simply open index.html in your favorite web browser (only tested on
Chrome)
