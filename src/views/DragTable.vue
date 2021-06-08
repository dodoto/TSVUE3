<template>
  <select @change="handleSelect">
    <option value="">选择固定列</option>
    <option v-for="title of titles" :key="title" :value="title">
      {{ title }}
    </option>
  </select>
  <Switch :value="isFixedHead" @change="handleChange" />
  <div class="fixed-table" @scroll="handleScroll" :ref="getTableBoxEl">
    <!-- 固定头 -->
    <div
      class="fixed-head"
      v-if="isFixedHead"
      :style="{
        transform: `translate3D(0,${fixedHeadTransformTop}px,0)`,
      }"
    >
      <table>
        <colgroup>
          <col
            v-for="(title, index) of titles"
            :key="title"
            :width="ColumnWidths[index]"
          />
          <!-- 隐形col,当内容宽度小于实际宽度时,接收剩余的宽度 -->
          <col />
        </colgroup>
        <th v-for="title of titles" :key="title">{{ title }}</th>
      </table>
    </div>
    <!-- 固定列 -->
    <div
      class="fixed-column"
      v-if="fixedField !== ''"
      :style="{
        left: `${fixedColumnLeft}px`,
        transform: `translate3D(${fixedColumnTransformLeft}px,0,0)`,
        width: `${fixedColumnWidth}px`,
      }"
    >
      <table>
        <thead>
          <th>{{ fixedField }}</th>
        </thead>
        <tbody>
          <tr v-for="(column, index) of fixedColumnData" :key="index">
            <td>{{ column }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 固定头和列相交的单元格 -->
    <th
      class="cross-cell"
      v-if="isFixedHead && fixedField !== ''"
      :style="{
        left: `${fixedColumnLeft}px`,
        width: `${ColumnWidths[0]}px`,
        transform: `translate3D(${fixedColumnTransformLeft}px,${fixedHeadTransformTop}px,0)`,
      }"
    >
      {{ fixedField }}
    </th>
    <!-- 实际表内容 -->
    <div>
      <table>
        <colgroup>
          <col
            v-for="(title, index) of titles"
            :key="title"
            :width="ColumnWidths[index]"
          />
          <!-- 隐形col,当内容宽度小于实际宽度时,接收剩余的宽度 -->
          <col />
        </colgroup>
        <thead>
          <th v-for="title of titles" :key="title">{{ title }}</th>
        </thead>
        <tbody>
          <tr v-for="item of data" :key="item.id">
            <td v-for="title of titles" :key="title">{{ item[title] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";
import { GET } from "@/plugins/axios";
import Switch from "@/components/Switch.vue";

// console.log(Test)

type Timer = undefined | number;

interface TableDataItem {
  [key: string]: any;
}

type TableData = TableDataItem[];

export default defineComponent({
  components: {
    Switch,
  },
  setup() {
    let TableBoxEl: HTMLElement;

    const ColumnWidths = ref<number[]>([]);

    const data = ref<TableData>([]);

    const fixedField = ref<string>("");

    const isFixedHead = ref<boolean>(false);

    const fixedHeadTransformTop = ref<number>(0);

    const fixedColumnTransformLeft = ref<number>(0);

    const titles = computed(() => {
      const item = data.value[0];
      if (item === undefined) return [];
      return Object.keys(item);
    });

    const fixedColumnData = computed(() => {
      const key = fixedField.value;
      return data.value.map((item) => item[key]);
    });

    const fixedColumnIndex = computed(() => {
      return titles.value.findIndex((title) => title === fixedField.value);
    });

    const fixedColumnWidth = computed(() => {
      const widths = ColumnWidths.value;
      const index = fixedColumnIndex.value;
      return widths[index];
    });

    const fixedColumnLeft = computed(() => {
      const index = fixedColumnIndex.value;
      if (index > 0) {
        const widths = ColumnWidths.value;
        let left = 0;
        for (let i = 0; i < index; i++) {
          left += widths[i];
        }
        return left;
      } else {
        return 0;
      }
    });

    const getColumnWidths = (len: number) => {
      for (let i = 0; i < len; i++) {
        ColumnWidths.value.push(200);
      }
    };

    const getData = () => {
      GET("http://localhost:3000/users")
        .then((res) => {
          const item = res[0];
          if (item !== undefined) getColumnWidths(Object.keys(item).length);
          data.value = res;
        })
        .catch((err) => console.log(err));
    };

    const handleSelect = (e: InputEvent) => {
      const selectEl = e.target as HTMLInputElement;
      const value = selectEl.value;
      fixedField.value = value;
    };

    const getTableBoxEl = (ref: HTMLElement) => (TableBoxEl = ref);

    const handleScrollX = () => {
      const scrollLeft = TableBoxEl?.scrollLeft;
      if (fixedField.value !== "") {
        const offsetLeft = scrollLeft - fixedColumnLeft.value;
        fixedColumnTransformLeft.value = Math.max(0, offsetLeft);
      }
    };

    const handleScrollY = () => {
      const scrollTop = TableBoxEl?.scrollTop;
      if (isFixedHead.value) {
        fixedHeadTransformTop.value = scrollTop;
      }
    };

    const handleScroll = () => {
      handleScrollX();
      handleScrollY();
    };

    const handleChange = (value: boolean) => (isFixedHead.value = value);

    watchEffect(handleScroll);

    onMounted(getData);

    return {
      data, //表格数据
      titles, //表格头
      isFixedHead, //是否固定表头
      fixedField, //固定字段
      fixedColumnIndex, //固定列下标
      fixedColumnData, //固定列数据
      fixedColumnLeft, //固定列x坐标
      fixedColumnWidth, //固定列宽度
      fixedColumnTransformLeft, //固定列x轴偏移量
      fixedHeadTransformTop, //固定头y轴偏移量
      ColumnWidths, //单元格宽度集合
      handleSelect, //选择处理函数
      handleScroll, //轴滚动处理函数
      handleChange, //选中处理函数
      getTableBoxEl,
    };
  },
});
</script>

<style scoped>
.fixed-table {
  width: 400px;
  height: 400px;
  margin: 100px auto;
  overflow: auto;
  text-align: left;
  position: relative;
  background-color: #fff;
}
.fixed-column,
.fixed-head {
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0px 5px -10px rgba(0, 0, 0, 0.3), 0 2px 4px 0 rgba(0, 0, 0, 0.3);
}
.fixed-head {
  left: 0;
}

table {
  border-collapse: collapse;
  table-layout: absolute;
  width: 100%;
  background-color: #ecf5ff;
}
.cross-cell {
  position: absolute;
  top: 0;
  background-color: #ecf5ff;
  box-sizing: border-box;
  line-height: 40px;
}
th,
td,
.cross-cell {
  line-height: 40px;
  padding-left: 20px;
  /* border: 1px solid slategray; */
}
tr:nth-child(even) {
  background-color: #ecf5ff;
}
tr:nth-child(odd) {
  background-color: #d9ecff;
}
</style>
