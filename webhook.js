const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/git-webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    
    // Run the post-receive script
    exec('/root/Dress-Me-Up.git/hooks/post-receive', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Webhook execution failed');
        }
        console.log(`STDOUT: ${stdout}`);
        console.error(`STDERR: ${stderr}`);
        res.status(200).send('Webhook executed successfully');
    });
});

app.listen(3000, () => console.log('Webhook listener running on port 3000'));
