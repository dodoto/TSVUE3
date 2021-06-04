<template>
  <div class="seller-detail">
    <div class="seller-detail-banner">
      <h1>
        <span>{{showSearch ? '搜索' : '图书详情'}}</span>
        <div class="search" :class="showSearch && 'search-actived'">
          <transition name="scaleX">
            <input 
              placeholder="不想搞接口了,写id吧"
              :ref="setInputRef" 
              v-show="showSearch" 
              @blur="showSearch = false" 
              :spellcheck="false" 
              @keyup.enter="search"
            />
          </transition>
          <button class="fa fa-search" @mousedown="handleInput"/>
        </div>
      </h1>
    </div>
    <div class="seller-detail-content">
      <div class="seller-detail-image">
        <ImgErrBlock v-if="showErrorBlock" :width="300" :height="420"/>
        <img :src="detail.images['large']" :alt="detail.title" @error="imgLoadError" v-else width="300"/>
      </div>
      <div class="seller-detail-info">
        <template v-for="(item,key) in renderDetail" >
          <!-- eslint-disable-next-line -->
          <p class="seller-detail-info-row" v-if="item !== ''">
            <span>{{key}}</span> : <span>{{item}}</span>
          </p>
        </template>
      </div> 
    </div>
  </div>
  <Loading :show="loading"/>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect, Ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { GET } from '@/plugins/axios'
import Loading from 'components/Loading.vue'
import ImgErrBlock from 'components/ImgErrBlock.vue'

interface DetailData {
  author: Array<string>;
  binding: string;
  category: string;
  id: number;
  image: string;
  images: object;
  isbn: string;
  pages: string;
  price: string;
  pubdate: string;
  publisher: string;
  subtitle?: string;
  sumary: string;
  title: string;
  translator: Array<string>;
  [key: string]: any
}

interface InitDetail {
  [key: string]: any
}

const renderKey:InitDetail = {
  author: '作者',
  translator: '译者',
  publisher: '出版社',
  pubdate: '出版日期',
  price: '价格',
  isbn: 'ISBN',
  summary: '内容简介'
}

export default defineComponent({
  props: {
    id: String
  },
  components: {
    Loading,
    ImgErrBlock
  },
  setup(props) {

    const detail: Ref<DetailData> = ref(({} as DetailData))      //详情数据

    const loading = ref(false)                                   //加载过渡

    const isImgLoadError = ref(false)                            //是否图片加载错误

    const showSearch = ref(false)

    const inputRef = ref()

    const router = useRouter()

    const renderDetail = computed(() => {                        //要渲染出来的详情
      const keys = Object.keys(detail.value)
      if(keys.length === 0) return detail.value
      const data:InitDetail = {}
      for(let key in renderKey) {
        const content = detail.value[key]
        if(content instanceof Array) {
          data[renderKey[key]] = ''
          content.forEach(item => data[renderKey[key]] += `${item} `)
        }else{
          data[renderKey[key]] = content
        }
      }
      return data
    })

    const showErrorBlock = computed(() => {                 //是否显示图片失败占位
      if(detail.value.image === undefined) return true
      return isImgLoadError.value
    })

    const getSellerDetail = () => {
      const { id } = props
      const url = `/best-seller/book/${id}/detail`
      loading.value = true
      GET(url)
      .then((res:DetailData) => {
        // console.log(res)
        detail.value = res 
        document.title = res.title
      })
      .catch(err => {
        //请求的id超出数据库范围会500
        // console.log(typeof err)
        router.push({name:'404',params:{w:['404']}})
      })
      .finally(() => loading.value = false)
    }

    const imgLoadError = () => {
      console.log('error')
      isImgLoadError.value = true
    }

    const setInputRef = (el:HTMLElement) => inputRef.value = el

    const handleInput = () => {
      showSearch.value = !showSearch.value
      if(showSearch.value) {
        setTimeout(() => {
          inputRef.value.focus()
        },0)
      }
    }

    const search = () => {
      const input = inputRef.value
      const id = input.value
      showSearch.value = false
      input.value = ''
      router.push({name:'SellerDetail',params:{id}})
    }

    watchEffect(getSellerDetail)

    return {
      detail,
      loading,
      showErrorBlock,
      isImgLoadError,
      imgLoadError,
      renderDetail,
      showSearch,
      setInputRef,
      handleInput,
      search
    }
  },
})
</script>

<style scoped>
.seller-detail {
  text-align: left;
}
.seller-detail-banner {
  background-color: #2c3e50;
}
.seller-detail-banner > h1 {
  width: 900px;
  height: 120px;
  margin: auto;
  color: #fff;
  line-height: 120px;
}

.search {
  float:right;
  border-radius: 50px;
  height: 40px;
  margin-top: 40px;
  margin-left: -100%;
  line-height: 40px;
  background-color: transparent;
  padding: 2px;
  overflow: hidden;
}

.search-actived {
  background-color: #36485a;
}

.search:hover {
  background-color: #36485a;
}

.search > button, .search > input {
  outline-width: 0;
  border-width: 0;
  background-color: transparent;
  vertical-align: top;
  height: 40px;
}

.search > input {
  padding-left: 10px;
  color: #fff;
  font-weight: 500;
}

.search > input::placeholder {
  color: #ccc;
}

.search > input:focus + button::before{
  content: "\f00d";
}

.search > button {
  appearance: none;
  color:#fff;
  cursor: pointer;
  font-size: 22px;
  width: 40px; 
  border-radius: 50%;
}

.seller-detail-content {
  width: 900px;
  margin: 50px auto;
  overflow: hidden;
}

.seller-detail-content > .seller-detail-image {
  float:left;
  overflow: hidden;
  margin-bottom: 10px;
}

.seller-detail-image > img {
  border-radius: 4px;
}

.seller-detail-content > .seller-detail-info {
  margin-left: 300px;
  padding-left: 20px;
  box-sizing: border-box;
}

.seller-detail-info-row {
  margin-bottom: 10px;
}

@media screen and (max-width:900px) {
  .seller-detail-banner > h1 {
    width: 300px;
  }
  .seller-detail-content {
    width: 100%;
  }
  .seller-detail-content > .seller-detail-image {
    width: 100%;
    float: none;
    text-align: center;
  }
  .seller-detail-content > .seller-detail-info {
    margin-left: 0px;
    width: 100%;
    padding-right: 20px;
  }
}

.scaleX-enter-active {
  animation: widthAnimate 0.5s;
}

.scaleX-leave-active {
  animation: widthAnimate 0.5s reverse;
}

@keyframes widthAnimate {
  from { width: 0; opacity: 0 }
  to { width: 169px; opacity: 1 }
}
</style>
