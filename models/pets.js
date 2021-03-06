const conexao = require("../infraestrutura/database/conexao");
const uploadDeArquivo = require("../infraestrutura/arquivos/uploadDeArquivos");

class Pet {
  adiciona(pet, res) {
    const query = "INSERT INTO Pets SET ?";
    console.log("Função Adiciona");
    console.log(pet);
    console.log(pet.imagem);
    console.log(pet.nome);

    uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
      if (erro) {
          res.status(400).json({ erro })
      } else {
        const novoPet = { nome: pet.nome, imagem: novoCaminho };

        conexao.query(query, novoPet, (erro) => {
          if (erro) {
            console.log(erro);
            res.status(400).json(erro);
          } else {
            res.status(200).json(novoPet);
          }
        });
      }
    });
  }
}

module.exports = new Pet();
