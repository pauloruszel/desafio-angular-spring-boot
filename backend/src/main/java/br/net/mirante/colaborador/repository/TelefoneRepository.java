package br.net.mirante.colaborador.repository;

import br.net.mirante.colaborador.domain.model.Telefone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TelefoneRepository extends JpaRepository<Telefone, Long> {

}
