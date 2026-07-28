# WebGAL Craft 官网

[WebGAL Craft](https://webgalcraft.com) 官方网站源码。

WebGAL Craft 应用源码位于 [A-kirami/webgal-craft](https://github.com/A-kirami/webgal-craft)。本仓库仅维护产品官网，使用 Astro 生成多语言静态页面，并通过 Svelte islands 提供必要的客户端交互。

## 本地开发

环境要求：Node.js `>= 24.18.0`、pnpm `9.14.2`。

```bash
corepack enable
pnpm install
pnpm dev
```

开发服务器默认运行在 `http://localhost:4321`。

## 检查与构建

```bash
pnpm lint
pnpm check
pnpm test:unit
pnpm build
```

使用 `pnpm preview` 可在本地预览构建产物。

## 内容维护

- 站点元信息、正式域名和社区链接：`src/data/site.ts`
- 当前版本与发布日期：`src/data/release.json`
- 安装包文件名与下载地址生成规则：`src/data/downloads.ts`
- 各语言的页面内容与下载文案：`src/data/locales/<locale>.ts`
- Logo 与其他静态资源：`public/`

页面组件只消费结构化数据。可本地化内容应保留在 locale 模块中；跨语言共享的站点信息、版本元数据和下载目标分别由 `site.ts`、`release.json` 和 `downloads.ts` 管理。

## 国际化

站点当前支持简体中文（默认路由 `/`）、繁体中文、English 和日本语。新增语言时需要同步更新：

1. `src/data/site.ts` 中的 `supportedLocales`
2. `src/data/locales/<locale>.ts` 中的页面内容
3. `src/data/locales/index.ts` 中的 locale 映射
4. 相关数据与路由测试

仅当所有语言的共享内容结构发生变化时，才需要修改 `src/data/locales/types.ts`。
