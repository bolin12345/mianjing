import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "dream-start",
  base: "/mianjing/",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/vue/ref" },
    ],

    sidebar: [
      {
        text: "操作系统",
        collapsed: true,
        items: [{ text: "进程和线程", link: "/操作系统/进程和线程" }],
      },
      {
        text: "vue",
        collapsed: true,
        items: [{ text: "ref", link: "/vue/ref" }],
      },
      {
        text: "js",
        collapsed: true,
        items: [
          { text: "let、const 和 var", link: "/js/let-const-var" },
          { text: "值和引用", link: "/js/值和引用" },
          { text: "包装类型", link: "/js/包装类型" },
          { text: "数据转换", link: "/js/数据转换" },
          { text: "原型和原型链", link: "/js/原型和原型链" },
          { text: "执行栈和执行上下文", link: "/js/执行栈和执行上下文" },
          { text: "this指向", link: "/js/this指向" },
        ],
      },
      {
        text: "网络安全",
        collapsed: true,
        items: [
          { text: "xss", link: "/网络安全/xss" },
          { text: "csrf", link: "/网络安全/csrf" },
        ],
      },
      {
        text: "计网",
        collapsed: true,
        items: [
          { text: "xss", link: "/计网/网络的五层模型" },
          { text: "get和post的区别", link: "/计网/get和post的区别" },
          { text: "TCP和UDP", link: "/计网/TCP和UDP" },
          { text: "websocket", link: "/计网/websocket" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
