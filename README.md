# MPS CD
This is a ground-up rebuild of the [previous](https://github.com/parsons/mpscd.parsons.edu) Parsons MPS CD program website, for reasons of simplicity, flexibility, and longevity.

<br>

## The Setup

This version is built in [Eleventy](https://www.11ty.dev).

Our content is fully abstracted and separated into the [`data` folder](data/), in [YAML files](https://www.11ty.dev/docs/data-custom/#yaml) (over JSON) for commenting and syntax forgiveness. Pulling from this, our [pages](pages/) are built with good, old-fashioned HTML strung together with 11ty’s default `.liquid` [template engine](https://www.11ty.dev/docs/languages/liquid/). There is only plain/native CSS and vanilla JavaScript on top of that—no Sass, no pipeline, no framework, no fuss.

You will need `pnpm` [on your machine](https://pnpm.io/installation). Then run `pnpm install` once to grab our handful of [build dependencies](package.json).

<br>

## Development and Deployment

For local development, `pnpm serve` will build/serve Eleventy’s `_site` output right at `http://localhost/`.

For “production” deployment, the site is automatically [built/served on GitHub Pages](https://parsons.github.io/mps-cd/), via [an action/workflow](.github/workflows/build-deploy.yml) when there are changes pushed to `main`.

<br>

## Questions

This iteration was put together by [@mfehrenbach](https://github.com/mfehrenbach), if anything else comes up!

✊
