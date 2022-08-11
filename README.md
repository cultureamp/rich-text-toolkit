# Rich Text Toolkit

A collection of helpers for building a rich text editor (WYSIWYG) with [ProseMirror](https://prosemirror.net/).

If you only need basic rich text editing functions (bold, italics, lists, links)—take a look at the [Kaizen Rich Text Editor](https://github.com/cultureamp/kaizen-design-system/tree/master/packages/rich-text-editor), which uses these helpers to create a plug-and-play component.

## Contributing

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

## Architecture

### Diagram

![RTE Diagram](/docs/assets/rich-text-toolkit-at-a-glance.png)

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

## Building a custom Rich Text Editor

While it is heavily recommended that you leverage the Kaizen Rich Text Editor, you can utilize the Toolkit to build out a custom solution.

In this instance, is suggested that you build upon the toolkit and export new commands, plugins or helpers from this repository and then model you implementation on the @kaizen/rich-text-editor
## Local development

As there is currently no storybook attached to the Rich Text Toolkit, developing locally will require either: 
- Using `yarn link` to connect your development in the rich-text-toolkit package with @kaizen/rich-text-editor - **Caveat:** there has been some issue getting this to work from machine to machine
- Build and replace the `/dist` folder over to your local `@kaizen/rich-text-editor` package (don't run yarn install) - this is only really helpful to spot check your current change
