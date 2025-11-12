import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use('/public', express.static('public'));

app.get('/api/v1/cat', (req, res) => {
  res.json({
    cat_id: 1,
    name: 'Whiskers',
    birthdate: '2020-03-15',
    weight: 4.2,
    owner: 'Alice',
    image: 'https://loremflickr.com/320/240/cat'
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;