import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'

type Media = {
  url: string
  alt?: string
  width?: number
  height?: number
}

export default async function TodoID({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const todoId = params.id
  const todo = await payload.findByID({
    collection: 'todos',
    id: todoId,
  })

  // Continue: https://youtu.be/v_ga0nzm-wU?t=1087

  return (
    <div>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? 'Completed' : 'Not Completed'}</p>
      {/* <pre>
        <code>{JSON.stringify(todo.media, null, 2)}</code>
      </pre> */}
      {todo.media ? (
        <Image
          className="h-96 w-auto"
          src={(todo.media as Media).url || ''}
          alt={(todo.media as Media).alt ?? ''}
          width={(todo.media as Media).width ?? 0}
          height={(todo.media as Media).height ?? 0}
        />
      ) : (
        <p>No media found</p>
      )}
      <footer>
        <em>
          Last updated:{' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(todo.updatedAt))}
        </em>
      </footer>
    </div>
  )
}
