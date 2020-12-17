package br.net.mirante.colaborador.resource;

import br.net.mirante.colaborador.domain.dtos.TipoTelefoneDTO;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.service.TipoTelefoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.status;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/tipostelefone")
public class TipoTelefoneResource {

    private final TipoTelefoneService tipoTelefoneService;

    @Autowired
    public TipoTelefoneResource(TipoTelefoneService tipoTelefoneService) {
        this.tipoTelefoneService = tipoTelefoneService;
    }

    @GetMapping
    public ResponseEntity<List<TipoTelefoneDTO>> listarTodos() {
        return ok(tipoTelefoneService.listarTodos());
    }


    @GetMapping("/{id:[1-9][0-9]*}")
    public ResponseEntity<TipoTelefoneDTO> buscarPorId(@PathVariable("id") final Long id) throws ParametroInvalidoException {
        final var retorno = tipoTelefoneService.buscarPorId(id);
        if(Objects.nonNull(retorno)) {
            return status(OK).body(retorno);
        }
        return ResponseEntity.notFound().build();
    }


}
