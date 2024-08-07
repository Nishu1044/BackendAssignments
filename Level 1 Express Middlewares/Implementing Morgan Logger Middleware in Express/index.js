const express = require('express') 
const morgan = require('morgan') 
const fs = require('fs') 
const path = require('path') 
 
const app = express() 
const port = 8585
 
 
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) 
 
 
morgan.token('content-length', (req, res) => res.getHeader('Content-Length') || '0') 
morgan.token('time-taken', (req, res) => { 
  const now = new Date() 
  return now - req._startTime 
}); 
 
app.use((req, res, next) => { 
  req._startTime = new Date() 
  next() 
}) 
 
 
app.use(morgan(':method :status :content-length :time-taken ms - :date[clf] HTTP/:http-version :url', { stream: accessLogStream }))   
 
 
 
app.get('/', (req, res) => { 
  res.status(200).send('Hello World') 
}); 
 
app.get('/get-users', (req, res) => { 
  res.status(200).json({ users: ['User1', 'User2', 'User3'] }) 
}); 
 
app.post('/add-user', (req, res) => { 
  res.status(201).send('added successfully') 
}); 
 
app.put('/user/:id', (req, res) => { 
  res.status(201).send(`User with id ${req.params.id} updated successfully`) 
}); 
 
app.delete('/user/:id', (req, res) => { 
  res.send(`User with id ${req.params.id} deleted successfully`) 
}); 
 
app.listen(3000, () => { 
  console.log(`Server is running on port ${port}`) 
});