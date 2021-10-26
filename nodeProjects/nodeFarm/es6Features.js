// 1) let, const, back-tick

function calcAge(yob){
    let year = 2021;
    return `You are ${year-yob} years old.`;
}
console.log(calcAge(1995));
console.log(`current year is: ${year}`); 

// const:
var f_name = "John";
const age = 18;
console.log(`Hi ${f_name}, you are ${age=20} years old.`);  //reassign age value

// 2) Arrow function
const add = (a,b)=> a+b
console.log(add(2,3));

// 3) for each
function average(arr) {
    let sum = 0;
    arr.forEach(element => {
        sum += element;
    }); return sum / arr.length
}
console.log(average([7,8]));

// 4) Templates literal:
var f_name = "John"
var l_name = "Smith"
console.log(`Full name: ${f_name +" "+ l_name}`);

// 5) Promices
// 6) async/await method:
const getDogPic = async () =>{
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);

        await writeFilePro('dog-img.txt', res.body.message);
        console.log(`Random image saved to file!`);
    } catch (err) {
        console.log(err.message);
    }
};

// 7) map
var numbers = [1, 2, 3, 4];
var newarray = numbers.map(myFunction)

function myFunction(num) {
  return num * 10;
}
console.log(newarray);

// 8) spread
var colour = ['red', 'blue', 'green']
var copyOfArray = [...colour, "yellow"]
console.log(copyOfArray);

// 9) Object Destructive
var employee={
    f_name: 'John',
    l_name: 'Smith',
    age: 22,
};
let {f_name, l_name, age} = employee
console.log(f_name, l_name, age);

//  10)multiline string
var data = `Good morning everyine,
I am John, from USA.
 I am 20 years old.`
console.log(data);