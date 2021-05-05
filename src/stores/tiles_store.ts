import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'

import { Tile, TilesResponse } from '~domains/tiles.ts'
import handleResponse from '@/utils/handleResponse.ts'
import resourceService from '@/services/resourceService.ts'

import { TilesCreateRequestBody } from '~server/api/tiles/create.ts'
import { TilesEditRequestBody } from '~server/api/tiles/edit.ts'

export const buildTilesStore = () => {
  const resourceForm = reactive<{
    flag: boolean
    action?: 'create' | 'edit'
    id?: string
    name?: string
    collision?: boolean
    imageId?: string
    image?: {
      id: string
      data: string
      name: string
    }
  }>({
    flag: false,
    action: undefined,
    id: undefined,
    name: undefined,
    collision: undefined,
    imageId: undefined,
    image: undefined
  })

  const {
    state,
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
    showResource,
    showingResource
  } = resourceService<Tile, TilesResponse>('tiles', resourceForm)

  const openResourceCreateModal = () => {
    resourceForm.flag = true
    resourceForm.action = 'create'
    resourceForm.id = undefined
    resourceForm.name = ''
    resourceForm.collision = false
    resourceForm.imageId = undefined
    resourceForm.image = undefined
  }
  const openResourceEditModal = (resource: Tile) => {
    resourceForm.flag = true
    resourceForm.action = 'edit'
    resourceForm.id = resource.id
    resourceForm.name = resource.name
    resourceForm.collision = resource.collision || false
    resourceForm.imageId = resource.imageId
    resourceForm.image = resource.image
  }
  const resourceFormValid = computed<boolean>(() => {
    if (!resourceForm.name) return false
    if (!resourceForm.imageId) return false
    return true
  })
  const createResource = async () => {
    if (!resourceFormValid.value) return
    if (!resourceForm.name) return
    if (!resourceForm.imageId) return
    if (resourceForm.collision === undefined) return
    const params: TilesCreateRequestBody = {
      name: resourceForm.name,
      collision: resourceForm.collision,
      imageId: resourceForm.imageId,
      directoryId: state.currentDirectoryId
    }
    const res = await axios.post('/api/tiles', params)
    handleResponse(res, '作成完了！', fetchResources, resourceForm)
  }
  const editResource = async () => {
    if (!resourceFormValid.value) return
    if (!resourceForm.id) return
    if (!resourceForm.name) return
    if (!resourceForm.imageId) return
    if (resourceForm.collision === undefined) return
    const params: TilesEditRequestBody = {
      id: resourceForm.id,
      name: resourceForm.name,
      collision: resourceForm.collision,
      imageId: resourceForm.imageId,
      directoryId: state.currentDirectoryId
    }
    const res = await axios.patch('/api/tiles', params)
    handleResponse(res, '更新完了！', fetchResources, resourceForm)
  }

  return {
    ...toRefs(state),
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
    showResource,
    showingResource,

    resourceForm,

    openResourceCreateModal,
    openResourceEditModal,
    resourceFormValid,
    createResource,
    editResource
  }
}

export type TilesStore = ReturnType<typeof buildTilesStore>
