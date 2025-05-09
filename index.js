require('dotenv').config();
const fetch = require('node-fetch');

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const imagenZambrana = "https://eladelantado.com/wp-content/uploads/2020/04/22-01-Mar%C3%ADa-Zambrano.jpg";

const mensaje = `**PRÓXIMOS ÁGAPES: VIERNES 9 - SÁBADO 17**

¡Oh, mis queridos veleños! ☀️ Con la alegría de nuestra tierra, os convoco a compartir momentos de grata compañía.

**VELADA MEXICANA Y SONES FESTIVOS - VIERNES 9**

El *viernes 9* a las *21:30* nos encontraremos en la *Cantina Niña Bonita* para una cena de sabores intensos. Viajaremos en el *Dacia*. Tras la pitanza, es probable que nos unamos a la música nupcial de nuestro anfitrión. ¡Que la noche nos colme de alegría y ritmo! 💃🕺

**ENCUENTRO EUROVISIVO (Y TENTATIVA PREVIA) - SÁBADO 17**

El *sábado 17* viviremos la emoción de Eurovisión con una deliciosa *cena secreta* en casa de nuestro anfitrión. ¡Celebremos juntos la victoria de Melody! 🎤🎶 Para los más entusiastas, consideremos una *previa el viernes 16* para conocer a fondo las canciones.

Con el afecto que nos une, ¡espero vuestra presencia! 😊`;

async function enviarMensaje() {
  try {
    // 1. Enviar imagen
    const resImg = await fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: imagenZambrana
      })
    });
    const imgResult = await resImg.json();
    console.log('📷 Imagen enviada:', imgResult);

    // 2. Enviar mensaje
    const resMsg = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: mensaje,
        parse_mode: 'Markdown'
      })
    });
    const msgResult = await resMsg.json();
    console.log('💬 Mensaje enviado:', msgResult);
  } catch (err) {
    console.error('❌ Error en el envío:', err);
  }
}

// Ejecutar ahora
enviarMensaje();
