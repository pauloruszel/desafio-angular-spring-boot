package br.net.mirante.colaborador.repository;

import br.net.mirante.colaborador.domain.model.Telefone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TelefoneRepository extends JpaRepository<Telefone, Long> {

    @Query("SELECT t FROM Telefone t " +
            "INNER JOIN ClienteTelefone ct " +
            "ON t.id = ct.telefone.id " +
            "WHERE ct.cliente.id = :idCliente")
    List<Telefone> findAllTelefonesByIdCliente(@Param("idCliente") Long idCliente);
}
