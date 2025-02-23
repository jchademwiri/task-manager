import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './globals.css'

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
    <div className="container mx-auto p-4">
      <header>
        <h1 className="text-3xl font-bold mb-4">Hello, {user ? user.email : 'none'}!</h1>
      </header>
      <section>
        <h2 className="text-2xl font-bold mb-4">Todos</h2>
        <ul>
          {todos.docs.map((todo) => (
            <li key={todo.id} className="mb-2">
              <div>
                <h3 className='font-bold' >{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
