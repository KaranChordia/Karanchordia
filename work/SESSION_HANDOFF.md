# Portfolio maintenance baseline — 2 November 2026

[Fact] KC identified karanchordia.com as the site recently updated with Grok. KC explicitly prohibited further frontend changes and likes the Work page’s miniature showcase interfaces. Treat the current live design as the reference; do not resume the older local redesigns or publish them.

## Source and ownership
[Fact] Owning repository: https://github.com/KaranChordia/Karanchordia. Canonical checkout: /Users/karanchordia/Documents/ChatGPT/Karan Chordia/Karanchordia on local main. Verified production source was captured in d7cd6d6, based on origin/main 7f8cf00; it is now consolidated here.
[Fact] Production deployment dpl_DGZ48HMwX9rDQP8vPETj5yCF5zjT is READY on karanchordia.com in project prj_JyNbVO4cGTNNd4OCj0Unfs9ifzfX, team team_1vMT59KOyt37gczEFWMoicRX. Vercel records no Git SHA for this deployment. GitHub main and both older checkouts differed from live HTML/CSS/JS.
[Fact] Recovered all 66 deployed source files using the Vercel file tree and public static files. Every file matches its Vercel source SHA-1. No deployed source bytes were edited. No tracked baseline files were absent from the deployment. work/production-source-manifest.json records the full capture. Maintenance documentation is additional and was not deployed.

## What to learn from Work
[Fact] Live Work exposes a project selector coupled to a screenshot viewer, thumbnails, captions, role/context and a case-study link. It includes Kramaniti, Kosh, Maitri, Saha, Artha and Hatch. Films and HowDramaTech use a related viewing interface with category selection.
[Fact] Source inspection: gallery.js owns project/screenshot state and updates the viewer plus supporting metadata. Project changes reset to the first screenshot. Arrow controls, arrow keys, touch gestures, and a larger view with Escape/focus return are implemented. media-gallery.js shares the selection/viewer structure and derives film metadata from fallback markup. Runtime accessibility snapshots confirmed the coordinated Kramaniti and Kosh states; this is not a complete interaction/accessibility audit.
[Inference] The useful design reference is a stable presentation area whose content and controls respond together to selection, with readable purpose/context and progressive detail. Preserve the distinction between a screenshot showcase and an embedded working product. Apply this principle to future proposals only when the task benefits; do not copy its appearance automatically or change the current frontend.

## Checks and next action
[Fact] All 66 source hashes verified. All root JavaScript files pass node --check. Live Work inspected read-only. No code behaviour changed, no push, no merge and no deployment performed in this task.
[Unverified] Comprehensive accessibility, physical-device behavior and external video playback. No claims of a full UX audit.
[Recommendation] Use this checkout as the maintenance baseline. Do not deploy the older primary/release worktrees. A future GitHub reconciliation should publish the exact captured source only after KC authorizes that external action; first recheck whether Grok has deployed another version. Keep the live state and repository state distinct.

## Consolidation — 2 November 2026
[Fact] KC requested a clean codebase with this live version as main and removal of older copies. Local main now contains d7cd6d6. Removed the two redundant linked worktrees and their temporary branches after preserving recoverable archives and a verified Git bundle. Moved dock-ux-preview and homepage-preview to the same recovery folder. Older uncommitted primary drafts are also retained in a named Git stash.
[Fact] Recovery location: /Users/karanchordia/.Trash/karanchordia-old-versions-20261102-195739. Trash was not emptied. Ignored research, planning documents, outputs, and other projects remain. No live frontend changes or deployment. GitHub main remains 7f8cf00 pending separately approved synchronization.

## GitHub synchronization authorized — 2 November 2026
[Fact] KC explicitly approved syncing GitHub, with the requirement that the published site stay unchanged. Before push, production remained dpl_DGZ48HMwX9rDQP8vPETj5yCF5zjT and all 66 source hashes still matched. No frontend edits are part of this synchronization. Verify any automatic deployment and the public file hashes after push.
