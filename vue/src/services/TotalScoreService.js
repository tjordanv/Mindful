import axios from "axios";

export default {
    createTotalScore(totalScore) {
        return axios.post("/create-total-score", totalScore);
    },

    updateTotalScore(totalScore) {
        return axios.put("/update-total-score", totalScore);
    },

    getScoreByGoalId(goalId) {
        return axios.get(`/get-total-score/${goalId}`)
    }
}