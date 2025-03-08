const sockectIO = require("socket.io");

exports.WSIO = server => {
    return sockectIO(server, {
        cors: {
            origin: ['http://192.168.22.4:3000', 'http://localhost:3000'],
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    })
};

exports.connection = io => {
    io.on("connection", socket => {
        // console.log(`A user is connected ${socket.id}`);

        socket.on("message", (message) => {
            // console.log(`message from ${socket.id} : ${message}`)
        })

        socket.on("disconnect", () => {
            // console.log(`message from ${socket.id} disconnected`)
        })

    })
}