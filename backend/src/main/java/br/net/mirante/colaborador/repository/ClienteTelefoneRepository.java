package br.net.mirante.colaborador.repository;

import br.net.mirante.colaborador.domain.model.ClienteTelefone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteTelefoneRepository extends JpaRepository<ClienteTelefone, Long> {
}
