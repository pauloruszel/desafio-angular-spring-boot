package br.net.mirante.colaborador.service;

import br.net.mirante.colaborador.domain.dtos.TipoTelefoneDTO;
import br.net.mirante.colaborador.domain.model.TipoTelefone;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.repository.TipoTelefoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(Transactional.TxType.NOT_SUPPORTED)
public class TipoTelefoneService extends BaseService {

    private final TipoTelefoneRepository tipoTelefoneRepository;

    @Autowired
    public TipoTelefoneService(TipoTelefoneRepository tipoTelefoneRepository) {
        this.tipoTelefoneRepository = tipoTelefoneRepository;
    }

    public List<TipoTelefoneDTO> listarTodos() {
        return tipoTelefoneRepository.findAll()
                .stream().map(tipoContato -> getConverter().map(tipoContato, TipoTelefoneDTO.class))
                .collect(Collectors.toList());
    }

    public TipoTelefoneDTO buscarPorId(Long id) throws ParametroInvalidoException {
        if (id == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_ID_INVALIDO);

        final Optional<TipoTelefone> tipoTelefone = tipoTelefoneRepository.findById(id);
        if (tipoTelefone.isEmpty())
            throw new ParametroInvalidoException(MensagemUtil.MSG_REGISTRO_NAO_ENCONTRADO);

        return getConverter().map(tipoTelefone.get(), TipoTelefoneDTO.class);
    }

}
