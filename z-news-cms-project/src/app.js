import frontendRoutes from './routes/frontend.routes.js';
import adminRoutes from './routes/admin.routes.js';
import expressLayouts from 'express-ejs-layouts';
import express from 'express';
import path from 'path';
import url from 'url';

const app = express();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('layouts', 'layouts');
app.set('view engine', 'ejs');


app.use('/', frontendRoutes);
app.use('/admin', adminRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));