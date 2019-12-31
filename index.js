const express = require('express')
const app  = express()
const path = require('path')
const bodeParser = require('body-parser')
const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')

// configurações
const docId = '1z7vYjch9iQFixY2bapfGcuFpGcilEz_uX8niwMFWjpo'
const worksheetIndex = 0

app.set('view engine', 'ejs') /** seta o ejs como template builder da aplicação */
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodeParser.urlencoded({ extended: true })) /** decodifica a url encoded do formulario que veio no body via post transforma em um objeto json */

app.get('/', (request, response) => {
    response.render('home')
})
app.post('/', (request, response) => {

    const doc = new GoogleSpreadsheet(docId)
    doc.useServiceAccountAuth(credentials, (err) => {
        if (err) {
            console.log('Nao foi possivel abrir a planilha')
        } else {
            console.log('planilha aberta')
            doc.getInfo((err, info) => {
                const worksheet = info.worksheets[worksheetIndex]
                worksheet.addRow( {'name': request.body.name, 'email': request.body.email, 'issueType': request.body.issueType, 
                                    'howToReproduce': request.body.howToReproduce, 'expectedOutput': request.body.expectedOutput, 'receivedOutput': request.body.receivedOutput}, err => {
                    response.send('bug reportado com sucesso!')
                })
            })
        }
    })
})
app.listen(3000, (err) => {
    if (err) {
        console.log('Ocorreu um erro.', err)
    } else {
        console.log('bugtracker rodando na porta http://localhost:3000')
    }
})