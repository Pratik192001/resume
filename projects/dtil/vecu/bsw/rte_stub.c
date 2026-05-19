// Simplified RTE: a flat signal table. Real AUTOSAR RTE is generated per project.
#include <stdint.h>

#define MAX_SIGNALS 64
static int32_t g_signals[MAX_SIGNALS];

int32_t Rte_Read(uint8_t signal_id) {
    return (signal_id < MAX_SIGNALS) ? g_signals[signal_id] : 0;
}

void Rte_Write(uint8_t signal_id, int32_t value) {
    if (signal_id < MAX_SIGNALS) g_signals[signal_id] = value;
}

// Exposed to JS for live introspection / fault injection.
void vecu_set_signal(uint8_t id, int32_t v) { Rte_Write(id, v); }
int32_t vecu_get_signal(uint8_t id) { return Rte_Read(id); }
