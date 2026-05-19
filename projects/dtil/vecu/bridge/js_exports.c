// Symbol table exposed to JS — used by the React UI for live signal introspection.
#include <stdint.h>

typedef struct { const char* name; uint8_t id; const char* unit; } signal_desc_t;

static const signal_desc_t SIGNALS[] = {
    { "EngineSpeed", 0, "rpm" },
    { "BrakeStatus", 1, ""    },
    { "Throttle",    2, "%"   },
};
static const int N_SIGNALS = sizeof(SIGNALS) / sizeof(SIGNALS[0]);

const signal_desc_t* vecu_signal_at(int i) {
    return (i >= 0 && i < N_SIGNALS) ? &SIGNALS[i] : 0;
}
int vecu_signal_count(void) { return N_SIGNALS; }
