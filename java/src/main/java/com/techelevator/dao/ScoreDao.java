package com.techelevator.dao;

import com.techelevator.model.Score;

import java.util.Date;
import java.util.List;

public interface ScoreDao {
    List<Score> getScoresByGoalId(int goalId);
    void createScore(Score score);
}
