# Snippet Generator

Snippet Generator enables you to quickly generate a formatted HTML file from code without messing with markdown or HTML. It uses [highlight.js](https://github.com/highlightjs/highlight.js) so it supports pretty much any language and any style.

It is also a scape goat that I used while learning how to make VS Code extensions, so there might be things that I've missed. It was _heavily inspired_ by the excellent [Markdown PDF](https://github.com/yzane/vscode-markdown-pdf) extension. Markdown PDF was basically used as a template while building Snippet Generator.

## Features

A single command: `> Generate HTML Snippet`

The command will generate a HTML file with the same name as source file in the same directory.

## Extension Settings

`snippet-generator.style`: Allows you to change the exported HTML's style by specifying a style from the highlight.js repo. An up-to date list of all these themes can be found [here](https://github.com/highlightjs/highlight.js/tree/master/src/styles). **Note:** This extension might not always be up-to-date with all new highlight.js themes.

## Known Issues

There is currently no error checking (or error reporting) other than some basic file system checks to avoid nuking files. If you encounter any errors please open an issue.

## Release Notes

Please see [the changelog](changelog).
