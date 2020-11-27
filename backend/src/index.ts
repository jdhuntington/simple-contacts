import bodyParser from 'body-parser';
import express from 'express';
import { name, internet, phone, company } from 'faker';

interface Contact {
    id: number;
    name: string;
    phone: string;
    email: string;
    company: string;
}

const contacts: Contact[] = [];
for(let i = 0; i < 20; i++) {
    const firstName = name.firstName();
    const lastName = name.lastName();
    const companyName = company.companyName();
    contacts.push({
        id: i,
        name: `${firstName} ${lastName}`,
        email: internet.email(firstName, lastName),
 phone: phone.phoneNumber(),  
 company: companyName     
    })
}

const app = express();
app.use(bodyParser.json())

app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

app.post('/api/contacts/:contactId', (req, res) => {
    const contactId = parseInt(req.params['contactId'], 10);
    contacts[contactId] = req.body;
    res.json(contacts);
});

app.listen(4000);