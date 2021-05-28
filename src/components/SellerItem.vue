<template>
  <div class="seller-item" :title="title">
    <div class="error-block" v-if="isLoadError">图片获取失败</div>
    <img :src="imgUrl" :alt="title" @error="imgLoadError" v-else/>
    <p>{{title}}</p>
    <p>{{author}}</p>
    <p>{{fav_nums}}</p>
    <div class="btn-group">
      <button>
        <i class="fa fa-info"></i> 详情
      </button>
      <button @click.stop="clickHandler">
        <i class="fa fa-trash-o"></i> 删除
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, PropType } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  emits: ['detail','delete'],
  props: {
    imgUrl: {
      type: String,
      default: '@/assets/logo.png'
    },
    title: String,
    author: {
      type: String,
      default: '佚名'
    },
    fav_nums: {
      type: Number,
      default: 0
    },
    id: {
      type: Number ,
      default: 0
    }
  },
  setup(props,ctx) {

    const router = useRouter()

    const isLoadError = ref(false)

    const navigate = () => router.push({name:'SellerDetail',params:{id:props.id}})

    const imgLoadError = () => isLoadError.value = true

    const clickHandler = () => ctx.emit('delete',props.id)

    return {
      ...toRefs(props),
      clickHandler,
      isLoadError,
      imgLoadError
    }
  },
})
</script>

<style scoped>
.seller-item {
  text-align: center;
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(10, 16, 20, .24);
  transition: all .5s;
  position: relative;
  overflow: hidden;
}
.error-block {
  width: 150px;
  height: 225px;
  line-height: 150px;
  margin: auto;
  background-color: #E9EEF3;
  color: #333;
  font-size: 12px;
  box-shadow: 0 0 2px rgba(10, 16, 20, .12);
}
.seller-item > img {
  width: 150px;
  height: 225px;
  object-fit: cover;
  vertical-align: top;
  box-shadow: 0 0 2px rgba(10, 16, 20, .12);
}
.seller-item > p {
  line-height: 30px;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}
.btn-group {
  position: absolute;
  left: 0; bottom: 0;
  transform: translateY(100%);
  width: 100%;
  height: 30px;
  line-height: 30px;
  transition: transform 0.3s;
}
.seller-item:hover .btn-group {
  transform: translateY(0);
}
.btn-group > button {
  appearance: none;
  outline-width: 0;
  border-width: 0;
  background-color: rgba(125, 125, 125, .4);
  width: 50%;
  height: 100%;
  line-height: 100%;
  color: whitesmoke;
  cursor: pointer;
}
.btn-group > button:hover {
  color: #fff;
  background-color: rgba(150, 150, 150, .4);
}
</style>


