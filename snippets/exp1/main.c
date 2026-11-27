// #region full
// The Activity's program, built step by step on the page. Each "#region name" block is
// included on its own (<<< @/snippets/exp1/main.c#name), and #full is the whole file.
// Replace it with the lab's own first example.
// #region defines
#include "board.h"

// Name every pin, bit and value: the code then reads as what it does.
#define LED_PIN        5                // PA5: the on-board LED
#define LED            (1U << LED_PIN)  // Its bit in the port registers
#define BLINK_MS       500              // Half a period: one blink a second

volatile uint32_t blinks;               // Watch window: goes up by one per blink
// #endregion defines

// #region main
int main(void)
{
	led_init();                         // From board.h: the LED pin as an output

	while (1)
	{
		led_toggle();
		blinks++;
		delay_ms(BLINK_MS);
	}
}
// #endregion main
// #endregion full
