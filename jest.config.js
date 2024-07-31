const nextJest = require('next/jest')
const dotenv = require('dotenv')
dotenv.config({
  path: '.env.development'
})

const creatJestConfig = nextJest({
  dir: '.'
});
const jestConfig = creatJestConfig({
  moduleDirectories: ['node_modules', '<rootDir>'],

});

module.exports = jestConfig