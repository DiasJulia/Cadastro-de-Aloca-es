# Seleção Reciprev

Você pode acessar o projeto publicado aqui: [Link para aplicação](https://p3000-z1ba3a963-z32c5ffa7-gtw.z1304890a.xmx.sh)

# Descrição
Esse repositório contém um sistema gerenciador de alocações financeiras realizadas em fundos de investimentos disponíveis no site da CVM. Nele, é possível cadastrar operações de compra e venda de cotas em fundos de investimentos, bem como visualizar informações sobre essas alocações, o histórico de operações e dados sobre o saldo atual das aplicações.

O sistema consulta os dados disponibilizados no site da CVM para oferecer ao usuário sugestões do preço da cota no momento do cadastro, caso o mesmo utilize um CNPJ e uma data presente nos dados disponíveis, bem como pra calcular o valor mais atual do saldo de aplicação no fundo a partir da multiplicação da quantidade de cotas possuídas pelo valor mais atual da cota disponível no site ( Caso o CNPJ em questão seja válido ).

## Pré-requisitos

Antes de começar, verifique se você possui o Docker e o Docker Compose instalados na sua máquina. Você também deve ter o Node.js instalado para desenvolvimento local.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)

## Configuração

1. Clone este repositório para a sua máquina:

   ```bash
   git clone https://github.com/DiasJulia/Cadastro-de-Aloca-es.git
   cd Cadastro-de-Aloca-es
   ```

## Para visualizar

1. Inicie os contêineres:

    Na raiz do projeto, execute o seguinte comando:

    ```bash
    docker-compose up --build
    ```

    ou, caso esteja usando windows:

    ```bash
    docker compose up --build
    ```

2. Acesse o aplicativo:

    Após iniciar os contêineres, você poderá acessar o aplicativo em um navegador da web: http://localhost:3000 se você estiver executando localmente.
    
    O servidor pode ser acessado por http://localhost/3001. Observe que é possível visualizar a documentação da API, com as rotas disponíveis no sistema, em http://localhost/3001/docs ( Esse link também fica disponível ao executar o projeto em modo de desenvolvimento ).
    Certifique-se de que todos os contêineres estejam em execução sem erros.

## Para executar como desenvolvedor:

É possível executar o projeto fora dos containeres, caso deseje.

1. execute o container postgres gerado na etapa anterior

2. Execute os testes do servidor:
    Na raíz do projeto, execute:

    ```bash
    cd ./server/
    npm i
    npm run test
   ```

3. Configure o servidor:
    No arquivo ./server/src/data-source.ts altere o seguinte trecho:

    ```javascript
    host: "postgres"
    ```

    para:

    ```javascript
    host: "localhost"
    ```
    
    Na raíz do projeto, execute:

    ```bash
    cd ./server/
    npm i
    npm run dev
   ```

4. Caso queira executar os testes e em seguida iniciar o servidor localmente, execute:

   ```bash
    cd ./server/
    npm i
    npm run test-and-start
   ```

5. Configure o cliente:

    Na raíz do projeto, execute:

    ```bash
    cd ./client/
    npm i
    npm run dev
   ```

## Para executar os testes automatizados:
A aplicação conta com testes automatizados tanto no server quanto no client, certifique-se de que você possui as dependencias necesárias.

1. Testes do Servidor:

    Os testes do servidor foram configurados utilizando jest, é possível visualizá-los na pasta server/tests/

    Na raíz do projeto, execute:

    ```bash
    cd ./server/
    npm i
    npm run test
   ```

2. Testes do Cliente:

    Os testes do cliente foram configurados utilizando cypress, foram desenvolvidos testes End to End acerca das funcionalidades principais. É possível excutá-los tanto por meio do terminal quanto por meio da CLI do cypress

    a. Para rodar no terminal, execute:
        
    ```bash
    cd ./client/
    npm i
    npm run cypress
   ```

   a. Para rodar na CLI, execute:
        
    ```bash
    cd ./client/
    npm i
    npm run cypress:open
   ```
   
## Status
Produto final