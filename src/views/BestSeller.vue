<template>
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
      //10 是 margin
      const { left, top } = el.getBoundingClientRect()
      el.style.left = `${left-10}px`
      el.style.top = `${top-10}px`
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
.best-seller {
  background-color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: inherit;
  height: 100vh;
  overflow: auto;
}
.best-seller > i {
  width: 170px;
  height: 0px;
  margin: 10px;
}

.fade-leave-active
 {
  position: absolute;
  /* top: 0; left: 0; */
}

.fade-enter-from,
.fade-leave-to 
{
  opacity: 0;
}

</style>
