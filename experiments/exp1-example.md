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
- Read a value from the board and watch it change.

## Background

Only what students need for today's Activity and Task. Use headings for each idea so the
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

## Activity

One Activity per experiment: students build a working program step by step, with all the code
given. Say in one line what it does when it's finished.

::: info Setting up the project
If you haven't made a project yet, follow the [Setup Guide](/setup/example-tool) first.
:::

### Step 1: Add the definitions

Keep code in `snippets/` and include one region at a time, so each step shows only the new part
and the whole program is still one file to fix:

<<< @/snippets/exp1/main.c#defines{c}

- Explain each name in a bullet. Every pin, bit and value has a `#define`, so the code reads as
  what it does.

### Step 2: Write `main`

<<< @/snippets/exp1/main.c#main{c}

- Then explain what the important lines do, in order.

Build, flash, and run.

<!-- A checklist after the Activity: what every student should have seen and understood. Ticks are
     saved in the browser; "Clear all" unticks every checklist on the page for the next section. -->
<Checklist id="activity" title="Activity checklist">

- Does the LED blink once a second?
- In the Watch window, does `blinks` go up by one with each blink?
- Can you say which line sets the speed?

</Checklist>

<!-- Optional extras go in one collapsed table, so the page stays short. -->
::: details More to try (optional)
| Try this | What you'll see |
| --- | --- |
| Set `BLINK_MS` to 100 | Five blinks a second. |
| Delete the `delay_ms` line | The LED looks always on: it toggles too fast to see. |
:::

::: details The complete program
<<< @/snippets/exp1/main.c#full{c}
:::

::: details Common problems
| Symptom | Cause and fix |
| --- | --- |
| The board isn't found | Check the cable and the driver from the [Setup Guide](/setup/example-tool). |
| The LED never lights | `led_init()` is missing, or the LED pin is wrong. |
:::

## Task

One Task per experiment, built on the Activity. Describe the result in a sentence or two, with a
clear finish line. Don't include its solution: keep model solutions out of this repository.

### The starter program

Start from this program. It compiles and runs, but the LED stays off: the TODOs are yours.

<<< @/snippets/exp1/task.c{c}

::: details How the provided part works
Explain anything in the starter that students shouldn't change, and why it's there.
:::

<!-- One collapsed box holds a nested box per TODO: hints say what to do, not the code. -->
:::: details What to write: the two TODOs
Each TODO is highlighted in the starter, exactly where its code goes. Write them in order: **1, 2**.

::: details TODO 1: one flash (`flash()`)
- LED on, wait `SHORT_MS`, LED off, wait `SHORT_MS`, as in the Activity.
:::

::: details TODO 2: the pattern (the main loop)
- Call `flash()` twice, then wait `PAUSE_MS`.
:::
::::

Build, flash, and run.

<Checklist id="task" title="Task checklist">

- Did you write `flash()` yourself?
- Does the LED flash twice quickly, then stay off for a second, over and over?
- Can you change the pattern to three flashes by changing one line?

</Checklist>
