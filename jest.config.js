module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(got|p-cancelable|cacheable-request|normalize-url|responselike|@szmarczak|lowercase-keys|mimic-response|cacheable-lookup|@sindresorhus/is|form-data-encoder)/)",
  ],
}
