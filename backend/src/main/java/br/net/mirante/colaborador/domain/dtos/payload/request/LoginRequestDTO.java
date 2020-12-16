package br.net.mirante.colaborador.domain.dtos.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequestDTO {

    @NotBlank
    private String nomeUsuario;

    @NotBlank
    private String senha;

}
