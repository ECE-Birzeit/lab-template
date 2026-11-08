---
# Experiment pages are named expN-short-name.md: N orders them in the sidebar and the navigator,
# and the short name becomes the address (/experiments/exp1-example). Keep both once published:
# students bookmark and share these links.
title: An Example Experiment
# Optional: a shorter name for the sidebar
short: Example Experiment
# Shown in the Experiment Navigator and in link previews
description: What a finished experiment page looks like. Copy exp2-blank.md to start a new one.
# Optional: group experiments under a heading in the sidebar, e.g. "Part 1: Assembly"
# part: "Part 1: Getting started"
# Optional: open this experiment's chapter of the manual from the "Lab manual (PDF)" button.
# Without it the button opens the whole manual set in lab.config.mts (#page=N jumps to a page).
# manual: "/ENCS0000-Manual.pdf#page=5"
outline: deep
---

# An Example Experiment

One short paragraph: what students will build today and why it matters. Link back to an earlier
experiment when this one builds on it.

## Objectives

- Three to five things students can do by the end, each starting with a verb.
- Build and run a first program.
- Read a value from the board and print it.

## Background

Only what students need for today's examples and lab work. Use headings for each idea so the
outline on the right becomes a map of the lab.

### A key idea

Explain it in plain words, then show it. Tables work well for registers, pins and commands:

| Pin | Role | Notes |
| --- | --- | --- |
| PA5 | LED | Active high |
| PC13 | Button | Pulled up, reads 0 when pressed |

::: tip
Tips, warnings (`::: warning`) and details blocks (`::: details`) are VitePress containers.
:::

## Examples

### Example 1: blink an LED

Keep code in `snippets/` and include it, so it's one file to fix and students can copy it whole:

<<< @/snippets/exp1/blink.c{c}

Then explain what the important lines do, in order.

## Lab work

### Lab work 1: change the blink rate

What students build and hand in, with a clear finish line ("the LED blinks twice a second").
This is the work the TA grades; don't include its solution.

## Common problems

| Symptom | Cause and fix |
| --- | --- |
| The board isn't found | Check the cable and the driver from the [Setup Guide](/setup/example-tool). |
