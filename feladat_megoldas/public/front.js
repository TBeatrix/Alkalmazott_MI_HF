const { text } = require("express");

async function generateLyrics() {
    const mood = document.getElementById('mood').value;
    const style = document.getElementById('style').value;
    const keywords = document.getElementById('keywords').value;
    const theme = document.getElementById('theme').value;
    const lengthSelection = document.getElementById('length').value;
    const language = document.getElementById('language').value;
    // További inputok értékének lekérése

    // Itt konvertálhatod a választott hosszúságot tokenek számára megfelelő értékre
    let maxTokens;
    switch(lengthSelection) {
        case 'very_short':
            maxTokens = 50;
            break;
        case 'short':
            maxTokens = 100;
            break;
        case 'normal':
            maxTokens = 150;
            break;
        case 'long':
            maxTokens = 500;
            break;
        default:
            maxTokens = 150; // Alapértelmezett érték, ha valami hiba történik
    }

    const response = await fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, style, keywords, theme, maxTokens, language }),
    });

    const data = await response.json();
    document.getElementById('lyricsOutput').innerHTML = data.lyrics.replace(/\n/g, '<br>');

}
