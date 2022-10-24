let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `kalo kamu mau order, order pake perintah ini\n\ncontoh:\n${usedPrefix + command} selamat siang owner, sy ingin order paket sewa hemat`
    if (text.length < 1 ) throw `Kalimat terlalu pendek, minimal 10 karakter!`
    if (text.length > 1000) throw `Kalimat terlalu panjang, maksimal 1000 karakter!`
    let teks = `*${htki} ${command.toUpperCase()} ${htka}*\n📮 : ${text}\n*- @${m.sender.split`@`[0]}*`
    conn.reply(global.nomorown + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    })
    m.reply('☑️ Order Telah terkirim ke Owner!\n_*Menunggu confirmasi Dari Owner...*_')
}
handler.command = /^(order)$/i
export default handler