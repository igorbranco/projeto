const Sequelize = require('sequelize');
const sequelize = new Sequelize('inpg', 'root', 'tropical', {
        host:'localhost',
        dialect: "mysql"

} )

sequelize.authenticate().then(function(){ 

    console.log('Conectado com sucesso !!!!');

}).catch(function(erro){

    console.log('Erro ao conectar:' + erro);

})

const Postagem = sequelize.define('postagens', {

    titulo:{
        type:Sequelize.STRING
    },
    conteudo:{
        type:Sequelize.TEXT

    }

} )

const Usuario = sequelize.define('usuarios',{
    nome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
})

// Postagem.sync({force:true})

Postagem.create({
    titulo:"Numero de mortos por corona vírus no Brasil",
    conteudo:"Conteúdo da postagem aqui"
})

