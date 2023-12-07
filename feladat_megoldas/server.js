const express = require('express');
const  OpenAIAPI  = require('openai');
const app = express();

app.use(express.json());
app.use(express.static('public/front.js')); // A frontend fájlokhoz
app.use(express.static('public'));
const openai = new OpenAIAPI({
    apiKey: ''//missing API KEY
});

app.post('/generate', async (req, res) => {
    console.log(req.body);
    const { mood, style, keywords, theme, maxTokens, language } = req.body;
    
    try {
        const response = await openai.chat.completions.create({
            model:  "gpt-3.5-turbo",
            messages: [{'role': 'user', 'content': `Írj egy dalszöveget amelynek a hangulata: ${mood}. A stílusa legyen:
            ${style}, szerepeljenek benne a következő kulcsszavak, melyek vesszővel elválasztva vannak megadva: ${keywords}.
             A dalszöveg stílusa legyem: ${theme}. A vers nyelve legyen: ${language} A vers tokenjeinek száma legyen kevesebb mint: ${maxTokens-20} !`}],
            max_tokens: maxTokens// Állítsd be a kívánt hosszt
            
        });
        console.log(`Futok!  ${JSON.stringify(response.choices[0].message)}`);
       
       
        res.send({ lyrics: response.choices[0].message.content });
    } catch (error) {
        console.error('Hiba történt az OpenAI API hívás során:', error);
        console.log(`ERRROR`);
        res.status(500).send({ error: 'Hiba történt a generálás során.' });
    }
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Szerver fut a ${PORT} porton`);
});

