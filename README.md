> [!NOTE]
> This is an in-progress, ground-up rebuild of the [previous MPS CD site](https://github.com/parsons/mpscd.parsons.edu), for reasons of simplicity, flexibility, and longevity. More to come!

<br>

# MPS CD

This is the program site for [Parsons’ Master of Professional Studies in Communication Design (MPS CD)](https://www.newschool.edu/parsons/mps-communication-design/).

<br>

## The Setup

The site is made with [Build Awesome](https://www.11ty.dev) (née Eleventy).

Our content is fully abstracted and separated into the [`data` folder](data/), organized in [YAML files](https://www.11ty.dev/docs/data-custom/#yaml) (over JSON) for commenting and syntax forgiveness. Original/high-res project images are included here too, for simplicity—they are then resized, as needed, on build.

Pulling from this, our [pages](pages/) are strung together with some [components](templates/components/) using 11ty’s default `.liquid` [template engine](https://www.11ty.dev/docs/languages/liquid/) to generate good, old-fashioned HTML.

Our CSS is all native, too! We pull in a [reset](assets/reset.css), [bundling](https://www.11ty.dev/docs/plugins/bundle/) the [base styles](assets/styles/) listed in [`styles.liquid`](templates/components/styles.liquid), along with styles in the [components](templates/components/) themselves. These are imported into [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), with newly-hashed filenames each build. (More to come, here!)

You will need `pnpm` [on your machine](https://pnpm.io/installation). Then run `pnpm install` once to grab our handful of [build dependencies](package.json).

<br>

## Development and Deployment

For local development, `pnpm serve` will build/serve the `_site` output right at `http://localhost/`.

For “production” deployment, the site is automatically [built/served on GitHub Pages](https://parsons.github.io/mps-cd/), via [an action/workflow](.github/workflows/build-deploy.yaml) when there are changes pushed to `main`.

<br>

## Use and Re-use

This repo is made <kbd>Public</kbd> (&thinsp;[*“source available”*](https://en.wikipedia.org/wiki/Source-available_software)&thinsp;) for personal and educational, non-commercial use, under the [CC BY-NC-SA 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/). Such as one might consider this “software,” it’s provided as-is and without any warranty. You’ve got this!

The [student work](data/students/) is shown under the [CC BY-NC-ND 4.0 license](http://creativecommons.org/licenses/by-nc-nd/4.0/), and all their respective rights are reserved.

<br>

## Questions

This iteration was put together by [@mfehrenbach](https://github.com/mfehrenbach), if anything else comes up!

✊
