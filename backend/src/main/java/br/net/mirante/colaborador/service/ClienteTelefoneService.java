package br.net.mirante.colaborador.service;

import br.net.mirante.colaborador.domain.dtos.ClienteTelefoneDTO;
import br.net.mirante.colaborador.domain.model.ClienteTelefone;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.repository.ClienteTelefoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ClienteTelefoneService extends BaseService {
    private final ClienteTelefoneRepository clienteTelefoneRepository;

    @Autowired
    public ClienteTelefoneService(ClienteTelefoneRepository clienteTelefoneRepository) {
        this.clienteTelefoneRepository = clienteTelefoneRepository;
    }

    @Transactional
    public ClienteTelefoneDTO salvar(final ClienteTelefoneDTO dto) throws ParametroInvalidoException {
        if (Objects.isNull(dto))
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_DTO_INVALIDO);

        final ClienteTelefone clienteTelefone = getConverter().map(dto, ClienteTelefone.class);
        clienteTelefoneRepository.save(clienteTelefone);
        return getConverter().map(clienteTelefone, ClienteTelefoneDTO.class);
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public List<ClienteTelefoneDTO> listarTodos() {
        return clienteTelefoneRepository.findAll()
                .stream().map(clienteTelefone -> getConverter().map(clienteTelefone, ClienteTelefoneDTO.class))
                .collect(Collectors.toList());
    }

}
