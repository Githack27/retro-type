import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[RetroType API] Backend server listening on port ${PORT}`);
});
