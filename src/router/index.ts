import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requireTest: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: "xxxx",
    },
  },
  {
    path: "/todo",
    name: "Todo",
    component: () => import(/* webpackChunkName: "todo" */ "../views/Todo.vue"),
  },
  {
    path: "/best-seller",
    name: "BestSeller",
    component: () =>
      import(/* webpackChunkName: "best seller" */ "../views/BestSeller.vue"),
    meta: {
      title: "热销榜单",
    },
  },
  {
    path: "/seller-detail/:id?",
    props: true,
    name: "SellerDetail",
    component: () =>
      import(
        /* webpackChunkName: "seller-detail" */ "../views/SellerDetail.vue"
      ),
    meta: {
      title: "",
    },
  },
  {
    path: "/365",
    name: "DragTable",
    component: () =>
      import(/* webpackChunkName: "drag-table" */ "../views/DragTable.vue"),
    meta: {
      title: 365,
    },
  },
  {
    path: "/:w+",
    name: "404",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to)     // 去哪个路由
  // console.log(from)   // 从哪个路由
  if (to.meta.requireTest) {
    next({ path: "/404" });
  } else {
    next();
  }
});

router.afterEach((to, from, failure) => {
  const title = to.meta.title || to.name;
  document.title = title as string;
  // console.log(failure)
});

router.onError((err) => {
  console.log(err);
});

export default router;
