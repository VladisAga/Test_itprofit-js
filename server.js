const express = require('express');
const fs = require('fs');
const cors = require('cors');

const { validateSentData } = require('./src/objValidationServer');

const app = express();
const port = 9090;

app.use(cors());
app.use(express.json());

app.post('/submitForm', (req, res) => {
    const data = req.body;

    const checkedData = validateSentData(data);

    console.log(checkedData);

    let oldData = [];
    try {
        const fileData = fs.readFileSync('db/db.json');
        const parsedData = JSON.parse(fileData);
        if (Array.isArray(parsedData.validFormData)) {
            oldData = parsedData.validFormData;
        } else {
            throw new Error('Ожидался другой формат данных');
        }
    } catch (error) {
        console.error('Ошибка чтения старых данных', error);
    }

    const newData = [...oldData, checkedData];

    try {
        fs.writeFileSync('db/db.json', JSON.stringify({ validFormData: newData }));
        res.json(checkedData);
    } catch (error) {
        console.error('Не удалось записать новые данные:', error);
        res.status(500).json({ message: 'Данные не сохранены' });
    }
});

app.post("/api/registration", (req, res) => {
    if (Math.random() > 0.5) {
        res.statusCode = 400;

        setTimeout(() => {
            res.send({
                status: "error",
                message: "Bad request",
            });
        }, Math.random() * 1000);

        return;
    }

    setTimeout(() => {
        res.statusCode = 200;
        res.send({
            status: "success",
            message: "You are registered",
        });
    }, Math.random() * 1000);
});

app.get("/api/ping", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "Server is ready",
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
