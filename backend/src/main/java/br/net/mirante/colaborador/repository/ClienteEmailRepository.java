package br.net.mirante.colaborador.repository;

import br.net.mirante.colaborador.domain.model.ClienteEmail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteEmailRepository extends JpaRepository<ClienteEmail, Long> {
}
