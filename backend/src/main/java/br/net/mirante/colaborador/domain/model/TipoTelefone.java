package br.net.mirante.colaborador.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TB_TipoTelefone")
@AttributeOverride(name = "id", column = @Column(name = "idTipoTelefone", unique = true, nullable = false, length = 4, precision = 10))
public class TipoTelefone extends BaseEntity {

    @Column(name = "dsTipoTelefone", length = 60)
    private String descricaoTipoTelefone;

}
