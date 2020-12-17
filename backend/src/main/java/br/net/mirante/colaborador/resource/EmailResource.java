package br.net.mirante.colaborador.resource;

import br.net.mirante.colaborador.domain.dtos.EmailDTO;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.service.EmailService;
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
@RequestMapping("/emails")
public class EmailResource {

    private final EmailService emailService;

    @Autowired
    public EmailResource(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<EmailDTO> salvar(@Valid @RequestBody EmailDTO emailDTO) throws ParametroInvalidoException {
        EmailDTO retorno = emailService.salvar(emailDTO);
        return status(CREATED).body(retorno);
    }

    @GetMapping
    public ResponseEntity<List<EmailDTO>> listarTodos() {
        return ok(emailService.listarTodos());
    }


    @GetMapping("/{id:[1-9][0-9]*}")
    public ResponseEntity<EmailDTO> buscarPorId(@PathVariable("id") final Long id) throws ParametroInvalidoException {
        final var retorno = emailService.buscarPorId(id);
        if(Objects.nonNull(retorno)) {
            return status(OK).body(retorno);
        }
        return ResponseEntity.notFound().build();
    }


}
