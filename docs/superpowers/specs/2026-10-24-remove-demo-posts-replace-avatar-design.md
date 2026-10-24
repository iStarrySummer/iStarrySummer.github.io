# Remove Demo Posts and Replace Avatar — Design

## Goal

Keep the existing Fuwari site intact while turning the homepage into an empty personal blog and replacing only the profile avatar with the user-provided image.

## Chosen approach

Delete all seven bundled demo-post files, including the guide cover image, so the content collection is genuinely empty. Copy `/Users/a1/Downloads/梦幻少女与白猫花语.png` to `src/assets/images/profile-avatar.png`, update `profileConfig.avatar` to the new semantic path, and remove the old demo avatar. This preserves the post system, archive, category, tag, about page, layout, colors, typography, animation, and interaction logic without hiding or redesigning any component.

## Rejected alternative

Marking the demo posts as drafts would hide them from normal listings but would not satisfy the user's request to delete them, so it is not used.

## Constraints

Do not change the theme, banner, site title, profile name, biography, social links, navigation, content schemas, or component structure. Do not add dependencies or refactor working code. Preserve the upstream license and copyright notices. Verify the empty-content build, the generated routes, the new avatar asset, and the live desktop/mobile rendering before reporting completion.
