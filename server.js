const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Parse request of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync({ force: true }).then(() => {
    console.log('Database syncing...');
});

app.get('/', (req, res) => {
    res.send('Default Route')
});

require('./app/routes/university.route')(app);
require('./app/routes/student.route')(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
