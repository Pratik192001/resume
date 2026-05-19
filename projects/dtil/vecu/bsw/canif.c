// Stub CAN interface. Real implementation maps to JS-side canbus in the Worker.
#include <stdint.h>

struct can_frame { uint32_t id; uint8_t dlc; uint8_t data[8]; };

// Implemented in JS bridge.
extern void js_can_tx(uint32_t id, const uint8_t* data, uint8_t dlc);

void CanIf_Transmit(uint32_t id, const uint8_t* data, uint8_t dlc) {
    js_can_tx(id, data, dlc);
}
