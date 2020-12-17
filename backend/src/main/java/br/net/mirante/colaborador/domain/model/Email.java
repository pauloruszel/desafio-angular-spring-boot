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
@Table(name = "TB_Email")
@AttributeOverride(name = "id", column = @Column(name = "idEmail", unique = true, nullable = false, length = 4, precision = 10))
public class Email extends BaseEntity {

    @Column(name = "dsEmail", length = 70)
    private String descricaoEmail;

}
