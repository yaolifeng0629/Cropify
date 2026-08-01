# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who need to crop, resize, and export one or many images without sending them to a third-party service. The main workflow is importing images, adjusting crop and output options, processing a batch, and downloading the results.

## Product Purpose

Cropify is a browser-based batch image-cropping tool. It makes routine image preparation fast and private by keeping image processing on the user's device.

## Positioning

Cropify combines batch import, crop controls, format and quality settings, and batch or ZIP export in one local-first web workflow. Uploaded images are handled in browser memory rather than being transferred to an application server.

## Operating Context

Users work with image files from a desktop or mobile browser. They may drag files into the workspace, choose files with the system picker, or paste from the clipboard. The editor presents an image list, preview, crop controls, output settings, processing state, and download actions.

## Capabilities and Constraints

- Supports JPEG, PNG, WebP, BMP, TIFF, and GIF input according to the project documentation.
- Supports local batch processing, crop presets, transform controls, quality settings, single-file downloads, batch downloads, and ZIP export.
- Existing React and Next.js implementation, routes, and client-side processing behavior must be preserved during design work.
- Product facts and legal claims are inferred from the existing implementation and documentation for this autonomous pass; no new claims are introduced.

## Brand Commitments

Cropify is presented as a clear, practical, privacy-first image tool. The existing public copy is Chinese and describes the product as professional, secure, and efficient.

## Evidence on Hand

- Application source: `src/components/` and `src/hooks/`
- Product documentation: `README.md`
- Existing application icon: `public/icon.svg` and `public/icon.png`
- No customer testimonials, pricing, third-party certifications, or performance benchmarks are available in the repository and must not be fabricated.

## Product Principles

- Keep image work local and explain that clearly at the moment it matters.
- Make the primary workflow understandable before users import a file.
- Preserve precise controls without making routine actions feel technical or crowded.
- Make processing and export status visible and recoverable.
- Keep desktop productivity and mobile access equally usable.
