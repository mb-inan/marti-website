# Snapshots

Frozen copies of the whole site at a given version, so a redesign can be undone in one step.

| Folder | What it is | How to restore |
|---|---|---|
| `v0.6-2026-10-23/` | Desktop seam as cotton thread on the linen ground, approved 23 Oct; before the mobile (horizontal) seam work of v0.7. No reference photos/clips inside. | Same procedure. |
| `v0.5-2026-10-23/` | v0.4 plus the first stitched seam (flat dashed line) and the garment page transition; before the seam was re-rendered as real thread. Reference photos and clips are not copied into this snapshot. | Same procedure. |
| `v0.4-2026-10-23/` | The approved redesign of 23 Oct 2026: left-rail navigation, Terracotta palette, de-boxed layout; before the stitch animation work. | Same procedure. |
| `v0.3-2026-10-23/` | The site as approved on 23 Oct 2026 after v0.3 (content settled, blue/navy design, top navigation). | Copy the six `.html` files and the `assets/` folder from this snapshot back to the repository root, overwriting. Then add a CHANGELOG entry saying the design was rolled back to v0.3. |

Each snapshot can be opened directly: double-click its `index.html`.

Once the repository is on GitHub, every commit is also a snapshot (GitHub Desktop → History → right-click a commit → "Revert"). These folders are the belt to that pair of braces.
