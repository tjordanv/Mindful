package com.techelevator.dao;

import com.techelevator.model.Goal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JdbcGoalDao implements GoalDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private Integer newGoalId = 0;

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

    @Override
    public boolean createGoal(Goal goal) {
        Goal newGoal = new Goal();
        String sql = "INSERT INTO goals (user_id, summary, description, goal, movement, units, " +
                "start_date, end_date, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING goal_id";
        this.newGoalId = jdbcTemplate.queryForObject(sql, Integer.class, goal.getUserId(), goal.getSummary(), goal.getDescription(),
        goal.getGoal(), goal.getMovement(), goal.getUnits(), goal.getStartDate(), goal.getEndDate(), goal.isActive());
        return this.newGoalId != 0;
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
