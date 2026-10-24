# Remove Demo Posts and Replace Avatar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove every bundled demo post and replace the sidebar avatar while preserving the Fuwari site unchanged otherwise.

**Architecture:** This is a content/configuration-only change: remove the demo content files, install the supplied raster asset under a semantic name, and point the existing profile configuration at it. No runtime component or dependency changes are permitted.

**Tech Stack:** Astro 5, TypeScript, pnpm 9, static assets

**Spec:** `docs/superpowers/specs/2026-10-24-remove-demo-posts-replace-avatar-design.md`

## Global Constraints

- Keep the existing theme, banner, title, profile text, social links, navigation, layouts, animations, and component structure unchanged.
- Add no dependencies and perform no refactoring.
- Preserve the upstream license and copyright notices.
- Deploy only through the existing `iStarrySummer/iStarrySummer.github.io` remote after authenticating as `iStarrySummer`.

## Review Focus

- An empty post collection must still generate the homepage, archive, categories, tags, and about routes without a build error.
- No demo Markdown or guide cover may remain under `src/content/posts`.
- The configured avatar path must resolve to the supplied 1254×1254 PNG and the old demo avatar must be absent.
- No files outside the explicit content, avatar, config, and process-document scope may change.
- The deployed desktop and mobile pages must load the new avatar and show no demo post cards.

---

### Task 1: Remove demo content and replace the avatar

**Files:**
- Delete: `src/content/posts/markdown-extended.md`
- Delete: `src/content/posts/video.md`
- Delete: `src/content/posts/draft.md`
- Delete: `src/content/posts/expressive-code.md`
- Delete: `src/content/posts/markdown.md`
- Delete: `src/content/posts/guide/index.md`
- Delete: `src/content/posts/guide/cover.jpeg`
- Delete: `src/assets/images/demo-avatar.png`
- Create: `src/assets/images/profile-avatar.png`
- Modify: `src/config.ts:56`

**Interfaces:**
- Consumes: the existing `ProfileConfig.avatar` asset resolution and Astro content collection.
- Produces: an empty post collection and an avatar path of `assets/images/profile-avatar.png`.

- [ ] **Step 1: Run the expected-state assertion before editing**

Run a shell assertion requiring an empty `src/content/posts`, the new avatar path/file, and the absence of `demo-avatar.png`.

Expected: FAIL because the demo content and old avatar still exist.

- [ ] **Step 2: Apply the minimal content and configuration changes**

Delete the listed demo files, copy the supplied PNG to `src/assets/images/profile-avatar.png`, and update only the `profileConfig.avatar` string.

- [ ] **Step 3: Re-run the expected-state assertion**

Expected: PASS.

- [ ] **Step 4: Verify the project**

Run: `pnpm check && pnpm build`

Expected: both commands exit 0; the output includes generated `/`, `/archive/`, `/categories/`, `/tags/`, and `/about/` pages.

- [ ] **Step 5: Commit**

Commit only the planned source/content changes and the two process documents.

### Task 2: Publish and verify the live site

**Files:**
- No additional source changes expected.

**Interfaces:**
- Consumes: the verified Task 1 commit and the existing GitHub Pages deployment workflow.
- Produces: the deployed site at `https://iStarrySummer.github.io/`.

- [ ] **Step 1: Verify GitHub identity and remote**

Run `gh api user --jq .login` and inspect `git remote -v`.

Expected: authenticated login is exactly `iStarrySummer`; push remote is `https://github.com/iStarrySummer/iStarrySummer.github.io.git`.

- [ ] **Step 2: Push the verified commit**

Push `main` to the existing user remote.

Expected: push exits 0.

- [ ] **Step 3: Verify deployment status**

Wait for the repository's GitHub Pages workflow to finish successfully.

Expected: the workflow for the pushed commit concludes `success`.

- [ ] **Step 4: Verify in a real browser**

Inspect the live page at desktop and mobile viewport sizes.

Expected: the new avatar is visible, no demo post cards are present, core navigation works, and the console/network state shows no page-breaking error.
