# DTiL — 2-Minute Pitch (Bosch internal showcase)

> **[0:00 – 0:20] Hook**
> "Every new engineer at Bosch waits two to six weeks for HIL bench time just to do a basic integration smoke test. Meanwhile, vECU desktop tools cost thousands per seat and run only on Windows. I asked: *what if we could shift integration testing all the way left — into the browser?*"
>
> **[0:20 – 0:50] Demo**
> "This is DTiL. I'm going to drag a compiled ECU hex onto this tab… *(drags)* …it's now running, in WebAssembly, in this browser, at 1 kHz. Here's the live RTE signal table. I'll inject a fault: force EngineSpeed to zero — and you can see the BrakeManager SWC react in real time, on the chart."
>
> **[0:50 – 1:20] Why it matters at Bosch**
> "This directly enables **ASPICE SWE.5 — Software Integration** to start before any hardware is available. It plays into our **SDV and Eclipse Velocitas** strategy. A team can share a debugging session by URL — no installation, no license server, no bench booking."
>
> **[1:20 – 1:50] Roadmap**
> "Today the scheduler runs a subset of AUTOSAR. Next is full BSW stack support, then integration with our existing ECU-TEST suites — same `.tcf` files, run in CI on every PR. Imagine pre-merge integration tests on a virtual ECU, in CI, for every commit."
>
> **[1:50 – 2:00] Close**
> "It's Replit for ECUs. And it cost zero in licenses. Questions?"
