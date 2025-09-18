const express = require('express');
const cors = require('cors');
const recommendationsRoute = require('./routes/recommendations');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recommendations', recommendationsRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
