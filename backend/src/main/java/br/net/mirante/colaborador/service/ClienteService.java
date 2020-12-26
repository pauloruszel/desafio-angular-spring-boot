package br.net.mirante.colaborador.service;

import br.net.mirante.colaborador.domain.dtos.ClienteDTO;
import br.net.mirante.colaborador.domain.dtos.MensagemRetornoDTO;
import br.net.mirante.colaborador.domain.model.Cliente;
import br.net.mirante.colaborador.domain.model.Email;
import br.net.mirante.colaborador.domain.model.Telefone;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class ClienteService extends BaseService {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public ClienteDTO salvar(final ClienteDTO dto) throws ParametroInvalidoException {
        Set<Email> emails = new HashSet<>();
        Set<Telefone> telefones = new HashSet<>();

        if (Objects.isNull(dto))
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_DTO_INVALIDO);

        final Cliente cliente = getConverter().map(dto, Cliente.class);

        emails.add(getConverter().map(dto.getEmail(), Email.class));
        telefones.add(getConverter().map(dto.getTelefone(), Telefone.class));

        cliente.setEmails(emails);
        cliente.setTelefones(telefones);

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
    public Cliente buscarPorId(Long id) throws ParametroInvalidoException {
        if (id == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_ID_INVALIDO);

        final Optional<Cliente> colaborador = clienteRepository.findById(id);
        if (colaborador.isEmpty())
            throw new ParametroInvalidoException(MensagemUtil.MSG_REGISTRO_NAO_ENCONTRADO);

        return colaborador.get();
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
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

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public Page<Cliente> listar(String searchTerm, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, "nome");
        return clienteRepository.listar(searchTerm.toLowerCase(), pageRequest);
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public Page<Cliente> findAll() {
        int page = 0;
        int size = 10;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, "nome");
        return new PageImpl<>(clienteRepository.findAll(), pageRequest, size);
    }

}
