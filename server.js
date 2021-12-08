import express from 'express'
import bodyParser from 'body-parser'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import techFundings from './data/tech_fundings.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//This is our first endpoint
app.get('/', (req, res) => {
 res.send('Hello from us!')
})

app.get('endpoints', (req, res) => {
 res.send(listEndpoints(app))
})

app.get('/users', (req, res) => {
  const users = [
  {id: 1, name: 'Alice', age: 33},
  {id: 2, name: 'Bob', age: 34},
  {id: 3, name: 'Chris', age: 35},
  {id: 4, name: 'Didrik', age: 36}
]
res.json(users)
})

app.get('/fundings', (req, res) => {
const { company, region } = req.query

let techFundingsToSend = techFundings

if (company) {
  techFundingsToSend = techFundingsToSend.filter(
  (item) => item.Company.toLowerCase().indexOf(company.toLowerCase()) !== -1
  )
}

if (region) {
  techFundingsToSend = techFundingsToSend.filter(
    (item) => item.Region.toLowerCase().indexOf(region.toLowerCase()) !== -1
  )
}

  res.json({
    response: techFundingsToSend,
    success: true,
  })
})


// get a specific company based on id(index), using param
app.get('/fundings/index/:index', (req, res) => {
  const { index } = req.params

  const companyId = techFundings.find(company => company.index === +index)

  if (!companyId) {
    console.log('No company found')
    res.status(404).send('No company found with that id')
  } else {
    res.json(companyId)
  }
})

app.get('/fundings/company/:company', (req, res) => {
  const { company } = req.params

  const companyByName = techFundings.find(item => item.Company === company)

  if (!companyByName) {
    res.status(404).json({
      response: 'No company found with that name',
      success: false
    })
  
  } else
  res.status(200).json({
    response: companyByName,
    success: true
  })
})

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
