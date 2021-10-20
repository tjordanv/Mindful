package com.techelevator.dao;

import com.techelevator.model.Goal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcGoalDao implements GoalDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Goal> getGoalsByUserId(Principal principal) {
        List<Goal> goals = new ArrayList<>();
        String sql = "SELECT * FROM goals JOIN users ON users.user_id = goals.user_id WHERE username = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, principal.getName());
        while (results.next()) {
            Goal goal = mapRowToGoal(results);
            goals.add(goal);
        }

        return goals;
    }

    private Goal mapRowToGoal(SqlRowSet rowSet) {
        Goal goal = new Goal();
        goal.setGoalId(rowSet.getInt("goal_id"));
        goal.setUserId(rowSet.getInt("user_id"));
        goal.setSummary(rowSet.getString("summary"));
        goal.setDescription(rowSet.getString("description"));
        goal.setGoal(rowSet.getInt("goal"));
        goal.setMovement(rowSet.getString("movement"));
        goal.setUnits(rowSet.getString("units"));
        goal.setStartDate(rowSet.getDate("start_date"));
        goal.setEndDate(rowSet.getDate("end_date"));
        goal.setActive(rowSet.getBoolean("active"));
        goal.setCurrentScore(0);
        return goal;
    }
}
