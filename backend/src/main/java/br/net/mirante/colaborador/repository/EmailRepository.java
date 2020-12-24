package br.net.mirante.colaborador.repository;

import br.net.mirante.colaborador.domain.model.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

}
