const express = require("express");

const app = express();
const PORT = process.env.CONTAINER_PORT || process.env.PORT || 3355;
const APP_VERSION = process.env.APP_VERSION || "1.0.0";


let users = [
    {id : 1, name: "Ahmad"},
    {id : 2, name: "Hamotha"},
];
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my Node.js app");
});

app.get("/health", (req, res) => {
  res.send("Health is 100% everything is working fine");
});

app.get("/version", (req, res) => {
  res.send(`Version ${APP_VERSION}`);
});

app.post("/users", (req, res) => {
    const newUser = req.body;
    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });

    
});

app.delete("/deleteusers", (req,res) => {
    users = [];
    res.json({
        message:"all users cleared successfully",
        users: users
    });
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
