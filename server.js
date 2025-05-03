import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const PORT = 3000;
const users = [];

const server = http.createServer((req,res)=>{

    if(req.url === '/users' && req.method === "GET"){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }else if (req.url === '/users' && req.method === "POST"){
        let body = ''
        req.on('data', (chunk)=> body += chunk)
        req.on('end', ()=> {
            const data = JSON.parse(body);
            const newUser = { id: uuidv4(), ...data};
            users.push(newUser);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));

        })
    }   
})
server.listen(PORT, ()=> console.log(`server is runnning on port: ${PORT}`));