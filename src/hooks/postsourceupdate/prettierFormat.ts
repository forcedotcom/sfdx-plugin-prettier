import { Command, Hook } from "@oclif/config";
import * as fs from "fs";
import * as prettier from "prettier";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

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

            let source = await readFile(sourcePath, "utf-8");
            source = prettier.format(source, options);
            await writeFile(sourcePath, source, "utf-8");
          }
        }
      );
      await Promise.all(promises);
    }
  }
};

export default hook;
