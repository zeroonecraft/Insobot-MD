import fs from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { text }) => {
let name = m.pushName || conn.getName(m.sender)

let user = global.db.data.users[m.sender]
user.afk = + new Date
user.afkReason = text
 conn.sendButtonDoc(m.chat, `${conn.getName(m.sender)} is now AFK${text ? ': ' + text : ''}`, wm, 'ᴊᴀɴɢᴀɴ ᴅɪɢᴀɴɢɢᴜ ʏᴀ ᴋᴀᴋ', 'Bilek', m,  { contextInfo: { externalAdReply: { showAdAttribution: true,
        title: '𝙸𝚗𝚜𝚘𝚋𝚘𝚝-𝙼𝙳',
        body: wm,
    }
    } })
            }
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler
