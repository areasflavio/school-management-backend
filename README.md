# Backend

- Linguagem: Typescript
- Framework: Express.js
- ORM: Prisma
- Database: PostgreSQL
- Testes: Vitest

## Features

- [x] CRUD completo para alunos
- [x] CRUD completo para funcionários
- [x] Autenticação com JWT
- [x] Rotas protegidas
- [x] Controle de acesso
- [ ] Documentação
- [ ] Cobertura de testes

## Frontend

[Repositório](https://github.com/paulojr-eco/COM222-Frontend)

[Figma](https://www.figma.com/file/kTLssDnNd3bfVetOcLuadz/Project-COM222?type=design&node-id=0-1&t=ZqsHUjzJ6ePt8mLe-0)

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

### Editar um funcionário

```http
  PUT /funcionarios/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. Id do funcionário |

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

### Deletar um funcionário

```http
  DELETE /funcionarios/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. Id do funcionário |

<br/>
