const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Set the repository path to your working clone
const repoPath = '/root/Dress-Me-Up';

app.post('/git-webhook', (req, res) => {
  console.log('Webhook received:', req.body);

  // Verify that this is a push event (GitHub sends X-GitHub-Event header)
  if (req.headers['x-github-event'] === 'push') {
    // Execute the git pull command inside the repo directory
    exec('git pull origin main', { cwd: repoPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during git pull: ${error}`);
        res.status(500).send(`Error: ${error}`);
        return;
      }
      console.log(`git pull output: ${stdout}`);
      res.status(200).send('Repository updated successfully.');
    });
  } else {
    res.status(200).send('Event ignored (not a push event).');
  }
});

const port = 5002;
app.listen(port, () => {
  console.log(`Webhook server listening on port ${port}`);
});
