const express = require("express");
const expressHbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");

const pathUsers = path.join(__dirname, 'users.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));

app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/registration", (req, res) => {
    res.render('registration');
});

app.get("/error", (req, res) => {
    res.render('error');
});

app.get('/loginError', (req, res) => {
    res.render('loginError');
})

function pushUsers(usersData) {
    fs.writeFile(pathUsers, JSON.stringify(usersData), err => {
        if (err) {
            console.log(err);
        }
    });
}

function getUsers() {
    return JSON.parse(fs.readFileSync(pathUsers).toString());
}

app.post('/registration', (req, res) => {
    const users = getUsers();
    const {email} = req.body;

    if (users.find((user) => user.email === email)) {
        return res.redirect('error');
    }

    users.push(req.body);
    pushUsers(users);

    return res.json("OK");
});

app.post('/login', (req, res) => {
    const users = getUsers();
    const {email, password} = req.body;

    const user = users.find(user => user.email === email) && users.find(user => user.password === password);

    if (user) {
        return res.redirect(`/chosenUser/${user.email}`);
    }

    return res.redirect('loginError');
});

app.get('/chosenUser/:userEmail', (req, res) => {
    const {userEmail} = req.params;
    const users = getUsers();

    const user = users.find(user => user.email === userEmail);
    const {email, password} = user;

    res.render('chosenUser', {email, password})
})

app.get("/users", (req, res) => {
    const users = getUsers();
    res.render('users', {users});
});


app.listen(3000, () => {
    console.log("App listen 3000");
});
