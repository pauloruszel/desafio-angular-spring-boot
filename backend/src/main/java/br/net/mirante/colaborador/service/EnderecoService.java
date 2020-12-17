package br.net.mirante.colaborador.service;

import br.net.mirante.colaborador.domain.dtos.EnderecoDTO;
import br.net.mirante.colaborador.domain.model.Endereco;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EnderecoService extends BaseService {

    private final EnderecoRepository enderecoRepository;

    @Autowired
    public EnderecoService(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    @Transactional
    public EnderecoDTO salvar(EnderecoDTO dto) throws ParametroInvalidoException {
        if (Objects.isNull(dto))
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_DTO_INVALIDO);

        final Endereco endereco = getConverter().map(dto, Endereco.class);
        enderecoRepository.save(endereco);
        return getConverter().map(endereco, EnderecoDTO.class);
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public EnderecoDTO buscarPorId(Long id) throws ParametroInvalidoException {
        if (id == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_ID_INVALIDO);

        final Optional<Endereco> colaborador = enderecoRepository.findById(id);
        if (colaborador.isEmpty())
            throw new ParametroInvalidoException(MensagemUtil.MSG_REGISTRO_NAO_ENCONTRADO);

        return getConverter().map(colaborador.get(), EnderecoDTO.class);
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public List<EnderecoDTO> listarTodos() {
        return enderecoRepository.findAll()
                .stream().map(endereco -> getConverter().map(endereco, EnderecoDTO.class))
                .collect(Collectors.toList());
    }


}
