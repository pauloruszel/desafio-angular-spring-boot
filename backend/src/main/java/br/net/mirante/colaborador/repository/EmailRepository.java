package br.net.mirante.colaborador.repository;

import br.net.mirante.colaborador.domain.model.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

    @Query("SELECT c FROM Email c " +
            "INNER JOIN ClienteEmail cc " +
            "ON c.id = cc.email.id " +
            "WHERE cc.cliente.id = :idCliente")
    List<Email> findAllEmailsByIdCliente(@Param("idCliente") Long idCliente);
}
