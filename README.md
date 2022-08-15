# Rich Text Toolkit

A collection of helpers for building a rich text editor (WYSIWYG) with [ProseMirror](https://prosemirror.net/).

If you only need basic rich text editing functions (bold, italics, lists, links)—take a look at the [Kaizen Rich Text Editor](https://github.com/cultureamp/kaizen-design-system/tree/master/packages/rich-text-editor), which uses these helpers to create a plug-and-play component.

## Contributions

While the Toolkit was initially built out by Kaizen, contributions are welcome and encouraged from all teams. If there is new functionality that you would like add or extend upon, please reach out to the Design System Team to set up some time before kicking off this new body of work.

### Triggering a new release

This repo uses [changesets](https://github.com/changesets/changesets) for versioning. When you want to trigger a new release:
- run `yarn changeset add` from your local terminal to generate a changeset.
    - Select the [semver change type](https://semver.org/) (ie: `major`, `minor`, `patch`)
    - Write a concise summary of the change -  this is used in the changelog
- Commit the generated file and merge the PR
    - This will automatically trigger a release PR
- Checkout to the release PR (`changeset-release/main`) and push up an empty commit
```bash
git checkout changeset-release/main
git commit -m "Empty commit to trigger CI tasks" --allow-empty
git push origin
```
- Approve the PR and merge into `main`

### Why the empty commit?

This is due to a quirk with the PR that is automatically generated. At the moment it cannot trigger the CI tasks to run. In order to run these, push an empty commit to the PR before merging.


## Local development

As there is currently no storybook attached to the Rich Text Toolkit, for ease of local development we would recommend either of the following: 
- run `yarn build` and copy your `/dist` folder into your local `@kaizen/rich-text-editor` package - this is only really helpful to spot check your current change
- Use [yarn link](https://classic.yarnpkg.com/en/docs/cli/link) or [yacl](https://github.com/wclr/yalc) to create a dependency on your local development environment with the `@kaizen/rich-text-editor`
  - **Caveat:** there has been some issue getting `yarn link` to work from machine to machine so we recommend using `yacl`

## Using the rich-text-toolkit

The Toolkit was built out with the intention to be used in `@kaizen/rich-text-editor`, which handles the UI and logic around interactive states. While it is recommended that you leverage the Kaizen component, you can utilize the Toolkit to build out a custom solution if modelled similarly.

If you have spoken to the Design System Team and need a bespoke solution, we advise contributing to the Toolkit to build the core functionality and importing that into your project.


## Architecture

### Diagram

![RTE Diagram](/docs/assets/rich-text-toolkit-at-a-glance.png)
*Note: this diagram was created in the planning stage and while it mostly represent the overall structure, there may be some inconsistencies as development continues.*

### Core

Contains the essential functionality to build out the RTE, Including:
- Initializing the editor view (`/create.ts`)
    - `createRichTextEditor` creates a new instance of the RTE that can dispatch commands and transactions.
- Initializing the editor state (`/state.ts`)
    - `createEditorState` is an API friendly wrapper for ProseMirror's EditorState.create
    -   `createDocNodeFromContent` creates a Prosemirror doc node by combinining the schema and documents content array
- React Hook to initialize editor (`/hooks/useRichTextEditor.ts`)
    - The `useRichTextEditor` hook creates an instance of the RTE, binds it to the DOM and allows it to update its state within the React lifecycle


### Commands

Contains any function that is used to dispatch or help dispatch an editing action within the Rich Text Editor. These either extend or simplified the API for [Commands](https://prosemirror.net/docs/ref/#state.Command) from the ProseMirror package 

### Plugins

Plugins are used to add or extend functionality to the rich text editor. They are an encapsulated bundle of functions that may influence the state and the view that contains it.

You can learn more about ProseMirror's Plugin System over [here](https://prosemirror.net/docs/ref/#state.Plugin_System).

### Schema

Contains the schema for both nodes and marks. As ProseMirror is opinionated in how it handles the two types we have opted to keep them in separate files. When adding new nodes or marks, please add them into the appropriate schema file.
- [Nodes](https://prosemirror.net/docs/ref/#model.Node) - An element in the DOM tree
- [Marks](https://prosemirror.net/docs/ref/#model.Mark) - A piece of information that can be attached to a node

