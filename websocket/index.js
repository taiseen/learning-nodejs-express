// 30 - September - 2025

import { createServer } from 'node:http';
import { Server } from 'socket.io';
import express from 'express';

const PORT = 3000;

const app = express();
const httpServer = createServer(app);
const serverSocket = new Server(httpServer);


app.use(express.static('public'))

app.get('/', (_, res) => {
    return res.sendFile('index.html');
});




// socket.emit('key', data)           => for ➡️ sending the message
// socket.on('key', (data) => {...})  => for 📩 receiving the message


// here 'serverSocket' is the main server socket object
// and 'clientSocket' is the individual client socket object


// 📝 NOTE:-
// 1st step - 📩 receiving/listing for client connection event request... 
// by this --> [ .on('key', () => {...}) ]


serverSocket.on('connection', (clientSocket) => {


    // ➡️ broadcasting the join message to all connected clients including the sender client
    serverSocket.emit('broadcastFromServer', '🟢 chat join:- ' + clientSocket.id);


    // 📩 get incoming message from client...
    clientSocket.on('messageFromClient', (dataFromClient) => {

        // 📝 NOTE:-
        // now server broadcasting the message to all connected clients including the sender client
        // if we want to broadcast the message to all connected clients except the sender client
        // then we have to use this ➡️ [ clientSocket.broadcast.emit('key', data) ]

        // 2nd step - emitting/broadcasting the message to all connected clients
        // by this ➡️ [ .emit('key', data) ]

        serverSocket.emit('broadcastFromServer', dataFromClient);
    });


    // 📩 when any client gets disconnected...
    clientSocket.on('disconnect', () => {

        serverSocket.emit('broadcastFromServer', '🔴 chat left:- ' + clientSocket.id);
    });

});




httpServer.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));