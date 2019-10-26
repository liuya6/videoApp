const My = () => import("../views/my/My");
const Set = () => import("../views/my/Set");
const Feedback = () => import("../views/my/Feedback");
const Notice = () => import("../views/my/Notice");
const Promotion = () => import("../views/my/Promotion");
const Communicate = () => import("../views/my/Communicate");
const Activation = () => import("../views/my/Activation");
const MyPromotion = () => import("../views/my/MyPromotion");
const QuickCode = () => import("../views/my/QuickCode");
const History = () => import("../views/my/History");
const MyLove = () => import("../views/my/MyLove");

export default [
  {
    path: "/my",
    name: "my",
    component: My,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/set",
    name: "set",
    component: Set,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/feedback",
    name: "feedback",
    component: Feedback,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/notice",
    name: "notice",
    component: Notice,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/promotion",
    name: "promotion",
    component: Promotion,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/communicate",
    name: "communicate",
    component: Communicate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/activation",
    name: "activation",
    component: Activation,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/myPromotion",
    name: "myPromotion",
    component: MyPromotion,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/quickCode",
    name: "quickCode",
    component: QuickCode,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/history",
    name: "history",
    component: History,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/myLove",
    name: "myLove",
    component: MyLove,
    meta: {
      requiresAuth: true
    }
  }
];
