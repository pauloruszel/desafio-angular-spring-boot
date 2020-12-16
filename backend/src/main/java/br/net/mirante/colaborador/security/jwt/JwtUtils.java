package br.net.mirante.colaborador.security.jwt;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${cliente.app.jwtSecret}")
    private String jwtSecret;

    @Value("${cliente.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String gerarJwtToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return  Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return  true;
        } catch (SignatureException e) {
            LOGGER.error ("Assinatura JWT inválida: {}", e.getMessage ());
        } catch (MalformedJwtException e) {
            LOGGER.error ("Token JWT é inválido: {}", e.getMessage ());
        } catch (ExpiredJwtException e) {
            LOGGER.error ("Token JWT expirou: {}", e.getMessage ());
        } catch (UnsupportedJwtException e) {
            LOGGER.error ("O token JWT não é compatível: {}", e.getMessage ());
        } catch (IllegalArgumentException e) {
            LOGGER.error ("O JWT claims JWT está vazio: {}", e.getMessage ());
        }
        return false;
    }
}
