import express from 'express';
import bodyParser from 'body-parser';
import walletRoutes from './routes/walletRoutes.mjs';
import blockchainRoutes from './routes/blockchainRoutes.mjs';
import coinRoutes from './routes/coinRoutes.mjs';
import path from 'path';
// import error from './utilities/error.mjs'; 



const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // This line was duplicated

// New logging middleware to help us keep track of requests during testing!
app.use((req, res, next) => {
  const time = new Date();
  console.log(`-----\n${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);
  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

// Routes
app.use('/api/wallets', walletRoutes);
app.use('/api/blockchains', blockchainRoutes);
app.use('/api/coins', coinRoutes);


app.use((req, res, next) => {
  next(new Error("Resources Not Found")); // Use native Error if you don't have a custom error utility
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
