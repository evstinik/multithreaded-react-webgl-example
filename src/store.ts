import { proxy, subscribe } from 'valtio'

export const store = proxy({
  name: 'Suzi',
  color: '#FFA500'
})

// Sync

type Op = Parameters<Parameters<typeof subscribe>[1]>[0][0]

interface SyncMessage {
  ops: Op[]
}

export function syncStore(channelName = 'sync') {
  const channel = new BroadcastChannel(channelName)

  subscribe(store, (ops) => {
    channel.postMessage({ ops })
  })

  channel.onmessage = (e: MessageEvent<SyncMessage>) => {
    e.data.ops.forEach(([type, path, value]) => {
      switch (type) {
        case 'set':
          setByPath(store, path, value)
          break
        case 'delete':
          deleteByPath(store, path)
          break
      }
    })
  }
}

function setByPath(obj: any, path: (string | symbol)[], value: any) {
  const last = path.pop()
  let current = obj
  for (const p of path) {
    current = current[p]
  }
  current[last!] = value
}

function deleteByPath(obj: any, path: (string | symbol)[]) {
  const last = path.pop()
  let current = obj
  for (const p of path) {
    current = current[p]
  }
  delete current[last!]
}
