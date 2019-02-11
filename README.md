# KART RACE CHALLENGE

Script que ao processar o arquivo de log das voltas da corrida em questão encontrado na pasta "logs" na raíz do projeto, é feita a ordenação dos competidores por ordem de chegada e são recuperados os melhores momentos da corrida e de cada piloto. 

**O Script leva em consideração o tempo gasto para cruzar a linha de largada.**

## Pré-requisitos

É necessário NodeJs ^11.0.0 para executar esta aplicação.

## Primeiros passos

1. Execute `npm install --production` para instalar as depênciais necessárias para a execução do Script.

2. Execute `npm install` para instalar as depências necessárias para a execução dos Testes.

3. É possível rodar o Script diretamente no Typescript com o **ts-node**, mas para um ambiente fora do desenvolvimento é necessária a execução do comando 
`npm run build` para rodar através do Javascript gerado. 

## Rodando o Script

Execute `npm start` para rodar o Script e visualizar o resultado no Console.

## Rodando os Testes

Execute `npm test` para rodar os Testes Unitários.

## Cobertura de Código

Após a execução dos Testes Unitários é possível verificar o relatório de cobertura de código dos mesmos através da página html gerada. Essa página se encontrará na pasta "coverage", na raíz do projeto.

