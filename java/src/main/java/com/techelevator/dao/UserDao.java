package com.techelevator.dao;

import com.techelevator.model.User;

import java.security.Principal;
import java.util.List;

public interface UserDao<T> {

    List<T> findAll();

    T getByCriteria(String criteria, T criteriaValue);
    T getAllByCriteria(String criteria, T criteriaValue);

    T getUserByUsername(Principal principal);

    User findByUsername(String username);

    int findIdByUsername(String username);

    boolean create(T newObject);
}
