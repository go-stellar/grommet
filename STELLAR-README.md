## Stellar's Grommet contribution process:
1. In Github, create a pull-request that copies files FROM grommet/grommet/master TO go-stellar/grommet/master. This ensures we have 
the most up-to-date stable version.
2. Clone go-stellar/grommet/master to your local system.
3. In Node.js, move to the new folder created in step 2.  Run npm install
4. Fix a bug and/or add a feature to Grommet.  You'll likely be working in the components folder.
5. Run gulp dist
6. To test your work, open an existing Grommet project's package.json.  Change the version version to point
to the dist folder that got generated in step 5.  For example, replace:

"grommet": "1.0.0"

with

"grommet": "c:/stellar/grommet/dist",

7. In the existing Grommet project, then node_modules then run npm_install.  You now have your project
running with your custom version of Grommet.
8. Use browserstack to verify your changes work across all browsers.
9. If everything looks good, then make a new branch to represents the changes you made.  For example, 
 go-stellar/grommet/tooltip-fix.  Push your Grommet changes to this branch.
10. Submit your work for review to the Grommet team: make a pull request that copies files FROM your new branch grommet/grommet/master
11. Wait for work to be approved by Grommet team.
12. In an existing Grommet project, changed package.json to use Grommet's stable branch: "grommet": "https://github.com/grommet/grommet/tarball/stable"
13. Delete node_modules
14. npm install
15. gulp dev

Your project is now running with Grommet's stable branch.  This branch includes your work.

## How to integrate commits from Grommet's master branch into Stellar's custom version of Grommet
1. Clone go-stellar/grommet
2. Switch to 1.0.1b branch
3. Make a new branch with a name that is representative of the commit that is desired from Grommet's stable branch.
4. Find the desired commit from this list: https://github.com/grommet/grommet/commits/master
5. Download the files that have been changed (use the "raw" button in github).
6. Copy those downloaded files to your new branch
7. Push those changes.  This will make the remote branch with your commit.
8. In Github, create a pull request that copies files FROM your new branch TO 1.0.1b

You now integrated a Grommet commit to Stellar's custom version of Grommet.  The 1.0.1b branch isn't directly usable; it must
be built.

## How to build and update Grommet's 1.0.1b and 1.0.1b-dist branches
1. Clone go-stellar/grommet
2. Switch to 1.0.1b branch
3. In node, run npm install
4. gulp dist.  You may see failed unit tests; this is fine because we're not interested in running test cases on Stellar's
Grommet.  We only run them on the official Grommet distribution.  Stellar's Grommet does not maintain/update the unit tests.
5. This process should always emit a dist folder with a compiled version of Grommet.  If not, then do NOT continue these steps.
6. Copy the newly created dist folder to your desktop.
7. Switch to 1.0.1b-dist branch.
8. Delete all files that DO NOT begin with a period
9. Copy the dist folder into the folder that contians your branch (you're replacing the deleted files)
10. Make a new branch.  Something such as grommet/tooltip-fix-compiled
11. Commit these changes.  Review the diff window to verify the changes you see there are expected.  The changes
should be minimal.
12. Make a pull request that copies files FROM your new branch to 1.0.1b-dist
13. Get the pull request approved.

Your have successfuly built Stellar's custom Grommet.  The 1.0.1b-dist is ready for distribution.

## How to use 1.0.1b-dist in a project
1. Make a new Grommet project or open an existing one.
2. In package.json, replace the Grommet line with:

"grommet": "https://github.com/go-stellar/grommet/tarball/release/1.0.1b-dist",

3. Delete node_modules if it exists
4. Run npm install
5. Run gulp dev.  Verify there are no errors.