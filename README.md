## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Set up personal access token](#set-up-personal-access-token)
- [Versioning and Releases](#versioning-and-releases)
	- [Types of Changes](#types-of-changes)
- [Publishing a Patch Version](#publishing-a-patch-version)
- [Publishing a Minor Version](#publishing-a-minor-version)
- [Publishing a Major Version](#publishing-a-major-version)
- [Skip publishing version](#skip-publishing-version)

## Installation

Install the package using npm:

```sh
npm install @house-id/rrule-helper
```

## Set up personal access token
1. To setup personal accesss token please use the [guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)
2. Add a file .npmrc to the root of a repo (or configure for your user by adding to: `~/.npmrc`) with content: 
	```
	@house-id:registry="https://npm.pkg.github.com"
	//npm.pkg.github.com/:_authToken=your_generated_token
 	```

## Versioning and Releases 
We use `semantic-release` to automate version management and package publishing. Commits to the `main` branch trigger the release process based on Conventional Commits. ## Conventional Commits To determine the type of version bump needed (patch, minor, or major), `semantic-release` uses commit messages that adhere to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. 


### Types of Changes

- **Patch Version (0.0.x):**
  - `fix`: A bug fix
- **Minor Version (0.x.0):**
  - `feat`: A new feature
- **Major Version (x.0.0):**
  - `BREAKING CHANGE`: A change that breaks backward compatibility

## Publishing a Patch Version
To publish a patch version, make sure your commit message starts with `fix`:
```sh
git commit -m "fix: correct minor typo in documentation"
git push origin main
```
## Publishing a Minor Version
To publish a minor version, make sure your commit message starts with `feat`:
```
git commit -m "feat: add new user authentication module"
git push origin main
```

## Publishing a Major Version

To publish a major version, include a `BREAKING CHANGE` in the footer of your commit message:
```
git commit -m "feat: refactor API endpoint structure

BREAKING CHANGE: The old API endpoints have been removed and replaced with new ones."
git push origin main
```
## Skip publishing version

To skip publising a version, include a `--no-verify` in the commit as param:
```
git commit -m "refactor API endpoint structure" --no-verify
```
