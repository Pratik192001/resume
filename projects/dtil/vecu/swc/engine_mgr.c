// Demo SWC: EngineMgr — produces EngineSpeed, reads BrakeStatus.
#include <stdint.h>

extern int32_t Rte_Read(uint8_t);
extern void    Rte_Write(uint8_t, int32_t);
extern void    CanIf_Transmit(uint32_t, const uint8_t*, uint8_t);

#define SIG_ENGINE_SPEED  0
#define SIG_BRAKE_STATUS  1
#define SIG_THROTTLE      2

void EngineMgr_10ms(void) {
    int32_t throttle = Rte_Read(SIG_THROTTLE);     // 0..100
    int32_t brake    = Rte_Read(SIG_BRAKE_STATUS); // 0/1
    int32_t rpm      = Rte_Read(SIG_ENGINE_SPEED);

    int32_t target = brake ? 800 : 800 + throttle * 60;
    rpm = rpm + (target - rpm) / 8;   // simple 1st-order lag
    Rte_Write(SIG_ENGINE_SPEED, rpm);
}

void EngineMgr_100ms(void) {
    int32_t rpm = Rte_Read(SIG_ENGINE_SPEED);
    uint8_t payload[2] = { (uint8_t)(rpm >> 8), (uint8_t)(rpm & 0xFF) };
    CanIf_Transmit(0x0C9, payload, 2);  // mimic standard engine-data CAN ID
}
