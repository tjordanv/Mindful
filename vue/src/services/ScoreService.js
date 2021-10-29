import axios from "axios";

export default {
    getScoresByGoalId(goalId) {
        return axios.get(`goal-scores/${goalId}`)
    },
    createScore(score) {
        return axios.post("/add-score", score);
    }
}