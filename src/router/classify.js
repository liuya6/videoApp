const Classify = () => import("../views/classify/Classify");
const SpecialTopic = () => import("../views/classify/SpecialTopic");
const Playing = () => import("../views/classify/Playing");
const HotActor = () => import("../views/classify/HotActor");
const MoreTopic = () => import("../views/classify/MoreTopic");

export default [
  {
    path: "/classify/:mode/:id?",
    name: "classify",
    component: Classify,
    meta: {
      keepAlive: true,
      DocumentTitle: "频道"
    }
  },
  {
    path: "/special/:topicId",
    name: "special",
    component: SpecialTopic
  },
  {
    path: "/playing",
    name: "playing",
    component: Playing
  },
  {
    path: "/hotActor",
    name: "hotActor",
    component: HotActor
  },
  {
    path: "/moreTopic",
    name: "moreTopic",
    component: MoreTopic
  }
];
