package com.techelevator.controller;

import com.techelevator.dao.ScoreDao;
import com.techelevator.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class ScoreController {

    @Autowired
    private ScoreDao scoreDao;

    @GetMapping(value="/goal-scores/{goalId}")
    public List<Score> getScoresByGoalId(@PathVariable int goalId) {
        return scoreDao.getScoresByGoalId(goalId);
    }
}
