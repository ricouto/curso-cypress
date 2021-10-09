function helloworld(){
    console.log("Hello World!!!!");
}

const saudacao = () => {
    var data = new Date()
    return data.getHours() <= 12? "Bom dia!": data.getHours() <= 18? "Boa tarde!": "Boa noite!";
}
helloworld();
console.log("A saudacao do momento eh " + saudacao());
console.log();
//incluido comentario para subir no GIT