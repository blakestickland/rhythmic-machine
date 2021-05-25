import axios from "axios";

export default {
  // Gets all patterns
  getPatterns: function() {
    return axios.get("/api/patterns");
  },
  // Gets the pattern with the given id
  getPattern: function(id) {
    return axios.get("/api/patterns/" + id);
  },
  // Deletes the pattern with the given id
  deletePattern: function(id) {
    return axios.delete("/api/patterns/" + id);
  },
  // Saves a pattern to the database
  savePattern: function(patternData) {
    return axios.post("/api/patterns", patternData);
  }
};