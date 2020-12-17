package br.net.mirante.colaborador.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TB_Cliente")
@AttributeOverride(name = "id", column = @Column(name = "idCliente", unique = true, nullable = false, length = 4, precision = 10))
public class Cliente extends BaseEntity {

    @Size(min = 3, max = 100)
    @Column(name = "nmCliente", length = 100, nullable = false)
    private String nome;

    @CPF
    @Column(name = "dsCpf", length = 11, nullable = false)
    private String cpf;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idEndereco", referencedColumnName = "idendereco")
    private Endereco endereco;

}
