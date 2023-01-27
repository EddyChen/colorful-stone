<script setup allowJs="true">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Edit</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '700px' }">
        <a-button type="primary" style="float: right; margin-bottom: 10px;" @click="saveMdText()">
          <template #icon>
            <SaveOutlined />
          </template>
          Save
        </a-button>
        <md-editor v-model="mdText" 
          :page-full-screen='true'
          :show-code-row-number='true'
          :markedHeadingId="markedHeadingId"
          style="min-height: 650px;"
          @save="onSaveMdText" />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Blog @ Eddy Chen in 2023 - now
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  },
  data() {
    return {
      mdText: ''
    }
  },
  methods: {
    saveMdText() {
      //console.log(this.mdText)
      var mdFile = new File([this.mdText], "README.md", {
        type: "text/markdown"
      })
      console.log(mdFile)
      // multipart upload
      const params = {
        Bucket: "docs-bucket",
        Key: "intro/" + mdFile.name,
        Body: mdFile,
        ContentType: mdFile.type,
      };
      try {
        this.$s3.putObject(params);
      } catch (error) {
        if (error) {
          console.log("task", error.message);
        }
      }
    },
    onSaveMdText(value, html) {
      console.log("onSave", value, html)
    },
    markedHeadingId(text, level, index) {
      return "/edit"
    }
  }

})
</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
