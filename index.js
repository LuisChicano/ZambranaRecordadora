require('dotenv').config();
const fetch = require('node-fetch');
const cron = require('node-cron');
const { parse } = require('path');

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const imagenZambrana = "https://eladelantado.com/wp-content/uploads/2020/04/22-01-Mar%C3%ADa-Zambrano.jpg";

// Mensaje a enviar (puedes modificarlo en una sola línea)
const mensaje = `¡Oh, mis queridos contertulios veleños! ☀️ Como el sol que baña nuestras costas y alumbra nuestros ingenios, me dirijo a vosotros con el alma henchida de jovialidad y con un par de citas que sazonarán nuestras venideras jornadas. ¡Prestad atención, que la vida es un instante y estos encuentros, un regalo!

Tenemos en el horizonte cercano dos eventos que merecen nuestra más entusiasta atención:

* El *viernes 9*, cuando las sombras de la noche comiencen a danzar, nos congregaremos a las *21:30* en los aromáticos dominios de la *Cantina Niña Bonita*. Allí, entre sabores que evocan tierras lejanas y picantes, compartiremos mesa y mantel. Para la travesía, contaremos con la generosidad del *Dacia*, ese corcel naranja que guía nuestro buen amigo. Y como la noche es joven y los espíritus alegres, es muy probable que, tras la pitanza, nos dejemos llevar por los ritmos que emanen del festejo nupcial de nuestro anfitrión. ¡Que la música nos eleve! 💃🕺

* El *sábado 17*, la noche se vestirá de gala para recibir a la magna Eurovisión, ese certamen donde las canciones compiten por el cetro europeo. Nos reuniremos en la morada de nuestro querido anfitrión para degustar una *cena secreta* 🤫 (¡la intriga nos embriaga!) mientras presenciamos el triunfo, ¡ya lo vaticino!, de nuestra insigne Melody. Y para los más fervorosos seguidores de este aquelarre musical, queda abierta la posibilidad de una *previa eurovisiva el viernes 16*, donde desgranaremos las propuestas de cada nación. ¡A afinar las gargantas y los pronósticos! 🎤🎶

Así pues, mis entrañables amigos, preparad vuestros corazones y vuestras agendas para estos ágapes de amistad y algarabía. ¡Os espero con la alegría que me inspira esta tierra veleña y sus gentes! ¡Hasta pronto! 😊`

// Horarios: 10:00 y 15:00 todos los días
const horas = ['0 10 * * *', '0 15 * * *'];

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
  });
});

console.log('✅ Bot activo con envíos programados a las 10:00 y 15:00...');