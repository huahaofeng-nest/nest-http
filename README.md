# ts-package-template

## Workflow

### Use this template
Click "Use this template" to create your own repository based on this template. Or see [creating-a-repository-from-a-template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) for more information.
![](https://docs.github.com/assets/images/help/repository/use-this-template-button.png)

### Edit package.json
Modify `name`, `version`, `description`, `repository` fields as your own.

### Develop
Develop your npm package as you need based on this template.

### Run test cases
Add Test cases for your package as /test/\*.e2e-spec.ts or /src/lib/\*.spec.ts.
Run test scripts from package.json as you need.
```bash
npm run test
npm run test:e2e
```

### Generate new version 
Generate a new version for your package automatically, actually it will do all tasks in order as follows:
* lint your code
* run test cases
* generate a new version in package.json
* format your code
* give a new tag for your repo and push to remote

See `preversion`, `version`, `postversion` scripts in package.json.
See https://docs.npmjs.com/misc/scripts for more information about npm script hooks.

```bash
npm version patch # one of patch, minor, major, prepatch, preminor, premajor, prerelease, see https://docs.npmjs.com/cli/version
```

### Publish to NPM registry
Compile and publish package to npm registry, actually it will do all tasks in order as follows:
* build package
* lint your code
* run test cases
* run npm publish

See `prepare`, `prepublishOnly`, `publish:npm` scripts in package.json.
See https://docs.npmjs.com/misc/scripts for more information about npm script hooks.

```bash
npm run publish:npm
```

### Install
After package is published to npm registry or pushed to github, you can install this package either     
**from npm registry** (replace `[ts-package-template]` with your package name):
```bash
npm install [ts-package-template]
# or 
yarn add [ts-package-template]
``` 
or  
**from github registry** (replace `[https://github.com/xxx/ts-package-template.git]` with your repo url):
```bash
npm install [https://github.com/xxx/ts-package-template.git]
# or 
yarn add [https://github.com/xxx/ts-package-template.git]
```


## References
* https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c
* https://github.com/caki0915/my-awesome-greeter
* https://stackoverflow.com/questions/51078974/how-to-have-npm-install-a-typescript-dependency-from-a-github-url
* https://github.com/Quantum-Game/quantum-tensors
* https://www.jianshu.com/p/ac5b5f65320b
* https://juejin.im/post/6844903769365282829
* https://github.com/nestjs/jwt/blob/master/package.json
