package com.techelevator.dao;

import com.techelevator.model.User;

import java.security.Principal;
import java.util.List;

public interface UserDao {

    List<User> findAll();

    User getUserById(Long userId);

    User getUserByUsername(Principal principal);

    User findByUsername(String username);

    int findIdByUsername(String username);

    boolean create(String firstName, String lastName, String email,
                   String phone, String username, String password, String role);
}
