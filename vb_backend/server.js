const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); 

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

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});