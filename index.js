function helloworld() {
  console.log('Hello World!!!!');
}

const saudacao = () => {
  const hora = new Date().getHours();
  if (hora <= 12) return 'Bom dia!';
  if (hora <= 18) return 'Bom tarde!';
  return 'Boa noite!';

  /* Deixa o if antigo para ter esse jeito de fazer!
  return data.getHours() <= 12 ? 'Bom dia!'
  : data.getHours() <= 18 ? 'Boa tarde!' : 'Boa noite!';
  */
};
helloworld();
console.log(`A saudacao do momento eh ${saudacao()}`);
console.log();
// incluido comentario para subir no GIT
// TODO resolver tal coisa aqui
// FIXME ajustar o codigo neste ponto
// BUG verificar o motivo disso aqui!!!!
// TAG confirmar esse ponto>>XPTO<<<
