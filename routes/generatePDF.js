const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)


router.get('/', async function (req, res, next) {

    // let modelo = req.body.modelo;

    let data = {
        nome: 'RUI'
    };

    getTemplateHtml('teste')
        .then(async (resp) => {
            // Now we have the html code of our template in res object
            // you can check by logging it on console
            // console.log(res)

            console.log("Compiing the template with handlebars")
            const template = hb.compile(resp, { strict: true });
            // we have compile our code with handlebars
            const result = template(data);
            // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
            const html = result;

            // we are using headless mode
            const browser = await puppeteer.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            });
            const page = await browser.newPage()

            // We set the page content as the generated html by handlebars
            await page.setContent(html)

            // await page.addStyleTag({
            //     content: `
            //     @page:first { margin-top: 0px; margin-bottom: 50px;}
            // `,
            // });

            // we Use pdf function to generate the pdf in the same folder as this file.
            await page.pdf( {
                path: 'teste.pdf',
                format: 'A4',
                printBackground: true,
                displayHeaderFooter: false,
                margin: {
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                },
            })
            // const contents = await fs.readFile('invoice.pdf', {encoding: 'base64'});
            const contents = await base64_encode('teste.pdf');

            await browser.close();
            console.log("PDF Generated")

            // console.log(contents);

            fs.unlink('teste.pdf', (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log("PDF Removed");
            })

            // res.send(contents);
            res.send('teste');

        })
        .catch(err => {
            console.error(err)
        });

});

router.post('/render', async function (req, resp, next) {


    let modelo = req.body.modelo;

    if (modelo === 'DJ1' && req.body.param4 === '')
        modelo = 'DJ1.1'


    let data = {
        dataTicket: req.body.dataTicket,
        numServico: req.body.numServico,
        referencia: req.body.referencia,
        param1: req.body.param1,
        param2: req.body.param2,
        param3: req.body.param3,
        param4: req.body.param4,
        param5: req.body.param5,
        nomecliente: req.body.nomecliente,
        nomelocal: req.body.nomelocal
    };


    getTemplateHtml(modelo)
        .then(async (res) => {
            // Now we have the html code of our template in res object
            // you can check by logging it on console
            // console.log(res)

            console.log("Compiing the template with handlebars")
            const template = hb.compile(res, {strict: false});
            // we have compile our code with handlebars
            const result = template(data);


            // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
            const html = result;


            resp.send(html);

        })
        .catch(err => {
            console.error(err)
            resp.sendStatus(500);
        });

});


module.exports = router;


async function getTemplateHtml(modelo) {

    console.log("Loading template file in memory")
    try {
        // const invoicePath = path.resolve("./routes/layout/" + modelo + ".html");
        const invoicePath = path.resolve("./routes/layout/invoice.html");
        return await readFile(invoicePath, 'utf8');
    } catch (err) {
        return Promise.reject("Could not load html template");
    }
}


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}
