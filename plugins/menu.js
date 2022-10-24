// Script Ori By BochilGaming
// Ditulis Ulang Oleh ImYanXiao

import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const { makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = (await import('@adiwajshing/baileys')).default

const defaultMenu = {
  before: `
  ╭─────═[ 𝙸𝙽𝙵𝙾 𝚄𝚂𝙴𝚁 ]═─────⋆
  │╭───────────────···
  ┴│☂︎ 𝗡𝗮𝗺𝗲: %name
  ⬡│☂︎ 𝗧𝗮𝗴: %tag
  ⬡│☂︎ 𝗣𝗿𝗲𝗺𝗶𝘂𝗺: %prems
  ⬡│☂︎ 𝗟𝗶𝗺𝗶𝘁: %limit
  ⬡│☂︎ 𝗠𝗼𝗻𝗲𝘆: %money
  ⬡│☂︎ 𝗥𝗼𝗹𝗲: %role
  ⬡│☂︎ 𝗟𝗲𝘃𝗲𝗹: %level [ %xp4levelup Xp For Levelup]
  ⬡│☂︎ 𝗫𝗽: %exp / %maxexp
  ┬│☂︎ 𝗧𝗼𝘁𝗮𝗹 𝗫𝗽: %totalexp
  │╰────────────────···
  ┠─────═[ 𝚃𝙾𝙳𝙰𝚈 ]═─────⋆
  │╭────────────────···
  ┴│    *${ucapan()} %name!*
  ⬡│☂︎ 𝗧𝗮𝗻𝗴𝗴𝗮𝗹: %week %weton
  ⬡│☂︎ 𝗗𝗮𝘁𝗲: %date
  ⬡│☂︎ 𝗧𝗮𝗻𝗴𝗴𝗮𝗹 𝗜𝘀𝗹𝗮𝗺: %dateIslamic
  ┬│☂︎ 𝗪𝗮𝗸𝘁𝘂: %time
  │╰────────────────···
  ┠─────═[ 𝙸𝙽𝙵𝙾 𝙱𝙾𝚃 ]═─────⋆
  │╭────────────────···
  ┴│☂︎ 𝗡𝗮𝗺𝗮 𝗕𝗼𝘁: %me
  ⬡│☂︎ 𝗠𝗼𝗱𝗲: %mode
  ⬡│☂︎ 𝗣𝗿𝗲𝗳𝗶𝘅: [ *%_p* ]
  ⬡│☂︎ 𝗕𝗮𝗶𝗹𝗲𝘆𝘀: Multi Device
  ⬡│☂︎ 𝗕𝗮𝘁𝘁𝗲𝗿𝘆: ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
  ⬡│☂︎ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: %platform
  ⬡│☂︎ 𝗧𝘆𝗽𝗲: Node.Js
  ⬡│☂︎ 𝗨𝗽𝘁𝗶𝗺𝗲: %muptime
  ┬│☂︎ 𝗥𝗲𝗴𝗶𝘀𝘁𝗲𝗿: %rtotalreg dari %totalreg
  │╰────────────────···
  ╰──────────═┅═──────────
  
  ⃝▣──「 𝙸𝙽𝙵𝙾 𝙲𝙼𝙳 」───⬣
  │ *Ⓟ* = Premium
  │ *Ⓛ* = Limit
  ▣────────────⬣
  %readmore
  `.trimStart(),
    header: '⃝▣──「 %category 」───⬣',
    body: '│○ %cmd %isPremium %islimit',
    footer: '▣───────────⬣\n',
    after: `%c4 %me`,
  }
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command}) => {
	let tags
	let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'anime', 'update', 'maker', 'edukasi', 'news', 'random', 'game', 'xp', 'islamic', 'stiker', 'rpg', 'kerangajaib', 'quotes', 'admin', 'group', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database','quran', 'vote', 'nsfw', 'audio', 'jadibot', 'info', 'owner', 'nocategory']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': 'Main',
  'game': 'Game',
  'rpg': 'RPG Games',
  'xp': 'Exp & Limit',
  'sticker': 'Sticker',
  'kerang': 'Kerang Ajaib',
  'quotes': 'Quotes',
  'fun': 'Fun',
  'anime': 'Anime',
  'admin': 'Admin',
  'group': 'Group',
  'vote': 'Voting',
  'absen': 'Absen',
  'premium': 'Premium',
  'anonymous': 'Anonymous Chat',
  'internet': 'Internet',
  'downloader': 'Downloader',
  'tools': 'Tools',
  'nulis': 'MagerNulis & Logo',
  'audio': 'Audio',
  'maker': 'Maker',
  'database': 'Database',
  'quran': 'Al Qur\'an',
  'owner': 'Owner',
  'host': 'Host',
  'advanced': 'Advanced',
  'info': 'Info',
  '': 'No Category',
}
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'Nulis',
    'maker': 'Maker'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'absen') tags = {
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al-Qur\'an',
    'islamic': 'Islamic'
  }
  if (teks == 'audio') tags = {
    'audio': 'Audio'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
 if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'nocategory') tags = {
    '': 'No Category'
  }
  try {
  	// DEFAULT MENU
      let dash = global.dashmenu
  	let m1 = global.dmenut
      let m2 = global.dmenub
      let m3 = global.dmenuf
      let m4 = global.dmenub2
      
      // COMMAND MENU
      let cc = global.cmenut
      let c1 = global.cmenuh
      let c2 = global.cmenub
      let c3 = global.cmenuf
      let c4 = global.cmenua
      
      // LOGO L P
      let lprem = global.lopr
      let llim = global.lolm
      let tag = `@${m.sender.split('@')[0]}`
    
    //-----------TIME---------
    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
    let usrs = db.data.users[m.sender]
   
    const sections = [
      {
     title: `${htki} ᴍᴀɪɴ ${htka}`,
     rows: [
         {title: `⚡ ${pmenus} 𝚂𝙿𝙴𝙴𝙳 𝙱𝙾𝚃`, rowId: ".ping", description: "𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 𝙺𝚎𝚌𝚎𝚙𝚊𝚝𝚊𝚗 𝚁𝚎𝚜𝚙𝚘𝚗 𝙱𝙾𝚃"},
         {title: `⏰ ${pmenus} 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 𝙱𝙾𝚃`, rowId: ".runtime", description: "𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 𝚆𝚊𝚔𝚝𝚞 𝙱𝙾𝚃 𝙱𝚎𝚛𝚓𝚊𝚕𝚊𝚗"}, 
         {title: `💌 ${pmenus} 𝙾𝚆𝙽𝙴𝚁 𝙱𝙾𝚃`, rowId: ".creator", description: "𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚜𝚒 𝚃𝚎𝚗𝚝𝚊𝚗𝚐 𝙾𝚠𝚗𝚎𝚛"},
     ]
       },{
     title: `${htki} sᴜᴘᴘᴏʀᴛ ${htka}`,
     rows: [
         {title: `💹 ${pmenus} 𝙳𝙾𝙽𝙰𝚃𝙴`, rowId: ".donasi", description: '𝚂𝚞𝚙𝚙𝚘𝚛𝚝 𝙾𝚠𝚗𝚎𝚛 𝙰𝚐𝚊𝚛 𝙻𝚎𝚋𝚒𝚑 𝚂𝚎𝚖𝚊𝚗𝚐𝚊𝚝'},
         {title: `Ⓟ ${pmenus} SEWA/PREMIUM`, rowId: ".sewa", description: '𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 𝙻𝚒𝚜𝚝 𝙷𝚊𝚛𝚐𝚊 𝚂𝚎𝚠𝚊/𝙿𝚛𝚎𝚖𝚒𝚞𝚖'},
     ]
     },{
     title: `${htki} ᴍᴇɴᴜ ${htka}`,
     rows: [
     {title: `💬 ${pmenus} 𝙰𝙻𝙻`, rowId: ".? all", description: "𝙼𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚊𝚔𝚊𝚗 𝚜𝚎𝚖𝚞𝚊 𝙱𝙾𝚃 𝚌𝚘𝚖𝚖𝚊𝚗𝚍"},
     {title: `👑 ${pmenus} 𝙰𝙳𝙼𝙸𝙽`, rowId: ".? admin", description: "𝙷𝚊𝚗𝚢𝚊 𝚞𝚗𝚝𝚞𝚔 𝚊𝚍𝚖𝚒𝚗 𝚐𝚛𝚘𝚞𝚙"},
     {title: `📖 ${pmenus} 𝙰𝙻-𝚀𝚄𝚁𝙰𝙽` , rowId: ".? quran", description: "𝚃𝚘𝚋𝚊𝚝 𝚢𝚞𝚔 𝚔𝚊𝚔"},
     {title: `🎭 ${pmenus} 𝙰𝙽𝙾𝙽𝚈𝙼𝙾𝚄𝚂 𝙲𝙷𝙰𝚃𝚂`, rowId: ".? anonymous", description: "𝙱𝚒𝚌𝚊𝚛𝚊 𝚍𝚎𝚗𝚐𝚊𝚗 𝚘𝚛𝚊𝚗𝚐 𝚝𝚒𝚍𝚊𝚔 𝚍𝚒𝚔𝚎𝚗𝚊𝚕"},
     {title: `⛩️ ${pmenus} 𝙰𝙽𝙸𝙼𝙴`, rowId: ".? anime", description: "𝚆𝚒𝚋𝚞 𝚠𝚒𝚋𝚞🐦"},
     {title: `🎧 ${pmenus} 𝙰𝚄𝙳𝙸𝙾`, rowId: ".? audio", description: "𝚄𝚋𝚊𝚑 𝚊𝚞𝚍𝚒𝚘 𝚍𝚎𝚗𝚐𝚊𝚗 𝚏𝚒𝚕𝚝𝚎𝚛"},
     {title: `🗂️ ${pmenus} 𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴`, rowId: ".? database", description: "𝚂𝚒𝚖𝚙𝚊𝚗 𝚜𝚎𝚜𝚞𝚊𝚝𝚞 𝚍𝚒 𝙱𝙾𝚃"},
     {title: `📩 ${pmenus} 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁𝚂`, rowId: ".? downloader", description: "𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚜𝚎𝚜𝚞𝚊𝚝𝚞 𝚍𝚊𝚛𝚒 𝙱𝙾𝚃"},
     {title: `✨ ${pmenus} 𝙴𝚇𝙿`, rowId: ".? xp", description: "𝙰𝚢𝚘 𝚝𝚒𝚗𝚐𝚔𝚊𝚝𝚔𝚊𝚗 𝚙𝚊𝚗𝚐𝚔𝚊𝚝 𝚖𝚞!"},
     {title: `🧩 ${pmenus} 𝙵𝚄𝙽`, rowId: ".? fun", description: "𝙵𝚒𝚝𝚞𝚛 𝚢𝚊𝚗𝚐 𝚊𝚖𝚊𝚗 𝚞𝚗𝚝𝚞𝚔 𝚔𝚎𝚕𝚞𝚊𝚛𝚐𝚊"},
     {title: `🎮 ${pmenus} 𝙶𝙰𝙼𝙴`, rowId: ".? game", description: "𝙶𝚊𝚖𝚎𝚗𝚢𝚊 𝚜𝚎𝚛𝚞 𝚜𝚎𝚛𝚞 𝚕𝚑𝚘"},
     {title: `🏢 ${pmenus} 𝙶𝚁𝙾𝚄𝙿`, rowId: ".? group", description: "𝙷𝚊𝚗𝚢𝚊 𝚋𝚒𝚜𝚊 𝚍𝚒 𝚐𝚛𝚘𝚞𝚙𝚜"},
     {title: `🌎 ${pmenus} 𝙸𝙽𝚃𝙴𝚁𝙽𝙴𝚃`, rowId: ".? internet", description: "𝙲𝚊𝚛𝚒 𝚜𝚎𝚜𝚞𝚊𝚝𝚞 𝚍𝚒 𝙱𝙾𝚃"},
     {title: `ℹ️ ${pmenus} 𝙸𝙽𝙵𝙾`, rowId: ".? info", description: "𝙸𝚗𝚏𝚘 𝙱𝙾𝚃"},
     {title: `🐚 ${pmenus} 𝙺𝙴𝚁𝙰𝙽𝙶`, rowId: ".? kerangajaib", description: "𝚃𝚊𝚗𝚢𝚊𝚔𝚊𝚗 𝚙𝚊𝚍𝚊 𝚔𝚎𝚝𝚞𝚊 𝚌𝚕𝚞𝚋"},
     {title: `✏️ ${pmenus} 𝙽𝚄𝙻𝙸𝚂`, rowId: ".? nulis", description: "𝙼𝚊𝚕𝚎𝚜 𝚗𝚞𝚕𝚒𝚜 𝚔𝚊𝚔?"},
     {title: `🔞 ${pmenus} 𝙽𝚂𝙵𝚆`, rowId: ".? nsfw", description: "𝚃𝚌𝚑, 𝚍𝚊𝚜𝚊𝚛 𝚜𝚊𝚐𝚗𝚎𝚊𝚗"},
     {title: `👩‍💻 ${pmenus} 𝙾𝚆𝙽𝙴𝚁`, rowId: ".? owner", description: "𝙷𝚊𝚗𝚢𝚊 𝚞𝚗𝚝𝚞𝚔 𝚘𝚠𝚗𝚎𝚛!"},
     {title: `🌟 ${pmenus} 𝙿𝚁𝙴𝙼𝙸𝚄𝙼`, rowId: ".? premium", description: "𝚄𝚗𝚝𝚞𝚔 𝚞𝚜𝚎𝚛 𝚙𝚛𝚎𝚖𝚒𝚞𝚖"},
     {title: `📑 ${pmenus} 𝚀𝚄𝙾𝚃𝙴𝚂`, rowId: ".? quotes", description: "𝚁𝚊𝚗𝚍𝚘𝚖 𝙸𝚗𝚜𝚙𝚒𝚛𝚊𝚜𝚒"},
     {title: `🌱 ${pmenus} 𝚁𝙿𝙶`, rowId: ".? rpg", description: "𝙶𝚊𝚖𝚎 𝙴𝚙𝚒𝚌 𝚁𝚙𝚐!"},
     {title: `🎨 ${pmenus} 𝚂𝚃𝙸𝙺𝙴𝚁𝚂`, rowId: ".? stiker", description: "𝙱𝚞𝚊𝚝 𝚂𝚝𝚒𝚌𝚔𝚎𝚛 𝚍𝚒 𝙱𝙾𝚃"},
     {title: `🛠️ ${pmenus} 𝚃𝙾𝙾𝙻𝚂`, rowId: ".? tools", description: "𝙼𝚞𝚗𝚐𝚔𝚒𝚗 𝚝𝚘𝚘𝚕𝚜 𝚒𝚗𝚒 𝚋𝚒𝚜𝚊 𝚖𝚎𝚖𝚋𝚊𝚗𝚝𝚞?"},
     /*{title: `❓ ${pmenus} 𝙽𝙾 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈`, rowId: ".? nocategory", description: "𝙵𝚒𝚝𝚞𝚛 𝚝𝚊𝚗𝚙𝚊 𝚔𝚊𝚝𝚎𝚐𝚘𝚛𝚢!"},*/
     ]
     },
   ]
   
let tek = `✧────···[ 𝙳𝙰𝚂𝙷𝙱𝙾𝙰𝚁𝙳 ]···────✧
  *${ucapan()} ${conn.getName(m.sender)}*
  ╭━━━━━━━━━━━━━━━━┈─✧
  ┴
  │⬡ 𝙰𝚔𝚝𝚒𝚏 𝚜𝚎𝚕𝚊𝚖𝚊 ${mpt}
  │⬡ 𝙱𝚊𝚝𝚎𝚛𝚊𝚒 ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 𝙿𝚎𝚗𝚐𝚒𝚜𝚒𝚊𝚗' : ''}` : '𝚃𝚒𝚍𝚊𝚔 𝚍𝚒𝚔𝚎𝚝𝚊𝚑𝚞𝚒'}
  │⬡ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${_p} ]
  │⬡ *${Object.keys(global.db.data.users).length}* 𝙿𝚎𝚗𝚐𝚐𝚞𝚗𝚊
  │⬡ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* 𝙲𝚑𝚊𝚝 𝚃𝚎𝚛𝚋𝚊𝚗𝚗𝚎𝚍
  │⬡ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* 𝙿𝚎𝚗𝚐𝚐𝚞𝚗𝚊 𝚃𝚎𝚛𝚋𝚊𝚗𝚗𝚎𝚍
  ┬
  ├━━━━━━━━━━━━━━━━┈─⋆
  │ ▸ 𝙾𝚆𝙽𝙴𝚁: 𝙱𝚒𝚗𝚝𝚊𝚗𝚐 𝟷𝟹𝟶𝟸
  ┴ 
  ✧
  ┬ 📌 𝗣𝗶𝗻𝗻𝗲𝗱 :
  │ ʙᴇʀɪ ᴊᴇᴅᴀ ʏᴀʜ ᴋᴀᴋ ^ω^
  ╰━━━━━━━━━━━━━━━━┈─◂`
const listMessage = {
  text: tek,
  footer: wm2,
  mentions: await conn.parseMention(tek),
  title: ``,
  buttonText: `𝙺𝚕𝚒𝚔 𝙳𝚒𝚜𝚒𝚗𝚒 ⎙`, 
  sections
}
  if (teks == '404') {
  	return conn.sendMessage(m.chat, listMessage, { quoted: fkontak, mentions: await conn.parseMention(tek), contextInfo:{ forwardingScore: 99999, isForwarded: true }})
    }

 /**************************** TIME *********************/
 let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
 
 let mode = global.opts['self'] ? '𝙿𝚛𝚒𝚟𝚊𝚝𝚎' : '𝙿𝚞𝚋𝚕𝚒𝚔'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { age, exp, limit, level, role, registered, money} = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? '𝙿𝚛𝚎𝚖𝚒𝚞𝚖': '𝙵𝚛𝚎𝚎'}`
    let platform = os.platform()
    
    //---------------------
    
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
          }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%_p' + help)
                .replace(/%islimit/g, menu.limit ? llim : '')
                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      tag, dash,m1,m2,m3,m4,cc, c1, c2, c3, c4,lprem,llim,
      ucpn,platform, wib, mode, _p, money, age, tag, name, prems, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    //----------------- FAKE
 let fvn = {quoted: { key: {participant : '0@s.whatsapp.net'},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds": "2022","ptt": "true"} } }}
 let floc = {quoted: { key: { participant : '0@s.whatsapp.net'}, message: { "liveLocationMessage": { "caption": `Menu`,"h": `${name}`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')}} }}
 let fdocs = {quoted: { key : { participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `Hai Kak ${name}!`,  jpegThumbnail: fs.readFileSync('./thumbnail.jpg') }}}}
 let fgclink = {quoted: {key: {participant : '0@s.whatsapp.net'},message: {groupInviteMessage: {groupJid: "17608914335-1625305606@g.us",inviteCode: null,groupName: `Hai ${name}!`,  caption: wm,  jpegThumbnail: fs.readFileSync('./thumbnail.jpg') }} }}
 let fgif = {quoted: {key: { participant : '0@s.whatsapp.net'}, message: {  "videoMessage": {  "title": `Hai Kak ${name}!`, "h": `Hmm`, 'seconds': '999999999',  'gifPlayback': 'true',  'caption': wm, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg') } } } }
 let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
 
    let ftoko = {
    key: {
    fromMe: false,
    participant: `${m.sender.split`@`[0]}` + '@s.whatsapp.net',
    remoteJid: 'status@broadcast',
  },
  message: {
  "productMessage": {
  "product": {
  "productImage":{
  "mimetype": "image/jpeg",
  "jpegThumbnail": fs.readFileSync('./thumbnail.jpg'),
    },
  "title": `${ucapan()}`,
  "description": '𝗧 𝗜 𝗠 𝗘 : ' + wktuwib,
  "currencyCode": "US",
  "priceAmount1000": "100",
  "retailerId": wm,
  "productImageCount": 999
        },
  "businessOwnerJid": `${m.sender.split`@`[0]}@s.whatsapp.net`
  }
  }
  }
  
    let urls = pickRandom(['https://media.discordapp.net/attachments/996447135547539478/996738421689172028/insobot.png'])
 
    const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
    
    //FAKE TROLI

    const ftrol = {

    key : {

    remoteJid: 'status@broadcast',

    participant : '0@s.whatsapp.net'

    },

    message: {

    orderMessage: {

    itemCount : 2022,

    status: 1,

    surface : 1,

    message: `𝙷𝚊𝚒 𝙺𝚊𝚔 ${name}!`, 

    orderTitle: `▮𝙼𝚎𝚗𝚞 ▸`,

    thumbnail: await (await fetch(flaaa + 'Menu')).buffer(), //Gambarnye

    sellerJid: '0@s.whatsapp.net' 

    }

    }

    }
    
    const fload = {

    key : {

    remoteJid: 'status@broadcast',

    participant : '0@s.whatsapp.net'

    },

    message: {

    orderMessage: {

    itemCount : 2022,

    status: 1,

    surface : 1,

    message: '[❗] 𝙼𝚎𝚖𝚞𝚊𝚝 𝙼𝚎𝚗𝚞 ' + teks + '...\n 𝚂𝚊𝚋𝚊𝚛 𝚈𝚊 𝙺𝚊𝚔 ^ω^', 

    orderTitle: `▮𝙼𝚎𝚗𝚞 ▸`,

    thumbnail: await (await fetch(flaaa + 'Loading')).buffer(), //Gambarnye

    sellerJid: '0@s.whatsapp.net' 

    }

    }

    }

    conn.reply(m.chat, '*𝚃𝚞𝚗𝚐𝚐𝚞 𝚂𝚎𝚋𝚎𝚗𝚝𝚊𝚛 𝙺𝚊𝚔. . .*', ftrol) 

    
    //------------------< MENU >----------------
    
    //------------------ SIMPLE
    /*conn.reply(m.chat, text, fkon, { contextInfo: { mentionedJid: [m.sender],
        externalAdReply: {
            title: `${htjava} ${namebot}`,
            body: titlebot,
            description: titlebot,
            mediaType: 2,
          thumbnail: await(await fetch(thumb2)).buffer(),
         mediaUrl: sig
        }
     }
    })*/
    
    //------------------ DOCUMENT
    let d1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    let d2 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    let d3  = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    let d4 = 'application/pdf'
    let d5 = 'application/vnd.android.package-archive'
    let d6 = 'application/zip'
    let td = `${pickRandom([d1,d2,d3,d4,d5,d6])}`
    
    
    //------- MENU LOCATION
    const pre = generateWAMessageFromContent(m.chat, { liveLocationMessage:{
  degreesLatitude: 34.672314,
  degreesLongitude: 135.484802,
  accuracyInMeters: 100,
  speedInMps: 999,
  degreesClockwiseFromMagneticNorth: 99,
  caption: text.trim(),
  sequenceNumber: 774236889,
  timeOffset: 8600,
  jpegThumbnail: await(await fetch(thumb)).buffer(),
  contextInfo: { mentionedJid: [m.sender] }
}}, { quoted: m
					})

//return conn.relayMessage(m.chat, pre.message, { messageId: pre.key.id })

//-------DOC TEMPLATE
    const message = { 
            document: { url: thumbdoc },
            jpegThumbnail: await (await fetch(urls)).buffer(),
            fileName: wm,
            mimetype: td,
            fileLength: fsizedoc,
            pageCount: fpagedoc,
            caption: text,
            footer: titlebot,
            templateButtons: [
                {
                    quickReplyButton: {
                        displayText: 'Owner🎐',
                        id: '.owner'
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'Speed⚡',
                        id: '.ping'
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'Donasi💵',
                        id: '.donasi'
                    }
                },
            ]
        }
       //await conn.sendMessage(m.chat, message, m, { mentionedJid: [m.sender] })
        
        //MAIN MENU
      /*conn.sendButton(m.chat, `*${ucapan()}, ${name} 👋*`, text.trim(), await genProfile(conn, m), [['Speedtest', _p + 'speedtest'], ['Owner', _p + 'owner']], false, { quoted: fkon, contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: "https://Instagram.com/Xiao_yan_21",
    mediaType: "VIDEO",
    description: "https://Instagram.com/Xiao_yan_21", 
    title: wm,
    body: 'List Menu?',
    thumbnail: thumb,
    sourceUrl: sgc
}
} })*/

    //------------------- 2BUTTON VID
   // conn.sendMessage(m.chat, { video: { url: 'https://telegra.ph/file/c82d5c358495e8ef15916.mp4' }, gifPlayback: true, gifAttribution: ~~(Math.random() * 2), caption: text.trim(), footer: 'ᴍᴀᴅᴇ ᴡɪᴛʜ ❤ ʙʏ ɪᴍ-ʏᴀɴxɪᴀᴏ', templateButtons: [{ quickReplyButton: { displayText: 'Speedtest⚡', id: `${_p}speedtest` }}, { quickReplyButton: { displayText: 'Owner🎀', id: `${_p}owner` }} ] })
    
    //------------------- Payment MENU
    /*await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 50000000,
      requestFrom: m.sender,
      noteMessage: {
      extendedTextMessage: {
      text: text.trim(),
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})*/
      
     //---Made By @ImYanXiao
    // Mampus Di Enc 🧢
    // Gausah Dihapus, Thx
    //------------------ BUTTONDOC WITH EXTERNALADS NEW
    //---Versi 1
    //const _0x128b9c=_0x4f44;(function(_0x2018b1,_0x148852){const _0xf056e8=_0x4f44,_0x1946c7=_0x2018b1();while(!![]){try{const _0x434fba=-parseInt(_0xf056e8(0x1b1))/0x1+parseInt(_0xf056e8(0x1b0))/0x2+parseInt(_0xf056e8(0x1a9))/0x3*(-parseInt(_0xf056e8(0x1ae))/0x4)+-parseInt(_0xf056e8(0x1a5))/0x5+-parseInt(_0xf056e8(0x1ac))/0x6+parseInt(_0xf056e8(0x1ad))/0x7+-parseInt(_0xf056e8(0x1a6))/0x8*(-parseInt(_0xf056e8(0x1b5))/0x9);if(_0x434fba===_0x148852)break;else _0x1946c7['push'](_0x1946c7['shift']());}catch(_0x263ef){_0x1946c7['push'](_0x1946c7['shift']());}}}(_0x233d,0xe2557));function _0x4f44(_0x4b8cb9,_0x1b0dc4){const _0x233d14=_0x233d();return _0x4f44=function(_0x4f449e,_0x423364){_0x4f449e=_0x4f449e-0x1a2;let _0x410bed=_0x233d14[_0x4f449e];return _0x410bed;},_0x4f44(_0x4b8cb9,_0x1b0dc4);}let buttonMessage={'document':{'url':sgh},'mimetype':global['ddocx'],'fileName':wm,'fileLength':fsizedoc,'pageCount':fpagedoc,'contextInfo':{'externalAdReply':{'showAdAttribution':!![],'mediaType':0x1,'previewType':'pdf','title':global[_0x128b9c(0x1a8)],'thumbnail':fs[_0x128b9c(0x1a7)](_0x128b9c(0x1b2)),'renderLargerThumbnail':!![],'sourceUrl':snh}},'caption':botdate,'footer':text[_0x128b9c(0x1a4)](),'buttons':[{'buttonId':_0x128b9c(0x1aa),'buttonText':{'displayText':_0x128b9c(0x1a3)},'type':0x1},{'buttonId':_0x128b9c(0x1b4),'buttonText':{'displayText':_0x128b9c(0x1b3)},'type':0x1},{'buttonId':'.?\x20all','buttonText':{'displayText':_0x128b9c(0x1a2)},'type':0x1}],'headerType':0x6};function _0x233d(){const _0x3c467e=['578958jnpGtT','./thumbnail.jpg','ᴅᴏɴᴀsɪ','.donasi','72TSRyZH','ᴀʟʟ-ᴍᴇɴᴜ','ᴍᴇɴᴜ','trim','1711895uGhCJk','1733680UzLqTC','readFileSync','titlebot','3PyeAPc','.menu','sendMessage','3578466MDAGZi','5489001FHKiNR','2370008ImZfan','chat','1038980ahvdKK'];_0x233d=function(){return _0x3c467e;};return _0x233d();}await conn[_0x128b9c(0x1ab)](m[_0x128b9c(0x1af)],buttonMessage,{'quoted':fkontak});
    //---Versi 2
     function _0x20c1(_0x3d1dba,_0x1a315e){const _0x1aaa67=_0x1aaa();return _0x20c1=function(_0x20c1f6,_0x54b096){_0x20c1f6=_0x20c1f6-0x1c6;let _0x4ac527=_0x1aaa67[_0x20c1f6];return _0x4ac527;},_0x20c1(_0x3d1dba,_0x1a315e);}const _0x254aec=_0x20c1;(function(_0xc90ae0,_0x2a9661){const _0x18cea6=_0x20c1,_0x2d6908=_0xc90ae0();while(!![]){try{const _0x2ba2f0=-parseInt(_0x18cea6(0x1d8))/0x1+parseInt(_0x18cea6(0x1c6))/0x2*(parseInt(_0x18cea6(0x1d3))/0x3)+-parseInt(_0x18cea6(0x1d7))/0x4*(-parseInt(_0x18cea6(0x1d1))/0x5)+parseInt(_0x18cea6(0x1da))/0x6*(parseInt(_0x18cea6(0x1db))/0x7)+parseInt(_0x18cea6(0x1d5))/0x8*(-parseInt(_0x18cea6(0x1cc))/0x9)+parseInt(_0x18cea6(0x1ca))/0xa*(-parseInt(_0x18cea6(0x1cf))/0xb)+parseInt(_0x18cea6(0x1c9))/0xc;if(_0x2ba2f0===_0x2a9661)break;else _0x2d6908['push'](_0x2d6908['shift']());}catch(_0x1f7d38){_0x2d6908['push'](_0x2d6908['shift']());}}}(_0x1aaa,0xbc66e));function _0x1aaa(){const _0x36844b=['386768jYCpaP','.ping','8723532zYlQfN','7fscaTt','912466cACkPE','readFileSync','AllMenu','5611548ebnrCK','1090xslGJh','Donasi','9ctfOjB','trim','sendMessage','69872JqHKkt','sig','4108735YfQyZP','./thumbnail.jpg','3CgyrmQ','titlebot','10789608ysbGEy','pdf','4fZdsjl'];_0x1aaa=function(){return _0x36844b;};return _0x1aaa();}let buttonMessage={'document':{'url':sgc},'mimetype':global['ddocx'],'fileName':wm,'fileLength':fsizedoc,'pageCount':fpagedoc,'contextInfo':{'externalAdReply':{'showAdAttribution':!![],'mediaUrl':global[_0x254aec(0x1d0)],'mediaType':0x2,'previewType':_0x254aec(0x1d6),'title':global[_0x254aec(0x1d4)],'body':global[_0x254aec(0x1d4)],'thumbnail':fs[_0x254aec(0x1c7)](_0x254aec(0x1d2)),'sourceUrl':snh}},'caption':botdate,'footer':text[_0x254aec(0x1cd)](),'buttons':[{'buttonId':_0x254aec(0x1d9),'buttonText':{'displayText':'Ping'},'type':0x1},{'buttonId':'.?\x20all','buttonText':{'displayText':_0x254aec(0x1c8)},'type':0x1},{'buttonId':'.donasi','buttonText':{'displayText':_0x254aec(0x1cb)},'type':0x1}],'headerType':0x6};await conn[_0x254aec(0x1ce)](m['chat'],buttonMessage,{'quoted':fkontak});

     //------------------- 2BUTTON LOCATION
    /*conn.sendButton(m.chat, `${ucapan()}﹗`, text.trim(), `${timeimg()}`, [
      ['🎏 ᴍᴇɴᴜ', `${_p}menu`],
      ['⚡ sᴘᴇᴇᴅᴛᴇsᴛ', `${_p}speedtest`]
    ], m, {asLocation: true}))*/
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.register = false
handler.exp = 3

export default handler

//----------- FUNCTION -------

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [ye, ' *Years 🗓️*\n',  mo, ' *Month 🌙*\n', d, ' *Days ☀️*\n', h, ' *Hours 🕐*\n', m, ' *Minute ⏰*\n', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Kok Belum Tidur Kak? 🥱"
  if (time >= 4) {
    res = "Pagi Lord 🌄"
  }
  if (time >= 10) {
    res = "Siang Lord ☀️"
  }
  if (time >= 15) {
    res = "Sore Lord 🌇"
  }
  if (time >= 18) {
    res = "Malam Lord 🌙"
  }
  return res
}
function timeimg() {
    let imgloc = ''
  const time = moment.tz('Asia/Jakarta').format('HH')
  imgloc = ('./media/insobot.png')
  if (time >= 0) {
    imgloc = ('./media/insobot.png')
  }
  if (time >= 4) {
    imgloc = ('./media/insobot.png')
  }
  if (time >= 8) {
    imgloc = ('./media/insobot.png')
  }
  if (time >= 12) {
    imgloc = ('./media/insobot.png')
  }
  if (time >= 16) {
    imgloc = ('./media/insobot.png')
  }
  if (time >= 20) {
    imgloc = ('./media/insobot.png')
  }
  if (time >= 24) {
    imgloc = ('./media/insobot.png')
  }
  return imgloc
}
