# School-Management-Backend

<p align="center">
  <img alt="logo" src=".github/logo.png" width="25%">
</p>

<h2 align="center">
  Este é o servidor de um app de gestão escolar desenvolvido em Node JS, Express, Prisma e PostgreSQL.
</h2>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/areasflavio/school-management-backend.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/areasflavio/school-management-backend.svg">

  <a href="https://github.com/areasflavio/school-management-backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/areasflavio/school-management-backend.svg">
  </a>
</p>

<p align="center">
  <a href="#star-features">Features</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer-API-Reference">API</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#keyboard-technologies">Tecnologias</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer_mouse-installation">Instalação</a>
</p>

# :star: Features

[(Back to top)](#School-Management-Backend)

Esta é uma API de servidor para um aplicativo de gerenciamento escolar.
Você pode gerenciar os dados para alunos e funcionários das escolas.

Algumas características principais são:

- CRUD para alunos
- CRUD para funcionários
- CRUD para usuários
- Criação de conta de usuário.
- Rotas protegidas.
- Controle de acesso usando roles.
- A senha é criptografada com o pacote Bcrypt.
- Rotas autenticadas usando JWT Token.
- Upload de arquivo com Multer.
- Codebase é coberto por testes com Vitest e Supertest.
- Documentação completa com Swagger.

O aplicativo é construído usando Node.JS com framework Express. O banco de dados é
o PostgreSQL conectado pelo Prisma. Toda a base de código é escrita usando Typescript.

<br/>

# :computer: API-Reference

[(Back to top)](#School-Management-Backend)

## Roles

- Admin
- User

## Rotas

## Autenticação

### Sign up

```http
  POST /api/sign-up
```

| Body                   | Type     | Description                    |
| :--------------------- | :------- | :----------------------------- |
| `email`                | `string` | **Required**. Email do usuário |
| `password`             | `string` | **Required**. Senha do usuário |
| `passwordConfirmation` | `string` | **Required**. Senha do usuário |

### Sign in

```http
  POST /api/sign-in
```

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**. Email do usuário |
| `password` | `string` | **Required**. Senha do usuário |

<br/>

> As rotas abaixo são autenticadas

## Usuários

### Listas todos os usuários

```http
  GET /api/usuarios
```

### Detalhes de um usuário

```http
  GET /api/usuarios/:id
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Id do usuário |

> As rotas permitidas somente para admin

### Criar um usuário

```http
  POST /api/usuarios
```

| Body                   | Type          | Description                    |
| :--------------------- | :------------ | :----------------------------- |
| `email`                | `string`      | **Required**. Email do usuário |
| `password`             | `string`      | **Required**. Senha do usuário |
| `passwordConfirmation` | `string`      | **Required**. Senha do usuário |
| `role`                 | `admin, user` | Permissão do usuário           |

### Editar um usuário

```http
  PUT /api/usuarios/:id
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Id do usuário |

| Body       | Type          | Description          |
| :--------- | :------------ | :------------------- |
| `email`    | `string`      | Email do usuário     |
| `password` | `string`      | Senha do usuário     |
| `role`     | `admin, user` | Permissão do usuário |

### Deletar um usuário

```http
  DELETE /api/usuarios/:id
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Id do usuario |

<br/>

## Alunos

### Listas todos os alunos

```http
  GET /api/alunos
```

### Detalhes de um aluno

```http
  GET /api/alunos/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Id do aluno |

> As rotas permitidas somente para admin

### Criar um aluno

```http
  POST /api/alunos
```

| Body               | Type             | Description                                    |
| :----------------- | :--------------- | :--------------------------------------------- |
| `matricula`        | `string`         | **Required**. Registro de Matrícula do aluno   |
| `nome`             | `string`         | **Required**. Nome do aluno                    |
| `status`           | `ativo, inativo` | **Required**. Status do aluno                  |
| `serie`            | `string`         | **Required**. Série em que se encontra o aluno |
| `email`            | `string`         | **Required**. Email do aluno                   |
| `RG`               | `string`         | Documento RG do aluno                          |
| `CPF`              | `string`         | Documento CPF do aluno                         |
| `nascimento`       | `date`           | **Required**. Data de nascimento do aluno      |
| `sexo`             | `M, F , ND`      | **Required**. Sexo de Aluno                    |
| `endereço`         | `string`         | **Required**. Data de nascimento do aluno      |
| `nomePai`          | `string`         | Nome do pai do aluno                           |
| `telefonePai`      | `string`         | Telefone do pai do aluno                       |
| `nomeMae`          | `string`         | Nome da mãe do aluno                           |
| `telefoneMae`      | `string`         | Telefone da mãe do aluno                       |
| `emailResponsavel` | `string`         | **Required**. Email do responsável pelo aluno  |
| `file`             | `file`           | **Required**. Avatar do aluno                  |

### Editar um aluno

```http
  PUT /api/alunos/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Id do aluno |

| Body               | Type             | Description                      |
| :----------------- | :--------------- | :------------------------------- |
| `matricula`        | `string`         | Registro de Matrícula do aluno   |
| `nome`             | `string`         | Nome do aluno                    |
| `status`           | `ativo, inativo` | Status do aluno                  |
| `serie`            | `serie`          | Série em que se encontra o aluno |
| `email`            | `string`         | Email do aluno                   |
| `RG`               | `string`         | Documento RG do aluno            |
| `CPF`              | `string`         | Documento CPF do aluno           |
| `nascimento`       | `date`           | Data de nascimento do aluno      |
| `sexo`             | `M, F , ND`      | Sexo de Aluno                    |
| `endereço`         | `string`         | Data de nascimento do aluno      |
| `nomePai`          | `string`         | Nome do pai do aluno             |
| `telefonePai`      | `string`         | Telefone do pai do aluno         |
| `nomeMae`          | `string`         | Nome da mãe do aluno             |
| `telefoneMae`      | `string`         | Telefone da mãe do aluno         |
| `emailResponsavel` | `string`         | Email do responsável pelo aluno  |
| `file`             | `file`           | Avatar do aluno                  |

### Deletar um aluno

```http
  DELETE /api/alunos/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Id do aluno |

<br/>

## Funcionários

### Listas todos os funcionários

```http
  GET /funcionarios
```

### Detalhes de um funcionário

```http
  GET /funcionarios/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. Id do funcionário |

> As rotas permitidas somente para admin

### Criar um funcionário

```http
  POST /funcionarios
```

| Body           | Type                                            | Description                                        |
| :------------- | :---------------------------------------------- | :------------------------------------------------- |
| `registro`     | `string`                                        | **Required**. Registro do funcionário              |
| `nome`         | `string`                                        | **Required**. Nome do funcionário                  |
| `email`        | `string`                                        | **Required**. Email do funcionário                 |
| `status`       | `ativo, inativo`                                | **Required**. Status do funcionário                |
| `vinculo`      | `Contratado, Concursado,  Substituto`           | **Required**. Vínculo empregatício do funcionário  |
| `admissao`     | `date`                                          | **Required**. Date de admissão de Funcionário      |
| `cargo`        | `Direção, Coordenação, Secretaria, Professor`   | **Required**. Cargo empregatício do funcionário    |
| `RG`           | `string`                                        | **Required**. Documento RG do funcionário          |
| `CPF`          | `string`                                        | **Required**. Documento CPF do funcionário         |
| `nascimento`   | `date`                                          | **Required**. Data de nascimento do funcionário    |
| `sexo`         | `M, F , ND`                                     | **Required**. Sexo de Funcionário                  |
| `escolaridade` | `Graduação, Pós-graduação, Mestrado, Doutorado` | **Required**. Nível de escolaridade do funcionário |
| `endereço`     | `string`                                        | **Required**. Data de nascimento do funcionário    |
| `file`         | `file`                                          | **Required**. Avatar do funcionário                |

### Editar um funcionário

```http
  PUT /funcionarios/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. Id do funcionário |

| Body           | Type                                            | Description                          |
| :------------- | :---------------------------------------------- | :----------------------------------- |
| `registro`     | `string`                                        | Registro do funcionário              |
| `nome`         | `string`                                        | Nome do funcionário                  |
| `email`        | `string`                                        | Email do funcionário                 |
| `status`       | `ativo, inativo`                                | Status do funcionário                |
| `vinculo`      | `Contratado, Concursado,  Substituto`           | Vínculo empregatício do funcionário  |
| `admissao`     | `date`                                          | Date de admissão de Funcionário      |
| `cargo`        | `Direção, Coordenação, Secretaria, Professor`   | Cargo empregatício do funcionário    |
| `RG`           | `string`                                        | Documento RG do funcionário          |
| `CPF`          | `string`                                        | Documento CPF do funcionário         |
| `nascimento`   | `date`                                          | Data de nascimento do funcionário    |
| `sexo`         | `M, F , ND`                                     | Sexo de Funcionário                  |
| `escolaridade` | `Graduação, Pós-graduação, Mestrado, Doutorado` | Nível de escolaridade do funcionário |
| `endereço`     | `string`                                        | Data de nascimento do funcionário    |
| `file`         | `file`                                          | Avatar do funcionário                |

### Deletar um funcionário

```http
  DELETE /funcionarios/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. Id do funcionário |

<br/>

# :keyboard: Technologies

[(Back to top)](#School-Management-Backend)

Isto é o que foi usado e aprendemos com este projeto:

- [x] Node.JS
- [x] Express
- [x] Prisma
- [x] PostgreSQL
- [x] Bcrypt
- [x] JsonWebToken
- [x] Multer
- [x] Eslint
- [x] Husky
- [x] LintStaged
- [x] Vitest
- [x] Supertest
- [x] Swagger
- [x] Typescript

<br/>

# :computer_mouse: Installation

[(Back to top)](#School-Management-Backend)

Para usar este projeto, primeiro você precisa de NodeJS e PostgreSQL rodando em sua máquina,
então você pode seguir os comandos abaixo:

```bash
# Clonar o repositório
git clone https://github.com/areasflavio/school-management-backend.git

# Entrar na pasta
cd school-management-backend

# Instalar dependências para o backend
npm install

# Copie o .env.example para o arquivo .env e injete suas credenciais
cp .env.example .env

# Para rodar os testes copie o .env.test.example para o arquivo .env.test e injete suas credenciais
cp .env.test.example .env.test

# Certifique-se de ter um banco de dados adequado criado

# Execute as migrations dos banco de dados
npm run migrate:dev && npm run migrate:test

# Para iniciar o servidor http de desenvolvimento, execute o seguinte comando
npm run start:dev
```
