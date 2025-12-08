# EmailJS Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Sign Up for EmailJS
1. Go to: [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Use email: `dassuchit18@gmail.com`
4. Verify your email

### Step 2: Get Your Public Key
1. After logging in, go to: **Account** → **General**
2. Copy your **Public Key** (looks like: `abc123xyz`)

### Step 3: Create Email Service
1. Go to: **Email Services**
2. Click **"Add New Service"**
3. Choose **Gmail**
4. Connect your Gmail: `dassuchit18@gmail.com`
5. Copy the **Service ID** (looks like: `service_abc123`)

### Step 4: Create Email Template
1. Go to: **Email Templates**
2. Click **"Create New Template"**
3. Use this template:

```
Subject: New Contact from Portfolio - {{subject}}

From: {{name}}
Email: {{email}}

Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Save and copy the **Template ID** (looks like: `template_abc123`)

### Step 5: Update Your Portfolio Code

Open `script.js` and replace these lines:

```javascript
// Line ~203
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

// Line ~218
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
// Replace with your actual Service ID and Template ID
```

### Example:
```javascript
emailjs.init("abc123xyz");
emailjs.sendForm('service_abc123', 'template_xyz789', contactForm)
```

### Step 6: Push to GitHub
```bash
git add .
git commit -m "Add EmailJS credentials"
git push origin main
```

### That's it! 🎉

Now when someone fills your contact form:
1. Form submits
2. EmailJS sends email to: `dassuchit18@gmail.com`
3. You can reply directly!

## Free Plan Limits
- ✅ 200 emails/month
- ✅ No credit card needed
- ✅ Works forever

## Need Help?
Email me at: suchitdas@example.com
