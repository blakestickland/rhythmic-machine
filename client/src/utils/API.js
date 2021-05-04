import axios from "axios";

// The getPatterns method retrieves rhythmic patterns from the server
// It accepts a "query" or term to search the pattern api for
export default {
  getPatterns: function(query) {
    return axios.get("/api/patterns", { params: { q: query } });
  }
};
