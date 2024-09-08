

const a = [
    {
        age: 12,
        name: 'a'
    },
    {
        age: 13,
        name: 'b'
    },
    {
        age: 14,
        name: 'c'
    }
];

let array = Object.values(a);
let result = array.find(e => e.age === 15);


if(!result) {
    console.log('');
}else {
    console.log('a');
    
}