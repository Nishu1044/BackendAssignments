

const fs=require('fs')
console.time('timetaken')
let data=fs.readFileSync('./stream.txt','utf-8')
// console.log(data)
console.timeEnd('timetaken')



console.time('streamTime')
const readStram=fs.createReadStream('./stream.txt','utf-8')
readStram.on('data',(chunk)=>{
    // console.log(chunk)
})


readStram.on('end',()=>{
    console.timeEnd('streamTime')
})