package br.net.mirante.colaborador.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@AttributeOverride(name = "id", column = @Column(name = "idCliente", unique = true, nullable = false, length = 4, precision = 10))
@Table(	name = "TB_Cliente",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "nome"),
                @UniqueConstraint(columnNames = "cpf")
        })
public class Cliente extends BaseEntity {

    @Size(min = 3, max = 100)
    private String nome;

    @CPF
    @Size(max = 11)
    private String cpf;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idEndereco", referencedColumnName = "idendereco")
    private Endereco endereco;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(	name = "cliente_telefones",
            joinColumns = @JoinColumn(name = "id_cliente"),
            inverseJoinColumns = @JoinColumn(name = "id_telefone"))
    private Set<Telefone> telefones = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(	name = "cliente_emails",
            joinColumns = @JoinColumn(name = "id_cliente"),
            inverseJoinColumns = @JoinColumn(name = "id_email"))
    private Set<Email> emails = new HashSet<>();

}
