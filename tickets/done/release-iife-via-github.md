# Distribute the script bundle via GitHub Releases and stop committing build output

**Priority:** 3

## Background

Build output is committed to the repository (TD-1, ADR-5). This was meant to allow installing the library straight from Git, but nobody consumes the ES module, the author does not want to publish to npm, and the committed files cause noisy diffs and stale output. ADR-12 decides that the script bundle becomes the only distributed artefact, attached to a GitHub Release by hand. Users download and self-host it. The ES module build is dropped for now.

## Affected Areas

| Area                                     | Role                                                        | Impact                                                                                              |
| ---------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Build scripts and `package.json`         | Build the ES module, the declarations and the script bundle | Remove the ES module build and its package entry points. Keep the type check and the script build.  |
| Committed `lib`, `lib-types`, `lib-iife` | Generated output                                            | Untrack and git-ignore. Remove the unreferenced bundled lazy loader in the repository root.         |
| Tests and `galleryUsingBuiltLib` demo    | Load the built script bundle                                | Build before the tests run. Demo continues to work after a local build.                             |
| `README.md`                              | Usage and development guide                                 | Replace the dependency/ES module section with download and self-host guidance. Fix bundle location. |
| `doc/architecture.md`                    | Architecture documentation                                  | Reconcile all sections that mention the ES module, committed output or three artefacts.             |
| Release process                          | Does not exist yet                                          | Document the manual steps to build and attach the bundle to a GitHub Release.                       |

## Acceptance criteria

- [ ] The ES module build and the declaration output are no longer produced. The type check is still part of the build.
- [ ] The generated folders are not tracked and are git-ignored. The stray bundled lazy loader in the repository root is removed.
- [ ] A clean checkout can run the build and the tests successfully, with the tests building the bundle first.
- [ ] The demo that uses the built bundle works after a local build.
- [ ] The manual release process (build, then upload the script bundle to a GitHub Release) is documented.
- [ ] The README tells users to download the bundle from a release and host it themselves, and states that loading from a CDN or other external host is not supported or recommended. It no longer mentions the ES module or installing as a dependency.
- [ ] The architecture documentation and the commands in the project instructions match the new state. TD-1 is marked resolved, and ADR-5 and ADR-12 statuses are updated.

## Notes

- Out of scope: publishing to npm, a CI release workflow (a possible follow-up that would also address TD-13), and the options recorded in ADR-12 (release tarball, install from Git, npm registry).
- The web-component entry currently re-exports the module entry. Check how this relates to TD-2 when the module entry loses its role as a package entry.
