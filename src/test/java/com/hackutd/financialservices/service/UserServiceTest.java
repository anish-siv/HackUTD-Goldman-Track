package com.hackutd.financialservices.service;

import com.hackutd.financialservices.model.User;
import com.hackutd.financialservices.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    private User testUser;

    @BeforeEach
    public void setUp() {
        testUser = new User();
        testUser.setName("John Doe");
        testUser.setEmail("john.doe@example.com");
        testUser.setPassword("securepassword");
        testUser.setBalance(1000.0);
    }

    @Test
    public void testGetUserByEmail() {
        // Given
        when(userRepository.findByEmail(testUser.getEmail()))
            .thenReturn(Optional.of(testUser));

        // When
        User foundUser = userService.getUserByEmail(testUser.getEmail());

        // Then
        assertNotNull(foundUser);
        assertEquals(testUser.getEmail(), foundUser.getEmail());
        verify(userRepository).findByEmail(testUser.getEmail());
    }

    @Test
    public void testGetUserByEmailNotFound() {
        // Given
        when(userRepository.findByEmail(anyString()))
            .thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            userService.getUserByEmail("nonexistent@email.com");
        });
    }

    @Test
    public void testCreateUser() {
        // Given
        when(userRepository.existsByEmail(testUser.getEmail()))
            .thenReturn(false);
        when(userRepository.save(any(User.class)))
            .thenReturn(testUser);

        // When
        User createdUser = userService.createUser(testUser);

        // Then
        assertNotNull(createdUser);
        assertEquals(testUser.getEmail(), createdUser.getEmail());
        verify(userRepository).save(any(User.class));
    }

    @Test
    public void testCreateUserWithExistingEmail() {
        // Given
        when(userRepository.existsByEmail(testUser.getEmail()))
            .thenReturn(true);

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            userService.createUser(testUser);
        });
    }
}
