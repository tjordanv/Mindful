package com.techelevator.dao;

import com.techelevator.model.Score;

import java.util.Date;
import java.util.List;

public interface ScoreDao {
    List<Score> getScoresByGoalId(int goalId);
    boolean createScore(int goalId, Date date, int score);
}
