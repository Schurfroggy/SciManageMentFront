<template>
  <div>
    <img :src="imageUrl" alt="图片" :style="{ transform: `scale(${scale})` }">
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: 'https://eonline.jw.scut.edu.cn/meol/common/ckeditor/openfile.jsp?id=DBCPDBDIDHDDDADCDJCPGJGNGBGHGFCOHAGOGH',
      scale: 0.9
    }
  }
}
</script>
