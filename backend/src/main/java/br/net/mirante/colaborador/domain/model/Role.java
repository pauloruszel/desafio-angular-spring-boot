package br.net.mirante.colaborador.domain.model;

import br.net.mirante.colaborador.domain.enumeration.ERole;
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
@AttributeOverride(name = "id", column = @Column(name = "idRole", unique = true, nullable = false))
@Table(name = "TB_Role")
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole nome;
}
