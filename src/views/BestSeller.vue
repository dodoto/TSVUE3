<template>
  <div class="best-seller-box">
    <Loading :show="showLoading"/>
    <transition-group 
      tag="div" 
      name="fade" 
      class="best-seller" 
      v-on:before-leave="beforeLeave"
    >
      <SellerItem 
        @delete="deleteItem"
        v-for="item of bestSellerList" 
        :key="item?.id"
        :imgUrl="item?.image"
        :title="item?.title"
        :author="item?.author"
        :fav_nums="item?.fav_nums"
        :id="item?.id"
      />
      <i v-for="item in 10" :key="item"></i>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { GET } from '@/plugins/axios'
import Loading from '@/components/Loading.vue'
import SellerItem from '@/components/SellerItem.vue' 

type BestSellerList = any[]

export default defineComponent({
  components: {
    Loading,
    SellerItem
  },
  setup() {

    const showLoading = ref(true)

    const bestSellerList = ref<BestSellerList>([])

    const getBestSeller = () => {
      const url = '/best-seller/book/hot_list'
      GET(url)
      .then((res:BestSellerList) => {
        bestSellerList.value = res
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => showLoading.value = false)
    }

    const deleteItem = (id:number) => {
      bestSellerList.value = bestSellerList.value.filter(item => item.id !== id)
    }

    const beforeLeave = (el:HTMLElement) => {
      const { left, top } = el.getBoundingClientRect()
      el.style.left = `${left - 10}px`
      el.style.top = `${top - 20}px`
    }

    onMounted(getBestSeller)

    return {
      showLoading,
      deleteItem,
      beforeLeave,
      bestSellerList
    }
  },
})
</script>

<style scoped>
.best-seller-box {
  background-color: #2c3e50;
  height: 100vh;
  max-width: 1920px;
  overflow: auto;
}
.best-seller {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: inherit;
}
.best-seller > i {
  width: 162px;
  height: 0px;
  margin: 0 10px 10px 10px;
}

.fade-leave-active
 {
  position: absolute;
}

.fade-enter-from,
.fade-leave-to 
{
  opacity: 0;
}

</style>
