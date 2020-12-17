package br.net.mirante.colaborador.service;

import br.net.mirante.colaborador.domain.dtos.ClienteDTO;
import br.net.mirante.colaborador.domain.dtos.EmailDTO;
import br.net.mirante.colaborador.domain.dtos.MensagemRetornoDTO;
import br.net.mirante.colaborador.domain.dtos.TelefoneDTO;
import br.net.mirante.colaborador.domain.model.Cliente;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.repository.ClienteRepository;
import br.net.mirante.colaborador.repository.EmailRepository;
import br.net.mirante.colaborador.repository.TelefoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService extends BaseService {

    private final ClienteRepository clienteRepository;
    private final TelefoneRepository telefoneRepository;
    private final EmailRepository emailRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository,
                          TelefoneRepository telefoneRepository,
                          EmailRepository emailRepository) {
        this.clienteRepository = clienteRepository;
        this.telefoneRepository = telefoneRepository;
        this.emailRepository = emailRepository;
    }

    @Transactional
    public ClienteDTO salvar(final ClienteDTO dto) throws ParametroInvalidoException {
        if (Objects.isNull(dto))
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_DTO_INVALIDO);

        final Cliente cliente = getConverter().map(dto, Cliente.class);
        clienteRepository.save(cliente);
        return getConverter().map(cliente, ClienteDTO.class);
    }

    @Transactional
    public ClienteDTO update(final Long id, final ClienteDTO dto) throws ParametroInvalidoException {
        if (id == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_ID_INVALIDO);

        if (dto == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_DTO_INVALIDO);

        Optional<Cliente> cliente = clienteRepository.findById(id);
        if (cliente.isEmpty())
            throw new ParametroInvalidoException(MensagemUtil.MSG_REGISTRO_NAO_ENCONTRADO);

        var clienteEditado = getConverter().map(dto, Cliente.class);
        clienteEditado.setId(id);
        clienteRepository.save(clienteEditado);

        return getConverter().map(clienteEditado, ClienteDTO.class);
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public ClienteDTO buscarPorId(Long id) throws ParametroInvalidoException {
        if (id == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_ID_INVALIDO);

        final Optional<Cliente> colaborador = clienteRepository.findById(id);
        if (colaborador.isEmpty())
            throw new ParametroInvalidoException(MensagemUtil.MSG_REGISTRO_NAO_ENCONTRADO);

        List<TelefoneDTO> telefones = getTelefonesPorIdCliente(id);
        List<EmailDTO> emails = getEmailsPorIdCliente(id);

        final var clienteDTO = getConverter().map(colaborador.get(), ClienteDTO.class);
        clienteDTO.setTelefones(telefones);
        clienteDTO.setEmails(emails);

        return clienteDTO;
    }

    @NotNull
    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    List<TelefoneDTO> getTelefonesPorIdCliente(Long id) {
        return telefoneRepository.findAllTelefonesByIdCliente(id)
                .stream().map(contato -> getConverter().map(contato, TelefoneDTO.class))
                .collect(Collectors.toList());
    }

    @NotNull
    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    List<EmailDTO> getEmailsPorIdCliente(Long id) {
        return emailRepository.findAllEmailsByIdCliente(id)
                .stream().map(email -> getConverter().map(email, EmailDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public List<ClienteDTO> listarTodos() {
        return clienteRepository.findAll()
                .stream().map(cliente -> getConverter().map(cliente, ClienteDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public MensagemRetornoDTO deletar(Long id) throws ParametroInvalidoException {
        if (id == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_ID_INVALIDO);

        final Optional<Cliente> cliente = clienteRepository.findById(id);
        if (cliente.isEmpty())
            throw new ParametroInvalidoException(MensagemUtil.MSG_REGISTRO_NAO_ENCONTRADO);

        clienteRepository.deleteById(id);
        return new MensagemRetornoDTO(MensagemUtil.MSG_REGISTRO_EXCLUIDO);
    }

}
