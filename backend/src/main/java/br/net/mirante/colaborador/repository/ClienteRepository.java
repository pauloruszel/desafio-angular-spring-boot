package br.net.mirante.colaborador.repository;

import br.net.mirante.colaborador.domain.model.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {


    @Query("FROM Cliente c " +
            "WHERE LOWER(c.nome) like %:searchTerm% " +
            "OR LOWER(c.cpf) like %:searchTerm%")
    Page<Cliente> listar(@Param("searchTerm") String searchTerm, Pageable pageable);
}
