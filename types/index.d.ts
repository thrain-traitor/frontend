// types.ts
export interface Message {
  text: string
  time: string
  sender: 'me' | 'them'
}

export interface TabItem {
  label: string
  icon: string
  title: string
  subtitle: string
  avatar: string
  roomId: string
}