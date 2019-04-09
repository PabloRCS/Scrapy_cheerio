const cheerio = require('cheerio')
const axios = require('axios')

axios.get('https://www.bondfaro.com.br/cprocura?keyword=shampo+loreal').then((response) => {

    const $ = cheerio.load(response.data)

    const urlElems = $('li.ofr-new')
    for (let i = 0; i < urlElems.length; i++) {
        
        const urlSpan = $(urlElems[i]).find('p.title')[0]
        if (urlSpan) {
            const urlText = $(urlSpan).text()
            console.log(urlText)
        }
    }
})
