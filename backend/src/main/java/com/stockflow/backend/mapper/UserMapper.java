package com.stockflow.backend.mapper;

import com.stockflow.backend.dto.UserResponse;
import com.stockflow.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user){
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole().getName());
        userResponse.setActive(user.isActive());

        return userResponse;
    }
}
