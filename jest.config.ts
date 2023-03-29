import {Config} from 'jest';
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from './tsconfig.json';

//console.log(compilerOptions.paths);
//Retiramos a configuração do Jest de dentro do package json, que o nest já traz por padrão
//Ao utilizar o json aqui no jest.config, não é possível adiconar comentários no tsconfig.json
const config: Config =  {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node",
  "moduleNameMapper": pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
