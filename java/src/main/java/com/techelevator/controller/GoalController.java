package com.techelevator.controller;


import com.techelevator.dao.GoalDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Goal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        return goalDao.getGoalsByUserId(principal);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/new-goal")
    public void createGoal(@RequestBody Goal newGoal) {
        goalDao.createGoal(newGoal);
    }

    @PutMapping("/update-active-status/{goalId}")
    public void updateActiveStatus(@PathVariable int goalId, boolean activeStatus) {
        goalDao.updateGoalActiveStatus(goalId, activeStatus);
    }
}
