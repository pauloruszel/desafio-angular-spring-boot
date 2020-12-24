package br.net.mirante.colaborador.service;

import br.net.mirante.colaborador.domain.dtos.TelefoneDTO;
import br.net.mirante.colaborador.domain.model.Telefone;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.repository.TelefoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TelefoneService extends BaseService {

    private final TelefoneRepository telefoneRepository;

    @Autowired
    public TelefoneService(TelefoneRepository telefoneRepository) {
        this.telefoneRepository = telefoneRepository;
    }

    @Transactional
    public TelefoneDTO salvar(final TelefoneDTO dto) throws ParametroInvalidoException {
        if (Objects.isNull(dto))
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_DTO_INVALIDO);

        final Telefone telefone = getConverter().map(dto, Telefone.class);
        telefoneRepository.save(telefone);
        return getConverter().map(telefone, TelefoneDTO.class);
    }


    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public TelefoneDTO buscarPorId(Long id) throws ParametroInvalidoException {
        if (id == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_ID_INVALIDO);

        final Optional<Telefone> telefone = telefoneRepository.findById(id);
        if (telefone.isEmpty())
            throw new ParametroInvalidoException(MensagemUtil.MSG_REGISTRO_NAO_ENCONTRADO);

        return getConverter().map(telefone.get(), TelefoneDTO.class);
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public List<TelefoneDTO> listarTodos() {
        return telefoneRepository.findAll()
                .stream().map(telefone -> getConverter().map(telefone, TelefoneDTO.class))
                .collect(Collectors.toList());
    }


}
