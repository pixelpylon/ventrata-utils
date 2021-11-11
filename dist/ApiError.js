const {get} = require("lodash");

class ApiError extends Error {
  constructor(error) {
    super()
    const data = get(error, 'response.data')
    this.message = data && JSON.stringify(data) || error.message
    this.data = data
  }
}

module.exports = ApiError;
