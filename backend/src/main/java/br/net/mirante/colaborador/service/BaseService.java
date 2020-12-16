package br.net.mirante.colaborador.service;

import org.modelmapper.ModelMapper;

public class BaseService {

    ModelMapper getConverter() {
        return new ModelMapper();
    }
}
