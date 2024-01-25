const {
    readFile,
    writeFile,
    copyFile,
    mkdir,
    mkdtemp,
  } = require("fs/promises");
  const { existsSync } = require("fs");
  const core = require("@actions/core");
  const github = require("@actions/github");
  const { average } = require("./math");
  const { computeDiff } = require("./diff");
  const { addComment, deleteExistingComments } = require("./comment");
  
  const { context } = github;
  
  async function run(githubToken) {
    const baseSummaryFilename = '../report-main.json';
    const coverageFilename = '../coverage/coverage-summary.json';
  
    const octokit = github.getOctokit(githubToken);
  
    const head = JSON.parse(await readFile(coverageFilename, "utf8"));

      core.info("Running on pull request branch");
      if (!existsSync(baseSummaryFilename)) {
        core.info("No base json-summary found");
        return;
      }
  
      const issue_number = context?.payload?.pull_request?.number;
      core.info("will 1");
    //   const allowedToFail = core.getBooleanInput("allowed-to-fail");
      const base = JSON.parse(
        await readFile(baseSummaryFilename, "utf8")
      );
    core.info("will 2");
      const diff = computeDiff(base, head, { allowedToFail: true });
        core.info("will 3");
      if (issue_number) {
        await deleteExistingComments(octokit, context.repo, issue_number);
  
        core.info("Add a comment with the diff coverage report");
        await addComment(octokit, context.repo, issue_number, diff.markdown);
      } else {
        core.info(diff.results);
      }
  }
  
  try {
    run(process.argv[2]);
  } catch (error) {
    core.setFailed(error.message);
  }
  