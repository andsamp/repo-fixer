## Configuration
```json
{
  "baseDirectory": ".", //optional default
  "git": {
    "mode": "create-branch", // optional default
    "mainBranch": "master", //optional default
    "remote": "origin", //optional default
    "destinationBranch": "technical/update-deps",
    "commitMessage": "[TIKT-145] updating dependencies for that reason",
    "commitFlags": [], //optional default
    "pushFlags": [] //optional default
  },
  "projects": [
    "project-1",
    "project-two",
    "third-project"
  ],
  "commands": [
    "npm i @that/dep@1.0.1",
    "npm i that-other-dep@4.7.1"
  ],
  "testCommand": "npm test" //optional default to skip
}
```
### Git Configuration

#### mode
* `create-branch` - will create a new branch and push it to the specified remote
* `update-branch` - will checkout an existing remote branch and commit/push changes to it
* `skip` - does not run any git commands before or after the specified `commands`
