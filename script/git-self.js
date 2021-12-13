const USER_NAME = 'code-tbd'
const USER_EMAIL = 'ukmukk@163.com'

const excludeList = ['.git', 'doc']

const { readdirSync, statSync, existsSync } = require('fs')
const { resolve } = require('path')
const { exec } = require('child_process')
function listFile(dir) {
  const arr = readdirSync(dir)
  arr.forEach((item) => {
    if (excludeList.includes(item)) {
      return
    }
    const itemPath = resolve(dir, item)
    const status = statSync(itemPath)
    if (status.isDirectory()) {
      if (existsSync(resolve(itemPath, 'README.md'))) {
        // console.log(itemPath)
        exec(`git config user.name ${USER_NAME}`, { cwd: itemPath })
        exec(`git config user.email ${USER_EMAIL}`, { cwd: itemPath })
      } else {
        listFile(itemPath)
      }
    }
  })
}

listFile('./')