import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // You can use a token with write access
})

if(writeClient.config().token === undefined) {
  throw new Error('The Sanity write client is missing the token environment variable.')
}


//The person who will have token will be able to write to the sanity database