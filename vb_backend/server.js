const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 

dotenv.config();


const contactRoutes = require('./routes/contactRoutes');

const productRoutes = require('./routes/productRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');
}).catch((err) => {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
});


app.get('/', (req, res) => {
    res.send('API da VB Materiais de Construção está no ar!');
});


app.use('/api/contact', contactRoutes);


app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});
