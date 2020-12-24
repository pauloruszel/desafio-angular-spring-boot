package br.net.mirante.colaborador.domain.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@AttributeOverride(name = "id", column = @Column(name = "idUsuario", unique = true, nullable = false))
@Table(	name = "TB_Usuario",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "usuario"),
                @UniqueConstraint(columnNames = "email")
        })
public class Usuario extends BaseEntity {

    @NotBlank
    @Size(max = 20)
    private String usuario;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String senha;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public Usuario(String usuario, String email, String senha) {
        this.usuario = usuario;
        this.email = email;
        this.senha = senha;
    }
}
