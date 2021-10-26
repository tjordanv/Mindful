package com.techelevator.dao;

import com.techelevator.model.Goal;

import java.security.Principal;
import java.util.Date;
import java.util.List;

public interface GoalDao {
    List<Goal> getGoalsByUserId(Principal principal);
    boolean createGoal(Goal goal);
    void updateGoalActiveStatus(int goalId, boolean activeStatus);
}
