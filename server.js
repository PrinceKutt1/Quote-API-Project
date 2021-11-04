const express = require('express')
const app = express()

const { quotes } = require('./data')
const { getRandomElement } = require('./utils')

const PORT = process.env.PORT || 4001

app.use(express.static('public'))

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes)
  res.send({ quote: randomQuote })
})

app.get('/api/quotes', (req, res, next) => {
  const person = req.query.person
  if (person) {
    const returnQuote = quotes.filter(el => {
      return el.person === person
    })
    res.send({ quotes: returnQuote })
  } else {
    res.send({ quotes: quotes })
  }
})

app.post('/api/quotes', (req, res, next) => {
  const quoteQuery = req.query.quote
  const personQuery = req.query.person
  if (quoteQuery && personQuery) {
    const toPush = { quote: quoteQuery, person: personQuery }
    quotes.push(toPush)
    res.send({ quote: toPush })
  } else {
    res.status(400).send()
  }
})

app.put('/api/quotes/update', (req, res, next) => {
  const quoteIndex = getIndexById(req.params.id, quotes);
  if (quoteIndex !== -1) {
    updateElement(req.params.id, req.query, quotes);
    res.send(quotes[quoteIndex]);
  } else {
    res.status(404).send();
  }
});

app.delete('/api/quotes/delete', (req, res, next) => {
  const quoIndex = getIndexById(req.params.id, quotes);
  if (quoIndex !== -1) {
    quotes.splice(quoIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})
