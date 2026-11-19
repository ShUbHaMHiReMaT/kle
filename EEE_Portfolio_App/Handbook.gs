/**
 * ============================================================================
 *  Handbook.gs — Department-fixed configuration and handbook-derived structure
 * ============================================================================
 *  Source: "Foundation Integration Mini Project Handbook", Semester V,
 *  AY 2026–27, Version 3 (revised July 2026), Department of Electrical &
 *  Electronics Engineering, KLE Technological University, Belagavi.
 *
 *  Everything in this file is derived from that handbook:
 *    • Chapter 2/3  → THEMES (6 themes, artefacts, focus, courses)
 *    • Chapter 4    → Seven-Stage EEE Design Cycle, dependency chain, debug log
 *    • Chapter 5    → RUBRIC (9 components, bands, theme competency mapping)
 *    • Chapter 7    → REVIEWS (marks distribution, gate criteria, 5 lenses)
 *    • Chapter 8    → STAGES / worksheets (S1, S2, S3, S4, S5-PRE, S5-BUILD,
 *                     S6, S7, S7-VIVA) with their tables, prompts, sign-offs
 *
 *  The department name is FIXED here and cannot be changed from the UI.
 * ============================================================================
 */

var DEPARTMENT = Object.freeze({
  name: 'Department of Electrical & Electronics Engineering',
  shortName: 'EEE',
  institution: 'KLE Technological University, Belagavi',
  course: 'Foundation Integration Mini Project',
  semester: 'Semester V',
  academicYear: '2026–27',
  cluster: 'Power Electronics · Drives · EV Systems',
  handbookVersion: 'Version 3 (revised July 2026)',
  cycleName: 'Seven-Stage EEE Design Cycle'
});

/* Permanent HoD/Admin accounts (in addition to the script owner).
 * These always get full admin access, even if not added in the Faculty tab. */
var ADMIN_EMAILS = ['shreyashalingali@gmail.com'];

/* Admins whose access is NOT shown to anyone else (hidden from the Audit log and
 * shown only as "Portfolio Administrator" in comments and reviews). */
var HIDDEN_ADMIN_EMAILS = ['shreyashalingali@gmail.com'];

/* Bump this whenever defaultStages_() changes: the live portfolio structure is
 * refreshed automatically on the next request (saved student records are kept). */
var STRUCTURE_VERSION = '5';

/* ---------------------------------------------------------------------------
 * THEMES (Handbook Ch. 2, 3, 5.2, 6, 8)
 * ------------------------------------------------------------------------- */
var THEMES = [
  {
    id: 'T1', short: 'SMPS', name: 'Switch-Mode Power Supply',
    subtitle: 'Switching topology design, duty-cycle derivation, inductor and capacitor sizing, compensation network design, efficiency analysis, and thermal management.',
    focus: ['Switching Topology & Duty Cycle', 'Magnetics Design & Ripple', 'Compensation & Loop Stability', 'Efficiency & Thermal Management'],
    courses: ['Power Electronics', 'Analog Circuit Design', 'Electronic Devices & Circuits (EDC)', 'Basic Electrical Engineering (BEE)', 'Signals & Systems', 'Microcontrollers & Embedded Systems (digital variant)'],
    artefacts: [
      { name: 'Buck Converter System', focus: 'Step-down topology; duty-cycle–output relation; CCM/DCM boundary; inductor and capacitor sizing; Type II/III compensation; load and line regulation' },
      { name: 'Boost Converter System', focus: 'Step-up topology; duty-cycle derivation at min/max V_in; CCM inductance; output capacitor ESR; closed-loop voltage regulation; efficiency vs load' },
      { name: 'Buck–Boost Converter System', focus: 'Inverting step-up/down topology; duty-cycle range; continuous and discontinuous conduction; output ripple; feedback compensation; thermal analysis' },
      { name: 'Isolated Forward/Flyback Converter System', focus: 'Transformer turns-ratio design; magnetising inductance; clamp circuit; isolated feedback; regulation and cross-regulation; safety isolation' }
    ],
    coreConcepts: [
      'Duty-cycle derivation at nominal, minimum, and maximum input voltage for the chosen topology.',
      'CCM/DCM boundary determination; critical inductance calculation and verification.',
      'Inductor sizing from ripple current target; saturation check against datasheet I_sat.',
      'Output capacitor sizing from ripple voltage target; ESR contribution quantified.',
      'Compensation network design — crossover frequency and phase margin targeted before components chosen.',
      'Load/line regulation measured at three load levels and two input extremes.',
      'Efficiency loss budget derived and measured at three load levels; plotted versus load.',
      'Component temperatures measured at sustained full load; thermal management verified.'
    ],
    minFR: 5,
    frExample: { bad: 'The output should be stable', good: 'V_out held within V_target ± 1% across I_out = 0 to I_max at V_in(nom)', method: 'DMM at output terminals (Kelvin sense) at three load conditions' },
    sfdBlocks: ['PWM / Gate Driver', 'Switching Stage (MOSFET + Diode)', 'Output Filter (L-C)', 'Load', 'Feedback Sensing (Divider + Ref)', 'Error Amp & Compensation'],
    feedback: 'V_fb (scaled V_out) returns from Feedback Sensing to Error Amplifier input.',
    s3Params: [
      { p: 'Inductor L at f_sw', m: 'LCR meter at switching frequency', f: 'f_LC = 1/(2π√(LC)) → compensation type (Type II or III)' },
      { p: 'Capacitor C_out and ESR at f_sw', m: 'LCR meter at switching frequency', f: 'ΔV_out = ΔI_L/(8·f_sw·C) + ΔI_L×ESR → FR2 ripple target' },
      { p: 'Open-loop D-to-V_out (D = 20%, 40%, 60%)', m: 'Fixed duty cycle, open feedback loop', f: 'Power stage gain K = V_in (buck); confirms plant model before closing loop' }
    ],
    plantModel: 'G_vd(s) = ______ ;  f_LC = ______ Hz (from measured L and C);  ESR contribution to ripple = ______ mΩ',
    map: {
      objective: 'Design a switch-mode converter meeting specified regulation, ripple, efficiency, and thermal FRs, validated against a measured plant model.',
      sfd: 'Voltage converter blocks: power stage, error amp, compensation, gate drive, sensing divider.',
      plant: 'L and C at f_sw; open-loop D-to-V_out gain; ESR; nominal-vs-measured discrepancy documented.',
      power: 'D at nom/min/max V_in; L from ΔI_L; C from ΔV_out; device stress checks; compensation crossover and PM.',
      sensing: 'Divider and ADC accuracy vs ripple FR; S5-PRE: V_out, ripple, efficiency at three loads.',
      embedded: 'PWM generation, ADC feedback loop, closed-loop update rate vs crossover bandwidth.',
      closed: 'Regulation, ripple, efficiency, transient step-load response — all vs S1 FRs.',
      testing: 'Min. 3 cycles; at least one compensation instability and one measurement-vs-prediction gap documented.',
      artefact: 'Regulated output within FR targets across load range; measured efficiency and characterised ripple.',
      viva: 'Explains S2 block, governing equation, S3 measured value that drove S4, and largest predicted-vs-measured gap.'
    },
    debugExample: { invalid: 'Ripple was too high so we changed the output capacitor to a bigger one and it got better.', valid: 'Measured ripple 62 mVpp (predicted 22 mVpp). Measured cap ESR with LCR at f_sw: 85 mΩ vs assumed 35 mΩ. Revised calculation: ΔV = ΔI_L × ESR_actual = 0.73A × 0.085Ω = 62 mVpp — matches measurement. Selected low-ESR cap (12 mΩ measured). Post-correction: 18 mVpp — below FR2.' }
  },
  {
    id: 'T2', short: 'DC Motor', name: 'DC Motor Speed Controller',
    subtitle: 'DC motor modelling, H-bridge design, PWM generation, encoder feedback, PID control, open-loop vs closed-loop performance comparison, and load disturbance rejection.',
    focus: ['Motor Modelling & Back-EMF', 'H-Bridge & PWM Drive', 'PID Control & Tuning', 'Open vs Closed-Loop Comparison'],
    courses: ['Electrical Machines', 'Power Electronics', 'Microcontrollers & Embedded Systems', 'Control Systems', 'Analog Circuit Design', 'Basic Electrical Engineering (BEE)'],
    artefacts: [
      { name: 'Analog PWM Motor Drive System', focus: 'Open-loop duty-cycle control; PWM-to-speed curve; H-bridge switch states; shoot-through protection; dead-time calculation; speed characterisation at ≥8 duty values' },
      { name: 'Microcontroller-Based PID Speed Controller', focus: 'Quadrature encoder feedback; discrete PID design; step-response tuning; anti-windup; load disturbance rejection; quantified open- vs closed-loop speed-holding comparison' },
      { name: 'Bidirectional DC Motor Controller', focus: 'Four-quadrant H-bridge; forward/reverse and braking modes; direction-change sequence; dead-time from MOSFET datasheet; speed and current characterisation; embedded state machine' }
    ],
    coreConcepts: [
      'DC motor model — back-EMF constant K_e, torque constant K_t, armature resistance R_a identified from bench measurements.',
      'H-bridge switch states; shoot-through protection mechanism; dead-time calculated from MOSFET datasheet t_off.',
      'PWM-to-speed curve measured at eight or more duty values; non-linearity and back-EMF effect identified.',
      'PID gains derived from step-response data for two or more gain sets; parameters justified by response shape.',
      'Load disturbance rejection — speed before and after a defined load step measured; recovery time recorded.',
      'Open- versus closed-loop speed-holding error quantified at three or more set-points.'
    ],
    minFR: 5,
    frExample: { bad: 'The motor should respond quickly', good: 'Closed-loop step response: rise time ≤ 0.5 s; overshoot ≤ 10%; settling time ≤ 2 s for 50%→100% speed step', method: 'Oscilloscope capture: speed vs time from step event; annotate rise time, overshoot, settling' },
    sfdBlocks: ['Reference & Error', 'PID Controller', 'H-Bridge & PWM', 'DC Motor Plant', 'Speed Sensor', 'Signal Conditioning'],
    feedback: 'Conditioned speed signal ω_meas returns from Signal Conditioning to the Reference & Error block.',
    s3Params: [
      { p: 'Motor step response (ω vs time for step V_a)', m: 'Data logger or oscilloscope via tachometer or encoder', f: 'τ_m = 63.2% of steady-state speed; K = ω_ss/V_a → G(s) = K/(τ_m·s + 1)' },
      { p: 'Armature resistance R_a at zero speed (V_a/I_a with E_b = 0)', m: 'Low DC voltage, zero speed', f: 'I_stall = V_dc/R_a → MOSFET current rating in S4' },
      { p: 'PWM-to-speed curve at ≥8 duty values', m: 'Encoder / tachometer at each steady state', f: 'Non-linearity and back-EMF effect; open-loop baseline' }
    ],
    plantModel: 'G(s) = K/(τ_m·s + 1);  K = ______ (rad/s)/V;  τ_m = ______ s;  R_a = ______ Ω;  I_stall = ______ A',
    map: {
      objective: 'Design a closed-loop DC motor speed controller meeting speed accuracy and disturbance-rejection FRs, validated by step-response capture.',
      sfd: 'Motor control blocks: H-bridge, motor model, encoder, PID controller, anti-windup.',
      plant: 'τ_m, K, R_a from step response; PWM-to-speed curve at ≥8 duty values; no-load and loaded speeds.',
      power: 'Dead time from t_off; device stress; PID gains from S3 step response; settling time and overshoot predicted.',
      sensing: 'Encoder resolution vs speed FR; filter cutoff vs control bandwidth; S5-PRE: settling time, overshoot, speed error.',
      embedded: 'Timer PWM, encoder ISR, discrete PID, serial telemetry — each in separate modular functions.',
      closed: 'Speed holding, step-load disturbance response, open-vs-closed-loop error — all vs S1 FRs.',
      testing: 'Min. 3 cycles; at least one PID instability or encoder failure; root causes traced to S3 τ_m.',
      artefact: 'Speed within FR accuracy under step-load; settling time and overshoot within FR limits, on oscilloscope.',
      viva: 'Explains S2 block, motor model, S3 τ_m/K/R_a, PID derivation, and one closed-loop failure root cause.'
    },
    debugExample: { invalid: 'Motor oscillated so we turned down the gain.', valid: 'Motor oscillated at K_p=1.2 at 500 rpm. Oscillation freq: 8.3 Hz. Bode analysis shows PM=18° at K_p=1.2. Root cause: load inertia J_load not included in S3 plant identification — τ_m is 40% larger, shifting gain crossover. Correction: re-identified plant with load attached; redesigned for PM=45°; new K_p=0.7. Post-correction: overshoot 12%, settling 0.8 s — within FR2.' }
  },
  {
    id: 'T3', short: 'Induction Motor', name: 'Single-Phase Induction Motor Speed Control',
    subtitle: 'Phase-angle voltage control, firing angle derivation, zero-crossing detection, torque-slip characterisation, closed-loop speed regulation, and harmonic content estimation.',
    focus: ['Phase-Angle Control & ZCD', 'Torque-Slip Characterisation', 'Firing Angle vs RMS Voltage', 'Closed-Loop Speed Regulation'],
    courses: ['Electrical Machines', 'Power Electronics', 'Analog Circuit Design & EDC', 'Microcontrollers & Embedded Systems', 'Signals & Systems'],
    artefacts: [
      { name: 'TRIAC Phase-Angle Speed Controller', focus: 'Firing-angle vs RMS voltage derivation; ZCD comparator design; TRIAC gate-pulse timing; torque-slip measurement at full and reduced voltage; closed-loop band-holding; THD estimation' },
      { name: 'SCR Half-Wave Speed Controller', focus: 'Single-quadrant SCR firing; half-wave RMS voltage derivation; firing delay vs alpha; speed range characterisation; ZCD and firing circuit design; harmonic content at ≥3 firing angles' }
    ],
    coreConcepts: [
      'Analytical derivation of V_rms(α) for TRIAC/SCR phase-angle control; derivation verified against measurements at eight or more firing angles.',
      'ZCD comparator design — threshold, hysteresis, and output timing relative to the true zero crossing characterised.',
      'Torque-slip characteristic measured at full and reduced RMS voltage; speed range limitation explained.',
      'Closed-loop speed regulation: firing angle computed from speed error; band-holding under load change measured.',
      'THD estimated from oscilloscope waveform at three or more firing angles; discussed against IEC limits.'
    ],
    minFR: 5,
    frExample: { bad: 'The ZCD should be accurate', good: 'ZCD timing jitter ≤ 0.5 ms standard deviation over 20 consecutive measurements at nominal alpha', method: 'Oscilloscope: time from actual zero crossing to ZCD pulse; standard deviation over 20 cycles' },
    sfdBlocks: ['Speed Reference & Error', 'PI Controller', 'Zero-Crossing Detector', 'Firing Delay Timer', 'TRIAC Power Stage', 'Induction Motor Plant', 'Speed Sensor'],
    feedback: 'Speed measurement ω_meas returns from the Speed Sensor to the Speed Reference & Error block.',
    s3Params: [
      { p: 'V_rms vs firing angle α (≥8 angles, e.g. 30°…150°)', m: 'True-RMS DMM at each α', f: 'Compare to analytical V_rms(α); verify model before PI design in S6' },
      { p: 'Speed vs α under fan load', m: 'Optical tachometer at each steady state', f: 'Plant gain K_plant = dω/dα → PI gains in S6' },
      { p: 'Torque-slip at full and reduced V_rms', m: 'Load test at two voltages', f: 'Speed range limitation' },
      { p: 'ZCD timing jitter (SD over 20 cycles)', m: 'Oscilloscope: true zero crossing to ZCD pulse', f: 'ZCD hysteresis design in S4; jitter FR' }
    ],
    plantModel: 'K_plant = dω/dα = ______ rpm/degree (measured from S3 speed-vs-alpha data at operating point)',
    map: {
      objective: 'Design a phase-angle speed controller meeting speed range, ZCD accuracy, and closed-loop band-holding FRs, validated by oscilloscope capture.',
      sfd: 'Phase-angle control blocks: ZCD, firing delay, TRIAC/SCR gate, motor, tachometer.',
      plant: 'V_rms vs α at ≥8 angles vs analytical; torque-slip at two voltages; K_plant; ZCD jitter over 20 cycles.',
      power: 'ZCD hysteresis from mains noise; gate current vs I_GT; snubber R and C; PI gains from K_plant; band-holding target.',
      sensing: 'ZCD jitter vs FR; isolated probing method; S5-PRE: speed range, closed-loop band.',
      embedded: 'ZCD ISR, firing delay timer, PI speed controller — modular; mains interrupt latency analysed.',
      closed: 'Speed range, closed-loop band under load, THD at ≥3 angles, ZCD jitter — all vs S1 FRs.',
      testing: 'Min. 3 cycles; at least one ZCD timing failure and one closed-loop instability; root causes traced to S3 K_plant.',
      artefact: 'Speed controllable across FR range; closed-loop band under load demonstrated; ZCD jitter within FR.',
      viva: 'Derives V_rms(α), explains ZCD jitter, names S3 K_plant, describes one closed-loop or ZCD failure root cause.'
    },
    debugExample: { invalid: 'Speed was not holding steady so we increased K_i.', valid: 'Speed drifted ±8 rpm (FR1 requires ±3 rpm). Measured ZCD jitter: σ = 2.3 ms = ±42° alpha uncertainty. Root cause: comparator hysteresis insufficient for mains noise (80 mV noise on zero-crossing). Increased hysteresis from 30 mV to 120 mV. Jitter reduced to 0.2 ms = ±3.6° alpha. Speed band improved to ±2.1 rpm — within FR1.' }
  },
  {
    id: 'T4', short: 'PFC', name: 'PFC Rectifier for EV Charging',
    subtitle: 'Boost-PFC topology, distortion power factor, THD measurement and reduction, two-loop control architecture, and baseline-to-corrected performance comparison.',
    focus: ['PFC Boost Topology', 'Displacement vs Distortion PF', 'Two-Loop Control Architecture', 'THD Measurement & Reduction'],
    courses: ['Power Electronics', 'Analog Circuit Design & Signals & Systems', 'Electronic Devices & Circuits (EDC)', 'Basic Electrical Engineering (BEE)'],
    artefacts: [
      { name: 'Boost PFC Rectifier System', focus: 'Boost-PFC topology; uncorrected baseline THD and PF measured before PFC stage; inner current loop tracks rectified sine reference; outer voltage loop bandwidth ≤100 Hz; THD before and after comparison at ≥2 load levels' },
      { name: 'PFC Rectifier with Average Current-Mode Control', focus: 'Average current-mode IC (e.g. UC3854); sine-reference current shaping; two-loop bandwidth separation; power-factor measurement across load range; displacement vs distortion PF; IEC 61000-3-2 harmonic compliance check' }
    ],
    coreConcepts: [
      'Distinction between displacement power factor and distortion power factor; THD defined and measured.',
      'Diode-bridge baseline characterised first: THD and PF measured before PFC stage is added.',
      'Boost-PFC inductor sizing for CCM at minimum load; measured L_pfc used (not nominal).',
      'Inner current loop tracks rectified sine reference; outer voltage loop bandwidth f_cv < 2·f_line = 100 Hz.',
      'THD improvement measured at two or more load levels before and after PFC stage; results compared to IEC 61000-3-2 limits.'
    ],
    minFR: 5,
    frExample: { bad: 'THD should be low', good: 'Input current THD after PFC ≤ 10% at 100% load (IEC 61000-3-2 Class A)', method: 'Oscilloscope FFT on input current; compute THD from harmonic amplitudes' },
    sfdBlocks: ['Diode Bridge', 'Boost PFC Power Stage', 'DC Bus Cap & Load', 'Inner Current Loop', 'Sine Reference Generator', 'Outer Voltage Loop'],
    feedback: 'INNER: I_L measurement → Inner Current Loop. OUTER: V_bus measurement → Outer Voltage Loop.',
    s3Params: [
      { p: 'Uncorrected diode-bridge baseline THD and PF (FR0 — before PFC)', m: 'Oscilloscope FFT on input current; wattmeter for PF', f: 'FR0 baseline — must be completed before the PFC stage is added' },
      { p: 'Measured L_pfc and C_bus at f_sw', m: 'LCR meter', f: 'CCM boundary: L_crit = V_rect(min)×D_max/(2×f_sw×I_load(min))' },
      { p: 'Open-loop input current waveform at one operating point', m: 'Oscilloscope (isolated / current probe)', f: 'Plant confirmation before loop closure' }
    ],
    plantModel: 'L_pfc = ______ µH (measured);  f_LC_inner = ______ Hz;  CCM confirmed at minimum load? Yes / No — explain:',
    map: {
      objective: 'Design a boost-PFC rectifier meeting THD, PF, and regulation FRs, validated against a measured uncorrected baseline.',
      sfd: 'PFC blocks: diode bridge, boost stage, inner current loop, outer voltage loop, sine reference.',
      plant: 'Diode-bridge baseline THD and PF (mandatory first); L_pfc at f_sw; open-loop input current waveform.',
      power: 'L_pfc from CCM boundary; device stress; f_ci and f_cv bandwidth hierarchy documented; baseline THD improvement predicted.',
      sensing: 'Current shunt accuracy vs inner loop bandwidth; S5-PRE: THD, PF, regulation at two loads.',
      embedded: 'Inner current ISR, outer voltage loop, sine reference generation — modular; sampling rate vs f_ci.',
      closed: 'THD and PF before and after PFC at two loads, input current waveform — all vs S1 FRs.',
      testing: 'Min. 3 cycles; at least one inner or outer loop instability; root causes traced to measured L_pfc.',
      artefact: 'Measurable THD reduction and PF improvement vs baseline; input current in phase with supply, on oscilloscope.',
      viva: 'Explains two-loop hierarchy, names measured L_pfc, explains f_cv < 100 Hz, describes one loop instability root cause.'
    },
    debugExample: { invalid: 'THD was not very good so we adjusted the current loop gain.', valid: 'THD at 100% load: 18% (FR1 requires <10%). I_L waveform: flat-topped at current peaks. Root cause: at peaks V_rect approaches V_bus; inner loop cannot command near-zero duty cycle at 500 Hz BW. Increased K_pi to raise f_ci to 1.5 kHz (= f_sw/10). Post-correction THD: 8.3% — within FR1.' }
  },
  {
    id: 'T5', short: 'BPS', name: 'Battery Protection System',
    subtitle: 'Comparator threshold design, hysteresis band calculation, MOSFET disconnect circuit, response-time characterisation, false-trip immunity, and IEC 62133 threshold compliance.',
    focus: ['Comparator Threshold Design', 'Hysteresis Band & Error Budget', 'MOSFET Disconnect Switch', 'Response Time & False-Trip Immunity'],
    courses: ['Analog Circuit Design & EDC', 'Power Electronics', 'Basic Electrical Engineering (BEE) & Electrical Measurements', 'Signals & Systems'],
    artefacts: [
      { name: 'Single-Cell Analog Battery Protection System', focus: 'Comparator UV/OV threshold from resistor divider; hysteresis band calculation and sweep verification; back-to-back MOSFET disconnect; response-time single-shot capture; false-trip immunity under inrush transient; IEC 62133 threshold compliance' },
      { name: 'Multi-Cell Battery Protection System', focus: 'Multi-threshold UV/OV/OC detection per cell; stacked comparator or dedicated IC; per-cell threshold accuracy error budget; overcurrent sensing via shunt; fault logic and latch; response-time decomposition across protection chain' }
    ],
    coreConcepts: [
      'Comparator threshold derived from resistor divider and voltage reference; error budget calculated (reference tolerance + divider tolerance + comparator input offset).',
      'Hysteresis band V_hyst ≥ I_max × R_int to prevent chatter at cell internal resistance voltage drop.',
      'Back-to-back MOSFET disconnect circuit; R_DS(on) loss and bidirectional blocking explained.',
      'Response time decomposed into detection delay and MOSFET turn-off time; single-shot oscilloscope capture from fault injection to I_load = 0.',
      'False-trip immunity demonstrated by injecting a known inrush transient and confirming no spurious disconnect.',
      'Cell chemistry UV/OV limits cited (Li-ion or LiFePO₄); IEC 62133 or UL 2054 thresholds referenced.'
    ],
    minFR: 6,
    frExample: { bad: 'Protection must be fast', good: 'UV trip: load disconnects within 20 ms of V_cell crossing V_UV threshold', method: 'Single-shot oscilloscope: trigger on V_cell crossing V_UV; measure time to I_load = 0' },
    sfdBlocks: ['Cell Voltage Sensing', 'UV/OV Comparators', 'OC Current Sensing', 'False-Trip Delay Filter', 'Fault Logic & Latch', 'Back-to-Back MOSFET Switch', 'Load'],
    feedback: 'No continuous feedback loop — threshold-detection system only. Document this explicitly.',
    s3Params: [
      { p: 'Actual trip and reset voltages (sweep V_cell through threshold)', m: 'PSU sweep, oscilloscope trigger', f: 'Error budget verification: compare measured threshold error to predicted budget' },
      { p: 'Cell internal resistance R_int (V_sag under pulse load)', m: 'Known current pulse; measure V_sag', f: 'Hysteresis band V_hyst ≥ I_max × R_int (prevents chatter)' },
      { p: 'Comparator V_os and propagation delay', m: 'Datasheet and bench', f: 'Threshold error budget; response-time budget' }
    ],
    plantModel: 'Total threshold error budget = ______ mV (reference ______ + divider ______ + comparator offset ______ mV). Meets FR ______ mV?  Yes / No',
    map: {
      objective: 'Design an analog battery protection system meeting UV/OV/OC threshold accuracy and response-time FRs, validated by individual fault injection.',
      sfd: 'Protection chain blocks: UV/OV/OC comparators, hysteresis, MOSFET disconnect, delay filter.',
      plant: 'Cell R_int; threshold error budget; comparator V_os and propagation delay from datasheet and bench.',
      power: 'Threshold resistors from divider; hysteresis from R_int; MOSFET R_DS(on); delay filter from inrush duration; IEC 62133 compliance.',
      sensing: 'PSU voltage sweep for trip and reset; S5-PRE: response time and false-trip immunity for each fault type.',
      embedded: 'Fault state machine; hardware fast-path and firmware supervisory path documented separately.',
      closed: 'UV, OV, OC fault response times individually measured; false-trip immunity tested — all vs S1 FRs.',
      testing: 'Min. 3 cycles; at least one threshold accuracy failure and one response-time failure; root causes traced to error budget.',
      artefact: 'Disconnects within FR response time for each fault type individually; stays connected under inrush transient.',
      viva: 'Derives UV threshold, explains hysteresis from R_int, names measured propagation delay, describes one threshold failure.'
    },
    debugExample: { invalid: 'Protection was tripping too early so we changed the threshold resistor.', valid: 'UV tripping at 2.9 V instead of designed 2.75 V. Measured trip: 2.905 V. Error budget prediction: ±61 mV for 1% R + TL431 + LM393. Actual error: +30 mV — within budget. R2 measured as 98.7 kΩ (1% low from nominal 100 kΩ), shifting threshold upward. Selected R2 = 102 kΩ (E96). New measured trip: 2.758 V — within FR5 ±20 mV.' }
  },
  {
    id: 'T6', short: 'BMC', name: 'Battery Management Controller',
    subtitle: 'Multi-cell voltage sensing, SoC estimation via Coulomb counting, OCV correction, passive cell balancing, layered hardware and firmware protection, and telemetry design.',
    focus: ['Multi-Cell Sensing & Error Budget', 'Coulomb-Counting SoC Estimation', 'Passive Balancing Design', 'Layered Protection & Telemetry'],
    courses: ['Analog Circuit Design & Electrical Measurements', 'Microcontrollers & Embedded Systems', 'Power Electronics & EDC', 'Signals & Systems'],
    artefacts: [
      { name: 'Voltage-Sensing BMC with SoC Estimation', focus: 'Multi-cell voltage sensing; per-cell accuracy error budget; Coulomb-counting SoC with OCV correction; SoC drift quantified over full charge–discharge cycle; UART/CAN telemetry with defined frame; Git version-controlled firmware' },
      { name: 'Full BMC with Passive Balancing and Layered Protection', focus: 'All voltage-sensing BMC functions; passive balancing bleed-resistor sizing; balancing convergence from deliberate imbalance; hardware fast protection (UV/OV/OC/OT) and firmware supervision; each fault type individually injected; telemetry dataset as primary test evidence' }
    ],
    coreConcepts: [
      'Multi-cell sensing error budget: divider tolerance + mux leakage + ADC quantisation + reference error — worst-case total stated and compared to sensing FR.',
      'OCV-SoC curve measured for the specific cells used (not taken from a chemistry datasheet).',
      'Coulomb-counting SoC drift quantified over a full charge–discharge cycle; OCV correction applied at rest.',
      'Passive balancing: bleed resistor sized from imbalance magnitude and convergence time target; balancing current calculated.',
      'Hardware (fast) protection and firmware supervision both implemented; each fault type (UV, OV, OC, OT) individually injected; response times measured.',
      'Telemetry message structure defined; update rate justified; logged dataset used as primary S7 test evidence; Git version history required.'
    ],
    minFR: 6,
    frExample: { bad: 'SoC should be accurate', good: 'SoC estimation error ≤ 5% over a complete charge-discharge cycle at C/2 rate', method: 'Full cycle test; compare BMS SoC to reference Ah counted by calibrated source' },
    sfdBlocks: ['Multi-Cell Voltage Sensing', 'SoC Estimator', 'Passive Balancing', 'Current Sensing', 'Fault Logic & Protection', 'Telemetry & Communication', 'Protected Load'],
    feedback: 'Three parallel paths: (1) fast protection path, (2) SoC estimation path, (3) balancing decision path.',
    s3Params: [
      { p: 'OCV-SoC curve for your specific cells', m: 'Charge to 100%, rest 30 min; discharge in 10% steps; measure OCV at each rest', f: 'SoC estimator lookup table in S4' },
      { p: 'Per-cell voltage error (5 reference voltages)', m: 'Bench PSU as reference; calibrated DMM', f: 'Error budget validation for FR1 sensing accuracy' },
      { p: 'Coulomb-counting drift over one full cycle', m: 'Full charge–discharge with reference Ah', f: 'SoC accuracy target and OCV correction schedule' }
    ],
    plantModel: 'Sensing error (total RSS) = ______ mV vs FR1 = ______ mV.  OCV-SoC lookup table measured from ______ cells at ______ °C.',
    map: {
      objective: 'Design a multi-cell BMC meeting SoC accuracy, balancing convergence, and per-fault response-time FRs, validated by full-cycle test and fault injection.',
      sfd: 'BMS blocks: multi-cell ADC, Coulomb counter, OCV corrector, balancing switch, protection FSM, telemetry.',
      plant: 'Sensing error budget; OCV-SoC for specific cells (step-discharge protocol); Coulomb-counting drift over one full cycle.',
      power: 'R_bal from imbalance and convergence target; OCV correction schedule; hardware and firmware response time targets; IEC 62133 thresholds.',
      sensing: 'Reference injection accuracy vs sensing FR; S5-PRE: SoC drift, balancing convergence, fault response times.',
      embedded: 'Coulomb-counting ISR, OCV correction, balancing FSM, protection FSM, telemetry encoder — Git history submitted.',
      closed: 'SoC accuracy over full cycle; balancing convergence; per-fault injection response times — all vs S1 FRs.',
      testing: 'Min. 3 cycles; at least one sensing accuracy failure and one SoC drift failure; root causes traced to S3 OCV curve or error budget.',
      artefact: 'SoC within FR accuracy over full cycle; balancing convergence; all four fault types individually verified.',
      viva: 'Derives sensing error budget, explains Coulomb-counting drift and OCV correction, names R_bal, describes one SoC failure.'
    },
    debugExample: { invalid: 'SoC was drifting so we added an OCV correction more often.', valid: 'SoC error at 80% discharge: +9% (FR3 requires <5%). Coulomb counting drift = I_error × time. Measured I_pack error: +3%. Over 2 h at C/2 = 1 A: accumulated error = 60 mAh = 3% of 2000 mAh. Remaining 6%: OCV-SoC curve from chemistry datasheet, not this cell batch. Measured OCV-SoC for this batch; updated lookup table. Final SoC error: +2.1% — within FR3.' }
  }
];

/* ---------------------------------------------------------------------------
 * RUBRIC (Handbook 5.3) — 9 components, identical weights across themes
 * ------------------------------------------------------------------------- */
var BANDS = [
  { id: 'E', name: 'Exemplary', range: '91–100%', factor: 0.95 },
  { id: 'C', name: 'Competent', range: '71–90%', factor: 0.80 },
  { id: 'D', name: 'Developing', range: '41–70%', factor: 0.55 },
  { id: 'I', name: 'Inadequate', range: '<40%', factor: 0.25 }
];

var RUBRIC = [
  { id: 'sfd', name: 'Signal Flow Diagram & Course Integration Map', marks: 10,
    C: 'SFD is substantially complete with most blocks correctly labelled. Minor gaps in governing equations or course citations.',
    D: 'Block diagram exists but governing equations or FR links are missing for several blocks.',
    I: 'No SFD, or a schematic presented as an SFD. Course integration absent or purely descriptive.' },
  { id: 'plant', name: 'Plant Characterisation & S3 Measurements', marks: 15,
    C: 'Plant parameters are measured with adequate technique. Minor gaps in instrument documentation or comparison to nominal.',
    D: 'Some measurements taken but instrument settings undocumented, or S3 record completed after S4 calculations began.',
    I: 'Nominal or datasheet values used without bench measurement. S3 record absent or backdated.' },
  { id: 'power', name: 'Power Stage & Control Calculations', marks: 20,
    C: 'Most calculations complete with S1 FRs and S3 values referenced. Minor derivation steps missing or device stress check partial.',
    D: 'Calculations present but trace to nominal values rather than S3 measurements, or FR traceability missing.',
    I: 'Component values copied from a reference design or tutorial kit. No derivation from S1 FRs or S3 measurements.' },
  { id: 'sensing', name: 'Sensing Design & Pre-Measurement Predictions', marks: 10,
    C: 'S5-PRE signed before power-on with most predictions documented. Minor gaps in sensing chain justification.',
    D: 'S5-PRE predictions present but signed after first power-on, or sensing resolution not verified against FR.',
    I: 'S5-PRE absent or completed retrospectively. No pre-measurement predictions. Sensing chain not designed.' },
  { id: 'embedded', name: 'Embedded Implementation & Software', marks: 10,
    C: 'Embedded software functions correctly with adequate documentation. Minor gaps in code structure or explanation.',
    D: 'Software achieves basic functionality but lacks modularity, inline comments, or engineering explanation.',
    I: 'Code copied or undocumented. Team cannot explain program logic, interrupt structure, or control implementation.' },
  { id: 'closed', name: 'Closed-Loop Performance Validation', marks: 15,
    C: 'Closed-loop performance validated with measurable results. Minor gaps in comparison to baseline, transient analysis or gap attribution.',
    D: 'Basic operation confirmed at one operating point; key FR quantities not measured; no quantitative transient or before/after comparison.',
    I: '"It works" accepted as validation. No quantitative measurements against any FR.' },
  { id: 'testing', name: 'Testing, Debugging & Improvement', marks: 10,
    C: 'Testing and debugging documented with minor gaps in root-cause analysis or corrective actions.',
    D: 'Limited testing performed. Debugging log has fewer than two completed cycles, or root causes not traced to S3/S4 parameters.',
    I: 'No debugging log, or log records only successful outcomes. No evidence of systematic failure investigation.' },
  { id: 'artefact', name: 'Final Working Artefact', marks: 5,
    C: 'Artefact performs reliably with only minor performance limitations under demonstration conditions.',
    D: 'Artefact demonstrates partial functionality with inconsistent performance against FR targets.',
    I: 'Artefact non-functional or fails to satisfy minimum functional requirements under demonstration.' },
  { id: 'viva', name: 'Individual Viva', marks: 5,
    C: 'Most members explain their assigned S2 block with good conceptual understanding and minor assistance.',
    D: 'Team members demonstrate partial understanding with dependence on teammates or worksheets.',
    I: 'Members cannot explain their assigned block or justify any design decision independently.' }
];

/* ---------------------------------------------------------------------------
 * REVIEWS (Handbook 7.1, 7.2) — marks distribution + gate criteria
 * ------------------------------------------------------------------------- */
var REVIEWS = [
  { id: 'R1', name: 'Review 1 — S1 Specification & S2 Architecture', marks: 10, timing: 'Weeks 3–4', stages: ['S1', 'S2'], rubric: ['sfd'], debugMin: 0, hardGate: false,
    protects: 'Ensures all FRs are quantified and the SFD with governing equations exists before any component or topology decision is made.',
    gate: ['Artefact-based theme stated with academic subtitle',
           'All S1 FRs quantified with number, unit, and measurement method',
           'SFD started with at least three functional blocks, each labelled with governing equation, FR, and course',
           'Date on FR table pre-dates any schematic decision'] },
  { id: 'R2', name: 'Review 2 — S3 Plant Model & S4 Power Stage', marks: 15, timing: 'Weeks 5–7', stages: ['S3', 'S4'], rubric: ['plant', 'power'], debugMin: 0, hardGate: false,
    protects: 'Ensures plant parameters are measured — not assumed — and power-stage components are derived from S3 measurements and S1 FRs, not from a tutorial kit.',
    gate: ['S3 plant characterisation record complete with measured (not nominal) values for all critical parameters',
           'S4 power-stage calculations started with derivations traceable to S3 measurements and S1 FRs',
           'Every active device stress-checked against datasheet voltage and current ratings'] },
  { id: 'R3', name: 'Review 3 — S5 Sensing & Open-Loop Build (HARD GATE)', marks: 20, timing: 'Weeks 8–10', stages: ['S5PRE', 'S5BUILD'], rubric: ['sensing', 'embedded'], debugMin: 1, hardGate: true,
    protects: 'Ensures sensing resolution is verified against FR before integration; the S5-PRE worksheet is signed before power-on; the debugging log is opened.',
    gate: ['S5 sensing design verified against FR at minimum operating point',
           'S5-PRE Predicted Performance worksheet signed and dated before first power-on',
           'Open-loop characterisation completed and compared to S3/S4 predictions with gap analysis',
           'Debugging log opened with minimum one completed cycle'] },
  { id: 'R4', name: 'Review 4 — S6 Control Design & Integration', marks: 20, timing: 'Weeks 11–13', stages: ['S6'], rubric: ['closed', 'embedded'], debugMin: 2, hardGate: false,
    protects: 'Ensures the Bode plot and closed-loop predictions are produced before first closed-loop power-on; at least one control-loop failure is documented.',
    gate: ['S6 Bode plot of open-loop T(s) with phase margin annotated at designed gains',
           'Predicted step response (rise time, overshoot, settling time) stated and checked against S1 FRs before closed-loop power-on',
           'Closed-loop step-load test captured',
           'Debugging log has minimum two completed cycles, at least one a control-loop or feedback-path failure'] },
  { id: 'FINAL', name: 'Final Review — S7 Validation & Improvement', marks: 20, timing: 'Week 15', stages: ['S7', 'S7VIVA'], rubric: ['testing', 'artefact', 'viva'], debugMin: 3, hardGate: false,
    protects: 'Ensures every FR is verified by measurement with predicted-vs-measured comparison; at least one documented improvement with before-and-after data.',
    gate: ['FR verification table complete — every S1 FR checked by measurement against its quantified target',
           'Minimum one documented improvement after testing with before-and-after measurements',
           'Debugging log complete with minimum three cycles',
           'S7-VIVA individual reflection authored individually by every member',
           'Complete documentation package submitted'] }
];
var EXTRA_MARKS = [
  { id: 'VIVA', name: 'Individual Viva (per student)', marks: 10, timing: 'Week 15' },
  { id: 'ARTEFACT', name: 'Final Working Artefact', marks: 5, timing: 'Week 15' }
];

/* Handbook 7.3 — The Reviewer's Five Lenses */
var LENSES = [
  { n: 1, name: 'Functional Requirement', q: 'Which functional requirement does this component or decision satisfy?' },
  { n: 2, name: 'Signal Flow & Course Integration', q: 'Which functional block in the S2 SFD does this belong to, and which foundational course taught the governing equation of that block?' },
  { n: 3, name: 'Driving Calculation', q: 'Show the calculation that sized this component, traceable from S1 FR to S3 measured value to standard value chosen.' },
  { n: 4, name: 'Predicted vs Measured', q: 'What did you predict before first power-on, what did you measure, and which S3 or S4 model parameter explains the gap?' },
  { n: 5, name: 'Failure and Root Cause', q: 'What failed, and what was your process for tracing the root cause to a specific S3, S4, or S6 model parameter?' }
];

/* ---------------------------------------------------------------------------
 * Column helpers
 * ------------------------------------------------------------------------- */
function col_(id, label, opt) { var c = { id: id, label: label, type: 'text' }; for (var k in (opt || {})) c[k] = opt[k]; return c; }
var PASSFAIL = ['', 'Pass', 'Fail'];
var YESNO = ['', 'Yes', 'No'];
var STAGE_MISSED = ['', 'S3 characterisation', 'S4 design', 'S5 sensing', 'S6 control', 'Other'];

/* ---------------------------------------------------------------------------
 * DEFAULT PORTFOLIO STRUCTURE (Handbook Ch. 4 + Ch. 8 worksheets)
 *  Section types: info | fields | table | evidence
 *  Flags:
 *    individual  → each student keeps own copy (reflections, S7-VIVA)
 *    lock        → team sign-off freezes non-"post" content (date-auditable)
 *    post:true   → column/field remains editable after lock (measured results)
 *    rowsFrom    → pre-fill rows ('theme:sfdBlocks', 'theme:s3Params', 'S1.fr', or array)
 *    minRows     → number or 'theme:minFR'
 * ------------------------------------------------------------------------- */
function defaultStages_() {
  return [
    {
      id: 'PROFILE', code: 'P', order: 0, title: 'Project Profile', review: '', due: 'Before Review 1',
      purpose: 'Theme, engineering artefact, academic subtitle and member ownership of S2 blocks. Theme choice is restricted to the six Department themes; the artefact sets the topology, never the evidence required.',
      sections: [
        { id: 'P-THEME', title: 'Theme & Artefact (set by Admin)', type: 'info', info: 'theme:summary' },
        { id: 'P-NEED', title: 'Project Statement', type: 'fields', fields: [
          { id: 'title', label: 'Artefact-based project title', type: 'text', hint: 'Artefact, not application — e.g. "Buck Converter System", not "Phone charger"' },
          { id: 'application', label: 'Application context (why this artefact matters)', type: 'textarea' },
          { id: 'spec', label: 'Application specification (V_in range, load range, speed range, thresholds…)', type: 'textarea', hint: 'Dependency chain: this is what you must know before starting S1.' }
        ] },
        { id: 'P-WEB', title: 'Project Website (.html file)', type: 'evidence', accept: '.html,.htm', optional: true,
          desc: 'Upload your project website as a single .html file (put images inside it or link them). Everyone in your team and your guides can open it with "View website".' },
        { id: 'P-ROLES', title: 'Member Ownership of S2 Functional Blocks', type: 'table', desc: 'Each member must independently explain their own S2 block at the Individual Viva.', columns: [
          col_('member', 'Member (name / USN)'), col_('block', 'S2 functional block owned'), col_('responsibility', 'Responsibilities', { type: 'textarea' })
        ], minRows: 3 }
      ]
    },
    {
      id: 'S1', code: 'S1', order: 1, title: 'Need Definition & Functional Requirements', review: 'R1', due: 'Review 1 — Week 4', rubric: 'sfd',
      purpose: 'State every performance target — with a number and a unit — before you select a topology, draw a schematic, or order a component. Every FR carries a number, unit, measurement method, and source. Minimum 5 FRs; Themes 5 and 6 require minimum 6.',
      sections: [
        { id: 'S1-A', title: 'Part A — Vague Objective vs Functional Requirement', type: 'info', info: 'theme:frExample' },
        { id: 'S1-B', title: 'Part B — Functional Requirements Table', type: 'table', lock: { label: 'Freeze & date FR table (must pre-date any schematic decision)' },
          desc: 'Every FR: quantified target (number + unit), measurement method (instrument + test condition), and source (application spec / datasheet / IEC standard — not "we decided it should be X").',
          columns: [
            col_('no', 'FR No.', { width: 70 }),
            col_('statement', 'Functional Requirement Statement', { type: 'textarea', hint: 'The system must [verb] [condition] across [range].' }),
            col_('target', 'Quantified Target (number + unit)'),
            col_('method', 'Measurement Method (instrument + test condition)', { type: 'textarea', hint: 'If you cannot name the instrument now, this FR is not yet testable.' }),
            col_('source', 'Source', { type: 'textarea', hint: 'Application spec / cell datasheet / IEC standard' })
          ], rowsFrom: ['FR1', 'FR2', 'FR3', 'FR4', 'FR5', 'FR6', 'FR7'], minRows: 'theme:minFR' },
        { id: 'S1-C', title: 'Part C — Thinking About Your FRs', type: 'fields', fields: [
          { id: 'tech', label: 'Could a lab technician who has never seen the project measure pass/fail for each FR? Identify one FR you needed to rewrite and show the rewrite.', type: 'textarea' },
          { id: 'hardest', label: 'Which FR is hardest to measure? What instrument is needed? Is it available in the lab? If not, how will you verify it?', type: 'textarea' }
        ] },
        { id: 'S1-D', title: 'Part D — Reflection (individual)', type: 'fields', individual: true, fields: [
          { id: 'q1', label: 'A design without quantified FRs has no success criterion. Explain what happens to the compensation/control design (S6) if the step-load response FR is not quantified before S6 begins. Use your specific numbers.', type: 'textarea' }
        ] },
        { id: 'S1-E', title: 'FR Change Record', type: 'table', desc: 'Once recorded at S1, FRs do not change without a documented reason.', columns: [
          col_('date', 'Date', { type: 'date' }), col_('fr', 'FR No.'), col_('old', 'Previous value'), col_('new', 'New value'), col_('reason', 'Documented reason', { type: 'textarea' })
        ], minRows: 0 }
      ]
    },
    {
      id: 'S2', code: 'S2', order: 2, title: 'Functional Architecture & Signal Flow Diagram', review: 'R1', due: 'Review 1 — Week 4', rubric: 'sfd',
      purpose: 'Decompose the system into functional blocks. For each block: function, input and output signals with range, governing equation, FR satisfied, and the foundational course that taught the equation. The SFD is an equation-level architecture map — not a circuit schematic.',
      sections: [
        { id: 'S2-A', title: 'Part A — Required Signal Flow Structure for Your Theme', type: 'info', info: 'theme:sfd' },
        { id: 'S2-T', title: 'SFD Block Labelling (all six required elements)', type: 'table', rowsFrom: 'theme:sfdBlocks', columns: [
          col_('block', 'Functional Block'), col_('function', 'Function', { type: 'textarea' }),
          col_('input', 'Input signal & range'), col_('output', 'Output signal & range'),
          col_('equation', 'Governing equation / transfer function', { type: 'textarea' }),
          col_('fr', 'FR satisfied'), col_('course', 'Foundational course')
        ], minRows: 3 },
        { id: 'S2-FB', title: 'Feedback Path', type: 'fields', fields: [
          { id: 'feedback', label: 'Describe the feedback path(s) of your SFD (signal, sensing block, where it returns).', type: 'textarea' }
        ] },
        { id: 'S2-B', title: 'Part B — Signal Flow Diagram (attach)', type: 'evidence', desc: 'Hand-drawn acceptable at Review 1; digital submission required at Review 2. Must be your own work — not copied from a textbook.' },
        { id: 'S2-C', title: 'Part C — Interface Table', type: 'table', desc: 'One row for every signal that crosses a block boundary. Signals not in this table are signals you have not designed.', columns: [
          col_('from', 'From block'), col_('to', 'To block'), col_('signal', 'Signal name'), col_('range', 'Expected range / type'),
          col_('constraint', 'Design constraint — why this range?', { type: 'textarea' }), col_('fr', 'FR satisfied')
        ], minRows: 5 },
        { id: 'S2-D', title: 'Part D — Course Integration Map (Draft)', type: 'table', desc: 'Name the specific concept — the equation or principle — not the course title alone.', rowsFrom: 'theme:sfdBlocks', columns: [
          col_('block', 'Functional Block'), col_('course', 'Foundational Course'),
          col_('concept', 'Specific Concept (equation / principle)', { type: 'textarea', hint: 'e.g. V_out = D × V_in (volt-second balance)' }),
          col_('decision', 'Design calculation / decision in this artefact', { type: 'textarea' })
        ], minRows: 3 },
        { id: 'S2-E', title: 'Part E — Reflection (individual)', type: 'fields', individual: true, fields: [
          { id: 'q1', label: 'What is the difference between a schematic and a signal flow diagram? What does an SFD show that a schematic cannot? Use a specific example from your system.', type: 'textarea' },
          { id: 'q2', label: 'Point to any block in your SFD. If its governing equation were different (e.g. different topology), how would that change the design of the control block (S6)?', type: 'textarea' }
        ] }
      ]
    },
    {
      id: 'S3', code: 'S3', order: 3, title: 'Plant / System Identification & Characterisation', review: 'R2', due: 'Review 2 — Week 7', rubric: 'plant',
      purpose: 'Measure — do not assume — the parameters S4 calculations depend on. Nominal BOM values are starting points, not plant parameters. Record instrument, setting and result for every measurement. The S3 record must be dated before any S4 derivation.',
      sections: [
        { id: 'S3-A', title: 'Part A — What Must Be Measured (your theme)', type: 'info', info: 'theme:s3' },
        { id: 'S3-B', title: 'Part B — Plant Characterisation Record', type: 'table', rowsFrom: 'theme:s3Params', lock: { label: 'Sign & date S3 record (before S4 derivations begin)' }, columns: [
          col_('param', 'Parameter measured'), col_('method', 'Method & instrument setting', { type: 'textarea' }),
          col_('nominal', 'Nominal value (datasheet / calc)'), col_('measured', 'Measured value (bench)'),
          col_('discrepancy', 'Discrepancy — what does it tell you?', { type: 'textarea' }),
          col_('feeds', 'S4 / S6 calculation it feeds', { type: 'textarea' }), col_('date', 'Date measured', { type: 'date' })
        ], minRows: 3 },
        { id: 'S3-C', title: 'Part C — Plant Model Statement (measured values only)', type: 'fields', fields: [
          { id: 'template', label: 'Theme template', type: 'info', info: 'theme:plantModel' },
          { id: 'model', label: 'Your plant model / transfer function with measured values', type: 'textarea' }
        ] },
        { id: 'S3-EV', title: 'Bench Evidence (photos, scope captures, data files)', type: 'evidence' },
        { id: 'S3-D', title: 'Part D — Reflection (individual)', type: 'fields', individual: true, fields: [
          { id: 'q1', label: 'Which S3 measurement differed most from nominal? What does this tell you about the concept the nominal value came from — and what would have happened to your S4/S6 design with the nominal value?', type: 'textarea' },
          { id: 'q2', label: 'Name one specific consequence in your project if you had not measured your plant parameters. Which FR would have been affected?', type: 'textarea' }
        ] }
      ]
    },
    {
      id: 'S4', code: 'S4', order: 4, title: 'Power Stage, Compensation & Control Design', review: 'R2', due: 'Review 2 — Week 7', rubric: 'power',
      purpose: 'Derive every component value from S1 FRs and S3 measured parameters — show full substitution. Every active device stress-checked (V ≥ 1.25×, I ≥ 1.5× calculated stress). State the compensation crossover target BEFORE deriving component values.',
      sections: [
        { id: 'S4-A', title: 'Part A — Power Stage Calculations (S4a)', type: 'table', desc: 'Formula → numbers → result with units. Complete before ordering components.',
          rowsFrom: ['Duty cycle D at V_in (nom, min, max)', 'Inductor value L (from ΔI_L target in S1 FR)', 'Output capacitor C (from ΔV_out target in S1 FR)', 'Peak inductor / motor current I_peak', 'MOSFET / TRIAC voltage rating (with V_spike margin)', 'MOSFET / TRIAC current rating (×1.5 to ×3 margin)', 'Dead time t_dead (from MOSFET datasheet t_off)', 'Power loss estimate at full load (P_SW + P_cond)'],
          columns: [
            col_('param', 'Parameter'), col_('formula', 'Formula used'), col_('s3', 'S3 measurement used'),
            col_('subst', 'Full substitution', { type: 'textarea' }), col_('calc', 'Calculated value'),
            col_('std', 'Standard value chosen'), col_('fr', 'FR / S1 spec satisfied')
          ], minRows: 4 },
        { id: 'S4-S', title: 'Part A — Device Stress Check Table', type: 'table', desc: 'Margin = rating / stress ≥ 1.25 (voltage) or 1.5 (current). No device above 80% of rated stress.',
          rowsFrom: ['MOSFET / TRIAC (V_DS or V_DRM)', 'MOSFET / TRIAC (I_D or I_T)', 'Diode / Rectifier (V_R, I_F)', 'Inductor (I_sat vs I_peak)', 'Output Cap (ESR, I_rms ripple)', 'Current sense resistor (P = I²R)'],
          columns: [
            col_('device', 'Device'), col_('part', 'Part number'), col_('stress', 'Calculated stress + unit'), col_('rating', 'Datasheet rating'),
            col_('margin', 'Margin'), col_('pass', 'Pass?', { type: 'select', options: PASSFAIL }), col_('action', 'Action if fail')
          ], minRows: 3 },
        { id: 'S4-B1', title: 'Part B-1 — Design Targets BEFORE Any Calculation', type: 'table', lock: { label: 'Sign & date design targets (before component values are derived)' },
          desc: 'Your target comes from S1 FRs and the system requirement — not from component values. Crossover: f_c ≈ 5/(2π × settling time); must satisfy f_c < f_sw/5 and f_c > f_LC/3.',
          rowsFrom: ['Crossover frequency f_c or closed-loop BW', 'Target phase margin PM (or equivalent)', 'Settling time / response time target', 'Hysteresis band or dead-band width (T3/T5)', 'Bandwidth separation f_cv < 100 Hz (T4 PFC only)', 'SoC accuracy target (T6 only)'],
          columns: [
            col_('param', 'Target parameter'), col_('value', 'Your target value + unit'),
            col_('source', 'Where does this come from? (S1 FR / application / standard)', { type: 'textarea' }),
            col_('consequence', 'What happens if this target is not met?', { type: 'textarea' })
          ], minRows: 2 },
        { id: 'S4-B2', title: 'Part B-2 — Compensation / Control Type Selection', type: 'table', desc: 'Compare at least two options. Rationale must reference your S3 measured plant pole structure (f_LC, τ_m, K_plant).',
          rowsFrom: ['Type II comp — 1 zero + 2 poles', 'Type III comp — 2 zeros + 3 poles', 'PI discrete (Themes 2, 3)', 'PID discrete (Theme 2)', 'Hysteresis comparator (Themes 5, 6)', 'Firing-angle PI (Theme 3)'],
          columns: [
            col_('option', 'Option'), col_('provides', 'What it provides (zeros, poles, phase boost — own words)', { type: 'textarea' }),
            col_('suits', 'Does it suit your S3 measured plant? (cite S3 values)', { type: 'textarea' }), col_('select', 'Select?', { type: 'select', options: YESNO })
          ], minRows: 2 },
        { id: 'S4-B3', title: 'Part B-3 — Component Value Derivation', type: 'fields', fields: [
          { id: 'derivation', label: 'Show every step tracing from S3 measurements and S1 FRs to the chosen component values / gains.', type: 'textarea' }
        ] },
        { id: 'S4-EV', title: 'Calculation Sheets / Schematic', type: 'evidence' },
        { id: 'S4-C', title: 'Part C — Reflection (individual)', type: 'fields', individual: true, fields: [
          { id: 'q1', label: 'What is the relationship between crossover frequency and load-disturbance rejection speed? Use your numbers: f_c = ___ Hz → settling time ≈ ___ s.', type: 'textarea' },
          { id: 'q2', label: 'If S3 had shown a pole frequency 30% lower than expected, how would that change your B-2 selection and B-1 crossover target? Explain from the Bode plot.', type: 'textarea' }
        ] }
      ]
    },
    {
      id: 'S5PRE', code: 'S5-PRE', order: 5, title: 'Predicted Performance — Before Measurement', review: 'R3', due: 'Sign & date before first power-on (Week 8)', rubric: 'sensing',
      purpose: 'Commit to predictions derived from S3/S4 before any power-on. Every member signs; the timestamp is auditable. A worksheet signed after the measurement it predicts is a falsified record. Measured-result columns are filled only after the test.',
      sections: [
        { id: 'S5P-A', title: 'Part A — Open-Loop Performance Predictions', type: 'table', lock: { label: 'Sign & date predictions (before first power-on)', allMembers: true },
          rowsFrom: ['Switch-node V_sw — frequency', 'Switch-node V_sw — amplitude (or TRIAC conduction, T3)', 'Inductor current ripple ΔI_L (or motor I_a step, T2)', 'Output V_out at fixed D (or ω at fixed α, T3)', 'Output ripple ΔV_out or speed resolution at min speed', 'Open-loop efficiency or plant gain at 3 operating points'],
          columns: [
            col_('param', 'Open-loop parameter'), col_('cond', 'Test condition'),
            col_('derivation', 'Derivation from S3/S4 (formula + your numbers)', { type: 'textarea' }), col_('predicted', 'Predicted value'),
            col_('measured', 'Measured result (fill after test)', { post: true }), col_('gap', 'Gap analysis — which model parameter?', { type: 'textarea', post: true })
          ], minRows: 3 },
        { id: 'S5P-B', title: 'Part B — Closed-Loop Performance Predictions', type: 'table', lock: { label: 'Sign & date closed-loop predictions', allMembers: true },
          rowsFrom: ['Output V_out / speed at no load', 'Output V_out / speed at full load', 'Load or speed regulation', 'Transient: overshoot', 'Transient: settling time', 'Efficiency / THD / SoC accuracy at 50% load', 'Efficiency / THD / SoC accuracy at 100% load', 'Thermal: hottest component temperature', 'Protection: trip threshold level', 'Protection: trip response time'],
          columns: [
            col_('fr', 'S1 FR No.', { width: 70 }), col_('param', 'Performance parameter'), col_('predicted', 'Predicted value (from S4)'), col_('cond', 'Test condition'),
            col_('measured', 'Measured result', { post: true }), col_('pass', 'Pass vs S1 FR?', { type: 'select', options: PASSFAIL, post: true }), col_('gap', 'Gap analysis', { type: 'textarea', post: true })
          ], minRows: 3 },
        { id: 'S5P-C', title: 'Part C — Reflection (individual)', type: 'fields', individual: true, fields: [
          { id: 'q1', label: 'Which prediction are you least confident in? What measurement or information would increase your confidence? Why must you commit to the prediction before measuring?', type: 'textarea' }
        ] }
      ]
    },
    {
      id: 'S5BUILD', code: 'S5-BUILD', order: 6, title: 'Sensing Design, Open-Loop Build & Verification', review: 'R3', due: 'Review 3 — Weeks 9–10 (Hard Gate)', rubric: 'sensing',
      purpose: 'Verify the sensing chain against the resolution FR, build and test each subsystem independently, and compare open-loop measurements to S5-PRE. For every gap, name the S3 model parameter that was wrong. Debugging log opened: minimum one completed cycle before Review 3.',
      sections: [
        { id: 'S5B-A', title: 'Part A — Sensing Design Verification (S5)', type: 'table',
          rowsFrom: ['Speed/signal resolution at minimum operating point', 'Filter cutoff frequency ω_c_filt', 'Sensor output at minimum operating point (vs ADC LSB)', 'Sensor output at maximum operating point (vs ADC V_ref)', 'Scaling/gain: V_sensor(max) ≤ V_ref; V_sensor(min) > LSB', 'Calibration: 2-point offset and gain correction applied?'],
          columns: [
            col_('param', 'Sensing parameter'), col_('fr', 'S1 FR requirement'), col_('design', 'Your design value'), col_('measured', 'Measured at bench'),
            col_('meets', 'Meets FR?', { type: 'select', options: YESNO }), col_('notes', 'Notes / fix', { type: 'textarea' })
          ], minRows: 3 },
        { id: 'S5B-PWR', title: 'First Power-On Record', type: 'fields', desc: 'Recorded so reviewers can confirm S5-PRE was signed before first power-on.', fields: [
          { id: 'date', label: 'Date of first power-on', type: 'date' },
          { id: 'notes', label: 'Conditions at first power-on (supply, load, current limit, probes)', type: 'textarea' }
        ] },
        { id: 'S5B-B', title: 'Part B — Open-Loop Verification (S5-BUILD)', type: 'table', desc: 'Compare to S5-PRE. For every gap explain which S3/S4 model parameter caused it.',
          rowsFrom: ['V_sw frequency / firing angle timing', 'V_sw amplitude / V_rms at nominal α', 'ΔI_L ripple (or I_a at step)', 'V_out / speed at nominal D or α (open loop)', 'ΔV_out ripple / ZCD jitter', 'Plant gain at 3 operating points'],
          columns: [
            col_('test', 'Test'), col_('predicted', 'Predicted (S5-PRE)'), col_('measured', 'Measured'),
            col_('pass', 'Pass?', { type: 'select', options: PASSFAIL }), col_('gap', 'Gap analysis — which S3/S4 parameter?', { type: 'textarea' })
          ], minRows: 3 },
        { id: 'S5B-EV', title: 'Open-Loop Evidence (waveforms, captures, photos)', type: 'evidence' }
      ]
    },
    {
      id: 'S6', code: 'S6', order: 7, title: 'Closed-Loop Integration & Validation', review: 'R4', due: 'Review 4 — Weeks 11–13', rubric: 'closed', gate: 'R3',
      purpose: 'Derive T(s) = G(s)×H(s) from the S3 plant model and S4/S5 sensing chain; plot the Bode diagram with crossover and phase margin at the designed gains; state the predicted step response before first closed-loop power-on. Then capture the closed-loop step-load response and explain the gap in terms of an S3 parameter. Unlocks only after the Review 3 hard gate is cleared.',
      sections: [
        { id: 'S6-A', title: 'Loop Model & Predictions (before closed-loop power-on)', type: 'fields', lock: { label: 'Sign & date loop predictions (before closed-loop power-on)', allMembers: true }, fields: [
          { id: 'ts', label: 'Open-loop transfer function T(s) = G(s) × H(s) with measured values', type: 'textarea' },
          { id: 'fc', label: 'Crossover frequency f_c at designed gains', type: 'text' },
          { id: 'pm', label: 'Phase margin at designed gains', type: 'text' },
          { id: 'gains', label: 'Designed compensation / PID / PI values', type: 'textarea' },
          { id: 'rise', label: 'Predicted rise time', type: 'text' },
          { id: 'os', label: 'Predicted overshoot', type: 'text' },
          { id: 'settle', label: 'Predicted settling time', type: 'text' },
          { id: 'check', label: 'Check of predictions against S1 FRs', type: 'textarea' }
        ] },
        { id: 'S6-BODE', title: 'Bode Plot (annotated crossover & phase margin)', type: 'evidence' },
        { id: 'S6-C', title: 'Part C — Closed-Loop Verification (S6 evidence)', type: 'table', desc: 'Identify which design stage (S3 plant model, S4 power stage, S5 sensing, S6 control) caused each discrepancy.',
          rowsFrom: ['Regulation at no load', 'Regulation at full load', 'Load / line / speed regulation', 'Transient overshoot', 'Settling time', 'Efficiency / THD / SoC at 50% load', 'Efficiency / THD / SoC at 100% load', 'Protection trip threshold', 'Protection trip response time', 'Thermal at full load'],
          columns: [
            col_('fr', 'S1 FR', { width: 70 }), col_('param', 'Parameter tested'), col_('predicted', 'S5-PRE prediction'), col_('measured', 'Measured result'),
            col_('pass', 'Pass vs S1 FR?', { type: 'select', options: PASSFAIL }), col_('stage', 'Design stage that caused the gap', { type: 'select', options: STAGE_MISSED })
          ], minRows: 3 },
        { id: 'S6-STEP', title: 'Closed-Loop Step-Load Capture (oscilloscope)', type: 'evidence' },
        { id: 'S6-E', title: 'Part E — Reflection (individual)', type: 'fields', individual: true, fields: [
          { id: 'q1', label: 'What did building and testing teach you that S3–S6 calculations alone could not? Name one wrong prediction, the S3/S4 parameter that caused it, and how you would change the design cycle to catch it earlier.', type: 'textarea' }
        ] }
      ]
    },
    {
      id: 'DEBUG', code: 'LOG', order: 8, title: 'Debugging & Failure Log', review: 'R3, R4, Final', due: '≥1 cycle by R3 · ≥2 by R4 · ≥3 by Final', rubric: 'testing',
      purpose: 'Debugging is assessed as a distinct engineering skill. A log with no failures means genuine integration never happened. Write exact symptoms with measured values, trace root causes to S3/S4/S5/S6 model parameters, and name the course concept each failure illustrates.',
      sections: [
        { id: 'LOG-EX', title: 'Valid vs Invalid Entry — Your Theme', type: 'info', info: 'theme:debug' },
        { id: 'LOG-T', title: 'Debugging Log (Part D)', type: 'table', minRows: 0, columns: [
          col_('date', 'Date / Week', { type: 'date' }),
          col_('symptom', 'Symptom (exact, with measured value)', { type: 'textarea', hint: 'Not "it did not work" but "V_out drops 0.8 V when load exceeds 800 mA"' }),
          col_('block', 'Suspected S2 block (and why)', { type: 'textarea' }),
          col_('test', 'Test performed', { type: 'textarea' }),
          col_('root', 'Root cause found', { type: 'textarea', hint: 'If not found: "Under investigation" + next test planned' }),
          col_('stage', 'Stage that missed this', { type: 'select', options: STAGE_MISSED }),
          col_('fix', 'Correction applied', { type: 'textarea' }),
          col_('learning', 'Learning derived (course concept + equation)', { type: 'textarea' }),
          col_('status', 'Cycle status', { type: 'select', options: ['', 'Completed', 'Under investigation'] })
        ] },
        { id: 'LOG-EV', title: 'Debugging Evidence', type: 'evidence' }
      ]
    },
    {
      id: 'S7', code: 'S7', order: 9, title: 'Validation, Debugging & Improvement', review: 'FINAL', due: 'Final Review — Week 15', rubric: 'testing', gate: 'R3',
      purpose: 'Measure every S1 FR against its quantified target. Produce the FR verification table (predicted, measured, deviation, pass/fail). Implement at least one documented improvement driven by test evidence and re-measure. Debugging log must have minimum three completed cycles.',
      sections: [
        { id: 'S7-A', title: 'Part A — Full FR Verification Table', type: 'table', rowsFrom: 'S1.fr', columns: [
          col_('fr', 'S1 FR No.', { width: 70 }), col_('statement', 'FR statement (abbrev.)'), col_('target', 'S1 quantified target'), col_('predicted', 'S5-PRE prediction'),
          col_('measured', 'Measured result (value + unit + instrument)', { type: 'textarea' }), col_('gap', 'Gap = Measured − Predicted'),
          col_('pass', 'Pass vs S1 target?', { type: 'select', options: PASSFAIL }), col_('root', 'Root cause of gap (S3/S4/S5/S6 parameter)', { type: 'textarea' })
        ], minRows: 'theme:minFR' },
        { id: 'S7-B', title: 'Part B — Documented Improvement (mandatory)', type: 'fields', desc: 'Based on root-cause analysis — not trial-and-error component change.', fields: [
          { id: 'fr', label: 'FR improved', type: 'text' },
          { id: 'before', label: 'Before (measured value)', type: 'text' },
          { id: 'after', label: 'After (measured value)', type: 'text' },
          { id: 'root', label: 'Root cause analysis (which S3/S4/S5/S6 parameter was wrong, and why?)', type: 'textarea' },
          { id: 'fix', label: 'Correction applied (specific change — not "adjusted until it worked")', type: 'textarea' },
          { id: 'status', label: 'FR now', type: 'select', options: ['', 'Pass', 'Still Fail'] },
          { id: 'reason', label: 'If still failing — reason', type: 'textarea' }
        ] },
        { id: 'S7-C', title: 'Part C — Thermal Analysis (10-min full load)', type: 'table',
          rowsFrom: ['Main MOSFET / TRIAC (case)', 'Diode / Rectifier (case)', 'Inductor core (surface)', 'Output capacitor (case)', 'Other (identify)'],
          columns: [
            col_('comp', 'Component'), col_('rated', 'Max rated temp (datasheet)'), col_('measured', 'Measured temp'), col_('margin', 'Thermal margin'),
            col_('action', 'Action required?', { type: 'select', options: ['', 'None', 'Heatsink', 'Derate', 'Check I_rms', 'Other'] })
          ], minRows: 2 },
        { id: 'S7-RTH', title: 'Heatsink Calculation (if required)', type: 'fields', fields: [
          { id: 'rth', label: 'R_th(needed) = ΔT_max / P_diss = ___ / ___ = ___ °C/W', type: 'text' }
        ] },
        { id: 'S7-EV', title: 'Final Documentation Package & Validation Evidence', type: 'evidence', desc: 'Report, final schematics/layout, code repository link or archive (with Git history where required), datasets, demo video.' }
      ]
    },
    {
      id: 'S7VIVA', code: 'S7-VIVA', order: 10, title: 'Individual Learning Reflection', review: 'FINAL', due: 'Final Review — Week 14', rubric: 'viva',
      purpose: 'Authored individually by every member. Identical answers across members are an integrity signal. Answers must be specific to your own S2 block, S3 measurements and debugging experience. At least 5 sentences per question.',
      sections: [
        { id: 'V-A', title: 'Part A — Your Individual Course Integration Map (Final)', type: 'table', individual: true, columns: [
          col_('decision', 'Design decision you made', { type: 'textarea' }), col_('block', 'Your S2 block'), col_('course', 'Foundational course'),
          col_('equation', 'Specific equation / principle', { type: 'textarea' }), col_('s3', 'S3 measurement that informed it (value)'), col_('s7', 'Verified at S7 — FR No. & measured value')
        ], minRows: 3 },
        { id: 'V-B', title: 'Part B — Individual Learning Reflection', type: 'fields', individual: true, minSentences: 5, fields: [
          { id: 'q1', label: 'Q1 (S3 Learning): What did you understand after measuring your plant parameters that you did not understand after studying the course? Name the parameter, measured value, nominal value, and what the discrepancy taught you.', type: 'textarea' },
          { id: 'q2', label: 'Q2 (S4 Derivation): Derive one component value from first principles — from your S1 FR to the standard value chosen. State assumptions and the S3 measurement used.', type: 'textarea' },
          { id: 'q3', label: 'Q3 (Debugging — Root Cause): Describe the most instructive failure in your S2 block: exact symptom, investigation, root cause, stage that missed it, course concept.', type: 'textarea' },
          { id: 'q4', label: 'Q4 (S7 Predicted-vs-Measured): Which S1 FR had the largest S5-PRE vs S7 gap? Which S3/S4 assumption caused it? Which stage would you change to catch it earlier?', type: 'textarea' },
          { id: 'q5', label: 'Q5 (Integration): What does building and measuring a complete feedback-control system teach you that the individual courses could not?', type: 'textarea' }
        ] }
      ]
    }
  ];
}

/* ---------------------------------------------------------------------------
 * Condensed handbook knowledge used as AI Mentor context
 * ------------------------------------------------------------------------- */
var HANDBOOK_PRINCIPLES = [
  'This handbook is a framework for thinking, not a collection of ready-made tables. Blank cells are the point; a handbook (or mentor) that provides the answers defeats the purpose of the course.',
  'Artefact, not application: themes are engineering artefacts (e.g. Buck Converter System), not applications (e.g. phone charger).',
  'Corollary 1 — Power flows must be designed, not discovered: duty cycles, inductor values, firing angles, thresholds, balancing currents are derived before build and verified by bench measurement.',
  'Corollary 2 — Closing the loop is the pedagogical event: the transition from open-loop characterisation (S3/S4) to closed-loop operation (S6) produces instability, ringing, windup, false trips. A debugging log with no failures means integration never happened.',
  'Corollary 3 — Measurement is the language of the discipline: "It works" is not an EEE sentence. Predicted values must be recorded before measurement; the predicted-vs-measured gap is where learning lives.',
  'Functional requirement = quantified statement of what the system must do (number, unit, measurement method, source). Not a topology decision and not a calculation.',
  'Plant characterisation: measure L, C, τ_m, thresholds etc. on the bench before S4 calculations; nominal values diverge from measured values in ways that change design decisions.',
  'Dependency chain S1→S2→S3→S4→S5→S6→S7: no stage may be skipped or back-filled. S5-PRE signed after power-on is a falsified record.',
  'Debug log fields: Date/Week; Symptom (exact, measured); Suspected S2 block and why; Test performed; Root cause (not symptom); Correction applied; Learning derived (course concept, prevention).',
  'Calibration: a team with an impressive artefact whose members cannot answer the Five Lenses should not score above 50/100.',
  'Ethics: reuse of reference designs, eval schematics or libraries must be declared; undeclared reuse is an integrity violation.'
];
