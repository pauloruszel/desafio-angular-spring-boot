# Bem-vindo ao Sis Client - API
O Projeto consiste em um CRUD para salvar Clientes, porém fazendo autenticação com Spring Security e JWT - autenticação baseada em token.

Onde um usuário poderá se autenticar no sistema com duas contas diferentes:

### 1- Usuário admin
Senha 123456

Esse usuário possui permissão total no sistema.

### 2- Usuário comum
Senha 123456

Esse usuário só tem permissão de visualização dos dados.


- [X] Backend - API Rest
- [ ] Frontend

# Ambiente de desenvolvimento

Existem alguns passos para execução do projeto em ambiente local, necessário que alguns programas estejam corretamente instalados.

Framework/lib | Versão Recomendada | S.O Utilizado
--- | --- | ---
[Maven](https://maven.apache.org/download.cgi) | 3.6.3 | Windows
[JDK](https://openjdk.java.net/projects/jdk/12/) | 12 | Windows
[Docker](https://docs.docker.com/docker-for-windows/install/) | 20.10.0 | Windows
[Docker Compose](https://docs.docker.com/compose/install/) | 1.27.4 | Windows
[Intellij](https://www.jetbrains.com/pt-br/idea/)| - | Windows


## Execução do projeto

### Passo 1
Faça o clone do projeto
```shell script
$ git clone https://github.com/pauloruszel/desafio-angular-spring-boot.git desafio-cliente
```

### Passo 2
Entre na pasta raiz do projeto

```shell script
$ cd desafio-cliente
```

### Passo 3

```shell script
$ cd backend
```

### Passo 4
Executar o comando do maven para gerar o artefato que será publicado no docker

```shell script
$ mvn clean package -DskipTests
```

### Passo 5
Voltar para pasta raiz

```shell script
$ cd ..
```

### Passo 6
Execute o comando para levantar toda infraestrutura necessária

```shell script
$ docker-compose up --build
```

Acompanhar logs:
```shell script
$ docker-compose logs -f
```

### Passo 7
Caso haja problemas com a criação das tabelas pela imagem Docker (postgresql):

Há um arquivo chamado <code>init.sql</code> na raiz do projeto, com um script de DDL e INSERT para auxiliar na subida do projeto.
