package br.net.mirante.colaborador.service;

import br.net.mirante.colaborador.domain.dtos.EmailDTO;
import br.net.mirante.colaborador.domain.model.Email;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.exception.ParametroInvalidoException;
import br.net.mirante.colaborador.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmailService extends BaseService {

    private final EmailRepository emailRepository;

    @Autowired
    public EmailService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }


    @Transactional
    public EmailDTO salvar(final EmailDTO dto) throws ParametroInvalidoException {
        if (Objects.isNull(dto))
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_DTO_INVALIDO);

        final Email email = getConverter().map(dto, Email.class);
        emailRepository.save(email);
        return getConverter().map(email, EmailDTO.class);
    }

    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public List<EmailDTO> listarTodos() {
        return emailRepository.findAll()
                .stream().map(email -> getConverter().map(email, EmailDTO.class))
                .collect(Collectors.toList());
    }


    @Transactional(Transactional.TxType.NOT_SUPPORTED)
    public EmailDTO buscarPorId(Long id) throws ParametroInvalidoException {
        if (id == null)
            throw new ParametroInvalidoException(MensagemUtil.MSG_PARAMETRO_ID_INVALIDO);

        final Optional<Email> emailOptional = emailRepository.findById(id);
        if (emailOptional.isEmpty())
            throw new ParametroInvalidoException(MensagemUtil.MSG_REGISTRO_NAO_ENCONTRADO);

        return getConverter().map(emailOptional.get(), EmailDTO.class);
    }

}
