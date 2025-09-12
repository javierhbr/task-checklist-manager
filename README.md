<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Noa9Ha1VNqSGdSU8Y49e3lFuX4pZjFZz

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

To deploy the single-bundle version to GitHub Pages:

1. Make sure your repository is connected to GitHub
2. Run the deployment command:
   `npm run deploy:page`

This will:
- Build the project into a single HTML file with all assets inlined
- Deploy the `dist` folder to the `gh-pages` branch
- Make your app available at: https://javierbenavides.github.io/task-checklist-manager
