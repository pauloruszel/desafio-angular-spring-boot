package br.net.mirante.colaborador.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoDTO implements BaseDTO {

    private Long id;

    @NotBlank(message = "O campo CEP não pode estar em branco")
    private String cep;

    @NotBlank(message = "O campo Logradouro não pode estar em branco")
    private String logradouro;

    @NotBlank(message = "O campo Bairro não pode estar em branco")
    private String bairro;

    @NotBlank(message = "O campo Cidade não pode estar em branco")
    private String cidade;

    @NotBlank(message = "O campo UF não pode estar em branco")
    private String uf;

    private String complemento;

}
