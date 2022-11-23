const ProductoModel = require('../models/product.model');
const Producto = new ProductoModel();
const ChatModel = require('../models/chat.model');
const Chat = new ChatModel();

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client Connected 👩‍💻 -', socket.id);

    const sendProductsTest = async () => {
      const products = await Producto.getAllProductsTest();
      io.emit('server:sendProductsTest', products);
    };
    sendProductsTest();

    const sendProducts = async () => {
      const products = await Producto.getAll();
      io.emit('server:sendProducts', products);
    };
    sendProducts();

    socket.on('client:newProduct', async (data) => {
      await Producto.save(data);
      sendProducts();
    });

    const sendMessages = async () => {
      const messages = await Chat.getAllMessages();
      io.emit('server:sendMessages', messages);
    };
    sendMessages();

    socket.on('client:newMessage', async (data) => {
      await Chat.saveMessage(data);
      sendMessages();
    });
  });
};