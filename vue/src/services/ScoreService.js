import axios from "axios";

export default {
    getScoresByGoalId(goalId) {
        return axios.get(`goal-scores/${goalId}`)
    }
}