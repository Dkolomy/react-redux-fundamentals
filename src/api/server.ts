/* eslint-disable no-unused-vars */

import { Server, Model, Factory, hasMany, RestSerializer } from 'miragejs'

import { faker } from '@faker-js/faker/locale/en'
// import seedrandom from 'seedrandom'

// Give types for untyped imports to suppress TS errors (for local dev, not prod type safety)
// declare module 'faker' {
//   const faker: any;
//   export = faker;
// }
// declare module 'seedrandom' {
//   export default function(seed?: string): () => number;
// }

const IdSerializer = RestSerializer.extend({
  serializeIds: 'always' as const,
})

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = false

//let rng: () => number = seedrandom()
faker.seed(1234567890)
let rng: () => number = () => faker.number.float({ min: 0, max: 1 })

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed')
  let seedDate: Date

  if (randomSeedString) {
    seedDate = new Date(randomSeedString)
  } else {
    seedDate = new Date()
    randomSeedString = seedDate.toISOString()
    localStorage.setItem('randomTimestampSeed', randomSeedString)
  }

  // rng = seedrandom(randomSeedString)
  faker.seed(Number(randomSeedString))
  rng = () => faker.number.float({ min: 0, max: 1 })
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = <T,>(array: T[]): T => {
  if (array.length === 0) {
    throw new Error("Cannot select a random item from an empty array")
  }
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

const todoTemplates: { base: string; values: string[] }[] = [
  { base: 'Buy $THING', values: ['milk', 'bread', 'cheese', 'toys'] },
  { base: 'Clean $THING', values: ['house', 'yard', 'bedroom', 'car'] },
  { base: 'Read $THING', values: ['newspaper', 'book', 'email'] },
]

const generateTodoText = (): string => {
  const template = randomFromArray(todoTemplates)
  const value = randomFromArray(template.values)
  const text = template.base.replace('$THING', value)
  return text
}

new Server({
  routes() {
    this.namespace = 'fakeApi'
    //this.timing = 2000

    this.resource('todos')
    this.resource('lists')

    // Prefer arrow functions to avoid untyped Mirage 'this'
    this.post('/todos', (schema: any, req: any) => {
      // this.normalizedRequestAttrs() is accessible via handler context, workaround:
      const data =
        typeof req.requestBody === 'string' && req.requestBody
          ? JSON.parse(req.requestBody)
          : {}

      if (data.text === 'error') {
        throw new Error('Could not save the todo!')
      }

      const result = schema.create('todo', data)
      return result
    })
  },
  models: {
    todo: Model.extend({}),
    list: Model.extend({
      todos: hasMany(),
    }),
  },
  factories: {
    todo: Factory.extend({
      id(i: number) {
        return Number(i)
      },
      text() {
        return generateTodoText()
      },
      completed() {
        return false
      },
      color() {
        return ''
      },
    }),
  },
  serializers: {
    todo: (IdSerializer as any).extend({
      serialize(resource: any, request: any) {
        // Use the parent serializer (IdSerializer, which extends RestSerializer)
        const json = (IdSerializer as any).prototype.serialize.call(this, resource, request);

        // Recursively convert all id fields to numbers in the response
        function numerifyIdFields(obj: any) {
          if (Array.isArray(obj)) {
            obj.forEach(numerifyIdFields);
          } else if (obj && typeof obj === 'object') {
            for (const key of Object.keys(obj)) {
              if (key === 'id' && typeof obj[key] === 'string' && !isNaN(Number(obj[key]))) {
                obj[key] = Number(obj[key]);
              } else if (typeof obj[key] === 'object') {
                numerifyIdFields(obj[key]);
              }
            }
          }
        }

        // Run on root objects likely to have todos
        if (json.todo) numerifyIdFields(json.todo);
        if (json.todos) numerifyIdFields(json.todos);

        return json;
      },
    }),
    list: IdSerializer,
  },
  seeds(server: any) {
    server.createList('todo', 5)
  },
})