<script setup>

</script>
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <template v-for="menu in menuData">
          <a-menu-item v-if="menu.type === 'item'" v-bind:key="menu.key">
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
            <a-menu-item v-for="sub in menu.sub" v-bind:key="sub.key">{{ sub.desc }}</a-menu-item>
          </a-sub-menu>
        </template>
        
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; text-align: center">
        <a-space align="center">
          <a-typography-title :level="3">Eddy Chen's Tech Blog</a-typography-title>
        </a-space>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Blog @ Chen Ruifeng - 2023
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  components: {
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ['1'],
      menuData: []
    };
  },
  mounted() {
    var self = this;
    axios.get('/menu.json').then(res => {
      self.menuData = res.data
      console.log(self.menuData)
    })
  }
});
</script>
<style>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>