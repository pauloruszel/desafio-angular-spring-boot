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
@Table(name = "TB_ClienteEmail")
@AttributeOverride(name = "id", column = @Column(name = "idClienteEmail", unique = true, nullable = false, length = 4, precision = 10))
public class ClienteEmail extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "idCliente", referencedColumnName = "idcliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "idEmail", referencedColumnName = "idemail")
    private Email email;


}
