const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório.'],
        trim: true
    },
    contact: {
        type: String,
        required: [true, 'O email ou telefone é obrigatório.'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'A mensagem é obrigatória.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;