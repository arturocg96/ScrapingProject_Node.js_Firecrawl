
const http = require('http'); 
const app = require('./src/app'); 

const server = http.createServer(app); 

require('dotenv').config(); 


const PORT = process.env.PORT || 3000; 
server.listen(PORT); 

server.on('listening', () => {
    console.log(`Server is running on port ${PORT}`);
}); 

