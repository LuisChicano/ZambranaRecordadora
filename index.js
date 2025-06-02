require('dotenv').config();
const fetch = require('node-fetch');
const cron = require('node-cron');
const { parse } = require('path');

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const imagenZambrana = "https://eladelantado.com/wp-content/uploads/2020/04/22-01-Mar%C3%ADa-Zambrano.jpg";

// Mensaje a enviar (puedes modificarlo en una sola línea)
const mensaje = `
**PRÓXIMOS ÁGAPES: VIERNES 6 - ONVRES EN MUERTO REAL**

¡Ay, dilectos contertulios veleños! 👋

¡Qué grato recuerdo el cumpleaños de nuestro querido Jesús! 🎂 Fue una velada espléndida, donde la amistad y la alegría fluyeron con la misma dulzura que los innumerables postres y las deliciosas pizzas que generosamente compartimos. ¡Mi agradecimiento a todos por hacer de esa noche un verdadero festín para el alma y el paladar! 🍕🍰

**VIERNES 6 DE JUNIO FIN DE SEMANA DE ONVRES EN MUERTO REAL** 🏞️

Y ahora, atención, mis intrépidos varones veleños, porque la aventura nos aguarda esta misma semana. El viernes 6 de junio se alza majestuoso en el horizonte, marcando el inicio de nuestra expedición hacia las gaditanas tierras de Marín. Un fin de semana de hombres, en la augusta morada de Muerto Real, donde la camaradería masculina alcanzará su cénit. 🚶‍♂️🍻

Imaginad, si sois capaces, el ambiente de expectación, las risas cómplices y, por supuesto, la emoción de presenciar en directo el magno evento del **Summer Game Fest** 🎮. ¡Será una cita ineludible para los amantes de los mundos virtuales, las tertulias profundas y el buen yantar que siempre acompaña nuestras gestas! Preparad vuestros espíritus para una experiencia que, sin duda, dejará una huella imborrable en vuestras memorias. ¡La comitiva veleña se dispone a conquistar los dominios gaditanos!

Espero fervientemente contar con vuestra presencia en estos próximos ágapes, donde la amistad, la conversación y el espíritu veleño serán, como siempre, los protagonistas. ✨

Con el afecto de siempre desde mi querida Vélez-Málaga, me despido hasta nuestros próximos encuentros.

**María Zambrano.**
`

// Horarios: 10:00 y 15:00 todos los días
const horas = ['15 11 * * *', '0 15 * * *'];

horas.forEach((hora) => {
  cron.schedule(hora, async () => {
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
    }, {
      timezone: 'Europe/Madrid'
    });
  });

console.log('✅ Bot activo con envíos programados a las 10:30 y 15:00...');