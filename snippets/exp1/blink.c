// Blink the on-board LED once a second. Replace with the lab's own example.
#include "board.h"

int main(void) {
    led_init();
    while (1) {
        led_toggle();
        delay_ms(500);
    }
}
