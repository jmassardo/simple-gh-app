/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  // ---------- ISSUE EVENTS ----------
  app.on("issues.opened", async (context) => {
    // only reply to issues from actual users and not the bot.
    if (!context.payload.comment.user.login.includes("simple-gh-app")) {
      const issueComment = context.issue({
        body: "Thanks for opening this issue!",
      });
      return context.octokit.issues.createComment(issueComment);
    }
  });

  app.on("issue_comment.created", async (context) => {
    // only reply to comments from actual users and not the bot.
    if (!context.payload.comment.user.login.includes("simple-gh-app")) {
      const issueComment = context.issue({
        body: "Thank you for the comment!",
      });
      return context.octokit.issues.createComment(issueComment);
    }
  });

  app.on("issue_comment.deleted", async (context) => {
    const issueComment = context.issue({
      body: "y u no like us?!?",
    });
    return context.octokit.issues.createComment(issueComment);
  });
  // ---------- END ISSUE EVENTS ----------

  // ---------- REPO EVENTS ----------
  app.on("repository.created", async (context) => {
    const repo = context.payload.repository;
    console.log(repo.description);
    if (repo.description == null) {
      const newIssue = context.issue({
        repo: repo.name,
        owner: repo.owner.login,
        title: "Warning: Repo missing description",
        body: "Company policy requires that all repos have a description."
      });
      return context.octokit.issues.create(newIssue)
    };
  });
  // ---------- END REPO EVENTS ----------
};
