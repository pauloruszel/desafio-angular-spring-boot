package br.net.mirante.colaborador.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TB_Telefone")
@AttributeOverride(name = "id", column = @Column(name = "idTelefone", unique = true, nullable = false, length = 4, precision = 10))
public class Telefone extends BaseEntity {

    @Column(name = "nrTelefone", length = 20)
    private String numeroTelefone;

    @OneToOne
    @JoinColumn(name = "idTipoTelefone", referencedColumnName = "idtipoTelefone")
    private TipoTelefone tipoTelefone;
}
