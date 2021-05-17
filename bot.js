const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1768424582:AAE4gqlBwxTt8TQgJneR3aqrZ-ZAldjFouo');

const pixapi = `20131285-580e74f68902b50b0ce218353`;

const dev = 'https://t.me/MRAn0nym0u5'

bot.inlineQuery(/pic\s.+/, async ctx => {
    let input = ctx.inlineQuery.query.split(' ');
    input.shift();
    let query = input.join(' ');
  
    let res = await axios.get(`https://pixabay.com/api/?key=${pixapi}&q=${query}`);
    let data = res.data.hits;
  
    let results = data.map((item, index) => {
      return {
        type: 'photo',
        id: String(index),
        photo_url: item.webformatURL,
        thumb_url: item.previewURL,
        photo_width: 300,
        photo_height: 200
      }
    })
    ctx.answerInlineQuery(results)
  })
  
  bot.inlineQuery(/wiki\s.+/, async ctx => {
    let input = ctx.inlineQuery.query.split(' ');
    input.shift();
    let query = input.join(' ');
  
    let res = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=50`);
    let data = res.data;
    let allTitles = data[1];
    let allLinks = data[3];
  
    if (allTitles == undefined) {
      return;
    }
  
    let results = allTitles.map((item, index) => {
      return {
        type: 'article',
        id: String(index),
        title: item,
        input_message_content: {
          message_text: `${item}\n${allLinks[index]}`
        },
        description: allLinks[index],
        reply_markup: {
          inline_keyboard: [
            [
              { text: `Share ${item}`, switch_inline_query: `${item}` }
            ]
          ]
        }
      }
    })
    ctx.answerInlineQuery(results);
  })
  
  bot.launch();