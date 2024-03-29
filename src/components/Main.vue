<script setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import CrfIcon from './CrfIcon.vue'
</script>
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }">
      <crf-icon class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <template v-for="menu in menuData">
          <a-menu-item v-if="menu.type === 'item'" v-bind:key="menu.key" @click="menuClicked(menu, menu.key)">
            <component :is="$icons[menu.icon]" />
            <span>{{ menu.desc }}</span>
          </a-menu-item>
          <a-sub-menu v-if="menu.type === 'subitem'" v-bind:key="menu.key">
            <template #title>
              <span>
                <component :is="$icons[menu.icon]" />
                <span>{{ menu.desc }}</span>
              </span>
            </template>
            <a-menu-item v-for="sub in menu.sub" v-bind:key="sub.key" @click="menuClicked(sub, sub.key)">
              <component :is="$icons[sub.icon]" />
              {{ sub.desc }}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header style="background: #fff; padding: 0; text-align: center">
        <a-space align="center">
          <a-typography-title :level="3">
            <span>Eddy Chen's Tech Blog</span>
          </a-typography-title>
        </a-space>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="breadCrumb in breadCrumbs">{{ breadCrumb }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '700px' }">
          <md-editor v-model="mdText" 
            :previewOnly="true"
            :page-full-screen='true'
            :show-code-row-number='true'
            :markedHeadingId="markedHeadingId"
            style="min-height: 660px;" />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Blog @ Eddy Chen in 2023 - now
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  components: {
    CrfIcon
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ['1'],
      menuData: [],
      breadCrumbs: [],
      contentUrl: '',
      mdText: ''
    };
  },
  mounted() {
    var self = this;
    axios.get('/menu.json').then(res => {
      self.menuData = res.data
      self.getBreadCrumbs(self.menuData[0])
      return self.menuData
    }).then(menus => {
      var menu = {}
      for (var i=0; i<menus.length; ++i) {
        menu = menus[i]
        if (menu.type === 'subitem' && menu.bucket) {
          self.initMenuBucket(i)
        }
      }
    })
  },
  methods: {
    initMenuBucket(idx) {
      var self = this
      var menu = this.menuData[idx]
      menu.sub = []
      self.$s3.listObjectsV2({ Bucket: menu.bucket}, (err, data) => {
        if (!err) {
          data.Contents.forEach((o, idx) => {
            if (o.Size !== 0 && o.Key.endsWith('README.md')) {
              var slashIdx = o.Key.indexOf('/')
              var name = o.Key.substr(0, slashIdx)
              menu.sub.push({
                key: menu.key + '-' + idx,
                type: 'item',
                name: name,
                desc: name,
                url: 'https://' + menu.bucket + '.4everland.store/' + o.Key,
                bucket: menu.bucket
              })
            }
          })
        }
      })
    },
    menuClicked(item, key, selectedKeys) {
      this.getBreadCrumbs(item)
      if (!item.url) {
        return
      }
      this.contentUrl = item.url
      var self = this
      self.mdText = ''
      var bucket = this.getBucketFromUrl(item.url)
      this.$s3.getObject({
        Bucket: bucket,
        Key: item.name + "/README.md",
      }, (err, data) => {
        if (!err) {
          var reader = data.Body.getReader()
          let charsReceived = 0
          let result = ''
          reader.read().then(function processText({ done, value }) {
            // Result objects contain two properties:
            // done  - true if the stream has already given you all its data.
            // value - some data. Always undefined when done is true.
            var text = new TextDecoder().decode(value);
            self.mdText += text
            if (done) {
              return;
            }
            // value for fetch streams is a Uint8Array
            charsReceived += value.length;
            // Read some more, and call this function again
            return reader.read().then(processText);
          });
        }
      })
    },
    getBreadCrumbs(item) {
      this.breadCrumbs = []
      let menu = {}, sub = {}
      for (var i = 0; i < this.menuData.length; ++i) {
        menu = this.menuData[i]
        if (menu.type === 'item'
          && menu.key === item.key) {
          this.breadCrumbs.push(menu.desc)
          return
        }
        if (menu.type === 'subitem') {
          for (var j = 0; j < menu.sub.length; ++j) {
            sub = menu.sub[j]
            if (sub.type === 'item'
              && sub.key === item.key) {
              this.breadCrumbs.push(menu.desc)
              this.breadCrumbs.push(item.desc)
              return
            }
          }
        }
      }
    },
    getBucketFromUrl(url) {
      var idx = url.indexOf(".4everland.store")
      if (idx > 8) {
        return url.substr(8, idx-8)
      }
      return ''
    },
    markedHeadingId(text, level, index) {
      return ""
    }
  }
});
</script>
<style scoped>
.logo {
  text-align: center;
  height: 50px;
  margin: 10px;
  background: #002140;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>