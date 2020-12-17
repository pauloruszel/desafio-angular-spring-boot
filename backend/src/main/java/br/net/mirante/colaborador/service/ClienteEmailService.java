package br.net.mirante.colaborador.service;

import br.net.mirante.colaborador.domain.dtos.ClienteEmailDTO;
import br.net.mirante.colaborador.domain.model.ClienteEmail;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.repository.ClienteEmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ClienteEmailService extends BaseService {
    private final ClienteEmailRepository clienteEmailRepository;

    @Autowired
    public ClienteEmailService(ClienteEmailRepository clienteEmailRepository) {
        this.clienteEmailRepository = clienteEmailRepository;
    }

    @Transactional
    public ClienteEmailDTO salvar(final ClienteEmailDTO dto) throws ParametroInvalidoException {
        if (Objects.isNull(dto))
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_DTO_INVALIDO);

        final ClienteEmail clienteEmail = getConverter().map(dto, ClienteEmail.class);
        clienteEmailRepository.save(clienteEmail);
        return getConverter().map(clienteEmail, ClienteEmailDTO.class);
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public List<ClienteEmailDTO> listarTodos() {
        return clienteEmailRepository.findAll()
                .stream().map(clienteEmail -> getConverter().map(clienteEmail, ClienteEmailDTO.class))
                .collect(Collectors.toList());
    }

}
