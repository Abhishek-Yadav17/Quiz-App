const express = require('express');
const cors = require('cors');
const path = require('path');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/quiz', quizRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
