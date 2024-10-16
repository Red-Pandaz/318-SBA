import express from 'express';
import bodyParser from 'body-parser';
import walletRoutes from './routes/walletRoutes.mjs';
import blockchainRoutes from './routes/blockchainRoutes.mjs';
import coinRoutes from './routes/coinRoutes.mjs';
import { wallets } from './data/wallets.mjs'
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';  // Import EJS if needed

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  const time = new Date();
  console.log(`-----\n${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);
  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Serve static files
app.use(express.static('public'));

// Set the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  // Use 'ejs' as the view engine

// Routes
app.use('/api/wallets', walletRoutes);
app.use('/api/blockchains', blockchainRoutes);
app.use('/api/coins', coinRoutes);

app.get('/api/wallets', (req, res) => {
  res.render('showWallets', { allWallets: wallets });
});

// Error handling
app.use((req, res, next) => {
  next(new Error("Resources Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});