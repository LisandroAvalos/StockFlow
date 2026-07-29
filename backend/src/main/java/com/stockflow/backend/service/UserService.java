package com.stockflow.backend.service;

import com.stockflow.backend.dto.UserRequest;
import com.stockflow.backend.dto.UserRoleUpdateRequest;
import com.stockflow.backend.entity.Role;
import com.stockflow.backend.entity.User;
import com.stockflow.backend.exception.ResourceNotFoundException;
import com.stockflow.backend.repository.RoleRepository;
import com.stockflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getActiveUsers() {
        return userRepository.findByActiveTrue();
    }

    public User getUserById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: "+id));
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: "+email));
    }

    public User saveUser(UserRequest request){
        User user = new User();
        Role role = roleRepository.findByName("EMPLEADO")
                .orElseThrow(() -> new ResourceNotFoundException("Rol EMPLEADO no configurado en el sistema"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        return userRepository.save(user);
    }

    public User updateUserRole(Long id, UserRoleUpdateRequest request){
        User user = getUserById(id);
        Role role = roleRepository.findByName(request.getRoleName())
                        .orElseThrow(() -> new ResourceNotFoundException("Role no encontrado con nombre: "+request.getRoleName()));
        user.setRole(role);

        return userRepository.save(user);
    }

    public  User softDeleteById(Long id){
        User user = getUserById(id);
        user.setActive(false);
        return userRepository.save(user);
    }
}
