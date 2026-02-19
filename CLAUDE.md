
## Stack
 - Next.js
 - Typescript
 - Static Content rendering

## Markdown
content is managed in markdown files, these can be found in '/content/*'
any resources referenced will be placed in '/public' 
always make sure that references to resources in the public folder are updated during build so their paths are still valid on the final web page

## Static rendering
when changing the solution, take into account that this website will be compiled to a static website, for hosting on github pages, no server-side logic can be used.
if dynamic content is needed this should be generated on-build

## SEO
Any changes made to the site should always take SEO optimalization into account.
Wherever possible we should make the website optimized by default without additional human action required

## Validate
all changes need to be validated before completion
```
 npm run build && npm run lint
 ```
