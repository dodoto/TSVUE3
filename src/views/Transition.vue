<script lang="jsx">
import { defineComponent, onMounted, ref, TransitionGroup } from "vue";

export default defineComponent({
  setup() {
    const data = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    // onMounted(() => {
    //   setTimeout(() => {
    //     data.value.splice(6,1)
    //     data.value.push(17)
    //   },2000)
    // })
    return () => {
      return (
        <div class="transition-grid">
          {data.value.map((cell, index) => (
            <div class="grid-cell" key={cell}>
              {cell}
            </div>
          ))}
        </div>
      );
    };
  },
});
</script>

<style scoped>
.transition-grid {
  width: 400px;
  /* height: 400px; */
  margin: auto;
  /* display: grid;
  grid-template-columns: repeat(4,1fr); */
  overflow: hidden;
}
.grid-item {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
}
.grid-cell {
  height: 100px;
  width: 100px;
  float: left;
  background-color: slategray;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
  position: absolute;
  width: 100px;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
