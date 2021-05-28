<template>
  <div class="out">
    <div class="circle-line">
    </div>
    <div class="inner">404!</div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
.out {
  background-color: #98bec8;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}
.circle-line {
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: auto;
  width: 170px; height: 170px;
  border-radius: 50%;
  border: 3px dashed #4f7b86;
  animation: rotate 20s linear infinite;
}
.inner {
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: auto;
  border-radius: 50%;
  background-color: #4f7b86;
  line-height: 150px;
  width: 150px; height: 150px;
  text-align: center;
  color: #fff;
  font-weight: 900;
  font-size: 2.5rem;
}
@keyframes rotate {
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
}
</style>