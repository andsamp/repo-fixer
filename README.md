## Configuration
```json
{
  "baseDirectory": ".", //optional
  "git": {
    "mainBranch": "master", //optional
    "remote": "origin", //optional
    "newBranch": "technical/update-deps",
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
  "testCommand": "npm test" //optional
}
```
