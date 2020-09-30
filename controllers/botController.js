const dfff = require('dialogflow-fulfillment')
const axios = require('axios');
const getDef = (req, res) => {
    const agent = new dfff.WebhookClient({
      request : req,
      response : res
    })
    const word = req.body.queryResult.parameters.any
    async function checking(agent){
      try {
        const definition = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}`, {
      headers: {
          app_id: '',
          app_key: ''
        }
      })
      const data = definition.data.results[0].lexicalEntries[0]['entries'][0].senses[0].definitions[0]
  
      let payloadData = {
        "telegram": {
          "text": `*${word}* : ${data}`,
          "parse_mode": "Markdown"
        }
      }
      
      agent.add(new dfff.Payload(agent.UNSPECIFIED, payloadData, {
        sendAsMessage: true,
        rawPayload: true
      }))
      console.log('sent')
      } catch (error) {
        console.log('Erro')
      }}
      let intentMap = new Map()
      intentMap.set('getDef', checking)
      agent.handleRequest(intentMap)
    }
module.exports = getDef