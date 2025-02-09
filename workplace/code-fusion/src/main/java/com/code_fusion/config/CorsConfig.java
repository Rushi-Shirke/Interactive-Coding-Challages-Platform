package com.code_fusion.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

	@Bean
	WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // Allow all endpoints
						.allowedOrigins("http://localhost:5173") // React frontend
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowCredentials(true) // Allow
																											// cookies/sessions
						.allowedHeaders("*").exposedHeaders("Authorization");
			}
		};
	}
}
