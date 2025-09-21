const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/fastfood', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

const orderSchema = new mongoose.Schema({
    orderNumber: { type: Number, required: true },
    items: [
        {
            id: String,
            name: String,
            basePrice: Number,
            totalPrice: Number,
            quantity: Number,
            customizations: [
                {
                    category: String,
                    id: String,
                    name: String,
                    price: Number
                }
            ]
        }
    ],
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'pending' },
    timestamp: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ timestamp: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    const order = new Order(req.body);
    
    try {
        const newOrder = await order.save();
        
        io.emit('newOrder', newOrder);
        
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.patch('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
        
        if (req.body.status) order.status = req.body.status;
        
        const updatedOrder = await order.save();

        io.emit('orderUpdated', updatedOrder);
        
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});