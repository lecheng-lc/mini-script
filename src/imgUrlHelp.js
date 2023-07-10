import path from 'path'
import fs from 'fs'
import { upload } from 'aliyun-oss-upload-multiple'
import imgConfig from './config/img.js'
const IMG_STATIC_FILE = './static/imgs/'
const uploadConfig = {
  distPath: '',
  basePath: '',
  ignoreName: [],
  eableHttpCache: true
}
const fileArr = fs.readdirSync(IMG_STATIC_FILE)
const fileNames = fileArr.map(item => path.baseName(item))

upload(uploadConfig, (err, stats) => {
  if (err) {
    console.error('❎❎图片上传错误，请重试❎❎')
  } else {
    fileNames.forEach(item => {
      imgConfig[item] = distPath + basePath + item
      const targetDeleteFile = path.resolve(IMG_STATIC_FILE, item)
      fs.rmSync(targetDeleteFile)
    })
    console.log('😊----图片上传成功----😊')
  }
})
// 示例demo如下
// const imgConfig = {
//   headerBg: '/static/imgs/xx.png'
// }
