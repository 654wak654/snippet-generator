const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const hljs = require("highlight.js");
const mustache = require("mustache");
const md = require("markdown-it")({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            str = hljs.highlight(lang, str, true).value;
        } else {
            str = md.utils.escapeHtml(str);
        }
        return "<pre class='hljs'><code><div>" + str + "</div></code></pre>";
    }
});

function readFile(fileName) {
    if (fileName.length === 0) {
        return "";
    }

    if (fileName.indexOf("file://") === 0) {
        if (process.platform === "win32") {
            fileName = fileName.replace(/^file:\/\/\//, "").replace(/^file:\/\//, "");
        } else {
            fileName = fileName.replace(/^file:\/\//, "");
        }
    }

    try {
        fs.accessSync(fileName);
        return fs.readFileSync(fileName, "utf-8");
    } catch (error) {
        console.warn(error.message);
        return "";
    }
}

function makeCss(fileName) {
    let css = readFile(fileName);
    if (css) {
        return "\n<style>\n" + css + "\n</style>\n";
    } else {
        return "";
    }
}

function generateSnippet() {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    let document = editor.document;
    let uri = document.uri;

    let userStyle = vscode.workspace.getConfiguration("snippet-generator").style || "atom-one-light";
    let style = makeCss(path.join(__dirname, "markdown.css"));
    style += makeCss(path.join(__dirname, "node_modules", "highlight.js", "styles", userStyle + ".css"));
 
    // TODO: Push to git instead of generating a file on disk
    fs.writeFile(
        uri.fsPath.replace(path.extname(uri.fsPath), ".html"),
        mustache.render(readFile(path.join(__dirname, "template.html")), {
            title: path.basename(uri.fsPath),
            style: style,
            content: md.render("```" + document.languageId + "\n" + document.getText() + "```")
        }),
        "utf-8"
    );

    vscode.window.showInformationMessage("Done!");
}

function activate(context) {
    let generateSnippetCommand = vscode.commands.registerCommand("extension.generateSnippet", generateSnippet);
    context.subscriptions.push(generateSnippetCommand);
}

exports.activate = activate;
