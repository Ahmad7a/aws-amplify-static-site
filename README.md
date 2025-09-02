# Ahmad Al Arfaj — Portfolio (Static Site)

Static HTML/CSS/JS portfolio for a Cybersecurity Analyst. Ready to deploy on AWS Amplify via GitHub. No build tools required.

## Project Structure

```
aws-amplify-static-site
├── index.html          # Portfolio content + contact form
├── 404.html            # Not found page
├── assets
│   ├── css
│   │   └── styles.css  # Theme styles
│   └── js
│       └── main.js     # Contact form handling, small UX touches
├── amplify.yml         # Amplify deploy config (no build)
└── README.md           # This file
```

## Configure the contact form

In `index.html`, locate the `<form id="contact-form">` element and set:

- `data-to` to your email (for mailto fallback)
- Optionally `data-endpoint` to a backend URL that accepts JSON POST `{ name, email, subject, message }` and returns 2xx

If `data-endpoint` is set, the form POSTs to that endpoint. Otherwise, it opens your email client using `mailto:`.

## Deploy to AWS Amplify (GitHub)

1. Push this folder to a new GitHub repo.
2. In AWS Amplify Console: New app → Host web app → Connect GitHub repo/branch.
3. Amplify will read `amplify.yml` and deploy directly (no build step).
4. On changes pushed to the same branch, Amplify auto-redeploys.

## Notes

- For a real backend for the form, consider: AWS Lambda + API Gateway, AWS SES, or a serverless form service.
- Customize colors and content in `assets/css/styles.css` and `index.html`.