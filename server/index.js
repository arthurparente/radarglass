/* Declaração */
var pagina = "http://localhost:8080/contato.html";
const porta = 2205;

/* Inicializando conexão com o banco de dados */
const mysql2 = require("mysql2");

const conexao = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "radarglass"
});

console.log("Banco de dados MySQL conectado.");

/* Iniciando o servidor */
var bodyParser = require("body-parser");

var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(porta);

console.log("Servidor RadarGlass iniciado na porta " + porta + ".");

/* Implementação do POST */
app.post('/contato', function (req, res) {

    /* Salvando o endereço */
    var sql = "INSERT INTO endereco (rua, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?)";
    var valores = [req.body.rua, req.body.bairro, req.body.cidade, req.body.estado, req.body.cep];

    conexao.query(sql, valores, function (errors, results) {
        if (errors) {

            console.log("A tentativa de registrar o endereço falhou. " + errors);
            res.redirect(pagina + "?error=true");

        } else {

            console.log("Novo endereço recebido com sucesso. Dados = " + valores);

            /* Recuperando último endereço salvo */
            conexao.query("SELECT MAX(id_endereco) as id_endereco FROM endereco", function (errors, results) {
                
                if (errors) {

                    console.log("A tentativa de recuperar o endereço falhou. " + errors);
                    res.redirect(pagina + "?error=true");

                } else {

                    var ultimo_endereco = results[0].id_endereco;
                    console.log("Endereço recuperado com sucesso. ID = " + ultimo_endereco);

                    /* Salvando o contato */
                    const sql = "INSERT INTO contato (nome, email, nascimento, profissao, empresa, comentario, maladireta, id_endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                    var valores = [req.body.nome, req.body.email, req.body.nascimento, req.body.profissao, req.body.empresa, req.body.comentario, req.body.maladireta, ultimo_endereco];

                    conexao.query(sql, valores, function (errors, results) {
                        if (errors) {

                            console.log("A tentativa de registrar o contato falhou. " + errors);
                            res.redirect(pagina + "?error=true");

                        } else {

                            console.log("Novo contato recebido com sucesso. Dados = " + valores);
                            res.redirect(pagina + "?error=false");

                        }
                    });
                }
            });
        }
    });
});