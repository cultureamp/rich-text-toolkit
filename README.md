# Rich Text Toolkit

A collection of helpers for building a rich text editor (WYSIWYG) with [ProseMirror](https://prosemirror.net/).

If you only need basic rich text editing functions (bold, italics, lists, links)—take a look at the [Kaizen Rich Text Editor](https://github.com/cultureamp/kaizen-design-system/tree/master/packages/rich-text-editor), which uses these helpers to create a plug-and-play component.

## Contributing

### Triggering a new release

This repo uses changesets. When you want to trigger a new release, run `yarn changeset add` from your local terminal to generate a changeset. Commit the file that is generated, and when the PR merges, there will be another PR that is automatically created to create the release.

There is a quirk with the PR that is automatically generated at the moment where it cannot trigger the CI tasks to run. In order to run these, push an empty commit to the PR:

```bash
git checkout changeset-release/main
git commit -m "Empty commit to trigger CI tasks" --allow-empty
git push origin
```

You can then approve and merge the PR.
