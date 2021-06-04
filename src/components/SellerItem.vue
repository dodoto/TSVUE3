<template>
  <div class="seller-item" :title="title">
    <ImgErrBlock v-if="isLoadError" :width="150" :height="225"/>
    <img :src="imgUrl" :alt="title" @error="imgLoadError" v-else/>
    <p>{{title}}</p>
    <p>{{author}}</p>
    <!-- <p>{{fav_nums}}</p> -->
    <div class="btn-group">
      <button @click.stop="goToDetail">
        <i class="fa fa-info"></i> 详情
      </button>
      <button @click.stop="clickHandler">
        <i class="fa fa-trash-o"></i> 删除
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import ImgErrBlock from 'components/ImgErrBlock.vue'

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
      default: 0,
      require: true
    }
  },
  components: {
    ImgErrBlock
  },
  setup(props,ctx) {

    const router = useRouter()

    const isLoadError = ref(false)

    const goToDetail = () => router.push({name:'SellerDetail',params:{id:props.id}})

    const imgLoadError = () => isLoadError.value = true

    const clickHandler = () => ctx.emit('delete',props.id)

    return {
      ...toRefs(props),
      clickHandler,
      isLoadError,
      imgLoadError,
      goToDetail
    }
  },
})
</script>

<style scoped>
.seller-item {
  text-align: center;
  margin: 20px 10px 0 10px;
  padding: 6px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(10, 16, 20, .24);
  transition: all .5s;
  position: relative;
  overflow: hidden;
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
  background-color: rgba(44, 62, 80, .4);
  width: 50%;
  height: 100%;
  line-height: 100%;
  color: whitesmoke;
  cursor: pointer;
}
.btn-group > button:hover {
  color: #fff;
  background-color: rgba(70, 88, 106, .4);
}
</style>


