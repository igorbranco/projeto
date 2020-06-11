var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var tabelaVirtual = [];


var Postagem = require('./modelo/postagem');

app.use(express.static('./app/public'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

function formatarValor(entrada) {
    return entrada.toUpperCase();
}


app.get('/', (req, res) => {
    res.render("./home/index");
})

app.get('/cadastropostagem', (req, res) => {

    res.render('./home/form');

})

app.post('/postagem/', (req, res) => {

    Postagem.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {

        console.log("Cadastro OK !!!!")

    }).catch(function (erro) {

        console.log("Cadastro KO !!!!")


    })




    // var linhaVirtual = [req.body.id, req.body.modelo, req.body.placa];
    // tabelaVirtual.push(linhaVirtual);



    // CarroDao.inserir(dados);

    //res.render('./home/tabela', { tabelaVirtualView: tabelaVirtual });

    res.redirect('/listarpostagem')


})

app.get('/listarpostagem', (req, res) => {


    Postagem.findAll().then(function (postagens) {

        //res.send(carros)
        res.render('./home/tabela2', { postagens: postagens });

    })



})

app.get("/editarPostagem/:id", (req,res) => {
    Postagem.findOne({_id: req.params.id}).then((Postagem) => {
        res.render("./home/editarPostagem", { Postagem: Postagem})
    }).catch((err) => {
        res.redirect("/listarpostagem")
    })
    
})

app.get('/apagarPostagem/:id', (req, res) => {
    Postagem.destroy({ where: { id: req.params.id } }).then(function () {
        res.redirect("/listarpostagem")

    }).catch(function (erro) {

        res.send("erro deletando" + erro);


    })


})


app.listen(3000, function () {

    console.log("Servidor OK .... Porta 3000");

});