<template lang="pug">
.resources
  .resources__header
    .buttons(v-if="editable")
      el-button.button(icon="el-icon-plus" type="primary" @click="openResourceCreateModal") {{ resourceKey }}作成
      el-button.button(icon="el-icon-plus" type="primary" @click="openDirectoryCreateModal($refs)") フォルダ作成
    .nav
      icon.home-icon(name="home" @click.native="backToHome(resourceKey)")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(resourceKey, i)") {{ breadcrumb }}

  .resources__content.content(v-if="!showingResource")
    .resources__item(v-for="o in directories" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      Icon.icon(name="folder" @dblclick.name="appendDirectory(resourceKey, o.name)" @click.right.prevent.native="confirmDelete(o.name)")
      span(@dblclick="openDirectoryEditModal($refs, o)") {{ o.name }}
    .resources__item(v-for="o in resources" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      ConsoleImage(
        :raw="o.raw" @dblclick="showResource(o.name)" @clickRight="confirmDelete(o.name)"
        width="80px" height="80px" lineHeight="80px"
      )
      span(@dblclick="openResourceEditModal($refs, o)") {{ o.name }}

  .resources__detail.content(v-else)
    slot(name="detail")

  template(v-if="editable")

    el-dialog.dialog(:visible.sync="directoryForm.flag")
      template(slot="title")
        h2(v-if="directoryCreating") フォルダ作成
        h2(v-else-if="directoryEditing") フォルダ名変更
      el-input(v-model="directoryForm.name" ref="directoryName")
      .buttons
        el-button(v-if="directoryCreating" type="primary" @click="createDirectory" :disabled="!directoryFormValid") 作成
        el-button(v-else-if="directoryEditing" type="primary" @click="editDirectory" :disabled="!directoryFormValid") 変更

    el-dialog.dialog(:visible.sync="deleteForm.flag")
      h2(slot="title") 「{{ deleteForm.name }}」削除していい？
      .buttons
        el-button(type="danger" @click="deleteObject(resourceKey)") 削除

    slot(name="resourceCreateModal")
    slot(name="resourceEditModal")
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import { StoreKey } from '@/stores/common_store.ts'

export default defineComponent({
  props: {
    resourceKey: {
      type: String as PropType<StoreKey>,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    refs: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup (props, context) {
    const commonStore = appStores.commonStore
    const store = commonStore.getStoreByKey(props.resourceKey)

    onMounted(() => {
      store.fetchResources()
    })

    return {
      ...commonStore,
      ...store
    }
  }
})
</script>

<style lang="stylus" scoped>
console(resources)
</style>