package br.net.mirante.colaborador.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TB_Endereco")
@AttributeOverride(name = "id", column = @Column(name = "idEndereco", unique = true, nullable = false, length = 4, precision = 10))
public class Endereco extends BaseEntity {

    @NotBlank
    @Column(name = "dsCep", length = 8, nullable = false)
    private String cep;

    @NotBlank
    @Column(name = "dsLogradouro", length = 100, nullable = false)
    private String logradouro;

    @NotBlank
    @Column(name = "dsBairro", length = 50, nullable = false)
    private String bairro;

    @NotBlank
    @Column(name = "dsCidade", length = 50, nullable = false)
    private String cidade;

    @NotBlank
    @Column(name = "sgUf", length = 2, nullable = false)
    private String uf;

    @Column(name = "dsComplemento", length = 100)
    private String complemento;

}
