package br.net.mirante.colaborador.security.services;

import br.net.mirante.colaborador.domain.model.Usuario;
import br.net.mirante.colaborador.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String nomeUsuario) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsuario(nomeUsuario).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado como nome usuário: " + nomeUsuario));
        return UsuarioDetailsImpl.build(usuario);
    }
}
