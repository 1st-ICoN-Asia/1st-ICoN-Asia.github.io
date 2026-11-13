1st ICoN-Asia Forum — GitHub Pages website

QUICK START (no build or paid hosting required)
1. Sign in to GitHub and create a PUBLIC repository named 1st-ICoN-Asia.
2. Extract 1st-ICoN-Asia-GitHub-Pages.zip on your computer.
3. In the repository, choose Add file > Upload files. Upload the CONTENTS
   of the extracted folder, including css, js, img and downloads.
   index.html must be at the repository root, not inside another folder.
   Upload extracted files, not the ZIP itself. Commit to the main branch.
4. Open Settings > Pages. Under Build and deployment, select
   Deploy from a branch, then main and / (root). Click Save.
5. When deployment finishes, open the URL shown by GitHub Pages:
   https://YOUR-USERNAME.github.io/1st-ICoN-Asia/
   Replace YOUR-USERNAME with your GitHub username. This is a URL pattern,
   not an already published website.

The .nojekyll file is included for static hosting. macOS Finder may hide it;
Command+Shift+. reveals hidden files. The ordinary HTML files also work with
GitHub's default Pages processing.

WHAT CHANGED
The footer's small raster Chinese caption was replaced with browser-rendered
Traditional Chinese text: 海洋環境健康全國重點實驗室.
The original blue/yellow symbol and SKLMEH lettering are retained.
The shared footer correction appears on all six pages.
The forum title remains 1st ICoN-Asia Forum (Asia spelling).

EDITING
The upload package contains complete HTML pages; no server-side includes or
build commands are required. Keep both index.html and index.htm synchronized
if editing the home page directly. Internal links use relative paths, so the
site works under the repository's /1st-ICoN-Asia/ path.
The separate Editable-Source ZIP contains reusable source fragments and a
Python build script. Run python3 scripts/build.py and upload dist/ contents.

EXISTING EXTERNAL DEPENDENCIES
The original website loads CityU template CSS, JavaScript and university logos
from template.cityu.edu.hk, and Montserrat from Google Fonts. These external
services still need to be reachable. The poster, photos and QR image are local.
The downloadable poster itself is unchanged; this fix is to the website footer.

REFERENCE
GitHub Pages is available free for public repositories:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
