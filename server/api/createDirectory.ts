import fs from 'fs'
import { Application, Request, Response } from 'express'

import { ResponseMessage, DefaultResponseBody, ResourceKey } from '~server/api/index'
import Image from '~server/models/image.ts'

export interface CreateDirectoryRequestBody {
  resourceKey: ResourceKey
  path: string
  name: string
}

export default (app: any, method: 'post', path: string) => {
  app[method]('/directories', async (req: Request<any, any, CreateDirectoryRequestBody>, res: Response<DefaultResponseBody>) => {
    const resourceKey: ResourceKey = req.body.resourceKey
    const path: string = req.body.path
    const name: string = req.body.name

    if (resourceKey === 'images') {
      const newDirectory = new Image({
        name, path, objectType: 'directory'
      })
      await newDirectory.save()
      res.send(null)
    }
  })
}
