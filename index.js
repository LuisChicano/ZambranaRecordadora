require('dotenv').config();
const fetch = require('node-fetch');
const cron = require('node-cron');
const { parse } = require('path');

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const imagenZambrana = "https://eladelantado.com/wp-content/uploads/2020/04/22-01-Mar%C3%ADa-Zambrano.jpg";

// Mensaje a enviar (puedes modificarlo en una sola línea)
const mensaje = `
**PRÓXIMOS ÁGAPES: SÁBADO 24 - VIERNES 6 DE JUNIO**

¡Ay, dilectos contertulios veleños! 👋 Con el alma aún algo mustia tras el reciente certamen eurovisivo, donde nuestra insigne Melody no obtuvo el reconocimiento que su talento merecía 😔, os saludo hoy. Permítanme, cual anfitriona agradecida y con el espíritu aún danzando, aunque a un ritmo más pausado, al son de los aconteceres, expresar mi más sincero reconocimiento por vuestra asistencia a la reciente velada. ¡Qué noche de emociones, de cánticos y de banderas ondeantes! Solo lamento si la contundencia y el fuego de nuestra cena mexicana 🌶️ provocaron alguna que otra melodía intestinal fuera de tono. ¡Ay, el picante, tan nuestro y a veces tan revoltoso! 😂

SÁBADO 24 - CUMPLEAÑOS DE JESÚS 🎂

Con la esperanza de que la alegría retorne pronto a nuestros corazones eurovisivos, permitidme recordaros nuestro próximo encuentro: la celebración del natalicio de nuestro querido Jesús. El 24 de mayo, la fortuna nos congregará nuevamente para festejar su existencia, previsiblemente con viandas más suaves para evitar futuras sinfonías estomacales. ¡No faltéis a este ágape de la amistad! 🫂

VIERNES 6 DE JUNIO - FIN DE SEMANA DE HOMBRES EN MUERTO REAL 🏞️

Y ahora, he de anunciar una nueva aventura, un retiro varonil de esos que fortalecen el espíritu y la camaradería. Los aguerridos varones de nuestra querida Vélez-Málaga 🚶‍♂️ emprenderán camino hacia las gaditanas tierras de Marín el viernes 6 de junio, para disfrutar de un fin de semana en la augusta morada de Muerto Real. Allí, entre risas y buena compañía masculina 🍻, tendremos el privilegio de presenciar en directo el magno evento del Summer Game Fest 🎮. ¡Una cita ineludible para los amantes de los mundos virtuales y el buen yantar!

Espero fervientemente contar con vuestra presencia en estos próximos ágapes, donde la amistad, la conversación y el espíritu veleño serán, como siempre, los protagonistas. ✨

Con el afecto de siempre desde mi querida Vélez-Málaga, me despido hasta nuestros próximos encuentros.

María Zambrano.
`

// Horarios: 10:00 y 15:00 todos los días
const horas = ['30 10 * * *', '0 15 * * *'];

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