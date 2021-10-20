package com.techelevator.controller;


import com.techelevator.dao.GoalDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Goal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin

public class GoalController {

    @Autowired
    private GoalDao goalDao;

    @GetMapping(value = "/current-goals")
    public List<Goal> getCurrentGoals(Principal principal) {
        System.out.println("---");
        System.out.println(principal.getName());
        System.out.println("----");
        return goalDao.getGoalsByUserId(principal);
    }
}
