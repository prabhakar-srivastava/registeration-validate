const express = require("express");
const app = express();
const mysql = require("mysql");

const db =mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database:"register"
});
db.connect(err=> {
    // if(err) throw err;
    if(err){
        console.log("reeor")
    }
});

app.get('/',(req,res) =>{
    
    db.query(
        'INSERT INTO reg (name , date , email , password) VALUES ("QWERTY1","2022-02-22","QWERTY@qwerty","12345678");'
        , (err, result) => {
            if(err){
                res.send(err);
            }
            res.send(result);

    });

    // db.query(
    //     'INSERT INTO contries (contryName, population) VALUES ("africa", 20)',
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         res.send(result);
    //     }
    //     );
   
});

app.listen(3005, ()=>{
    console.log("server sunning");

});
