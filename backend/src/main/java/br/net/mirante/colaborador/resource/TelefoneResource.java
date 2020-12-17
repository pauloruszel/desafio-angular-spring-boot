package br.net.mirante.colaborador.resource;

import br.net.mirante.colaborador.domain.dtos.TelefoneDTO;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.service.TelefoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.status;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/telefones")
public class TelefoneResource {

    private final TelefoneService telefoneService;

    @Autowired
    public TelefoneResource(TelefoneService telefoneService) {
        this.telefoneService = telefoneService;
    }

    @PostMapping
    public ResponseEntity<TelefoneDTO> salvar(@Valid @RequestBody TelefoneDTO telefoneDTO) throws ParametroInvalidoException {
        TelefoneDTO retorno = telefoneService.salvar(telefoneDTO);
        return status(CREATED).body(retorno);
    }

    @GetMapping
    public ResponseEntity<List<TelefoneDTO>> listarTodos() {
        return ok(telefoneService.listarTodos());
    }


    @GetMapping("/{id:[1-9][0-9]*}")
    public ResponseEntity<TelefoneDTO> buscarPorId(@PathVariable("id") final Long id) throws ParametroInvalidoException {
        final var retorno = telefoneService.buscarPorId(id);
        if (Objects.nonNull(retorno)) {
            return status(OK).body(retorno);
        }
        return ResponseEntity.notFound().build();
    }


}
