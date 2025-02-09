package com.code_fusion.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF (use JWT or tokens for security)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll() // Allow authentication endpoints
                .requestMatchers("/**").permitAll() // Allow public endpoints
                .anyRequest().authenticated() // Secure all other endpoints
            )
            .sessionManagement(session -> session
                .maximumSessions(1) // Only 1 active session per user
            )
            .logout(logout -> logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout")) // Match with AuthController logout API
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID") // Remove session cookie
            );

        return http.build();
    }
}
