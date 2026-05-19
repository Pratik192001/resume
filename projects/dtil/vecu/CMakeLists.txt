cmake_minimum_required(VERSION 3.20)
project(vecu C)
set(CMAKE_C_STANDARD 11)

# Build to WASM via Emscripten: `emcmake cmake -S . -B build && cmake --build build`
add_executable(vecu
    bsw/scheduler.c
    bsw/canif.c
    bsw/rte_stub.c
    swc/engine_mgr.c
    bridge/js_exports.c
)

target_compile_options(vecu PRIVATE -Os -Wall -Wextra)
if (EMSCRIPTEN)
    set_target_properties(vecu PROPERTIES
        LINK_FLAGS "-sEXPORTED_FUNCTIONS=['_vecu_init','_vecu_tick','_vecu_set_signal','_vecu_get_signal'] -sEXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -sMODULARIZE=1 -sEXPORT_ES6=1 -sALLOW_MEMORY_GROWTH=1"
    )
endif()
