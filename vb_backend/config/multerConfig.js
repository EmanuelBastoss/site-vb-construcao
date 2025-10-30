const multer = require('multer');
const path = require('path');

// 1. Configuração de Armazenamento no Disco (Disk Storage)
const storage = multer.diskStorage({
    // O destino onde as imagens serão salvas (pasta 'uploads' na raiz do projeto)
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', 'uploads')); 
    },
    // Nome do arquivo: Adiciona um timestamp para garantir nomes únicos
    filename: (req, file, cb) => {
        // Ex: "produto-16788888888-999.jpg"
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'produto-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. Middleware Multer
const upload = multer({
    storage: storage,
    // (Opcional) Limitar o tamanho e filtrar tipos de arquivos
    limits: { fileSize: 5 * 1024 * 1024 }, // Limita a 5MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos de imagem (JPEG, PNG, GIF) são permitidos.'));
        }
    }
});

module.exports = upload;
