// Minimal cooperative scheduler. The real tick is driven from the JS Worker;
// this just dispatches periodic runnables based on the current tick count.
#include <stdint.h>

typedef void (*runnable_t)(void);

typedef struct {
    runnable_t fn;
    uint32_t period_ms;
    uint32_t offset_ms;
} task_t;

extern void EngineMgr_10ms(void);
extern void EngineMgr_100ms(void);

static const task_t TASKS[] = {
    { EngineMgr_10ms,  10,  0 },
    { EngineMgr_100ms, 100, 5 },
};
static const int N_TASKS = sizeof(TASKS) / sizeof(TASKS[0]);

static uint32_t g_tick_ms = 0;

void vecu_init(void) { g_tick_ms = 0; }

void vecu_tick(void) {
    for (int i = 0; i < N_TASKS; ++i) {
        if (((g_tick_ms - TASKS[i].offset_ms) % TASKS[i].period_ms) == 0) {
            TASKS[i].fn();
        }
    }
    g_tick_ms++;
}
