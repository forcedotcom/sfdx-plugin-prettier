import { Command, Hook } from "@oclif/config";
import { promises as fs } from "fs";
import * as prettier from "prettier";

type HookFunction = (this: Hook.Context, options: HookOptions) => void;

type HookOptions = {
  Command: Command.Class;
  argv: string[];
  commandId: string;
  result?: PostSourceUpdateResult;
};

type PostSourceUpdateResult = {
  [aggregateName: string]: {
    workspaceElements: {
      fullName: string;
      metadataName: string;
      sourcePath: string;
      state: string;
      deleteSupported: boolean;
    }[];
  };
};

export const hook: HookFunction = async function (options) {
  if (options.result) {
    for (const mdapiElementName of Object.keys(options.result)) {
      const mdapiElement = options.result![mdapiElementName]!;
      const promises = mdapiElement.workspaceElements.map(
        async ({ sourcePath }) => {
          const fileInfo = await prettier.getFileInfo(sourcePath);

          if (!fileInfo.ignored && fileInfo.inferredParser !== null) {
            const options = (await prettier.resolveConfig(sourcePath)) ?? {};
            options.filepath = sourcePath;

            let source = await fs.readFile(sourcePath, {
              encoding: "utf-8",
            });
            source = prettier.format(source, options);
            await fs.writeFile(sourcePath, source, "utf-8");
          }
        }
      );
      await Promise.all(promises);
    }
  }
};

export default hook;
