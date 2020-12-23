package br.net.mirante.colaborador.security.services;

import br.net.mirante.colaborador.domain.model.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@EqualsAndHashCode
public class UsuarioDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String usuario;

    private String email;

    @JsonIgnore
    private String senha;

    private Collection<? extends GrantedAuthority> authorities;

    public UsuarioDetailsImpl(Long id, String usuario, String email, String senha,
                              Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.usuario = usuario;
        this.email = email;
        this.senha = senha;
        this.authorities = authorities;
    }

    public static UsuarioDetailsImpl build(Usuario usuario) {
        List<GrantedAuthority> authorities = usuario.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getNome().name()))
                .collect(Collectors.toList());

        return new UsuarioDetailsImpl(
                usuario.getId(),
                usuario.getUsuario(),
                usuario.getEmail(),
                usuario.getSenha(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return usuario;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
