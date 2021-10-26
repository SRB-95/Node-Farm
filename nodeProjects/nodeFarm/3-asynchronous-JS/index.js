const fs = require('fs');
const superagent = require('superagent');

// es6 promise function
const readFilePro = (file) =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(file, (err, data) =>{
            if (err) reject(`Error: File Not Found!`);
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) =>{
    return new Promise((resolve, reject) =>{
        fs.writeFile(file, data, err => {
            if (err) reject(`Error: \n ${err.message}`);
            resolve('Success!')
        });
    });
};

// readFile method
// readFilePro(`${__dirname}/dog.txt`).then(data => {
//     console.log(`Breed: ${data}`);

//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     // built permices
//     .then(res=>{
//         console.log(res.body.message);
//         fs.writeFile('randomImages.txt', res.body.message, err=>{
//             if (err) return console.log(`Error: \n`+ err.message);
//             console.log(`Random image saved to file!`);
//         });
//     })
//     // consume permices
//     .catch(err=>{
//         console.log(err.message);
//     });
// });


// read/writeFile method
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res=>{
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message)
    })
    .then(()=>{
        console.log(`Random image saved to file!`);
    })
    .catch(err=>{
        console.log(err.message);
    });



// CALL BACK HELL
// fs.readFile(`${__dirname}/dog.txt`, (err, data)=>{
//     console.log(`Breed: ${data}`);
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res)=>{
//         if (err) return console.log(`Error: \n`+ err.message);
//         //error handling

//         console.log(res.body.message);
//         // body-whole content, message-only image

//         fs.writeFile('randomImages.txt', res.body.message, err=>{
//             console.log(`Random image saved to file!`);
//         });
//         // res.body.message-file name
//     });
// });


// Permices
// fs.readFile(`${__dirname}/dog.txt`, (err, data)=>{
//     console.log(`Breed: ${data}`);
//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     // built permices
//     .then(res=>{
//         console.log(res.body.message);
//         fs.writeFile('randomImages.txt', res.body.message, err=>{
//             if (err) return console.log(`Error: \n`+ err.message);
//             console.log(`Random image saved to file!`);
//         });
//     })
//     // consume permices
//     .catch(err=>{
//         console.log(err.message);
//     });
//     // handle error
// });

