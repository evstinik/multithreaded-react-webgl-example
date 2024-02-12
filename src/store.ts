import { proxy, subscribe } from 'valtio'

export const store = proxy({
  name: 'Suzi',
  color: '#FFA500'
})

// Sync

type Op = Parameters<Parameters<typeof subscribe>[1]>[0][0]

interface SyncMessage {
  author: number
  ops: Op[]
}

export function syncStore(channelName = 'sync') {
  const me = Math.round(Math.random() * 1000)
  const channel = new BroadcastChannel(channelName)

  subscribe(store, (ops) => {
    channel.postMessage({
      author: me,
      ops
    } satisfies SyncMessage)
  })

  channel.onmessage = (e) => {
    const msg = e.data as SyncMessage
    if (msg.author !== me) {
      msg.ops.forEach((op) => {
        switch (op[0]) {
          case 'set':
            setRecursively(store, op[1], op[2])
            break
          case 'delete':
            deleteRecursively(store, op[1])
            break
        }
      })
    }
  }
}

function setRecursively(obj: any, path: (string | symbol)[], value: any) {
  const last = path.pop()
  let current = obj
  for (const p of path) {
    current = current[p]
  }
  current[last!] = value
}

function deleteRecursively(obj: any, path: (string | symbol)[]) {
  const last = path.pop()
  let current = obj
  for (const p of path) {
    current = current[p]
  }
  delete current[last!]
}
