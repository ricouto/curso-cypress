it('nada agora', function () {} );

/*
function soma(a,b) {
    return a+b;
}
*/

//forma tradicional de escrever Arrow Function
/*
const soma = (a,b) =>{
    return a + b
}*/

//forma reduzida e com return apos a Arrow
//const soma = (a,b) => a + b

//ERROR onde mostra undefined na Console pq nao aceita dentro do corpo
// neste caso precisa do return para mostrar o valor 
/*const soma = (a,b)=>{
    a + b
}*/

const soma = a => a + a

const soma2 = () => 6 + 6


console.log(soma(11,9));

console.log(soma2(11,9));

it('a function test...', function (){
    console.log('Function', this)
});

it('an arrow test...', () => {
    console.log('Arrow', this);
    
});

