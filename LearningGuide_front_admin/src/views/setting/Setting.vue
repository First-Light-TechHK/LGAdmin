<template>
  <div class="setting-container">
    <!-- 加载状态 -->
    <el-loading
      v-model="loading"
      :text="loadingText"
      :fullscreen="false"
      class="iframe-loading"
    />
    <!-- iframe 嵌入 -->
    <iframe
      ref="iframeRef"
      :src="iframeSrc"
      class="iframe-content"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
      frameborder="0"
      @load="onIframeLoad"
      @error="onIframeError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElLoading } from 'element-plus'

// iframe 地址
const iframeSrc = ref('https://aitutor-k1ng.onrender.com/knowledge/philosophy/epicureanism/dialogue-testing')

// 加载状态
const loading = ref(true)
const loadingText = ref('页面加载中，请稍候...')

// iframe 引用
const iframeRef = ref<HTMLIFrameElement | null>(null)

// 加载成功
const onIframeLoad = () => {
  loading.value = false
  loadingText.value = '加载完成'
}

// 加载失败（超时兜底）
const onIframeError = () => {
  loading.value = false
  loadingText.value = '加载失败，请刷新重试'
}

// 设置加载超时（15秒后自动隐藏 loading）
let timeoutId: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  timeoutId = setTimeout(() => {
    if (loading.value) {
      loading.value = false
      loadingText.value = '加载超时，请检查网络后刷新'
    }
  }, 15000)
})

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.setting-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f5f7fa;
}

.iframe-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>