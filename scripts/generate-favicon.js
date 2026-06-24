import fs from 'fs'
import path from 'path'

const cwd = process.cwd()
const logo = path.join(cwd, 'public', 'mamavoiceLogo.png')
const ico = path.join(cwd, 'public', 'favicon.ico')

if (!fs.existsSync(logo)) {
  console.error('ERROR: public/mamavoiceLogo.png not found')
  process.exit(1)
}

const png = fs.readFileSync(logo)
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)

const entry = Buffer.alloc(16)
entry.writeUInt8(0, 0)
entry.writeUInt8(0, 1)
entry.writeUInt8(0, 2)
entry.writeUInt8(0, 3)
entry.writeUInt16LE(1, 4)
entry.writeUInt16LE(32, 6)
entry.writeUInt32LE(png.length, 8)
entry.writeUInt32LE(6 + 16, 12)

const icoBuffer = Buffer.concat([header, entry, png])
fs.writeFileSync(ico, icoBuffer)
console.log('Created favicon.ico from mamavoiceLogo.png, size:', icoBuffer.length)
