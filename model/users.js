const database = require('./connectDB');
const uid = require('uid2');
const bcrypt = require('bcrypt');

const usersSeeder = (req, res) => {
    const { faker } = require('@faker-js/faker');
    // or, if desiring a different locale
    // const { fakerDE: faker } = require('@faker-js/faker');
    let randomFName, randomLName, randomEmail, randomPassword, randomToken;
    const todayCreation = new Date();
    const todayCreationStr = `${todayCreation.getFullYear()}-${todayCreation.getMonth()}-${todayCreation.getDate()}`;

    for(let i=0; i<100; i++){
        randomFName = faker.person.firstName(); // Rowan Nikolaus
        randomLName = faker.person.lastName(); // Rowan Nikolaus
        randomEmail = faker.internet.email({firstName: randomFName, lastName: randomLName}); // Kassandra.Haley@erich.biz
        randomPassword = faker.internet.password();
        randomToken = faker.internet.password();

        database.query(
            'INSERT INTO user(first_name,last_name,email,created_at,is_admin,password,token) VALUES (?,?,?,?,?,?,?)',
            [randomFName,randomLName,randomEmail,todayCreationStr,0,randomPassword,randomToken],
            (e, results, fields) => {
                if(e){
                    res.sendStatus(500);
                    throw e;
                }
                // e ? res.sendStatus(500) : res.status(200).send(`user ${randomFName} ${randomLName} ${randomEmail} created on ${todayCreationStr}`);
            } 
        )
    }

    res.sendStatus(200);
}

const getUsers = (req, res) => {
    database.query(
        'SELECT * FROM user',
        (e, results, fields) => {
            if(e){
                res.sendStatus(500);
                throw e;
            }
            res.status(200).json(results);
        }
    )
}

const getUserByID = (req, res) => {
    const id = req.params.id;
    const {password} = req.body;

    database.query(
        'SELECT * FROM user WHERE id='+id,
        (e, results, fields) => {
            if(e){
                res.sendStatus(500);
                throw e;
            }
            else{
                const rightPassword = bcrypt.compareSync(password, results[0].password);
                if(rightPassword)
                    res.status(200).json(results);
                else
                    res.sendStatus(500);
            }
            // res.status(200).json(results);
        }
    )
}

const createUser = (req, res) => {
    const {first_name,last_name,email,created_at,is_admin,password} = req.body;

    const token = uid(32);
    const hash = bcrypt.hashSync(password, 10);

    database.query(
        'INSERT INTO user(first_name,last_name,email,created_at,is_admin,token,password) VALUES (?,?,?,?,?,?,?)',
        [first_name,last_name,email,created_at,is_admin,token,hash],
        (e, results, fields) => {
            if(e){
                res.sendStatus(500);
                throw e;
            }
            else
                res.sendStatus(200);
        } 
    )
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const {first_name,last_name,email,updated_at,is_admin} = req.body;

    database.query(
        'UPDATE user SET first_name=?, last_name=?, email=?, updated_at=?, is_admin=? WHERE id='+id,
        [first_name,last_name,email,updated_at,is_admin],
        (e, results, fields) => {
            if(e){
                res.sendStatus(500);
                throw e;
            }
            else
                res.sendStatus(200);
        } 
    )
}

const deleteUser = (req, res) => {
    const id = req.params.id;

    database.query(
        'DELETE FROM user WHERE id='+id,
        (e, results, fields) => {
            if(e){
                res.sendStatus(500);
                throw e;
            }
            else
                res.sendStatus(200);
        } 
    )
}

const deleteAllUsers = (req, res) => {
    database.query(
        'DROP TABLE user',
        (e, results, fields) => {
            if(e){
                res.sendStatus(500);
                throw e;
            }
            else 
                res.sendStatus(200);
        }
    );
}

module.exports = {
    usersSeeder,
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers
};