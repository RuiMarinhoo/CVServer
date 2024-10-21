const express = require('express');
const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const {photo_component, text_component, skills_component, topics_component, icons_component} = require("./cv-components");
const readFile = utils.promisify(fs.readFile)


function createRouter() {
    const router = express.Router();

    router.post('/', async function (req, res, next) {

        const layout_cv = req.body

        let model = layout_cv.type;


        // let data = {
        //     nome: 'Rui',
        // };
        // let data = req.body.data;
        let data = {
            left: await getHtmlComponents(layout_cv.columns[0].components),
            right: await getHtmlComponents(layout_cv.columns[1].components),
        };

        // console.log(data);

        hb.registerHelper('content_left', function(string) {
            return data.left;
        });
        hb.registerHelper('content_right', function(string) {
            return data.right;
        });

        getTemplateHtml(model)
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


                // Running without docker
                // const chromeOptions = {
                //     headless: true,
                //     // headless: false,
                //     defaultViewport: null,
                //     devtools: true,
                //     args: [
                //         '--no-sandbox',
                //         '--disable-setuid-sandbox',
                //     ]
                // }
                // Running with docker
                const chromeOptions = {
                    executablePath: '/usr/bin/google-chrome',
                    headless: 'new',
                    ignoreDefaultArgs: ['--disable-extensions'],
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                };


                // we are using headless mode
                const browser = await puppeteer.launch(chromeOptions);
                const page = await browser.newPage()

                // We set the page content as the generated html by handlebars
                await page.setContent(html)

                // await page.addStyleTag({
                //     content: `
                //     @page:first { margin-top: 0px; margin-bottom: 50px;}
                // `,
                // });

                // we Use pdf function to generate the pdf in the same folder as this file.
                const pdf = await page.pdf( {
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
                    scale: 1.5
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

                res.send(contents);

            })
            .catch(err => {
                console.error(err)
                res.send('');
            });

    });

    router.post('/render', async function (req, resp, next) {

        const layout_cv = req.body

        let model = layout_cv.type;


        // let data = {
        //     nome: 'Rui',
        // };
        // let data = req.body.data;
        let data = {
            left: await getHtmlComponents(layout_cv.columns[0].components),
            right: await getHtmlComponents(layout_cv.columns[1].components),
        };

        // console.log(req.body);

        hb.registerHelper('content_left', function(string) {
            return data.left;
        });
        hb.registerHelper('content_right', function(string) {
            return data.right;
        });

        getTemplateHtml(model)
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


                // resp.send(html);

                // Running without docker
                // const chromeOptions = {
                //     headless: true,
                //     // headless: false,
                //     defaultViewport: null,
                //     devtools: true,
                //     args: [
                //         '--no-sandbox',
                //         '--disable-setuid-sandbox',
                //     ]
                // }
                // Running with docker
                const chromeOptions = {
                    executablePath: '/usr/bin/google-chrome',
                    headless: 'new',
                    ignoreDefaultArgs: ['--disable-extensions'],
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                };

                // we are using headless mode
                const browser = await puppeteer.launch(chromeOptions);
                const page = await browser.newPage();

                // We set the page content as the generated html by handlebars
                await page.setContent(html);
                // await page.addStyleTag({ path: './public/css/style.css'});
                await page.setViewport({width: 595, height: 842});
                await page.screenshot({path: 'example.jpg'})
                const contents = await base64_encode('example.jpg');
                // setTimeout(async () => {
                //     await browser.close()
                // }, 50000)
                await browser.close()


                fs.unlink('example.jpg', (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })

                resp.send(contents);

            })
            .catch(err => {
                console.error(err)
                // resp.sendStatus(500);
                resp.send('');
            });

    });
    return router;
}

module.exports = createRouter;


async function getTemplateHtml(model) {

    console.log("Loading template file in memory")
    try {
        const invoicePath = path.resolve("./routes/layout/" + model + ".html");
        // const invoicePath = path.resolve("./routes/layout/f1.html");
        return await readFile(invoicePath, 'utf8');
    } catch (err) {
        return Promise.reject("Could not load html template");
    }
}

async function getHtmlComponents(components) {

    let toHtml = ''
    components.forEach(component => {
        if(component.value){
            if(component.type === 'photo'){
                const component_photo = component.value
                toHtml += photo_component(component_photo)
            }
            if(component.type === 'text' || component.type === 'simple-text'){
                const component_text = component.value
                toHtml += text_component(component_text)
            }
            if(component.type === 'list-skills'){
                const component_skills = component.value
                toHtml += skills_component(component_skills)
            }
            if(component.type === 'list-topics'){
                const component_topics = component.value
                toHtml += topics_component(component_topics)
            }
            if(component.type === 'list-icons'){
                const component_icons = component.value
                toHtml += icons_component(component_icons)
            }
        }
    })
    return toHtml
}


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}
