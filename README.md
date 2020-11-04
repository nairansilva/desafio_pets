# Pet Shop Data Base por Luiz Nai

- Após clonar o projeto, entre na pasta **pets-data-base** e execute o comando **npm i**;
- Instale o Json Server para simular um banco de dados **npm install -g json-server**;
- Rode o seguinte comando para rodar o banco de dados fake **json-server --watch src/assets/data/db.json**;
- Abra um outro terminal e dentro da pasta **pets-data-base** rode o comando **ng serve --open**;
- O projeto irá abrir em uma nova aba.

## Notas sobre o projeto

- O projeto foi desenvolvido utilizando o Angular CLI 10.2.0, Bootstrap 3.4.1 e Json-Server para simular o back-end;
- Há um sistema de rotas para simular a navegação entre três "páginas": Intro, cadastro de dono e cadastro de pets;
- Só é possível cadastrar um pet, se houver pelo menos um dono cadastrado;
- Se o usuário remover um dono, todos os pets desse dono também serão deletados;
- Todos os campos são obrigatórios.

## Obrigado pela oportunidade :)
