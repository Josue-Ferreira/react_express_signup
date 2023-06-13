const database = require('./connectDB');

const usersSeeder = (req, res) => {
    const { faker } = require('@faker-js/faker');
    // or, if desiring a different locale
    // const { fakerDE: faker } = require('@faker-js/faker');
    let randomFName, randomLName, randomEmail;
    const todayCreation = new Date();
    const todayCreationStr = `${todayCreation.getFullYear()}-${todayCreation.getMonth()}-${todayCreation.getDate()}`;

    for(let i=0; i<100; i++){
        randomFName = faker.person.firstName(); // Rowan Nikolaus
        randomLName = faker.person.lastName(); // Rowan Nikolaus
        randomEmail = faker.internet.email({firstName: randomFName, lastName: randomLName}); // Kassandra.Haley@erich.biz

        database.query(
            'INSERT INTO user(first_name,last_name,email,created_at,is_admin) VALUES (?,?,?,?,?)',
            [randomFName,randomLName,randomEmail,todayCreationStr,0],
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

    database.query(
        'SELECT * FROM user WHERE id='+id,
        (e, results, fields) => {
            if(e){
                res.sendStatus(500);
                throw e;
            }
            res.status(200).json(results);
        }
    )
}

const createUser = (req, res) => {
    const {first_name,last_name,email,created_at,is_admin} = req.body;

    database.query(
        'INSERT INTO user(first_name,last_name,email,created_at,is_admin) VALUES (?,?,?,?,?)',
        [first_name,last_name,email,created_at,is_admin],
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

module.exports = {
    usersSeeder,
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
};