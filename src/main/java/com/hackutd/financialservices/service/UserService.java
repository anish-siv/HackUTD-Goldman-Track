package com.hackutd.financialservices.service;

import com.hackutd.financialservices.model.User;
import com.hackutd.financialservices.model.Transaction;
import com.hackutd.financialservices.repository.UserRepository;
import com.hackutd.financialservices.repository.TransactionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public UserService(UserRepository userRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setBalance(0.0);
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User login(String email, String password) {
        System.out.println("Login attempt - Email: " + email);
        
        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        System.out.println("Found user: " + user.getEmail());
        System.out.println("Comparing passwords...");

        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        System.out.println("Login successful");
        return user;
    }

    @Transactional
    public Transaction deposit(String email, Double amount) {
        if (amount <= 0) {
            throw new RuntimeException("Amount must be positive");
        }

        User user = getUserByEmail(email);
        user.setBalance(user.getBalance() + amount);
        userRepository.save(user);

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(amount);
        transaction.setType("DEPOSIT");
        transaction.setDescription("Deposit to account");
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus("COMPLETED");

        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction withdraw(String email, Double amount) {
        if (amount <= 0) {
            throw new RuntimeException("Amount must be positive");
        }

        User user = getUserByEmail(email);
        if (user.getBalance() < amount) {
            throw new RuntimeException("Insufficient funds");
        }

        user.setBalance(user.getBalance() - amount);
        userRepository.save(user);

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(-amount); // Negative amount for withdrawals
        transaction.setType("WITHDRAWAL");
        transaction.setDescription("Withdrawal from account");
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus("COMPLETED");

        return transactionRepository.save(transaction);
    }

    @PostConstruct
    public void cleanupDuplicates() {
        try {
            // Getting all users
            List<User> users = userRepository.findAll();
            
            // Creating a map to store unique users by email
            Map<String, User> uniqueUsers = new HashMap<>();
            
            // Keep only the latest entry for each email
            users.forEach(user -> {
                uniqueUsers.put(user.getEmail(), user);
            });
            
            // Delete all users
            userRepository.deleteAll();
            
            // Save unique users back
            userRepository.saveAll(uniqueUsers.values());
            
            System.out.println("Database cleaned up - removed duplicate entries");
        } catch (Exception e) {
            System.err.println("Failed to cleanup duplicates: " + e.getMessage());
        }
    }
}
