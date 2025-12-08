let name="koushi";
const p=2;
var country="India";
var c=5+6
var d=3*6
var f=5/2
var s=10==="10"
var r=10=="10"
var g=10>2
console.log(c)
console.log(d)
console.log(g)
console.log(f,s,r)

function greet(name){
    console.log("Hello "+name)
}
greet("koushi")
 

function awere(q){
    if(q>=18){
        console.log("major")
    }
    else{
        console.log("minor")
    }
}
awere(86);

//loops
for(let i=0;i<10;i++){
    console.log(i)
}

//object arrays
let fruits=["Apple","Banana","Mango"]
let car={brand:"Toyota",model:"Corolla",year:2020}
console.log(car.brand)
console.log(fruits[1])
//hoisting
var x;
console.log(x) 
x=5
//hoisting in let
//console.log(y)
//let y=10//error occurs

var ac="abd"
ac="def"
console.log(ac)//if var used to reassign whereas let and const doesnt do the work and occurs errors
//null and undefined
let k="null"
let k1
console.log(k, k1)
//switch case
let swit="banana"
switch(swit){
    case "orange":
        console.log("orange color")
        break;
    case "banana":
        console.log("yellow color")
        break;
    default:
        console.log("unknown fruit")
}
//key values
let person={
    name:"koushi",
    age:22,
    country:"India"
}
for (let key in person){
console.log(key+": "+person[key])
}
//arrays
let fr=["apple","banana","mango"]
fr.push("grapes")
console.log(fr)
fr.pop()
console.log(fr)
fr.shift()
console.log(fr)
fr.unshift("kiwi")
console.log(fr)
//arrays
let numbers=[1,2,3,4,5]
for(let num of numbers){
    console.log(num*num)
}
//ternary operator
let qw=45
let adf=(qw>18)?"major":"minor"
console.log(adf)
//arrow fnc
const arrow=(name)=>{
    return `hello ${name}`
}
console.log(arrow("koushi"))
//spread operator
let arr1=[1,2,3]
let arr2=[4,5,6]
let combined=[0,...arr1,...arr2]
console.log(combined)

let nam=["koushi"]
let va=[22,"India"]
let comb=[...nam,...va]
console.log(comb)

//destrycturing arrays
const m=[1,2,3]
const [a,b,j]=m
console.log(a,b,j)
//rest operator
const[first, ,third]=m;
console.log(first,third)

const[u,i,...rest]=m
console.log(u,i,rest)

const person1={
    peru:"koushi",
    age:22, 
}
const{peru,age}=person1
console.log(peru,age)

const num1=[1,2,3,4,5,6]
const num2=num1.map(num1=>num1*num1)
console.log(num1)

const evenNum=num1.filter(num1=>num1%2===0)     
console.log(evenNum)

const sum1=num1.reduce((accumulator,current)=>accumulator+current,0)
console.log(sum1)
//rest parameters
function sum(...num4){
    return num4.reduce((total,num1)=>total+num1,0)
}
console.log(sum(1,2,3,4,5))

//sync
let str="Hello World"
console.log(str.length)//incl splace
console.log(str.charAt(7))
let str1="koushikaa"
let str2="Shree"
console.log(str1.concat(" ",str2))
console.log(str.includes("World"))
console.log(str.indexOf("l"))
console.log(str.substring(0,5))