const fs = require("fs");
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// Blocking synchrous way
// const textIn = fs.readFileSync('./txt/input.txt', "utf-8");
// console.log(textIn);

// const writeText = `This is what we know abouy avocado: ${textIn}.\n created on: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', writeText);
// console.log('File written');

// Non-blocking asynchrous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1)=>{
//     if (err) return console.log('ERROR!');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3)=>{
//             console.log(data3);    
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
//                 console.log('Your file has been written');    
//             })
//         })
//     })
// })
// console.log('Will read file');

///////////////////////////////////////////////////////////////////////////////////////
// SERVER

// Read File
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');      //read json data synchronously
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');    //array of object
const dataObj = JSON.parse(data);

// get end point
const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

// Server
const server = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log(url.parse(req.url, true));
    const { query, pathname } = url.parse(req.url, true);
    // const pathName = req.url;

    // Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

        // Product Page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product)
        res.end(output);

        // API 
    } else if (pathname === '/api') {
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data)=>{  //read json data asynchronously
        // const productData = JSON.parse(data);
        res.writeHead(200, { 'Content-type': 'text/html' });   //output in form of json
        res.end(data);

        // Not Found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'          //Custom Error
        });
        res.end('<h1>404 Page Not Found Error!</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running at 8000');
});