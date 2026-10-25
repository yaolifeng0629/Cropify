---
name: Cropify
description: A local-first workspace for precise batch image cropping and export. Visual language adapted from the Peec AI site study (2026-10-25).
colors:
  ink: "#171717"
  ink-muted: "#737373"
  ink-faint: "#a3a3a3"
  ink-dim: "rgba(23,23,23,.5)"
  nav-text: "rgba(23,23,23,.8)"
  canvas: "#f7f7f7"
  wash: "#f5f5f5"
  surface: "#ffffff"
  surface-soft: "#fafafa"
  surface-tint: "#f5f5f5"
  line: "rgba(23,23,23,.08)"
  line-strong: "rgba(23,23,23,.15)"
  brand: "#171717"
  brand-hover: "#000000"
  brand-bright: "#a3a3a3"
  accent-red: "#da314a"
  status-green: "#22c55e"
  footer: "#000000"
  crop-control: "#3b82f6"
  crop-control-hover: "#2563eb"
  crop-fill: "rgba(59, 130, 246, 0.08)"
typography:
  display:
    fontFamily: '"Geist Variable", Geist, sans-serif'
    usage: "H1–H4、按钮、Badge、卡片标题、FAQ 问题"
  body:
    fontFamily: '"Inter", sans-serif'
    usage: "说明正文、桌面导航、表单"
  hero-h1: { size: "64 / 48 / 32px", weight: 400, lineHeight: "1em", tracking: "-.02em" }
  section-h2: { size: "39 / 32 / 26px", weight: 500, tracking: "-.02em" }
  card-title: { size: "18 / 16px", weight: 600, lineHeight: "1.2em" }
  nav: { size: "14px", lineHeight: "16.8px", weight: 400 }
  button: { size: "15px", weight: 500 }
layout:
  section-max-width: "1200px"
  content-width-desktop: "1190px"
  hero-title-max-width: "600px"
  section-padding-desktop: "96px"
  section-padding-mobile: "60px"
  feature-gap: "10px"
rounded:
  button: "6px"
  button-shell: "7px"
  panel: "12px"
  card-shell: "16px"
components:
  button-primary: { height: "44px", background: "#171717", color: "#ffffff", radius: "6px", padding: "14px 20px" }
  button-secondary: { height: "44px", shell: "1px rgba(23,23,23,.08) 外壳 + 7px 圆角", inner: "#ffffff 6px 圆角", shadow: "0 4px 4px rgba(23,23,23,.04)" }
  badge-metric: { radius: "6px", shadow: "0 2px 6px rgba(12,10,9,.08), 0 0 0 1px rgba(23,23,23,.08)" }
  card-low: { shadow: "0 1px 2px rgba(0,0,0,.05)" }
  nav: { announcement-height: "36px", height: "60px", cta-height: "36px" }
---

# Design System: Cropify（Peec 式极简工作台）

## 设计身份

**浅灰画布、黑灰排版、细线框架、具有轻微实体感的控件，以及以产品界面为核心的叙事。** 页面主体保持低饱和；状态绿、提示红与图表/裁剪功能色承担有限的彩色强调——颜色只服务状态与数据，不做装饰。

| 维度 | 规范 |
| --- | --- |
| 画布 | `#F7F7F7` 浅灰背景，贯穿页面的低对比细线 |
| 排版 | Geist 承担标题/按钮/Badge；Inter 承担说明正文与桌面导航 |
| 主视觉 | 居中大标题，下半句以 `rgba(23,23,23,.5)` 减弱；产品面板在下方展开 |
| 结构 | 居中 1200px 区块框架，内部内容宽 1190px；移动端内容左右 10px |
| 组件 | 小圆角、浅阴影、1px「外壳 + padding + 内层」描边构造 |
| 深浅节奏 | 浅色长页面中可插入黑色行动卡片，最后进入纯黑页脚 `#000000` |

## 配色

品牌两色：**Paper `#FDFDFD`** 与 **Charcoal `#171717`**。首页画布 `#F7F7F7`，不要把 Paper 直接当作页面背景。

| 语义 | 值 | 用途 |
| --- | --- | --- |
| ink | `#171717` | 主要文字、主按钮、Logo 托板 |
| ink-muted | `#737373` | 说明正文 |
| ink-dim | `rgba(23,23,23,.5)` | H1 后半句 |
| nav-text | `rgba(23,23,23,.8)` | 桌面导航文字 |
| canvas / wash / surface | `#F7F7F7` / `#F5F5F5` / `#FFFFFF` | 页面 / 演示区 / 卡片 |
| line | `rgba(23,23,23,.08)` | 细线、Badge 外圈、外壳 |
| accent-red | `#DA314A` | 提示点、 destructive / 注意 |
| status-green | `#22C55E` | 状态元素（本地处理、完成） |
| footer | `#000000` | 页脚、深色行动卡片 |
| crop-blue | `#3B82F6` | 裁剪精度控件（功能/数据色，属"图表色"豁免） |

按钮与卡片的可见边框由「外壳背景 + 1px padding + 内层表面」形成；不要只看元素自身 `border`。

## 字体与层级

- 首屏 H1：Geist，`64 / 48 / 32px`（桌面 / 中间断点 / 手机），行高 `1em`，字重 **400**，字距 `-.02em`；前半句 `#171717`，后半句 `rgba(23,23,23,.5)`；桌面标题容器宽 600px。
- 区块 H2：Geist，`39 / 32 / 26px`，500，`-.02em`。
- 大行动标题：Geist，`48 / 38 / 32px`，500，`1.1em`。
- 功能卡标题：Geist，桌面 18px / 手机 16px，`1.2em`，600。
- 首屏说明：Inter，桌面 16px；768/390px 为 17px，`1.4em`，400，`-0.2px`。
- 桌面导航：Inter 14px / 16.8px / 400。按钮文字：Geist 15px / 500。

## 布局

- 桌面版心 1200px（内容 1190px）；常规分区上下 `96px`，手机 `60px`。
- 首屏：公告栏 36px + 导航 60px；Hero 内边距桌面 上60/下40、手机上下 40；标题→副标题 16px，→CTA 32px，→演示面板 64px（手机 48px）。
- Bento 内部 gap `10px`；响应式断点 `810 / 1200`，H1 三档 `32 / 48 / 64`。
- 手机双 CTA 保持并排；菜单内的登录/注册才单列铺满。

## 组件

- **导航**：吸顶（sticky, z 高层级）；公告栏黑底 36px；导航 60px 浅灰底；右侧 CTA 高 36px：注册黑底白字、登录浅色外壳。手机三横线 → 全屏菜单（顶部 Logo + 关闭，纵向链接，按钮各占一整行）。
- **按钮**：高 44px；主按钮 `#171717` 白字 6px 圆角，hover 仅轻微底色变化；次按钮外壳 7px 圆角 + 1px padding + 内层白面 6px 圆角，投影 `0 4px 4px rgba(23,23,23,.04)`，文字前可有 9×9px 灰色小方块。
- **指标 Badge**：浅面 6px 圆角、小图标、Geist 14px / 500 / `-.01em`；投影 `0 2px 6px rgba(12,10,9,.08), 0 0 0 1px rgba(23,23,23,.08)`。
- **卡片 / Bento**：白面细边，外壳 16px / 内层 15px（1px padding 构造）；常见低层投影 `0 1px 2px rgba(0,0,0,.05)`；重点浮层可用更强组合投影，但仅用于演示浮层。
- **FAQ**：列表比主体窄；问题行右侧方向图标；底部分隔 `1px rgba(0,0,0,.1)`；答案展开进入页面流。
- **页脚**：纯黑 `#000000`，铺满窗口宽度，不受 1200px 版心背景边界限制。

## Do's and Don'ts

### Do
- Do 保持字体分工：标题/按钮用 Geist，说明与导航用 Inter。
- Do 用「外壳 + 1px padding + 内层」表达描边与层级。
- Do 让状态绿 / 提示红 / 裁剪蓝只表达状态、数据与精度操作。

### Don't
- Don't 给标题加超过规范的字重（H1 为 400，H2 为 500）。
- Don't 使用渐变文字、彩色装饰块或营销式彩色渐变背景。
- Don't 在浅色主体上使用纯黑大色块，页脚与行动卡片除外。
