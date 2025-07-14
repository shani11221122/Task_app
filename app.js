import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';

import routes from './routes/R1.js'; // ✅ Must be ES module export


const app = express();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/taskapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: 'mySuperSecret',
  resave: false,
  saveUninitialized: false
}));

// Use routes
app.use('/', routes);


// Start server
app.listen(3000, () => {
  console.log(`🚀 Server is running on http://localhost:3000`);
});
