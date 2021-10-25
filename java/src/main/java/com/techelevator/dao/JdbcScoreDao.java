package com.techelevator.dao;

import com.techelevator.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JdbcScoreDao implements ScoreDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Score> getScoresByGoalId(int goalId) {
        List<Score> scores = new ArrayList<>();
        String sql = "SELECT * FROM goal_scores JOIN goals ON goals.goal_id = " +
                "goal_scores.goal_id WHERE goals.goal_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, goalId);
        while (results.next()) {
            scores.add(mapRowToScore(results));
        }
        return scores;
    }

    @Override
    public boolean createScore(int goal_id, Date date, int score) {
        return false;
    }

    private Score mapRowToScore(SqlRowSet rowSet) {
        Score score = new Score();
        score.setScoreId(rowSet.getInt("score_id"));
        score.setGoalId(rowSet.getInt("goal_id"));
        score.setDate(rowSet.getDate("date"));
        score.setScore(rowSet.getInt("score"));
        return score;
    }
}
