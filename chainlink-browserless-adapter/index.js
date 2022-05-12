const { Requester, Validator } = require('@chainlink/external-adapter')

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (data) => {
  if (data.Response === 'Error') return true
  return false
}

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  url: ['url'],
  selector: ['selector'],
  challenge: ['challenge'],
  endpoint: false
}

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const serviceURL = 'http://localhost:3000/scrape?stealth'
  const url = validator.validated.data.url
  const challenge = validator.validated.data.challenge
  const elements = [{ selector: validator.validated.data.selector }]
  const gotoOptions = {timeout: 20000}

  const params = {
    url,
    elements,
    gotoOptions
  }

  // This is where you would add method and headers
  // you can add method like GET or POST and add it to the config
  // The default is GET requests
  // method = 'get'
  // headers = 'headers.....'
  const config = {
    method: 'post',
    url: serviceURL,
    data: params,
    timeout: 20000
  }
  console.log(config)
  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then(response => {
      console.log(response)
      let match = false;
      if (response.data && response.data.data[0] && response.data.data[0].results[0]) {
        match = response.data.data[0].results[0].html.includes(challenge)
      }
      callback(response.status, Requester.success(jobRunID, {data: {result: match}}))
    })
    .catch(error => {
      callback(500, Requester.errored(jobRunID, error))
    })
}

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest
