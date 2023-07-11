const babel = require('@babel/core')
const path = require('path')
const DEMO_URL = path.resolve(__dirname, './await-demo.js')
const babelConfig = { // babel配置
  configFile: path.join(__dirname, '../babel.config.js')
}

const result = babel.transformFileSync(DEMO_URL, babelConfig) // => { code, map, ast }
console.log(result.code)
