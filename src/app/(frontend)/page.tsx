import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'

import config from '@/payload.config'
import './globals.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const todos = await payload.find({
    collection: 'todos',
    limit: 10,
  })

  return (
    <div>
      <header>
        <h1 className="mb-4 text-3xl font-bold">Hello, {user ? user.email : 'none'}!</h1>
      </header>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Todos</h2>
        <section className="mb-2 grid gap-4 md:grid-cols-3">
          {todos.docs.map((todo) => (
            <Link href={`/${todo.id}`} key={todo.id}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="font-bold">{todo.title}</CardTitle>
                    <CardDescription>{todo.completed ? 'Yes' : 'No'}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{todo.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </section>
    </div>
  )
}
