package br.net.mirante.colaborador.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDTO implements BaseDTO {

    private Long id;

    @NotBlank
    @Size(min = 3, max = 100)
    private String nome;

    @NotBlank
    @Size(max = 11)
    private String cpf;

    private EnderecoDTO endereco;
    private EmailDTO email;
    private TelefoneDTO telefone;

}
