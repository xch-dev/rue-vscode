import { workspace, ExtensionContext, commands } from "vscode";

import {
  Executable,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const run: Executable = {
    command: process.env.SERVER_PATH || "rue-lsp",
    options: {
      env: {
        ...process.env,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        RUST_LOG: "debug",
      },
    },
  };

  const serverOptions: ServerOptions = {
    run,
    debug: run,
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ scheme: "file", language: "rue" }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher("**/.clientrc"),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "rue-language",
    "Rue Language Server",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();

  context.subscriptions.push(
    commands.registerCommand("rue-language.startServer", async () => {
      await client.start();
    })
  );

  context.subscriptions.push(
    commands.registerCommand("rue-language.stopServer", async () => {
      await client.stop();
    })
  );

  context.subscriptions.push(
    commands.registerCommand("rue-language.restartServer", async () => {
      await client.restart();
    })
  );
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
