package com.example.second;

import com.example.second.interceptor.AdminInterceptor;
import com.example.second.interceptor.LoginCheckInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginCheckInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/","/login", "/join", "/error","/admin/**","/health-check");
        registry.addInterceptor(new AdminInterceptor())
                .order(2)
                .addPathPatterns("/admin/**")
                .excludePathPatterns("/admin/login", "/join", "/error");

    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://second-nord.store", "https://inha.second-nord.store") // 허용할 출처
                .allowedMethods("GET", "POST") // 허용할 HTTP method
                .allowCredentials(true) // 쿠키 인증 요청 허용
                .maxAge(3000); // 원하는 시간만큼 pre-flight 리퀘스트를 캐싱
    }

}
