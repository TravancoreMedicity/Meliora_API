const sockectIO = require("socket.io");

exports.WSIO = server => {
    return sockectIO(server, {
        cors: {
            origin: ['http://localhost:3000', 'http://192.168.11.42:3000', 'http://192.168.22.2:3000',
                'http://tm.medicity.co.in:8888'],
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