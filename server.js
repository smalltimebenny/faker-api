const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const port = 8000;

const createUser = () => {
    const user = {
        password : faker.datatype.string(),
        email : faker.internet.email(),
        phoneNumber : faker.phone.number(),
        lastName : faker.name.lastName(),
        firstName : faker.name.firstName(),
        _id : faker.random.numeric(),
};

    return user;
}

const createCompany = () => {
    const company = {
        _id  : faker.random.numeric(),
        name : faker.company.name(),
        address : [
            {
                street : faker.address.streetAddress(),
                city : faker.address.city(),
                state : faker.address.stateAbbr(),
                zipCode : faker.address.zipCode(),
                country : faker.address.country(),
            }
        ]
    }

    return company;
}

const newUser = createUser();
const newCompany = createCompany();
const newBoth = [newUser, newCompany]

// make sure these lines are above any app.get or app.post code blocks
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get("/api/new/user" , (req, res) => {
    res.json( newUser)
})

app.get("/api/new/company" , (req, res) => {
    res.json(newCompany)
})

app.get("/api/user/company" , (req, res) => {
    res.json (newBoth)
})


// this needs to be below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );