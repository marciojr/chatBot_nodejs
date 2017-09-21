# chatBot_Nodejs
>ChatBot usando Nodejs, usado para aprendizado. 
https://tutorials.botsfloor.com/creating-a-simple-facebook-messenger-ai-bot-with-api-ai-in-node-js-50ae2fa5c80d
## Instalando Heroku no linux

>sudo add-apt-repository "deb https://cli-assets.heroku.com/branches/stable/apt ./"
curl -L https://cli-assets.heroku.com/apt/release.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install heroku

## Clonando e Usando aplicação simples como tutorial (Caso Precise)

>git clone https://github.com/heroku/node-js-getting-started.git
$ cd node-js-getting-started

## Deploy the app

>heroku create
git push heroku master
heroku ps:scale web=1

## Procfile

>Eu devo criar um arquivo chamado Procfile e nele, adicionar o comando que deve ser compilado inicialmente.
Ex: procfile [ web: node --debug=5858 index.js ]

## Verifcando quantos serviços estão sendo usados no momento (como containers)

>heroku ps

## Declarando as dependencias do app 

>É atráves do package.json, que pode ser criado usando o comando "npm init --yes"

{
  "name": "node-js-getting-started",
  "version": "0.2.6",
  ...
  "engines": {
    "node": "6.10.2"
  },
  "dependencies": {
    "ejs": "2.5.6",
    "express": "4.15.2"
  },
  ...
}
Ao final, rodar comando para instalar dependencias no repositorio local

npm install

continua...

https://devcenter.heroku.com/articles/deploying-nodejs


