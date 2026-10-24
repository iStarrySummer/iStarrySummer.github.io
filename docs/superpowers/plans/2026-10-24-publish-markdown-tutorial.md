# Publish Markdown Tutorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish one readable Chinese Markdown tutorial that demonstrates the Markdown and Fuwari extensions already supported by the blog.

**Architecture:** Add a single content entry under Astro's existing `posts` content collection and rely exclusively on the repository's configured Markdown pipeline. Verify the generated route locally, deploy the unchanged site architecture through the existing GitHub Pages workflow, and inspect the live article in a real browser at desktop and mobile widths.

**Tech Stack:** Astro 5.13.10, Markdown, Remark/Rehype, KaTeX, Expressive Code, Fuwari directives, pnpm 9.14.4, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-10-24-markdown-tutorial-post-design.md`

## Global Constraints

- Do not add dependencies or modify the theme, colors, fonts, components, animation, navigation, layout, license, copyright notice, or upstream footer link.
- Use only Markdown features already configured in `astro.config.mjs` and declared by the existing project examples.
- Do not fix or change the pre-existing `astro check` errors in `src/components/Navbar.astro:54` and `src/pages/archive.astro:12`.
- Use `pnpm@9.14.4` through the known Node/Corepack runtime for deterministic non-interactive builds.
- Before remote writes, `gh api user --jq .login` must return exactly `iStarrySummer`, and the push remote must be `https://github.com/iStarrySummer/iStarrySummer.github.io.git`.

## Review Focus

- Frontmatter parsing: the date, arrays, category, and draft value must satisfy `src/content/config.ts` and produce a public post.
- Markdown coverage: every promised syntax family must have a visible rendered example without exposing unintended raw markup.
- Code fences and nested Markdown: inner fence examples must not prematurely close outer fences or break the remainder of the article.
- Responsive overflow: tables, formulas, images, and long code lines must remain usable on a mobile viewport.
- Remote-only content: the GitHub repository card must load successfully without preventing the rest of the article from rendering when its API request is delayed.

---

### Task 1: Create and validate the tutorial article

**Files:**
- Create: `src/content/posts/markdown-complete-guide.md`
- Test: generated page under `dist/posts/markdown-complete-guide/index.html`

**Interfaces:**
- Consumes: the `posts` schema from `src/content/config.ts`, Markdown integrations from `astro.config.mjs`, and the existing local image `src/assets/images/profile-avatar.png`
- Produces: a published Astro content entry with slug `markdown-complete-guide` and a generated article route `/posts/markdown-complete-guide/`

- [ ] **Step 1: Create the article frontmatter**

Set `title` to `Markdown 从入门到进阶：一篇文章掌握常用语法`, `published` to `2026-10-24`, `description` to a concise Chinese summary, `tags` to `[Markdown, 教程, Fuwari]`, `category` to `学习笔记`, and `draft` to `false`.

- [ ] **Step 2: Write the tutorial's basic Markdown sections**

Add connected explanations and rendered examples for heading levels 1–6, paragraphs and hard line breaks, bold, italics, combined emphasis, strikethrough, inline code, horizontal rules, escaped punctuation, unordered lists, ordered lists, nested lists, task lists, blockquotes, nested blockquotes, links, autolinks, the local profile image, tables, and footnotes.

- [ ] **Step 3: Write code, math, and Fuwari extension sections**

Add fenced code examples with language highlighting, title, line highlighting, inserted/deleted markers, and a collapsible range; add inline and display KaTeX formulas; add note/tip/warning admonitions, GitHub admonition syntax, spoiler text, a GitHub repository card for `iStarrySummer/iStarrySummer.github.io`, safe inline HTML, and a short combined example.

- [ ] **Step 4: Verify promised syntax is present in source**

Run:

```bash
rg -n '(^#{1,6} )|(\*\*)|(\[[ x]\])|(^>)|(^\|.*\|$)|(\[\^[^]]+\])|(\$\$)|(:::(note|tip|warning))|(:spoiler\[)|(::github\{)|(<details>)' src/content/posts/markdown-complete-guide.md
rg -n '^draft: false$' src/content/posts/markdown-complete-guide.md
```

Expected: the first command reports each promised syntax family, and the second reports the public draft setting exactly once.

- [ ] **Step 5: Build the production site**

Run:

```bash
NODE_BIN='/Users/a1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node'
PNPM9_BIN='/Users/a1/.cache/node/corepack/v1/pnpm/9.14.4/bin/pnpm.cjs'
"$NODE_BIN" "$PNPM9_BIN" build
```

Expected: exit code 0; Astro generates `/posts/markdown-complete-guide/index.html`; Pagefind indexes the page.

- [ ] **Step 6: Inspect the generated output**

Confirm the generated HTML contains the Chinese title, all heading IDs, table markup, task-list checkboxes, footnote backlinks, KaTeX output, Expressive Code wrappers, admonitions, spoiler markup, local image output, and GitHub card placeholder. Expected: no raw unsupported directive remains visible in the generated article.

- [ ] **Step 7: Commit the article and plan**

```bash
git add src/content/posts/markdown-complete-guide.md docs/superpowers/plans/2026-10-24-publish-markdown-tutorial.md
git commit -m "feat: publish Markdown tutorial"
```

### Task 2: Publish and verify the live article

**Files:**
- Verify: `src/content/posts/markdown-complete-guide.md`
- Verify: live route `https://iStarrySummer.github.io/posts/markdown-complete-guide/`

**Interfaces:**
- Consumes: the commit produced by Task 1 and the existing `github` remote
- Produces: a successful GitHub Pages deployment and browser-verified public article

- [ ] **Step 1: Verify the GitHub authentication identity**

Run `gh api user --jq .login`. Expected: exactly `iStarrySummer`.

- [ ] **Step 2: Verify the push target**

Run `git remote get-url --push github`. Expected: exactly `https://github.com/iStarrySummer/iStarrySummer.github.io.git`.

- [ ] **Step 3: Push the current `main` branch**

Run `git push github main`. Expected: the new article commit is accepted by the Pages repository.

- [ ] **Step 4: Wait for the deployment workflow**

Use `gh run list` to identify the workflow run for the pushed commit and `gh run watch` to wait for completion. Expected: the Pages build/deployment concludes with `success`.

- [ ] **Step 5: Start the local production preview**

Run the pinned pnpm 9 preview command on an available local port and keep the process active for browser inspection. Expected: the server reports a reachable `127.0.0.1` URL.

- [ ] **Step 6: Verify the desktop presentation in a real browser**

Open the local article and live article at desktop width. Check the homepage card, title metadata, table of contents, heading hierarchy, lists, quote blocks, links, image, table, code frames and markers, formulas, footnotes, admonitions, spoiler interaction, repository card, navigation, and theme controls. Expected: the local and live presentations match and all interactions work.

- [ ] **Step 7: Verify the mobile presentation in a real browser**

Resize the real browser to a mobile viewport and revisit the article. Check navigation, text wrapping, image scaling, table scrolling, formula layout, code scrolling/wrapping, footnotes, and interactive blocks. Expected: no page-level horizontal overflow, clipping, overlap, or inaccessible control.

- [ ] **Step 8: Record the final delivery evidence**

Report the article source path, local preview URL, public URL, article commit SHA, workflow conclusion, desktop/mobile browser findings, and any unavoidable source changes. Expected: every claim is backed by the completed build, workflow, and browser checks.
