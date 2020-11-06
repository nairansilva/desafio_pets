# Desafio Pets
> Sistema para controle de Pets e seus Donos.

Este sistema possibilita o cadastro de pets e seus Respectivos donos, através de uma interface Web totalmente responsiva, leve e amigável.

## Setup do Projeto

Angular CLI: 10.2.0
Node: 14.13.1
Angular: 10.2.1
Po UI: 3.10.0

## Execução do Projeto

Após clonar o projeto, instale todas as dependencias executando o comando abaixo:

```sh
npm install
```

Em seguida faça o build do projeto:

```sh
ng build --prod
```

Acesse a pasta do build que foi criada e execute o comando abaixo:

```sh
dist/desafio_pets/
```
```sh
npx serve
```

Após executar o comando, o projeto projeto poderá ser acessado pelo seu navegador no endereço abaixo:

```sh
http://localhost:5000 
```

## Sobre o Projeto

* PWA:
    * Esse projeto foi desenvolvido como um PWA - Progressive Web App.

* Responsividade e Design:
    * O projeto foi desenvolvido utilizando a biblioteca de componentes Po UI, tornando-o naturalmente responsivo e com uma ótima identidade visual.

* API's:
    * Todos os dados exibidos no sistema, foram consumidos da API disponibilizada para a manutenção dos Donos e Pets.
	* Também foram utilizadas outras duas API's públicas: 
		* TheCatAPI - https://thecatapi.com
		* TheDogAPI - https://thedogapi.com 

* Páginas
    * Início: Essa página exibe um Dashboard bem modesto, com informações básicas.
	* Donos: Nesta página é possível realizar a manutenção dos Donos, como por exemplo: Cadastro, Exclusão e Alteração.
	* Pets: Nesta página é possível realizar a manutenção dos Pets, como por exemplo: Cadastro, Exclusão e Alteração.
