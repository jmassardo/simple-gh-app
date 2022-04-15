/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
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

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
