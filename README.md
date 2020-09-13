## Configuration
```json
{
  "baseDirectory": ".", //optional default
  "git": {
    "mode": "create-branch", // optional default
    "mainBranch": "master", //optional default
    "remote": "origin", //optional default
    "destinationBranch": "technical/update-deps",
    "commitMessage": "adding dependencies for TIKT-405"
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
