let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let name = conn.getName(who)
    let about = (await conn.getStatus(who)).status
    let { limit, exp, lastclaim } = global.DATABASE.data.users[m.sender]
    let str = `
Nome: ${name} (@${who.replace(/@.+/, '')})
Info: ${about}
Número: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
Link: https://wa.me/${who.split`@`[0]}
XP: ${exp}
Limite: ${limit}
Última Reivindicação: ${new Date(lastclaim)}
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^profile$/i
module.exports = handler

