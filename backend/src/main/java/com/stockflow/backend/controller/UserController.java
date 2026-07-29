package com.stockflow.backend.controller;

import com.stockflow.backend.dto.UserRequest;
import com.stockflow.backend.dto.UserResponse;
import com.stockflow.backend.dto.UserRoleUpdateRequest;
import com.stockflow.backend.entity.User;
import com.stockflow.backend.mapper.UserMapper;
import com.stockflow.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        List<UserResponse> responses = userService.getAllUsers().stream()
                .map(userMapper::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/active")
    public ResponseEntity<List<UserResponse>> getActiveUsers(){
        List<UserResponse> responses = userService.getActiveUsers().stream()
                .map(userMapper::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id){
        User user = userService.getUserById(id);
        return ResponseEntity.ok(userMapper.toResponse(user));
    }

    @PostMapping
    public ResponseEntity<UserResponse> saveUser(@Valid @RequestBody UserRequest request){
        User user = userService.saveUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.toResponse(user));
    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<UserResponse> updateUserRole(@PathVariable Long id, @Valid @RequestBody UserRoleUpdateRequest request){
        User user = userService.updateUserRole(id, request);
        return ResponseEntity.ok(userMapper.toResponse(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserResponse> softDelete(@PathVariable Long id){
        User user = userService.softDeleteById(id);
        return ResponseEntity.ok(userMapper.toResponse(user));
    }
}
