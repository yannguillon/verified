# Chainlink Browserless HTML Selector Checker adapter

Use this external adapter to verify the contents of a HTML element in a web page, in a DOM-enabled environment

This external adapter requires an instance of `browserless` exposed on port `3000`
## Input Params

- `url`, the url to visit
- `selector`, CSS the selector in the page to verify,
- `challenge`, the string to find in the HTML element

## Output
Returns `true` if the challenge is found in the selector
```json
{
 "jobRunID": "278c97ffadb54a5bbb93cfec5f7b5503",
 "data": {
  "result": true
 },
 "statusCode": 200
}
```

## Install Locally

Install dependencies:

```bash
yarn
```

### Test

Run the local tests:

```bash
yarn test
```

Natively run the application (defaults to port 8080):

### Run

```bash
yarn start
```
