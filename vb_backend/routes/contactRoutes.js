const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/send', async (req, res) => {
    try {
        const { name, email, message } = req.body; 

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Todos os campos são obrigatórios.' });
        }

        const newMessage = new Message({
            name: name,
            contact: email, 
            message: message
        });

        await newMessage.save(); 

        res.status(201).json({ success: true, message: 'Mensagem enviada com sucesso!' });

    } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro no servidor. Tente novamente.' });
    }
});

router.get('/messages', async (req, res) => {
    try {
        // Busca todas as mensagens e ordena da mais nova para a mais antiga
        const messages = await Message.find().sort({ createdAt: -1 });

        res.status(200).json(messages); // Envia as mensagens como resposta JSON

    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro no servidor.' });
    }
});


module.exports = router;