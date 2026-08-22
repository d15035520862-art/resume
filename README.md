# 丁艳楠 · 个人简历网站

> 面向「AI 产品经理实习生」求职的单页简历作品集。纯静态 HTML/CSS/JS，零依赖、零构建，双击即可预览，可直接部署到 Vercel / Netlify / GitHub Pages。

设计语言：**暖调「手作剪纸」编辑风**，参考 [john-and-patricias-romantic-comfort-website](https://github.com/andrewwoan/john-and-patricias-romantic-comfort-website) 的暖纸 / 手写 / 木色气质，并把「非遗剪纸」项目提炼成单一强调色（朱砂红）+ 印章品牌标记，形成个人记忆点。

---

## 目录结构

```
个人简历网站/
├── index.html            # 单页首页（Hero / 关于 / 技能 / 项目 / 作品集 / 教育 / 联系）
├── resume.html           # 打印友好简历页（点「打印 / 保存为 PDF」即可导出）
├── css/style.css         # 全部样式（CSS 变量集中在此，方便改配色）
├── js/main.js            # 交互（导航 / 滚动显现 / 灯箱，仅用 IntersectionObserver）
├── assets/
│   ├── img/portrait.webp     # 个人照片
│   ├── img/logo.png          # 「丁艳楠」名字 logo（品牌标记，已去白底）
│   ├── img/favicon.svg       # 印章图标
│   ├── papercut/kf1~kf7.webp # 非遗剪纸分镜关键帧（7 张静态图）
│   └── qmx-prototype.html    # 启明星低保真原型（可点击查看）
└── 个人简历网站PRD.md     # 需求文档
```

---

## 本地预览

方式一：直接双击 `index.html`（最省事）。

方式二：起一个本地静态服务（避免个别浏览器的 file:// 限制）：

```bash
cd "D:/softwares/Obsidian/仓库/AI learning/产品实习/作品集/个人简历网站"
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

---

## 部署

把整个「个人简历网站」文件夹内容上传到任意静态托管即可（无需构建）：

- **Vercel**：`vercel` 或直接拖入项目根目录（入口文件 `index.html`）。
- **Netlify**：拖拽文件夹到 Netlify Drop。
- **GitHub Pages**：把文件推到仓库，Settings → Pages 选分支发布。

> 提示：非遗剪纸成片已上传至小红书，网站中「观看成片」按钮统一跳转 `https://xhslink.cn/o/oZgALjuLpJ`（如需更换，搜索 `xhslink` 即可找到 2 处）。

---

## 需要你替换 / 确认的内容

| 位置 | 说明 |
|---|---|
| 个人照片 | `assets/img/portrait.webp` 用的是「个人照片」里的 `1316418d…jpg`，已裁剪为 1:1 方形。如再替换，直接覆盖同名文件即可。 |
| 品牌 Logo | `assets/img/logo.png` 用的是「丁艳楠名字logo设计.png」，已去除白底（导航与页脚均使用）。 |
| 联系方式 | 邮箱、电话已按简历填写（`17720251151042@stu.xmu.edu.cn` / `15035520862`）。 |
| 视频成片 | 非遗成片跳转小红书 `xhslink.cn`（全文搜 `xhslink` 可找到 2 处）。 |
| 在线 Demo | 启明星线上地址 `https://qmx-ai-production.up.railway.app/` 已链接。 |
| 下载简历 | 「下载简历」按钮打开 `resume.html`，点击页面顶部「打印 / 保存为 PDF」即可导出 PDF。 |

---

## 修改配色 / 字体

全部设计变量集中在 `css/style.css` 顶部的 `:root`：

```css
--paper: #f6efe2;   /* 纸面底色 */
--ink: #2a2117;     /* 墨色 */
--accent: #b03a2e;  /* 朱砂红（唯一强调色） */
```

字体在 `index.html` 的 `<head>` 里通过 Google Fonts 加载（Noto Serif SC + Playfair Display + Long Cang）。
