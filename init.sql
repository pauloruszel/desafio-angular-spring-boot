CREATE DATABASE projetoclientedb;

-- DROP TABLE public.tb_role;

CREATE TABLE public.tb_role
(
    id_role bigserial   NOT NULL,
    nome    varchar(20) NULL,
    CONSTRAINT tb_role_pkey PRIMARY KEY (id_role)
);

-- DROP TABLE public.tb_usuario;

CREATE TABLE public.tb_usuario
(
    id_usuario bigserial    NOT NULL,
    email      varchar(50)  NULL,
    senha      varchar(120) NULL,
    usuario    varchar(20)  NULL,
    CONSTRAINT tb_usuario_pkey PRIMARY KEY (id_usuario),
    CONSTRAINT tb_usuario_usuario UNIQUE (usuario),
    CONSTRAINT tb_usuario_email UNIQUE (email)
);

-- DROP TABLE public.user_roles;

CREATE TABLE public.user_roles
(
    user_id int8 NOT NULL,
    role_id int8 NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id),
    CONSTRAINT user_roles_usuario FOREIGN KEY (user_id) REFERENCES tb_usuario(id_usuario),
    CONSTRAINT user_roles_role FOREIGN KEY (role_id) REFERENCES tb_role (id_role)
);

-- DROP TABLE public.tb_email;

CREATE TABLE public.tb_email
(
    id_email bigserial   NOT NULL,
    ds_email varchar(70) NULL,
    CONSTRAINT tb_email_pkey PRIMARY KEY (id_email)
);


-- DROP TABLE public.tb_endereco;

CREATE TABLE public.tb_endereco
(
    id_endereco    bigserial    NOT NULL,
    ds_bairro      varchar(50)  NOT NULL,
    ds_cep         varchar(8)   NOT NULL,
    ds_cidade      varchar(50)  NOT NULL,
    ds_complemento varchar(100) NULL,
    ds_logradouro  varchar(100) NOT NULL,
    sg_uf          varchar(2)   NOT NULL,
    CONSTRAINT tb_endereco_pkey PRIMARY KEY (id_endereco)
);


-- DROP TABLE public.tb_tipo_telefone;

CREATE TABLE public.tb_tipo_telefone
(
    id_tipo_telefone bigserial   NOT NULL,
    ds_tipo_telefone varchar(60) NULL,
    CONSTRAINT tb_tipo_telefone_pkey PRIMARY KEY (id_tipo_telefone)
);


-- DROP TABLE public.tb_cliente;

CREATE TABLE public.tb_cliente
(
    id_cliente  bigserial    NOT NULL,
    cpf         varchar(11)  NULL,
    nome        varchar(100) NULL,
    id_endereco int8         NULL,
    CONSTRAINT tb_cliente_pkey PRIMARY KEY (id_cliente),
    CONSTRAINT tb_cliente_cpf UNIQUE (cpf),
    CONSTRAINT tb_cliente_nome UNIQUE (nome),
    CONSTRAINT tb_cliente_endereco FOREIGN KEY (id_endereco) REFERENCES tb_endereco (id_endereco)
);


-- DROP TABLE public.tb_telefone;

CREATE TABLE public.tb_telefone
(
    id_telefone      bigserial   NOT NULL,
    nr_telefone      varchar(20) NULL,
    id_tipo_telefone int8        NULL,
    CONSTRAINT tb_telefone_pkey PRIMARY KEY (id_telefone),
    CONSTRAINT tb_telefone_tipo_telefone FOREIGN KEY (id_tipo_telefone) REFERENCES tb_tipo_telefone (id_tipo_telefone)
);


-- DROP TABLE public.cliente_emails;

CREATE TABLE public.cliente_emails
(
    id_cliente int8 NOT NULL,
    id_email   int8 NOT NULL,
    CONSTRAINT cliente_emails_pkey PRIMARY KEY (id_cliente, id_email),
    CONSTRAINT cliente_emails_email FOREIGN KEY (id_email) REFERENCES tb_email (id_email),
    CONSTRAINT cliente_emails_cliente FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente)
);


-- DROP TABLE public.cliente_telefones;

CREATE TABLE public.cliente_telefones
(
    id_cliente  int8 NOT NULL,
    id_telefone int8 NOT NULL,
    CONSTRAINT cliente_telefones_pkey PRIMARY KEY (id_cliente, id_telefone),
    CONSTRAINT cliente_telefones_telefone FOREIGN KEY (id_telefone) REFERENCES tb_telefone (id_telefone),
    CONSTRAINT cliente_telefones_cliente FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente)
);

-- INSERTS DAS ROLES
INSERT INTO public.tb_role (nome) VALUES('ROLE_USER');
INSERT INTO public.tb_role (nome) VALUES('ROLE_MODERATOR');
INSERT INTO public.tb_role (nome) VALUES('ROLE_ADMIN');

-- INSERTS DOS TIPOS DE CONTATO
INSERT INTO public.tb_tipo_telefone (ds_tipo_telefone) VALUES('RESIDENCIAL');
INSERT INTO public.tb_tipo_telefone (ds_tipo_telefone) VALUES('COMERCIAL');
INSERT INTO public.tb_tipo_telefone (ds_tipo_telefone) VALUES('CELULAR');

-- INSERTS DE CLIENTE
INSERT INTO public.tb_telefone (nr_telefone, id_tipo_telefone) VALUES ('61989965059', 3);
INSERT INTO public.tb_endereco (ds_bairro, ds_cep, ds_cidade, ds_complemento, ds_logradouro, sg_uf) VALUES ('Sé', '01001000', 'São Paulo', 'lado ímpar', 'Praça da Sé', 'SP');
INSERT INTO public.tb_cliente (cpf, nome, id_endereco) VALUES (83803955149, 'Calebe Tomás Theo Vieira', 1);
INSERT INTO public.tb_email (ds_email) VALUES ('calebetomastheovieira@mectron.com.br');
INSERT INTO public.cliente_emails (id_cliente, id_email) VALUES(1, 1);
INSERT INTO public.cliente_telefones (id_cliente, id_telefone) VALUES(1, 1);
