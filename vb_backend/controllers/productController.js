const Product = require('../models/Product');
const path = require('path');
const fs = require('fs'); 

exports.createProduct = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma foto do produto foi enviada.' });
    }
    
    const { name, description, category, price } = req.body;

    const publicPhotoURL = `/uploads/${path.basename(req.file.path)}`;

    try {
        const newProduct = new Product({
            name,
            description,
            category,
            price, 
            photoURL: publicPhotoURL 
        });
        
        const savedProduct = await newProduct.save();

        return res.status(201).json(savedProduct);

    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        return res.status(500).json({ error: 'Erro interno ao salvar produto. Verifique se todos os campos estão preenchidos.' });
    }
};


exports.getProducts = async (req, res) => {
    try {
        let query = {};
        
        if (req.query.cat) {
            query.category = req.query.cat;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        return res.status(200).json(products);

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return res.status(500).json({ error: 'Falha ao buscar o catálogo de produtos.' });
    }
};



exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Erro ao buscar produto por ID:", error);
        res.status(500).json({ error: 'Falha ao buscar produto.' });
    }
};



exports.updateProduct = async (req, res) => {
    try {
        const { name, description, category, price } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, category, price },
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Produto não encontrado para atualizar.' });
        }
        
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ error: 'Falha ao atualizar dados do produto.' });
    }
};



exports.updateProductPhoto = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma nova foto foi enviada.' });
    }

    try {
    
        const product = await Product.findById(req.params.id);
        if (!product) {
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        if (product.photoURL) {
            const oldPhotoName = path.basename(product.photoURL);
            const oldPhotoPath = path.resolve(__dirname, '..', 'uploads', oldPhotoName);
            
            if (fs.existsSync(oldPhotoPath)) {
                fs.unlinkSync(oldPhotoPath);
            }
        }

        const publicPhotoURL = `/uploads/${path.basename(req.file.path)}`;

        product.photoURL = publicPhotoURL;
        await product.save();

        res.status(200).json(product);

    } catch (error) {
        console.error("Erro ao atualizar foto:", error);
        res.status(500).json({ error: 'Falha ao atualizar a foto do produto.' });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado para deletar.' });
        }

        if (product.photoURL) {
            const photoName = path.basename(product.photoURL);
            const photoPath = path.resolve(__dirname, '..', 'uploads', photoName);
            
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath);
            }
        }

        res.status(200).json({ message: 'Produto deletado com sucesso.' });

    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        res.status(500).json({ error: 'Falha ao deletar o produto.' });
    }
};

