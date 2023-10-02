import express from  'express'
import ViteExpress from 'vite-express'

const app = express()
app.use(express.json())

//Application data structure:

/*
const user = {username: 'john', password: 'pw', 
musictour: {tourname: 'Judgement Day', 
tourduration: 50, 
tourlocations: [{country: 'US', state: 'New York', venue: 'Madison Square Garden', date: '12-20-2023'}],
targetaudiences: [{agerange: '15-30', favoritegenres: ['Rock', 'Pop']}],
headliningartists: [{artist: 'Limp Bizkit', setlist: ['My Generation', 'Counterfeit']}],
supportingartists: [{artist: 'Taylor Swift', setlist: ['Love Story', 'You Belong With Me']}]}}
*/

let user = {}

app.get('/read', (req, res) => res.json(user))

app.post('/add', (req, res) => {
  res.json(user)
})

app.post('/change', function(req, res) {
  res.sendStatus(200)
})

ViteExpress.listen(app, 3000)