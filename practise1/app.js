// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках
const fs = require("fs");
const path = require("path");
const manOlder20 = path.join(__dirname, "manOlder20");
const manYounger20 = path.join(__dirname, "manYounger20");
const womanOlder20 = path.join(__dirname, "womanOlder20");
const womanYounger20 = path.join(__dirname, "womanYounger20");
const users = [
    {name: 'Olya', gender: "female", age: 20},
    {name: 'Petya', gender: "male", age: 42},
    {name: 'Emily', gender: "female", age: 18},
    {name: "Hannah", gender: "female", age: 35},
    {name: 'Andrii', gender: "male", age: 18},
    {name: 'Vasya', gender: "male", age: 50},
    {name: 'Emily', gender: "female", age: 27},
    {name: 'Victor', gender: "male", age: 30}
];

function createUsers(users) {
    fs.mkdir(manOlder20, err => {
        if (err) {
            console.log(err);
        }
    });
    fs.mkdir(womanOlder20, err => {
        if (err) {
            console.log(err);
        }
    });
    fs.mkdir(womanYounger20, err => {
        if (err) {
            console.log(err);
        }
    })
    fs.mkdir(manYounger20, err => {
        if (err) {
            console.log(err);
        }
    })
    users.forEach(value => {

        if (value.gender === "male" && value.age > 20) {
            fs.writeFile(path.join(manOlder20, `${value.name}.txt`), JSON.stringify(value), err => {
                if (err) {
                    console.log(err);
                }
            })
        } else if (value.gender === 'male' && value.age < 20) {

            fs.writeFile(path.join(manYounger20, `${value.name}.txt`), JSON.stringify(value), err => {
                if (err) {
                    console.log(err);
                }
            })
        } else if (value.gender === 'female' && value.age > 20) {
            fs.writeFile(path.join(womanOlder20, `${value.name}.txt`), JSON.stringify(value), err => {
                if (err) {
                    console.log(err);
                }
            })
        } else {
            fs.writeFile(path.join(womanYounger20, `${value.name}.txt`), JSON.stringify(value), err => {
                if (err) {
                    console.log(err);
                }
            })
        }
    })
}

createUsers(users);
