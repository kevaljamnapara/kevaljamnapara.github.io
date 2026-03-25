# Deployment Guide

This portfolio is a static website and can be deployed on GitHub Pages or Netlify with zero configuration needed.

## Option 1: GitHub Pages (Recommended for GitHub-hosted portfolios)

### Step 1: Push to GitHub
```bash
cd /Users/keval/Documents/Coding/Portfolio
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/Keval1306/Portfolio`
2. Click on **Settings** → **Pages**
3. Under "Source", select `main` branch and `/root` folder
4. Click **Save**
5. GitHub will build and deploy your site (takes ~1 minute)

### Step 3: Access Your Site
Your portfolio will be live at: `https://keval1306.github.io/`

### Optional: Custom Domain
If you have a custom domain:
1. Go to Settings → Pages
2. Under "Custom domain", enter your domain name
3. Update your domain's DNS records to point to GitHub Pages
4. GitHub will provide specific DNS instructions

---

## Option 2: Netlify (Better performance & features)

### Step 1: Connect Your Repository
1. Go to [netlify.com](https://netlify.com)
2. Click **Sign up** and use your GitHub account
3. Click **New site from Git**
4. Select your GitHub account and repository
5. Choose branch: `main`

### Step 2: Configure Build Settings
- **Build command**: Leave blank (or use: `echo 'No build needed'`)
- **Publish directory**: `.` (the root folder)

### Step 3: Deploy
1. Click **Deploy site**
2. Netlify will automatically deploy and provide you a unique URL
3. Your site will be live in ~30 seconds

### Step 4: Custom Domain (Optional)
1. After deployment, go to **Domain settings**
2. Click **Add custom domain**
3. Enter your domain and follow DNS instructions

### Step 5: Enable Automatic Deployments
Netlify automatically deploys whenever you push to your GitHub repository. No additional steps needed!

---

## How to Update Your Portfolio

### Adding New Projects
1. Open `scripts/data.js`
2. Add a new project object to the `projects` array:
```javascript
{
    id: 6,
    name: "Project Name",
    description: "Description of your project",
    technologies: ["Tech1", "Tech2"],
    githubUrl: "https://github.com/Keval1306/repo-name",
    liveUrl: "https://demo-link.com" or null,
    image: "emoji"
}
```
3. Commit and push to GitHub
4. Your site will update automatically!

### Updating Other Content
- **About section**: Edit HTML in `index.html#about`
- **Skills**: Edit `index.html#skills` section
- **Contact info**: Edit `index.html#contact` section
- **Styling**: Modify `styles/main.css`
- **Functionality**: Update `scripts/main.js`

After any changes, commit and push:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

---

## Troubleshooting

### Site not updating after push
- Wait 1-2 minutes for deployment to complete
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check GitHub Pages/Netlify dashboard for deployment status

### Styling looks wrong
- Make sure you're accessing the HTTPS version (not HTTP)
- Clear browser cache and hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Links not working
- Ensure all GitHub URLs are correct and repositories are public
- Test live demo links in a new incognito window

---

## Performance Tips

- Both GitHub Pages and Netlify provide free HTTPS/SSL
- Site loads in < 1 second (no build step needed)
- Mobile-responsive design works on all devices
- Dark mode preference saved locally (localStorage)

Enjoy your new portfolio! 🚀
