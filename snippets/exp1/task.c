// Experiment 1 Task: blink a pattern.
//   The LED blinks twice quickly, then stays off for a second, over and over.
// Provided: the names and the setup. Write the two TODOs (highlighted).
#include "board.h"

#define LED_PIN        5                // PA5: the on-board LED
#define LED            (1U << LED_PIN)
#define SHORT_MS       150              // A quick on or off
#define PAUSE_MS       1000             // The gap between patterns

// TODO 1: one quick flash: LED on, wait SHORT_MS, LED off, wait SHORT_MS // [!code highlight]
void flash(void)
{
}

int main(void)
{
	led_init();                         // Provided: the LED pin as an output

	while (1)
	{
		// TODO 2: two flashes, then wait PAUSE_MS // [!code highlight]
	}
}
