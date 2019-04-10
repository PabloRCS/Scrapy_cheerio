const cheerio = require('cheerio')
const fs = require('fs')
const request = require('request-promise')
const writeStream = fs.createWriteStream('data.csv')

var url = 'https://www.bondfaro.com.br/cprocura?keyword=shampoo+loreal+silver+expert++300ml'

const ScrapyResult = {
    title: '',
    price: '',
    time: Date.now()
}

const Scrapy = async () => {
    try{
       const soup = await request.get(url)
       const $ = await cheerio.load(soup)
       
       const urlElems = $('li.ofr-new')
       for (let i = 0; i < urlElems.length; i++) {
           const result = []
           const urlTitle = $(urlElems[i]).find('p.title')[0]
           const urlPrice = $(urlElems[i]).find('span.value')[0]
           const urlLoja = $(urlElems[i]).find('p.seller-logo span')[0]
           if (urlTitle && urlPrice && urlLoja) {
               const result = []
               const urlText = $(urlTitle).text()
               const urlValor = $(urlPrice).text()
               const urlSeller = $(urlLoja).text()
               result.push(urlSeller, urlText, urlValor)               
               //console.log(result)
               writeStream.write(`${result}\n`)
           }
       }       
       
    }catch (err) {
      console.log(err)
    }
}
Scrapy()



































/*var url = 'https://www.bondfaro.com.br/'
request(url, (err, res, html) => {
    if(!err){
        var $ = cheerio.load(html)
        var tab = $('.ofr-new', ).text().trim()
        var outro = $('.value' ).text().trim()
        var price = $(this).attr('href')
        var list = $('p.price').text().trim()
           
    } 
       
                
        console.log(list)
})
      */ 


