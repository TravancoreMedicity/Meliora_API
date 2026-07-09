const sockectIO = require("socket.io");
const onlineUsers = new Map();





exports.WSIO = server => {
    return sockectIO(server, {
        cors: {
            origin: ['http://192.168.11.42:3000',
                'http://192.168.22.8:3000',
                'http://tm.medicity.co.in:8888'],
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    })
};


exports.connection = io => {

    io.on("connection", socket => {
        // USER ONLINE
        socket.on("user-online", (empId) => {
            if (!empId) { return; }
            // STORE USER
            onlineUsers.set(empId, socket.id);
            // SEND ONLINE USERS TO ALL
            io.emit("online-users", Array.from(onlineUsers.keys()));
        });


        socket.on("user-offline", (empId) => {
            if (!empId) return;
            // Remove from onlineUsers
            if (onlineUsers.has(empId)) {
                onlineUsers.delete(empId);
                // Broadcast updated online users
                io.emit("online-users", Array.from(onlineUsers.keys()));
            }
        });

        socket.on("typing-start", (data) => {
            const { conversation_ids = [], sender_emp_id, sender_name } = data;
            conversation_ids.forEach(id => {
                socket.to(`conv_${id}`).emit("user-typing",
                    {
                        conversation_id: id,
                        sender_emp_id,
                        sender_name
                    }
                );

            });
        }
        );

        socket.on("typing-stop",
            (data) => {

                const { conversation_ids = [], sender_emp_id } = data;
                conversation_ids.forEach(id => {
                    socket.to(`conv_${id}`).emit("user-stop-typing",
                        {
                            conversation_id: id,
                            sender_emp_id
                        }
                    );

                });
            }
        );

        socket.on("leave-room", (room) => {
            socket.leave(room);
        }
        );

        // JOIN CHAT ROOM
        socket.on("join-room", (roomId) => {
            socket.join(roomId);
        }
        );

         socket.on("join-personal-room", (empId) => {
            if (!empId) return;
            const roomName = `emp_${empId}`;
            socket.join(roomName);
            socket.data.emp_id = empId;
            console.log(`Socket ${socket.id} joined ${roomName}`);
        });

        socket.on("leave-personal-room", (empId) => {
            if (!empId) return;
            const roomName = `emp_${empId}`;
            socket.leave(roomName);
            console.log(`Socket ${socket.id} left ${roomName}`);
        });
        // MESSAGE EVENT
        // socket.on( "message",(message) => {
        //         console.log(`message from ${socket.id}`,
        //             message
        //         );
        //     }
        // );

        // SEND NEW MESSAGE EVENT
        socket.on("send-message", (data) => {
            if (!data?.conversation_id) {
                return;
            }
            io.to(`conv_${data.conversation_id}`
            ).emit("new-message", data);
        }
        );

        socket.on('desktop-connected', ({ empid, title }) => {
            socket.data.empid = empid;
            socket.data.title = title;
            socket.join(String(empid));
        });

        socket.on('user-connected', (data) => {
            const { empid, title } = data;
            socket.data.empid = empid;
            socket.data.title = title;
            socket.data.isMobile = true;
            socket.join(String(empid));

            io.to(String(empid)).emit('user-connected-from-mobile', {
                empId: empid,
                title,
            });
        });

        // DISCONNECT
        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected`);
            // REMOVE USER
            for (const [empId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(empId);
                    break;
                }
            }
            // UPDATE EVERYONE
            io.emit("online-users", Array.from(onlineUsers.keys()));
            if (socket.data?.empid && socket.data?.isMobile) {
                io.to(String(socket.data.empid)).emit('mobile-connect-disconnected', {
                    empid: socket.data.empid,
                    title: socket.data.title,
                });
            }
        });
    });

};



// exports.connection = io => {
//     io.on("connection", socket => {
//         // console.log(`A user is connected ${socket.id}`);

//         socket.on("message", (message) => {
//             // console.log(`message from ${socket.id} : ${message}`)
//         })

//         socket.on("disconnect", () => {
//             // console.log(`message from ${socket.id} disconnected`)
//         })

//     })
// }







