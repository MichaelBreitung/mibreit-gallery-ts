# Introduce Taskfiles for build, release, init and other tasks

**Priority:** 3

## Background

Project commands are spread over npm scripts, the build scripts and documented manual steps. There is no single entry point for setting up a checkout, building, testing or releasing. Task is already installed in the Dev Container and used in other projects of the author, so the same convention is applied here. The release process is described by the ticket `release-iife-via-github`; this ticket is independent of it, and the task contents follow whichever process is in place when it is solved.

## Affected Areas

| Area                                | Role                                         | Impact                                                                                             |
| ----------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Repository root                     | Has no Taskfile yet                          | Add a Taskfile with tasks for init, build, test, development server, release and cleaning.         |
| `package.json` scripts              | Current entry points for dev, test and build | The tasks call the existing scripts or replace them. Decide which stay, without duplicating logic. |
| Dev Container                       | Provides Task and its shell completion       | No change expected. Check whether the init task fits the container's start-up.                     |
| `README.md`                         | Development section lists the npm commands   | Document the tasks as the way to run project commands.                                             |
| Project instructions (`project.md`) | Commands table used by the agent workflow    | Point the table at the tasks.                                                                      |
| `doc/architecture.md`               | Build and deployment description             | Mention the tasks where the build and release process is described.                                |

## Acceptance criteria

- [ ] A Taskfile in the repository root offers tasks for init (installing dependencies), build, test, development server, release and cleaning, each with a short description in the task list.
- [ ] Running the task list command shows all tasks with their descriptions.
- [ ] The build and test tasks work on a clean checkout, and the test task builds first if the tests need a build.
- [ ] The release task prepares the release artefact as the documented release process requires, and does not publish anything by itself.
- [ ] No logic is duplicated between the Taskfile and the npm scripts.
- [ ] The README and the commands table in the project instructions refer to the tasks.
- [ ] The architecture documentation reflects the tasks where it describes build and deployment.

## Notes

- Out of scope: a CI workflow that runs the tasks.
- If this ticket is solved before `release-iife-via-github`, the release and build tasks are adjusted by that ticket.
