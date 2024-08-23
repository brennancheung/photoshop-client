// src/client.ts
import { EventEmitter } from 'events'
import { createConnection, Socket } from 'net'
import { MessageType, MessagePayload, PhotoshopClientOptions, PhotoshopClient } from './types'
import { createPSCrypto } from './ps_crypto'

export const createClient = (options: PhotoshopClientOptions): PhotoshopClient => {
  const { hostname = '127.0.0.1', port = 49494, password = 'password' } = options

  let socket: Socket | null = null
  let crypto: any = null
  const emitter = new EventEmitter()

  const connect = async (): Promise<void> => {
    socket = createConnection({ host: hostname, port })
    crypto = await createPSCrypto(password)

    socket.on('data', (data) => processReceiveBuffer(data))

    // Handle socket events (connect, error, close) here...
  }

  const sendCommand = (javascript: string, messageType: MessageType): number => {
    const id = generateMessageId()
    const payloadBuffer = Buffer.from(javascript, 'utf8')

    const payload: MessagePayload = {
      id,
      type: messageType,
      body: payloadBuffer,
    }

    sendMessage(payload)
    return id
  }

  const sendKeepAlive = (): number => {
    const id = generateMessageId()
    const payload: MessagePayload = {
      id,
      type: MessageType.KEEPALIVE,
      body: Buffer.alloc(12), // Adjust as needed
    }

    sendMessage(payload)
    return id
  }

  const sendMessage = (payload: MessagePayload) => {
    if (!socket) throw new Error('Not connected')
    const encryptedBody = crypto ? crypto.cipher(payload.body) : payload.body
    const headerBuffer = Buffer.alloc(12)

    headerBuffer.writeUInt32BE(encryptedBody.length + 4, 0) // 4 bytes for the status
    headerBuffer.writeUInt32BE(0, 4) // Status
    headerBuffer.writeUInt32BE(payload.type, 8) // Message type

    socket.write(headerBuffer)
    socket.write(encryptedBody)
  }

  const processReceiveBuffer = (buffer: Buffer) => {
    // Logic for processing received data
  }

  const disconnect = () => {
    if (socket) {
      socket.end()
      socket = null
    }
  }

  return {
    connect,
    sendCommand,
    sendKeepAlive,
    disconnect,
  }
}

// Utility functions
const generateMessageId = (): number => {
  let lastMessageId = 0
  return (lastMessageId = (lastMessageId + 1) % 0xFFFFFF)
}
