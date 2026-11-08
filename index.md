---
# The home page. $code, $name, $platform and $manual are filled in from lab.config.mts,
# so this file rarely needs editing. The feature cards come from lab.config.mts too.
layout: home

hero:
  name: $code
  text: $name
  tagline: Department of Electrical & Computer Engineering · Birzeit University
  image:
    src: /favicon.svg
    alt: $code
  actions:
    - theme: brand
      text: Explore Experiments
      link: /experiments/
    - theme: alt
      text: Setup Guide
      link: /setup/
    - theme: alt
      text: Download Full Manual
      link: $manual
      target: _blank
---
