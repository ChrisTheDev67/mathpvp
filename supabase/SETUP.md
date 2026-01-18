# Setup Guide: Daily Winner Email Notification

## Step 1: Get a Resend API Key (Free)

1. Go to [resend.com](https://resend.com) and sign up
2. In the dashboard, go to **API Keys**
3. Click **Create API Key**, name it "Battle Royale", and copy the key

---

## Step 2: Add the Secret to Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Edge Functions** → **Secrets**
4. Add a new secret:
   - Name: `RESEND_API_KEY`
   - Value: (paste your Resend API key)

---

## Step 3: Deploy the Edge Function

Run these commands in your terminal:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (get project ref from dashboard URL)
supabase link --project-ref YOUR_PROJECT_REF

# Deploy the function
supabase functions deploy daily-winner-email
```

---

## Step 4: Set Up Daily Cron Schedule

1. In Supabase Dashboard, go to **Database** → **Extensions**
2. Enable the `pg_cron` extension if not already enabled
3. Go to **SQL Editor** and run:

```sql
-- Schedule daily winner email at midnight Pacific Time (8 AM UTC)
SELECT cron.schedule(
  'daily-winner-email',
  '0 8 * * *',  -- 8 AM UTC = 12 AM Pacific
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/daily-winner-email',
    headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
  );
  $$
);
```

Replace:
- `YOUR_PROJECT_REF` with your Supabase project reference
- `YOUR_ANON_KEY` with your Supabase anon key

---

## Step 5: Test It

Run this in terminal to test manually:

```bash
supabase functions invoke daily-winner-email
```

Or trigger via curl:
```bash
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/daily-winner-email \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## Email Preview

The daily email will look like this:
- **Subject**: 🏆 Battle Royale Winner - [Date]
- **Content**: Winner's nickname, score, and grade level
