package com.Skillbridge.backend.config;


import com.Skillbridge.backend.entity.Role;
import com.Skillbridge.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeRoles(RoleRepository roleRepository)
    {
        return  args -> {
            createRoleIfNotExists(roleRepository,"LEARNER");
            createRoleIfNotExists(roleRepository,"MENTOR");
            createRoleIfNotExists(roleRepository,"ADMIN");


        };
    }

    private void createRoleIfNotExists(RoleRepository roleRepository, String rolename)
    {
        if(roleRepository.findByName(rolename).isEmpty())
        {
            Role role = new Role();
            role.setName(rolename);

            roleRepository.save(role);
        }
    }
}
