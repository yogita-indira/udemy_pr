import http from "http";

const PORT = 3000;
const datas = [
    {
        id: 1,
        name: "manya"
    },
    {
        id: 2,
        name: "anush"
    }
];

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(datas));
    } else if (req.method === 'POST' && req.url === '/data') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });

        req.on('end', () => {
            try {
                const newData = JSON.parse(body);
                datas.push(newData);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data added successfully', datas }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
