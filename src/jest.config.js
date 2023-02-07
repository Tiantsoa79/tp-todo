module.exports = {
    setupFilesAfterEnv: [
        './src/setupTest.js'
    ],
    moduleNameMapper: {
        '^.+\\.(css|less)$': '<rootDir>/src/styleMock.js',
      }
}