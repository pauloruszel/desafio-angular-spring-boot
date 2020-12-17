package br.net.mirante.colaborador.resource;

import br.net.mirante.colaborador.domain.dtos.ClienteDTO;
import br.net.mirante.colaborador.domain.dtos.MensagemRetornoDTO;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.status;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/clientes")
public class ClienteResource {

    private final ClienteService clienteService;

    @Autowired
    public ClienteResource(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteDTO>> listarTodos() {
        return ok(clienteService.listarTodos());
    }


    @GetMapping("/{id:[1-9][0-9]*}")
    public ResponseEntity<ClienteDTO> buscarPorId(@PathVariable("id") final Long id) throws ParametroInvalidoException {
        final var retorno = clienteService.buscarPorId(id);
        if(Objects.nonNull(retorno)) {
            return status(OK).body(retorno);
        }
        return ResponseEntity.notFound().build();
    }


    @PostMapping
    public ResponseEntity<ClienteDTO> salvar(@Valid @RequestBody ClienteDTO clienteDTO) throws ParametroInvalidoException {
        ClienteDTO retorno = clienteService.salvar(clienteDTO);
        return status(CREATED).body(retorno);
    }

    @PutMapping("/{id:[1-9][0-9]*}")
    public ResponseEntity<ClienteDTO> atualizar(@PathVariable(value = "id") final Long id,
                                                @Valid @RequestBody ClienteDTO clienteDTO) throws ParametroInvalidoException {
        ClienteDTO retorno = clienteService.update(id, clienteDTO);
        if (Objects.nonNull(retorno)) {
            return status(OK).body(retorno);
        }
        return ResponseEntity.notFound().build();

    }

    @DeleteMapping("/{id:[1-9][0-9]*}")
    public ResponseEntity<MensagemRetornoDTO> deletar(@PathVariable final Long id) throws ParametroInvalidoException {
        final var mensagemRetornoDTO = clienteService.deletar(id);
        if (mensagemRetornoDTO.getMensagem().equals(MensagemUtil.MSG_REGISTRO_EXCLUIDO)) {
            return status(OK).body(mensagemRetornoDTO);
        }
        return status(NOT_FOUND).body(mensagemRetornoDTO);

    }



}
