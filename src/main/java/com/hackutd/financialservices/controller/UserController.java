package com.hackutd.financialservices.controller;

import com.hackutd.financialservices.model.User;
import com.hackutd.financialservices.model.LoginRequest;
import com.hackutd.financialservices.model.Transaction;
import com.hackutd.financialservices.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            System.out.println("Received registration request for email: " + user.getEmail());
            if (user.getEmail() == null || user.getPassword() == null || user.getName() == null) {
                return ResponseEntity.badRequest().body("Name, email and password are required");
            }
            User newUser = userService.createUser(user);
            System.out.println("Registration successful for: " + newUser.getEmail());
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            System.out.println("Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{email}/deposit")
    public Transaction deposit(@PathVariable String email, @RequestParam Double amount) {
        return userService.deposit(email, amount);
    }

    @PostMapping("/{email}/withdraw")
    public Transaction withdraw(@PathVariable String email, @RequestParam Double amount) {
        return userService.withdraw(email, amount);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }
            
            User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
