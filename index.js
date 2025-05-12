require('dotenv').config();
const fetch = require('node-fetch');
const cron = require('node-cron');
const { parse } = require('path');

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const imagenZambrana = "https://eladelantado.com/wp-content/uploads/2020/04/22-01-Mar%C3%ADa-Zambrano.jpg";

// Mensaje a enviar (puedes modificarlo en una sola línea)
const mensaje = `
**PRÓXIMOS ÁGAPES: SÁBADO 17 - SÁBADO 24**

*¡Oh, dilectos contertulios de mi alma veleña!* 🌟

Con el corazón henchido de gratitud, aún resuenan en mis oídos las alegres notas 🎶 y los sabrosos manjares 🌮 de nuestra reciente velada mexicana, aderezada con los ritmos nupciales 💃🕺 que nos hicieron levitar sobre la misma Axarquía. ¡Gracias por compartir tan gratos momentos! 😊

*SÁBADO 17 - EUROVISIÓN: LA NOCHE DE MELODY* 🎤

¡Atención, espíritus inquietos y melómanos empedernidos! El *sábado 17*, la noche se vestirá de lentejuelas ✨ y vibrantes melodías 🎵 con la llegada del magno festival de Eurovisión. Nos congregaremos en la morada secreta de nuestro querido "gordo" 🏡 para degustar una cena que, como los designios del azar, permanece envuelta en misterio hasta el último instante. Y, ¡oh, dulce esperanza!, nuestros corazones palpitarán al unísono esperando el triunfo ineludible de nuestra insigne Melody 👑.

¿Acaso hay almas previsoras que deseen calentar motores 🔥 y escudriñar las propuestas musicales de las naciones contendientes? ¡La víspera del certamen queda abierta a un encuentro preliminar para deleitarnos con un repaso de tan singulares partituras! 🎼 Que cada cual alce su voz si desea analizar la previa de tal magno simposio musical.

*SÁBADO 24 - ¡HONOR Y ALBOROZO POR NUESTRO CABO JESÚS!* 🎂🎉

El *sábado 24*, la tarde se engalanará con los colores de la alegría para celebrar el natalicio de nuestro querido Jesús, baluarte de la ley y el orden en nuestra tierra. Pero la dicha se duplica, pues festejaremos con orgullo su merecido ascenso a Cabo de la Guardia Civil. Nos reuniremos para compartir una deliciosa merienda 🍰🍇 y colmar de parabienes a este espíritu entrañable y ahora, ¡con más galones! 👮‍♂️ ¡Que las risas, los buenos deseos y el eco de su nuevo rango inunden este feliz encuentro! 🥳

¡Os espero con la ilusión de un niño ante una noche estrellada 🌠 en nuestra amada Vélez! ❤️
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