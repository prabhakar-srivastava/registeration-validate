const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const { json } = require("body-parser");
const saltround = 10;


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "register"
});
db.connect(err => {
    // if(err) throw err
    if (!err) {
        console.log("+ve")

    }
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

//test fetching

// app.get('/api/get', (req, res) => {
//     const qwe = "SELECT * FROM reg;";
//     console.log(qwe);
//     db.query(qwe, (err, result) => {
//         console.log(result);
//         res.send(result);
//     });
// });

app.post("/api/insert", (req, res) => {
 
    const regName = req.body.regName;
    console.log(regName);
    const regDate = req.body.regDate;
    // console.log(typeof(regDate));
    // console.log(regDate);
    const regEmail = req.body.regEmail;
    // console.log(typeof(regEmail));
    // console.log(regEmail);
    const regPassword = req.body.regPassword;
    // console.log(regPassword);
    // console.log(typeof(regPassword));

    bcrypt.hash(regPassword, saltround, (err, hash) => {
        if (err) {
            console.log(err)
        }
        const query = 'INSERT INTO reg (name , date , email , password) VALUES (?,?,?,?);';

        db.query(query, [regName, regDate, regEmail, hash],
            (err, result) => {
                if (err) {
                    // consple.log(err);
                }
                console.log(result);
            }

        );
        res.send({ message: "Successfully Register. please go back to login" })
    });    
    
});

app.post("/api/Login", (req, res) => {
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    console.log(password);
    if (username === '') {
        res.send({ message: "fill all inputs" });
    } else {

        db.query(
            "SELECT * FROM reg WHERE name = ?;",
            username,
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                }

                //checkin user 
                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                        if (response) {
                            res.send(result);
                            console.log(result);
                        } else {
                            res.send({ message: "Wrong username/password combination!" });
                        }
                    });
                } else {
                    res.send({ message: "user doesn't exist" });
                }


            });
    }
});


app.listen(3001, () => {
    console.log("server sunning");

});
