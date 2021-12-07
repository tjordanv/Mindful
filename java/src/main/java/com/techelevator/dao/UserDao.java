package com.techelevator.dao;

import com.techelevator.model.User;

import java.security.Principal;
import java.util.List;

public interface UserDao<T> {

    List<T> findAll();

    T getByUsername(String username);
    T getAllByUsername(String username);

    boolean create(T newObject);
}
