it('sem testes, ainda!', () => {
    
});
/*
const getSomething = callback => {
    setTimeout(() => {
        //console.log('respondendo.....');
        callback(12);
        //return 11;
    }, 1000)
}

const system = () => {
    console.log('init');
    //const something = getSomething();
    getSomething(some => {
        console.log("Something is " + some);
    //console.log('Something is ${something}');
    //console.log("Something is " + something);
        console.log('end');
    })
}

system();
*/

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)    
    })
}

const system = () => {
    console.log('init');
    /* forma de escrever guardando na variavel
    const prom = getSomething();
    prom.then(some => {
        console.log("Something is " + some);
    })
    */
    getSomething().then(some => {
        console.log("Something is " + some);
    })

    console.log('end');
}

system();

