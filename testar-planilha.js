const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')
const {promisify} = require('util')

const addRowToSheet = async () => {
    const doc = new GoogleSpreadsheet('1z7vYjch9iQFixY2bapfGcuFpGcilEz_uX8niwMFWjpo')
    await promisify(doc.useServiceAccountAuth)(credentials)
    console.log('planilha aberta')
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[0]
    await promisify(worksheet.addRow)({name: 'teste', email: 'teste@asdf.com'})
}
addRowToSheet()
    // const doc = new GoogleSpreadsheet(docId)
    // doc.useServiceAccountAuth(credentials, (err) => {
    //     if (err) {
    //         console.log('Nao foi possivel abrir a planilha')
    //     } else {
    //         console.log('planilha aberta')
    //         doc.getInfo((err, info) => {
    //             const worksheet = info.worksheets[worksheetIndex]
    //             worksheet.addRow( {'name': request.body.name, 'email': request.body.email, 'issueType': request.body.issueType, 
    //                                 'howToReproduce': request.body.howToReproduce, 'expectedOutput': request.body.expectedOutput, 'receivedOutput': request.body.receivedOutput}, err => {
    //                 response.send('bug reportado com sucesso!') 
    //             })
    //         })
    //     }
    // })
    // await promisify(worksheet.addRow)({'name': request.body.name, 'email': request.body.email, 'issueType': request.body.issueType, 
    //                                     'howToReproduce': request.body.howToReproduce, 'expectedOutput': request.body.expectedOutput, 
    //                                     'receivedOutput': request.body.receivedOutput
    //                                 })
