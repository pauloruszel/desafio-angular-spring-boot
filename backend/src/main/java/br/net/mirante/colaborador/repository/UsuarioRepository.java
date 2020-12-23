package br.net.mirante.colaborador.repository;

import br.net.mirante.colaborador.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsuario(String usuario);

    Boolean existsByUsuario(String usuario);

    Boolean existsByEmail(String email);
}
