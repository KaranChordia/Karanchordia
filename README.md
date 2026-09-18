# karanchordia.com

The personal website for Karan Chordia—an evolving field journal of selected work, insights, and the practice behind both.

This is a dependency-free static site. Vercel can deploy it directly with framework preset **Other** and no build command.

## Local preview

```bash
python3 -m http.server 8000
```

## Publish with Vercel and Cloudflare

1. Import `KaranChordia/Karanchordia` into Vercel.
2. Keep the framework preset as **Other**; do not set a build command or output directory.
3. Add `karanchordia.com` and `www.karanchordia.com` in Vercel’s Domains settings.
4. Add the precise DNS records Vercel gives you in Cloudflare. Start with Cloudflare proxying disabled until the verification completes.
5. Make `karanchordia.com` the primary domain and redirect `www` to it.

## Before launch

- Add the public contact channel on `contact.html`.
- Replace or expand the intentionally editorial work archive with approved named case studies and links.
- Set the GitHub repository visibility deliberately. Vercel works with private repositories.
