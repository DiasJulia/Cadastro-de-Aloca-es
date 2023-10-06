Feature: Gestão de alocações financeiras em fundos de investimento
    Como um administrador do sistema
    Eu quero poder cadastrar, visualizar, editar e remover operações de compra e venda de cotas de fundos de investimento
    para que possa gerenciar as operações e saber o retorno sobre as alocações

Scenario: Visualização de informações de operações e retorno sobre fundos
Given há uma operação de "COMPRA" de "1" cotas no valor de "1" real sobre fundo de CNPJ "11.511.517/0001-61" e razão social "Fundo exemplo"
When eu consulto a página de listagem
Then eu posso ver as informações sobre o fundo de CNPJ "11.511.517/0001-61" e razão social "Fundo exemplo"

Scenario: Registro de compra de cotas de um novo fundo

Scenario: Registro de compra de cotas de um fundo que já possui operações registradas

Scenario: Registro de compra de cotas de um fundo que já possui operações registradas com uma razão social diferente

Scenario: Registro de venda de cotas de um fundo que possui cotas compradas

Scenario: Registro de venda de cotas de um fundo que não possui cotas compradas

Scenario: Registro de venda de cotas de um fundo sem operações previamente registradas

Scenario: Visualiação de histórico de operações

Scenario: Visualiação de histórico de operações em um intervalo de tempo

Scenario: Edição de operação

Scenario: Remoção de operação