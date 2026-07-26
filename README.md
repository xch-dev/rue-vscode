# Rue Language

This extension adds support for the [Rue](https://rue-lang.com) programming language for [Chia](https://chia.net).

## Formatting

The Rue language server provides whole-document formatting through VS Code's
**Format Document** command. To format whenever a Rue file is saved, enable:

```json
"[rue]": {
  "editor.formatOnSave": true
}
```

Formatting uses the nearest project's `Rue.toml` settings:

```toml
[formatter]
max_width = 100
indent_width = 4
```

Projects without a `[formatter]` section use these defaults. The extension
requires a version of `rue-lsp` with formatting support on your `PATH`, or in
the path specified by `SERVER_PATH`.
