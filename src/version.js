import path from 'path'
import fs from 'fs'
const packContent = fileURLToPath(new URL('../package.json', import.meta.url))
const RELATIVE_VERSION_FILE_ROUTE = '../configs/version.ts'
const regBuildNum = /\d{1}\.\d{1,2}\.\d{1,2}/
const regBuildTime = /\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}/
const fsContentPath = path.resolve(RELATIVE_VERSION_FILE_ROUTE)
const content = fs.readFileSync(fsContentPath, 'utf-8')
const getTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() < 9 ? `0${date.getHours()}` : date.getHours()
  const min = date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()
  const sen = date.getSeconds() < 9 ? `0${date.getSeconds()}` : date.getSeconds()
  return `${year}-${month}-${day} ${hour}:${min}:${sen}`
}
let relaceContent = content.replace(regBuildNum, packContent.version)
relaceContent = content.replace(regBuildTime, getTime)
fs.writeFileSync(fsContentPath, relaceContent)
console.info(`😊----版本号替换成功,当前版本号为${packContent.version}----😊`)
