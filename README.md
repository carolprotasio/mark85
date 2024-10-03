# Mark85 - Testes de API REST com Cypress

## 🚀 Sobre o Projeto
Mark85 é uma aplicação de gerenciamento de tarefas que permite aos usuários cadastrar, criar, excluir, e marcar tarefas como concluídas. O fluxo principal do aplicativo envolve o cadastro de novos usuários, login, e manipulação das tasks, o que exige que o usuário crie uma conta para gerenciar suas tarefas. Este projeto de **testes automatizados de API REST** foi desenvolvido para garantir que as funcionalidades da API do Mark85 estejam funcionando corretamente. Os testes foram feitos utilizando o **Cypress**. As rotas da API foram identificadas através de testes manuais utilizando o DevTools do navegador e para para testar as requisições HTTP foi usado o **Insomnia**. O objetivo principal é testar o comportamento da API, garantindo que todas as operações cruciais (como autenticação, criação, atualização e exclusão de tarefas) estejam sendo executadas conforme o esperado.    

<img src="https://github.com/carolprotasio/mark85/blob/main/assets/register.png" alt="web" width="800"/>
<img src="https://github.com/carolprotasio/mark85/blob/main/assets/tasks.png" alt="web" width="800"/>

## 🛠️ Tecnologias Utilizadas

- Cypress
- JavaScript
- NodeJs
- MongoDB
- RabbitMQ
- Insomnia
- Allure Report 

<img src="https://github.com/carolprotasio/mark85/blob/main/assets/allure-overview.png" alt="web" width="400"/>
<img src="https://github.com/carolprotasio/mark85/blob/main/assets/insomnia.png" alt="web" width="400"/>

## 🔍 Cenários e Casos de Teste

### 1. Cadastro de Novo Usuário
**Objetivo**: Testar a criação de um novo usuário.

- **Cenário 1**: Usuário consegue cadastrar-se com sucesso.
    - **Dado** que o usuário informa dados válidos no formulário de cadastro,
    - **Quando** envia o formulário,
    - **Então** um novo usuário deve ser criado, gerando um ID único.

- **Cenário 2**: Validação de campos obrigatórios.
    - **Dado** que o usuário deixa campos obrigatórios em branco,
    - **Quando** tenta enviar o formulário,
    - **Então** uma mensagem de erro apropriada deve ser exibida.

### 2. Login de Usuário
**Objetivo**: Garantir que o login de usuários esteja funcionando corretamente.

- **Cenário 1**: Usuário faz login com credenciais válidas.
    - **Dado** que o usuário está cadastrado e fornece credenciais válidas,
    - **Quando** envia o formulário de login,
    - **Então** um token de autenticação deve ser gerado.

- **Cenário 2**: Tentativa de login com credenciais inválidas.
    - **Dado** que o usuário insere credenciais incorretas,
    - **Quando** tenta efetuar login,
    - **Então** uma mensagem de erro deve ser exibida.

### 3. Criação de Task
**Objetivo**: Testar a criação de novas tarefas.

- **Cenário 1**: Usuário cria uma nova task com sucesso.
    - **Dado** que o usuário está autenticado e preenche os dados da tarefa,
    - **Quando** envia a solicitação para criar a task,
    - **Então** a task deve ser salva no sistema com um ID exclusivo.

- **Cenário 2**: Criação de task sem autenticação.
    - **Dado** que o usuário não está autenticado,
    - **Quando** tenta criar uma task,
    - **Então** uma mensagem de erro de autenticação deve ser exibida.

### 4. Exclusão de Task
**Objetivo**: Validar a funcionalidade de exclusão de tarefas.

- **Cenário 1**: Usuário exclui uma task com sucesso.
    - **Dado** que o usuário está autenticado e possui tasks cadastradas,
    - **Quando** envia a solicitação de exclusão,
    - **Então** a task deve ser removida da lista.

- **Cenário 2**: Tentativa de exclusão de task inexistente.
    - **Dado** que o usuário tenta excluir uma task que não existe,
    - **Quando** envia a solicitação,
    - **Então** uma mensagem de erro deve ser exibida.

### 5. Atualização do Status da Task (Marcar como Done)
**Objetivo**: Testar a funcionalidade de alteração do status de uma task para concluída.

- **Cenário 1**: Usuário marca uma task como done com sucesso.
    - **Dado** que o usuário está autenticado e tem tasks em aberto,
    - **Quando** seleciona a opção para marcar como concluída,
    - **Então** o status da task deve ser atualizado.

- **Cenário 2**: Tentativa de marcar uma task já concluída como done.
    - **Dado** que o usuário tenta concluir uma task que já está marcada como done,
    - **Quando** realiza a ação,
    - **Então** uma mensagem informativa deve ser exibida.

<img src="https://github.com/carolprotasio/mark85/blob/main/assets/cli.png" alt="web" width="700"/>
<img src="https://github.com/carolprotasio/mark85/blob/main/assets/allure-packages.png" alt="web" width="700"/>

## Rotas Testadas

- **POST /users** - Criação de novo usuário
- **POST /sessions** - Login de usuário
- **POST /tasks** - Criação de nova task
- **GET /tasks** - Listar todas as tasks
- **PUT /tasks/{taskId}** - Atualizar status de uma task
- **DELETE /tasks/{taskId}** - Excluir uma task

# ✅ Conclusão
Este projeto foi desenvolvido como parte do curso da QA Xperience na Udemy, com o objetivo de aplicar testes automatizados em API, utilizando Cypress, MongoDB e RabbitMQ para garantir o funcionamento correto do sistema.

  
