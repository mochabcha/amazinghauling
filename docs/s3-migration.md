# S3 Migration Notes

## What changed in this repo

- Payload media storage is now prepared to use `@payloadcms/storage-s3`.
- Future media uploads and seed operations flow through Payload instead of uploading directly to Cloudinary.
- The frontend still reads the generic `media.url` field, so templates and organisms stay storage-provider agnostic.
- A dedicated migration endpoint now exists at `/api/migrate-media` to move legacy media docs onto S3 through Payload.

## Cheapest sane bucket strategy

For most of your sites, **one shared bucket with per-site prefixes** is the cheapest and cleanest default.

Use a shared bucket when:

- the sites live in the same AWS account
- they can share the same region
- they can share the same retention/lifecycle rules
- they are all public marketing/media assets

Use separate buckets only when you need:

- strict client or legal isolation
- separate AWS accounts or billing boundaries
- different regions
- meaningfully different security policies
- different lifecycle/backup rules

Bucket count itself is not the main cost driver. The real costs are:

- stored GB
- requests
- egress / transfer
- any CDN in front of S3

Recommended default layout:

- bucket: `shared-site-media-prod`
- prefixes:
- `production/amazing-hauling`
- `production/errbody`
- `production/steepl`

## Lowest-cost rollout path

If you want the simplest low-cost move off Cloudinary:

1. Use S3 for storage.
2. Use one shared bucket and isolate each site with prefixes.
3. Serve media through the website's Payload media route.
4. Add CloudFront later only if traffic or caching economics justify it.

That avoids Cloudinary transformation/storage charges, keeps the bucket private-compatible, and keeps ops simple.

## AWS details I need from you

Provide these values for this project:

- `S3_BUCKET`
- `S3_REGION`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_PREFIX`

Optional later:

- `S3_PUBLIC_BASE_URL`

Only use `S3_PUBLIC_BASE_URL` if you later put CloudFront or a custom media domain in front of the bucket and intentionally switch delivery away from the site media route.

## IAM shape to create

Create a dedicated IAM user or role for media uploads. Scope it to this bucket only.

Minimum actions:

- `s3:PutObject`
- `s3:GetObject`
- `s3:DeleteObject`
- `s3:ListBucket`

Suggested resource scope:

- bucket resource: `arn:aws:s3:::YOUR_BUCKET`
- object resource: `arn:aws:s3:::YOUR_BUCKET/production/amazing-hauling/*`

Example IAM policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucketForSitePrefix",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::YOUR_BUCKET",
      "Condition": {
        "StringLike": {
          "s3:prefix": ["production/amazing-hauling/*"]
        }
      }
    },
    {
      "Sid": "ManageSiteObjects",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::YOUR_BUCKET/production/amazing-hauling/*"
    }
  ]
}
```

## Access model

This repo currently serves media through Payload URLs such as:

- `/api/media/file/example-image.jpg`

That means:

- S3 stores the files
- the website serves the media URLs
- direct public bucket access is not required for normal site rendering
- S3 Block Public Access can stay enabled

If you later want direct CDN/object URLs, that is a separate delivery change.

## Cutover sequence

1. Create or choose the shared S3 bucket.
2. Create the IAM credentials scoped to this site's prefix.
3. Put the S3 env vars into `.env`.
4. Restart the app.
5. Re-run the seed so local seed assets are re-uploaded through Payload to S3.
6. Run `POST /api/migrate-media` to move any remaining legacy media docs onto S3.
7. Verify media documents now point to S3 URLs.
