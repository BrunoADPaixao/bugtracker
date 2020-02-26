const express = require('express')
const app  = express()
const path = require('path')
const bodeParser = require('body-parser')
const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')
const { promisify } = require('util')

// configurações
const docId = 'chave da sua api google sheets'
const worksheetIndex = 0

app.set('view engine', 'ejs') /** seta o ejs como template builder da aplicação */
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodeParser.urlencoded({ extended: true })) /** decodifica a url encoded do formulario que veio no body via post transforma em um objeto json */

app.get('/', (request, response) => {
    response.render('home')
})
app.post('/', async(request, response) => {
    try {
        const doc = new GoogleSpreadsheet(docId)
        await promisify(doc.useServiceAccountAuth)(credentials)
        console.log('planilha aberta')
        const info = await promisify(doc.getInfo)()
        const worksheet = info.worksheets[worksheetIndex]
        await promisify(worksheet.addRow)({
            'name': request.body.name, 
            'email': request.body.email, 
            'issueType': request.body.issueType, 
            'howToReproduce': request.body.howToReproduce, 
            'expectedOutput': request.body.expectedOutput, 
            'receivedOutput': request.body.receivedOutput
        })
        response.send('bug reportado com sucesso')
    } catch {
        response.send('Erro ao enviar o formulário')
        console.log(err)
    }
})

app.listen(3000, (err) => {
    if (err) {
        console.log('Ocorreu um erro.', err)
    } else {
        console.log('bugtracker rodando na porta http://localhost:3000')
    }
})
