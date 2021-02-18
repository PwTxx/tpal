let handler = function (m) {
  // this.sendContact(m.chat, '553398091185', 'Tiago', m)
  this.sendContact(m.chat, '0', 'Se Você é Casada, Não Chame', m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
