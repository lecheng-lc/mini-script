const babel = require('@babel/core')
const path = require('path')
const fs = require('fs')
const JS_FILE_REG = /(.js|.ts)$/i
const targetDir = 'pages' // 替换掉即可
const babelConfig = { // babel配置
  configFile: path.join(__dirname, '../babel.config.js')
}
function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function(dirent) {
    var filePath = path.join(currentDirPath, dirent.name)
    if (dirent.isFile()) {
      callback(filePath, dirent);
    } else if (dirent.isDirectory()) {
      walkSync(filePath, callback)
    }
  });
}
walkSync(targetDir, function(filePath, stat) {
  if(JS_FILE_REG.test(filePath)){
    const result = babel.transformFileSync(filePath, babelConfig) // => { code, map, ast }
    fs.writeFileSync(filePath,result.code)
  }
  console.log(filePath)
})

// 测试demo
// const DEMO_URL = path.resolve(__dirname, './await-demo.js')
