module.exports = {
    displayName: 'elastic-fu-finder-express',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'html'],
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    }
};