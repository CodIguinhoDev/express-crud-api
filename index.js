const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

let usuarios = [];
let id = 1;

app.post("/usuarios", (requisicao, resposta) => {
  const { nome, email } = requisicao.body;
  const novoUsuario = {
    idUsuario: id++,
    nome,
    email,
  };

  usuarios.push(novoUsuario);
  resposta.status(201).json(novoUsuario);
});

app.get("/usuarios", (requisicao, resposta) => {
  resposta.json(usuarios);
});

app.get("/usuarios/:id", (requisicao, resposta) => {
  const id = parseInt(requisicao.params.id);
  const usuario = usuarios.find(
    (identificador) => identificador.idUsuario === id,
  );
  if (!usuario) {
    return resposta.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  resposta.json(usuario);
});

app.put("/usuarios/:id", (requisicao, resposta) => {
  const id = parseInt(requisicao.params.id);
  const { nome, email } = requisicao.body;
  const usuario = usuarios.find((cliente) => cliente.idUsuario === id);

  if (!usuario) {
    return resposta.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  usuario.nome = nome ?? usuario.nome;
  usuario.email = email ?? usuario.email;

  resposta.json(usuario);
});

app.delete("/usuarios/:id", (requisicao, resposta) => {
  const id = parseInt(requisicao.params.id);
  usuarios = usuarios.filter(
    (clienteDeletado) => clienteDeletado.idUsuario !== id,
  );
  resposta.json({ mensagem: "Usuário deletado" });
});

app.listen(port, () => {
  console.log("Servidor rodando");
});
