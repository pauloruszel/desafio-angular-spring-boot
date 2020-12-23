CREATE DATABASE projetoclientedb;

CREATE TABLE public.roles
(
    id_role bigserial    NOT NULL,
    nome    varchar(255) NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (id_role)
);

CREATE TABLE public.usuarios
(
    id_usuario   bigserial    NOT NULL,
    email        varchar(50)  NULL,
    nome_usuario varchar(20)  NULL,
    senha        varchar(120) NULL,
    CONSTRAINT usuarios_email UNIQUE (email),
    CONSTRAINT usuarios_nome_usuario UNIQUE (nome_usuario),
    CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario)
);

CREATE TABLE public.user_roles
(
    user_id int8 NOT NULL,
    role_id int8 NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id),
    CONSTRAINT user_roles_usuario FOREIGN KEY (user_id) REFERENCES usuarios (id_usuario),
    CONSTRAINT user_roles_role FOREIGN KEY (role_id) REFERENCES roles (id_role)
);

-- INSERTS DAS ROLES
INSERT INTO public.roles (id_role, nome) VALUES(1, 'ROLE_USER');
INSERT INTO public.roles (id_role, nome) VALUES(2, 'ROLE_MODERATOR');
INSERT INTO public.roles (id_role, nome) VALUES(3, 'ROLE_ADMIN');

CREATE TABLE public.tb_email
(
    id_email bigserial   NOT NULL,
    ds_email varchar(70) NULL,
    CONSTRAINT tb_email_pkey PRIMARY KEY (id_email)
);


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


CREATE TABLE public.tb_tipo_telefone
(
    id_tipo_telefone bigserial   NOT NULL,
    ds_tipo_telefone varchar(60) NULL,
    CONSTRAINT tb_tipo_telefone_pkey PRIMARY KEY (id_tipo_telefone)
);

CREATE TABLE public.tb_cliente
(
    id_cliente  bigserial    NOT NULL,
    ds_cpf      varchar(11)  NOT NULL,
    nm_cliente  varchar(100) NOT NULL,
    id_endereco int8         NULL,
    CONSTRAINT tb_cliente_pkey PRIMARY KEY (id_cliente),
    CONSTRAINT tb_cliente_endereco FOREIGN KEY (id_endereco) REFERENCES tb_endereco (id_endereco)
);


CREATE TABLE public.tb_cliente_email
(
    id_cliente_email bigserial NOT NULL,
    id_cliente       int8      NULL,
    id_email         int8      NULL,
    CONSTRAINT tb_cliente_email_pkey PRIMARY KEY (id_cliente_email),
    CONSTRAINT cliente_email_cliente FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente),
    CONSTRAINT tb_cliente_email_email FOREIGN KEY (id_email) REFERENCES tb_email (id_email)
);


CREATE TABLE public.tb_telefone
(
    id_telefone      bigserial   NOT NULL,
    nr_telefone      varchar(20) NULL,
    id_tipo_telefone int8        NULL,
    CONSTRAINT tb_telefone_pkey PRIMARY KEY (id_telefone),
    CONSTRAINT tb_telefone_tipo_telefone FOREIGN KEY (id_tipo_telefone) REFERENCES tb_tipo_telefone (id_tipo_telefone)
);

CREATE TABLE public.tb_cliente_telefone
(
    id_cliente_telefone bigserial NOT NULL,
    id_cliente          int8      NULL,
    id_telefone         int8      NULL,
    CONSTRAINT tb_cliente_telefone_pkey PRIMARY KEY (id_cliente_telefone),
    CONSTRAINT tb_cliente_telefone_cliente FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente),
    CONSTRAINT tb_cliente_telefone_telefone FOREIGN KEY (id_telefone) REFERENCES tb_telefone (id_telefone)
);


-- INSERTS DE CLIENTE
INSERT INTO public.tb_tipo_telefone (ds_tipo_telefone) VALUES('RESIDENCIAL');
INSERT INTO public.tb_tipo_telefone (ds_tipo_telefone) VALUES('COMERCIAL');
INSERT INTO public.tb_tipo_telefone (ds_tipo_telefone) VALUES('CELULAR');

INSERT INTO public.tb_telefone (nr_telefone, id_tipo_telefone) VALUES('61989965059', 3);
INSERT INTO public.tb_endereco (ds_bairro, ds_cep, ds_cidade, ds_complemento, ds_logradouro, sg_uf) VALUES('Sé', '01001000', 'São Paulo', 'lado ímpar', 'Praça da Sé', 'SP');
INSERT INTO public.tb_cliente (ds_cpf, nm_cliente, id_endereco) VALUES(83803955149, 'Calebe Tomás Theo Vieira', 1);
INSERT INTO public.tb_email (ds_email) VALUES('calebetomastheovieira..calebetomastheovieira@mectron.com.br');
INSERT INTO public.tb_cliente_email (id_cliente, id_email) VALUES(1, 1);
INSERT INTO public.tb_cliente_telefone (id_cliente, id_telefone) VALUES(1, 1);
