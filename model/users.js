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

module.exports = {usersSeeder};