// src/types.ts
export enum MessageType {
  JAVASCRIPT = 2,
  JAVASCRIPT_SHARED = 10,
  PIXMAP = 3,
  ICC_PROFILE = 4,
  KEEPALIVE = 6,
  ERROR = 1,
}

export interface MessagePayload {
  id: number
  type: MessageType
  body: Buffer
}

export interface PhotoshopClientOptions {
  hostname?: string
  port?: number
  password?: string
}

export interface PhotoshopClient {
  connect: () => Promise<void>
  sendCommand: (javascript: string, messageType: MessageType) => number
  sendKeepAlive: () => number
  disconnect: () => void
}
