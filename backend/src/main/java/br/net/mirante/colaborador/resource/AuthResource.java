package br.net.mirante.colaborador.resource;

import br.net.mirante.colaborador.domain.dtos.MensagemRetornoDTO;
import br.net.mirante.colaborador.domain.dtos.payload.request.LoginRequestDTO;
import br.net.mirante.colaborador.domain.dtos.payload.request.SignupRequestDTO;
import br.net.mirante.colaborador.domain.dtos.payload.response.JwtResponseDTO;
import br.net.mirante.colaborador.domain.enumeration.ERole;
import br.net.mirante.colaborador.domain.model.Role;
import br.net.mirante.colaborador.domain.model.Usuario;
import br.net.mirante.colaborador.domain.util.MensagemUtil;
import br.net.mirante.colaborador.repository.RoleRepository;
import br.net.mirante.colaborador.repository.UsuarioRepository;
import br.net.mirante.colaborador.security.jwt.JwtUtils;
import br.net.mirante.colaborador.security.services.UsuarioDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthResource {

    public static final String ADMIN = "admin";
    public static final String MODERATOR = "mod";

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> autenticarUsuario(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsuario(), loginRequestDTO.getSenha()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.gerarJwtToken(authentication);

        UsuarioDetailsImpl userDetails = (UsuarioDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDTO(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@Valid @RequestBody SignupRequestDTO signupRequestDTO) {
        if (usuarioRepository.existsByUsuario(signupRequestDTO.getUsuario())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MensagemRetornoDTO(MensagemUtil.MSG_NOME_USUARIO_EM_USO));
        }

        if (usuarioRepository.existsByEmail(signupRequestDTO.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MensagemRetornoDTO(MensagemUtil.MSG_EMAIL_EM_USO));
        }

        // Criar um novo usuário
        Usuario usuario = new Usuario(signupRequestDTO.getUsuario(),
                signupRequestDTO.getEmail(),
                encoder.encode(signupRequestDTO.getSenha()));

        Set<String> retornoRole = signupRequestDTO.getRole();
        Set<Role> roles = new HashSet<>();

        if (retornoRole == null) {
            Role userRole = roleRepository.findByNome(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException(MensagemUtil.MSG_ROLE_NAO_ENCONTRADA));
            roles.add(userRole);
        } else {
            retornoRole.forEach(role -> {
                switch (role) {
                    case ADMIN:
                        Role adminRole = roleRepository.findByNome(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException(MensagemUtil.MSG_ROLE_NAO_ENCONTRADA));
                        roles.add(adminRole);

                        break;
                    case MODERATOR:
                        Role modRole = roleRepository.findByNome(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException(MensagemUtil.MSG_ROLE_NAO_ENCONTRADA));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByNome(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException(MensagemUtil.MSG_ROLE_NAO_ENCONTRADA));
                        roles.add(userRole);
                }
            });
        }

        usuario.setRoles(roles);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok(new MensagemRetornoDTO(MensagemUtil.MSG_USUARIO_SALVO_COM_SUCESSO));
    }

}
