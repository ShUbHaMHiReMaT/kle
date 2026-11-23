/* ============================================================================
 *  Books.gs — BUILT-IN TEXTBOOK STUDY NOTES (no runtime reading of PDFs)
 *
 *  Short study notes written from the department's core textbooks and battery
 *  references. They come with the portal, so the AI Mentor never has to read a
 *  PDF: quizzes and answers are fast and never time out.
 *
 *  For each book:
 *    title   — how the book is named to students (and in "Question source")
 *    why     — what this book is the right reference for (the AI says this)
 *    themes  — which mini-project themes use it (T1..T6)
 *    common  — notes useful for every theme that uses the book
 *    byTheme — extra notes for one theme
 *  Notes are summaries in our own words with chapter/section pointers, so a
 *  student can open the book at the right place. Plain text only (no LaTeX).
 *
 *  Battery themes (T5, T6) use ONLY the six battery references.
 *  To add a book later: add one entry below in the same shape, save, and
 *  redeploy (Deploy → Manage deployments → Edit → New version).
 * ========================================================================== */
var BOOKS = [
  /* ---------------------------------------------------------------- T1–T4 */
  {
    id: 'HART',
    title: 'Power Electronics — Daniel W. Hart',
    file: 'Power_Electronics_Daniel_Hart.pdf',
    themes: ['T1', 'T2', 'T3', 'T4'],
    why: 'the main reference for how a power-electronic circuit works: converter equations, component sizing (L, C, switches), PWM, phase control, power factor and THD',
    common: [
      '- Steady-state rules (Ch.2.3): average inductor voltage = 0 and average capacitor current = 0 over one switching period — every converter equation starts from these.',
      '- Power factor (Ch.2.6, 2.8): pf = P / (Vrms · Irms). With a sine voltage and distorted current, pf = (I1,rms / Irms) · cos θ1 = distortion factor × displacement factor, and pf = cos θ1 / √(1 + THD²).',
      '- THD (Ch.2.8): THD = √(sum of I_n,rms² for n ≥ 2) / I1,rms.',
      '- Switch selection (Ch.1.4–1.5): MOSFET for low-voltage, high-frequency switching; IGBT for higher voltage/current; SCR/TRIAC for line-frequency phase control.',
      '- Gate drive, snubbers, heat sinks (Ch.10): the gate driver must source and sink gate charge fast to switch quickly; junction temperature Tj = Ta + P · (RθJC + RθCS + RθSA) must stay below Tj,max; for slow pulses use transient thermal impedance, not average power (Ch.10.8).'
    ].join('\n'),
    byTheme: {
      T1: [
        '- Buck (Ch.6.3): Vo = D · Vs; inductor ripple ΔiL = (Vs − Vo) · D / (L · f); continuous conduction needs L > Lmin = (1 − D) · R / (2f); output ripple ΔVo/Vo = (1 − D) / (8 · L · C · f²).',
        '- Boost (Ch.6.5): Vo = Vs / (1 − D); Lmin = D · (1 − D)² · R / (2f); ΔVo/Vo = D / (R · C · f).',
        '- Buck–boost (Ch.6.6): Vo = −Vs · D / (1 − D) (output polarity reversed); ΔVo/Vo = D / (R · C · f).',
        '- Design practice (Ch.6.4): choose L about 25 % above Lmin, or set ΔiL ≈ 40 % of the average inductor current; inductor wire rated for RMS current and the core must not saturate at peak current; capacitor ESR ripple ΔVo,ESR = ΔiC · rC often dominates; higher switching frequency shrinks L and C but increases switching loss and heat.',
        '- Synchronous rectification (Ch.6.3): a second MOSFET replaces the diode for lower loss; both MOSFETs must never be on together → dead time.',
        '- Non-ideal converter (Ch.6.10): switch drop and inductor resistance lower Vo and efficiency; discontinuous mode (Ch.6.11) changes the Vo–D relation.',
        '- Flyback (Ch.7.3): Vo = Vs · (D / (1 − D)) · (N2 / N1); magnetising inductance Lm decides CCM/DCM; switch stress ≈ Vs + Vo · N1/N2; used mostly at low power. Forward (Ch.7.4): Vo = Vs · D · (N2 / N1) and needs core reset, which limits D.',
        '- Power-supply control (Ch.7.13): error amplifier compares Vo with a reference and sets the duty ratio; for a stable loop: high gain at low frequency, low gain at the switching frequency, phase margin at least 45°; Type II / Type III error-amplifier compensation; crossover frequency well below fsw.'
      ].join('\n'),
      T2: [
        '- Full-bridge (H-bridge) converter (Ch.8.2): four switches apply +Vdc, −Vdc or 0 to the load; both switches of one leg must never conduct together (shoot-through) — add dead time (Ch.6.3).',
        '- PWM (Ch.8.11–8.12): the average output follows the duty cycle; harmonics sit near the switching frequency and are filtered by the load inductance (the motor armature).',
        '- Average armature voltage: about D · Vdc for one-direction (unipolar) switching and (2D − 1) · Vdc for bipolar switching — this is your duty-to-voltage relation.',
        '- Losses and heat (Ch.10): MOSFET conduction loss = I² · RDS(on), plus switching loss that grows with frequency; check Tj with the thermal-resistance chain.'
      ].join('\n'),
      T3: [
        '- Single-phase AC voltage controller (Ch.5.2): two SCRs in anti-parallel (or one TRIAC) fired at α and π + α. With a resistive load Vo,rms = Vs,rms · √(1 − α/π + sin(2α)/(2π)), and the load power factor is the same square-root term.',
        '- With an R–L (motor) load (Ch.5.2) current continues after the voltage zero, so control only starts when α is larger than the load angle θ; below that the output is the full sine.',
        '- Harmonics (Ch.5.6): with equal α in both half-cycles the output has only odd harmonics — more motor heating and higher line THD.',
        '- Induction-motor speed control (Ch.5.4): reducing voltage works for fan-type loads; torque falls with V², so the speed range is limited.',
        '- Inverter route (Ch.8.11–8.17): full-bridge sinusoidal PWM; amplitude modulation ratio ma = Vm,control / Vm,carrier sets the fundamental, V1 = ma · Vdc for ma ≤ 1; frequency modulation ratio mf = fcarrier / freference; keep V/f constant for induction-motor speed control (Ch.8.17).'
      ].join('\n'),
      T4: [
        '- Why PFC (Ch.7.11): a diode bridge with a capacitor filter draws narrow current pulses near the voltage peak → high THD and low power factor. Measure this uncorrected baseline first (capacitor-filtered rectifier, Ch.4.2).',
        '- Boost PFC (Ch.7.11): a boost converter after the bridge forces the inductor current to follow the rectified sine; CCM PFC for higher power, DCM PFC for low power; the output (often about 400 V DC) feeds a DC–DC stage.',
        '- With current in phase with voltage, pf = 1 / √(1 + THD²) (Ch.2.8) — so lowering THD raises pf.',
        '- Two control loops (Ch.7.13 principles): a fast inner current loop tracks the sine reference; a slow outer voltage loop (bandwidth far below twice the line frequency, typically 10–20 Hz) so the 100 Hz output ripple does not distort the current reference.'
      ].join('\n')
    }
  },
  {
    id: 'GOPAL',
    title: 'Control Systems: Principles and Design — M. Gopal',
    file: 'Control Systems Principles and Design (M. Gopal).pdf',
    themes: ['T1', 'T2', 'T3', 'T4'],
    why: 'the control-design reference: plant models, PID behaviour, time and frequency specifications, compensator design with Bode plots, and digital control',
    common: [
      '- Feedback (Ch.1, Ch.4): closed loop reduces sensitivity to parameter changes and rejects disturbances; the price is possible instability.',
      '- Transfer-function models (Ch.2) and industrial devices (Ch.3), e.g. armature-controlled DC motor ω(s)/V(s) = K / [(Ra + s·La)(J·s + B) + K²], close to first order when La is small.',
      '- Time-response specifications (Ch.6), second-order system with ωn and ζ: peak overshoot Mp = e^(−π·ζ / √(1 − ζ²)); peak time tp = π / (ωn · √(1 − ζ²)); settling time ts ≈ 4 / (ζ · ωn) (2 % band); steady-state error from system type and error constants Kp, Kv, Ka.',
      '- PID modes (Ch.4): P reduces error but leaves an offset for a type-0 plant; I removes steady-state error but adds lag and overshoot; D adds damping but amplifies noise (use a filtered derivative). When the actuator saturates the integrator winds up → anti-windup (clamp or back-calculation). Ziegler–Nichols rules give a starting tune.',
      '- Stability (Ch.5): Routh criterion. Frequency response (Ch.8–9): gain margin and phase margin from Bode/Nyquist plots; more phase margin → less overshoot (roughly PM ≈ 100·ζ degrees for ζ < 0.7); higher bandwidth → faster response.',
      '- Compensator design with Bode plots (Ch.10): lead adds phase near crossover (more margin, faster); lag raises low-frequency gain (smaller steady-state error).',
      '- Digital control (Ch.11): sampling plus zero-order hold adds about half a sample period of delay (phase lag); sample about 10–20 times faster than the closed-loop bandwidth; discrete PID u[k] = Kp·e[k] + Ki·T·Σe + Kd·(e[k] − e[k−1]) / T.'
    ].join('\n'),
    byTheme: {
      T1: '- Apply to an SMPS: the converter + PWM is the plant, the error amplifier is the compensator; place crossover around fsw/10 or lower and keep phase margin ≥ 45° (Ch.9–10).',
      T2: '- Apply to the motor: find K and τ of the motor from a measured step test, then design PI/PID for a target settling time and overshoot (Ch.3, 4, 6); a position loop with an integrating plant is type-1 → zero steady-state error to a step (Ch.6).',
      T3: '- Apply to firing-angle speed control: the controller can update at most once per half-cycle (100 Hz), so keep the speed loop much slower than that (Ch.11 sampling).',
      T4: '- Apply to PFC: inner current loop much faster than the outer voltage loop — separate their bandwidths by 5–10 times or more (Ch.10).'
    }
  },
  {
    id: 'BHATTACHARYA',
    title: 'Control Systems Engineering — S. K. Bhattacharya',
    file: 'Bhattacharya S. Control Systems Engineering 3ed 2013.pdf',
    themes: ['T1', 'T2', 'T3', 'T4'],
    why: 'a second control reference with step-by-step worked examples: block diagrams, effect of feedback, steady-state error, time response, root locus, lead/lag and PID controllers',
    common: [
      '- Open loop vs closed loop and the effect of feedback (Ch.5): feedback lowers sensitivity S = 1 / (1 + G·H) to plant changes and reduces disturbance effects, at the cost of gain and possible instability.',
      '- Block diagrams (Ch.3): closed-loop transfer function C/R = G / (1 + G·H); characteristic equation 1 + G·H = 0.',
      '- Steady-state error (Ch.6.4): for unity feedback, step error ess = 1 / (1 + Kp), ramp error ess = 1 / Kv; system type = number of integrators in the loop.',
      '- First-order response (Ch.7.2): reaches 63.2 % of final value at t = τ and about 98 % at 4τ — the quick way to read τ from a measured step response.',
      '- Second-order response (Ch.7.5): underdamped, critically damped, overdamped cases; overshoot, peak time and settling time depend on ζ and ωn.',
      '- Routh–Hurwitz (Ch.8.3) and root locus (Ch.9) show how gain moves the closed-loop poles.',
      '- Bode plot (Ch.10.5): gain and phase margins read directly from the plot.',
      '- Compensation (Ch.11.3–11.6): lead, lag and lag–lead networks. PID controllers (Ch.11.8): P (type-0), PD adds a zero and improves damping, PI adds a pole at the origin and removes steady-state error, PID combines both.',
      '- Sampled-data control (Ch.15): sampler + zero-order hold; sampling too slowly destabilises a loop that is stable in continuous time.'
    ].join('\n'),
    byTheme: {
      T2: '- Servomechanism components (Ch.3.8, Ch.13): DC servo motor, tachogenerator / encoder feedback, error detector — map each to your speed or position loop block diagram.'
    }
  },
  {
    id: 'KOTHARI',
    title: 'Electric Machines — D. P. Kothari & I. J. Nagrath',
    file: 'Electric Machines 4th Edition By D P Kothari and I J Nagrath.pdf',
    themes: ['T2', 'T3'],
    why: 'the machine-theory reference: DC motor equations, speed control and dynamics, induction-motor torque–slip behaviour and single-phase motors',
    common: '- Matching machine and load (Ch.5.12): the operating point is where the motor torque–speed curve crosses the load torque–speed curve. Losses, efficiency and rating (Ch.5.10–5.11).',
    byTheme: {
      T2: [
        '- EMF and torque (Ch.7.4): Ea = Ke · φ · ω and T = Kt · φ · Ia (Ke = Kt in SI units).',
        '- Circuit model (Ch.7.5): V = Ea + Ia · Ra (plus brush drop).',
        '- Speed control (Ch.7.17): n ≈ (V − Ia·Ra) / (K·φ). Armature-voltage control gives speeds below base speed at constant torque; field weakening gives speeds above base speed at constant power. Speed regulation % = (n0 − nfl) / nfl × 100.',
        '- Dynamics (Ch.7.21): armature time constant τa = La / Ra, mechanical time constant τm = J / D; block diagram V → 1/[Ra(1 + s·τa)] → Kt → 1/[D(1 + s·τm)] → ω with back-EMF feedback Ke. Neglecting La gives a first-order model — the basis for identifying your motor from a step test.',
        '- Starting (Ch.7.16): at standstill Ea = 0, so Ia = V / Ra is very large → limit starting current (soft start or current limit).',
        '- Braking (Ch.7.18): dynamic, regenerative and plugging — needed for bidirectional / four-quadrant drives.'
      ].join('\n'),
      T3: [
        '- Induction machine (Ch.9): synchronous speed ns = 120·f / P; slip s = (ns − n) / ns; rotor copper loss = s × air-gap power, so running at high slip heats the rotor.',
        '- Torque–slip: at a given slip torque ∝ V²; near synchronous speed torque ∝ s; maximum torque occurs at s ≈ R2 / X2.',
        '- Single-phase motor (Ch.10.1–10.2): the pulsating field equals two half-amplitude fields rotating in opposite directions (double-revolving-field theory) — no starting torque without an auxiliary winding or capacitor.',
        '- Fan loads have torque ∝ speed², which is why stator-voltage control can change their speed (Ch.5.12 matching).'
      ].join('\n')
    }
  },
  {
    id: 'CHAKRABARTI',
    title: 'Electrical Machines — A. Chakrabarti & S. Debnath',
    file: 'Electrical Machines (Abhijit Chakrabarti, Sudipta Debnath).pdf',
    themes: ['T2', 'T3'],
    why: 'a second machines text with many solved problems; especially clear on DC-motor characteristics and on single-phase induction-motor speed control by voltage',
    common: '- Use the solved examples to check your own calculation steps and units.',
    byTheme: {
      T2: [
        '- Torque equation (Ch.2.17) and speed equation (Ch.2.19): N ∝ (V − Ia·Ra) / φ; speed regulation (Ch.2.20); speed–torque characteristic (Ch.2.22): a separately excited/shunt motor slows slightly and almost linearly with load.',
        '- Dynamic behaviour on loading/unloading (Ch.2.23) and during speed adjustment (Ch.2.25) — the transient you capture in a step test.',
        '- Speed control methods (Ch.2.24): armature voltage, armature resistance (wasteful), field control.',
        '- Starting circuits (Ch.2.27–2.28), electric braking (Ch.2.29), losses and efficiency (Ch.2.26): copper loss Ia²·Ra plus rotational loss.'
      ].join('\n'),
      T3: [
        '- Torque production (Ch.9.2) and equivalent circuit with forward and backward branches (Ch.9.3); parameters from no-load and blocked-rotor tests (Ch.9.4).',
        '- Starting methods (Ch.9.5–9.9): split-phase, capacitor-start, capacitor-start capacitor-run, shaded-pole.',
        '- Speed control (Ch.9.10): changing the applied voltage is the only economical method — autotransformer, series resistor, or SCR/TRIAC phase control; anti-parallel thyristors fired at α and π + α; as α goes from 0 to π the rms voltage goes from V to 0.',
        '- Single- vs three-phase (Ch.9.11): higher slip, more losses and lower efficiency because the backward field opposes the torque.',
        '- Three-phase background (Ch.8): slip (8.7), torque–slip characteristic (8.14), speed-control methods (8.19), operation at different frequencies (8.21).'
      ].join('\n')
    }
  },
  {
    id: 'WADHWA',
    title: 'Electrical Power Systems — C. L. Wadhwa',
    file: 'Electrical Power Systems by C.L.WADHWA.pdf',
    themes: ['T4'],
    why: 'the power-system view: why poor power factor and converter harmonics matter to the supply, reactive-power compensation, and the principles of over-current protection and fuses',
    common: '',
    byTheme: {
      T4: [
        '- Reactive power and compensation (Ch.21, Ch.22.1): a low power factor needs more current for the same real power → more I²R loss and voltage drop in the supply.',
        '- Converters draw reactive power and harmonics from the supply (Ch.5.12) — the reason EV chargers must correct power factor.',
        '- Protection qualities (Ch.14.2): reliability, selectivity, speed, sensitivity — apply them to the charger input protection.',
        '- Over-current relay types (Ch.14.5): instantaneous (about 0.1 s), definite-time, IDMT, very- and extremely-inverse — trip time falls as current rises.',
        '- Fuses (Ch.14.18): fuse rating < minimum fusing current; fusing factor = minimum fusing current / rating (always > 1); total operating time = pre-arcing time + arcing time; prospective current.'
      ].join('\n')
    }
  },
  /* ------------------------------------------------- Battery themes T5, T6 */
  {
    id: 'PLETT',
    title: 'Battery Management Systems Vol. I: Battery Modeling — Gregory L. Plett',
    file: 'BMS_V1_Gregory_L_Plett_2015.pdf',
    themes: ['T5', 'T6'],
    why: 'the reference for how a Li-ion cell behaves electrically: OCV, state of charge, capacity, internal resistance and the equivalent-circuit model, and how to test for them',
    common: [
      '- Basic quantities (Ch.1): nominal voltage; charge capacity Q in Ah (1 Ah = 3600 C); C-rate (1C empties the rated capacity in about 1 h, C/10 in about 10 h); energy (Wh) = voltage × Ah. Cells in series add voltage, cells in parallel add capacity.',
      '- State of charge z (Ch.2.2): 100 % full, 0 % empty; z[k+1] = z[k] − η · i[k] · Δt / Q (discharge current positive); coulombic efficiency η is about 99 % or higher for Li-ion, energy efficiency about 95 %.',
      '- Total capacity vs discharge capacity (Ch.2.2): at a higher C-rate the cell reaches its cut-off voltage earlier because of internal resistance, so measured capacity is lower.',
      '- Open-circuit voltage (Ch.2.1–2.2): the fully rested voltage; increases with SoC; needs a long rest to read.',
      '- Series resistance R0 (Ch.2.3): instant voltage jump at a current step, ΔV = R0 · ΔI → measure R0 = ΔV / ΔI from the jump.',
      '- Diffusion voltage (Ch.2.4): the slow relaxation after the jump, modelled by an R1–C1 pair (τ = R1 · C1, tens of seconds to minutes). Hysteresis (Ch.2.7): rest voltage after charging differs from after discharging at the same SoC.',
      '- Enhanced self-correcting model (Ch.2.8): v = OCV(z, T) + hysteresis − R1 · iR1 − R0 · i.',
      '- Lab tests (Ch.2.10–2.11): OCV test with very slow discharge and charge and averaging of the two curves; dynamic tests with current pulses to fit R0, R1, C1.',
      '- Temperature (Ch.2, Ch.7): parameters change with temperature — R0 rises in the cold; heat generated ≈ i² · R0.'
    ].join('\n'),
    byTheme: {
      T5: '- For protection thresholds: the voltage you measure under load = OCV − I·R0 − diffusion drop, so a UV threshold reached during a current pulse may recover at rest — a reason to add hysteresis / delay against false trips.',
      T6: '- For SoC: coulomb counting is the z[k+1] equation; correct it with OCV(z) only after a rest, because under current the terminal voltage is not the OCV.'
    }
  },
  {
    id: 'ANDREA',
    title: 'Battery Management Systems for Large Lithium-Ion Battery Packs — Davide Andrea',
    file: 'Battery Management Systems for Large Lithium-Ion Battery -- Andrea, Davide.pdf',
    themes: ['T5', 'T6'],
    why: 'the practical BMS design reference: what to measure and how accurately, protection logic, analog protection circuits, balancing and SoC evaluation',
    common: [
      '- BMS functions (Ch.3): measurement, management (protection, balancing, thermal), evaluation (SoC, resistance, capacity, SoH), communication, logging.',
      '- Voltage accuracy needed (Ch.3.1.1.3): about 100 mV to detect full/empty, about 50 mV for top balancing, 10 mV or better for SoC from OCV near the ends of the curve, about 1 mV in the flat 20–80 % region. Most BMSs achieve 10–30 mV.',
      '- Sample all cell voltages at (almost) the same time as the current when computing resistance (Ch.3.1.1.2). Keep isolation between pack voltage and low-voltage electronics (Ch.3.1.1.4).',
      '- Temperature (Ch.3.1.2): charging is allowed only in a narrower temperature range than discharging.',
      '- Protection (Ch.3.2.1): keep every cell inside its safe operating area for current, voltage and temperature; separate limits for continuous and peak, charge and discharge current; integrate the excess current so short peaks are tolerated while a short circuit trips almost at once; use an averaged minimum cell voltage for the low-voltage limit so brief dips do not cause false trips.',
      '- SoC (Ch.3.3.1): there is no direct measurement; voltage translation is poor on the flat plateau; coulomb counting drifts; combine them and recalibrate at full or empty.'
    ].join('\n'),
    byTheme: {
      T5: [
        '- Analog regulator (Ch.5.2.1): a voltage reference + comparator + resistor divider drives a shunt or a switch when the cell crosses a threshold; Zener diodes are poor at Li-ion voltages because of their soft knee and leakage (Ch.5.2.1.1).',
        '- Analog monitor (Ch.5.2.2): outputs low-voltage-limit (LVL) and high-voltage-limit (HVL) signals; a normally-closed series (daisy-chain) bus is safer than a normally-open parallel bus because a broken wire or dead cell circuit then fails safe.',
        '- Analog protector (Ch.5.2.4): a switch that interrupts the battery current on a fault.'
      ].join('\n'),
      T6: '- Digital BMS design (Ch.5.3–5.4): multiplexed cell-voltage measurement (Fig. 3.2), cell interface (Ch.5.5), and reporting/logging (Ch.3.4–3.5).'
    }
  },
  {
    id: 'ANDREA_BAL',
    title: 'Balancing (Sec. 3.2.3 extract) — Davide Andrea',
    file: 'DavideAndrea_2010_323Balancing_BatteryManagementSyst.pdf',
    themes: ['T5', 'T6'],
    why: 'the focused reference on cell balancing: why series cells drift apart, passive vs active balancing, balancing algorithms and how much balancing current is needed',
    common: [
      '- Why balance: cells in series carry the same current, so their SoC difference stays; balancing lets the lowest cell fill up without overcharging the highest.',
      '- Passive balancing burns charge in resistors (about 10 mA to 1 A); active balancing moves energy between cells (Table 3.2).',
      '- Algorithms: voltage-based (often counter-productive on the flat plateau); final-voltage / top balancing (most common — near full charge 100 mV difference is only about 1–3 % SoC); SoC-history based (balances at any time and needs less current).',
      '- Balance time [h] = ΔQ [Ah] / I_balance [A], for each cell relative to the least-charged cell.',
      '- Average balancing current = balancing current × (hours spent balancing / 24 h); e.g. 100 mA for 4 h a day ≈ 17 mA average — it must exceed the average imbalance the pack develops.',
      '- I·R drop while charging distorts the voltage readings used for balancing → pause or reduce charge current when deciding.',
      '- Bleed resistor sizing (follows from the above): R ≈ Vcell / I_balance and its power P = Vcell² / R — check resistor rating and board heating.'
    ].join('\n'),
    byTheme: {}
  },
  {
    id: 'BALAKUMAR',
    title: 'Robust Battery Management System Design with MATLAB — Balakumar Balasingam',
    file: 'Robust Battery Management System Design With MATLAB by Balakumar.pdf',
    themes: ['T6'],
    why: 'the estimation reference: OCV–SoC characterisation, coulomb-counting error sources, OCV correction (fusion), capacity and state-of-health estimation',
    common: [
      '- OCV–SoC characterisation (Ch.4.1): at a fixed temperature, discharge very slowly (about C/30) from full to empty and charge back (about 60 h in total); average the charge and discharge curves to cancel hysteresis and resistance; store as a fitted model or a table (Ch.4.2).',
      '- Coulomb counting (Ch.8.2): s(k) = s(k−1) + η · Δt · i(k) / (3600 · C_batt). Error sources: current-sensor offset and gain, integration approximation, wrong capacity, unknown efficiency η, sampling-time error — a current offset makes the SoC error grow steadily with time (drift).',
      '- OCV-based SoC (Ch.8.3): a table look-up that is valid only after rest and is very sensitive to voltage error on flat parts of the curve.',
      '- Fusion (Ch.8.4): combine coulomb counting with OCV correction so the error stays bounded.',
      '- Capacity (Ch.7): capacity = charge moved / change in SoC between two known SoC points; noise in both → use many points. State of health (Ch.3.6) = present capacity / rated capacity.',
      '- Equivalent-circuit model (Ch.3.2): R0 plus RC pairs; power limit (Ch.3.4). Thermal management (Ch.9) and charging (Ch.10): CC–CV; fast charging raises heat and causes lithium plating.'
    ].join('\n'),
    byTheme: {}
  },
  {
    id: 'DMEGC',
    title: 'INR18650-26E Cell Datasheet — DMEGC',
    file: 'DMEGC__INR18650-26E.pdf',
    themes: ['T5', 'T6'],
    why: 'the real cell limits — use these numbers (not guesses) for voltage, current and temperature thresholds and for test conditions',
    common: [
      '- Capacity 2600 mAh typical (2500 mAh minimum) at 0.2C; nominal voltage 3.65 V; charge voltage 4.2 V; discharge cut-off 2.75 V (Sec.3).',
      '- Charging (Sec.3.5, 6.1): constant current 0.5C to 4.2 V, then constant voltage until the current falls to 0.05C. Standard discharge 1C; maximum continuous discharge 3C (about 7.8 A).',
      '- AC internal resistance below 25 mΩ at 1 kHz (Sec.3.10) — use it for I·R drop and heating estimates.',
      '- Surface temperature limits (Sec.3.12): charge 0 to 50 °C; discharge −20 to 60 °C.',
      '- Capacity vs rate (Sec.6.3): 2C ≥ 90 %, 3C ≥ 85 %. Capacity vs temperature (Sec.6.2): −20 °C ≥ 70 %, −10 °C ≥ 75 %, 0 °C ≥ 80 %.',
      '- Cycle life (Sec.6.4): ≥ 80 % capacity after 1000 cycles (+0.5C / −1C at 25 °C). Shipped at 3.5–3.7 V (Sec.6.7).',
      '- Measurement requirements (Sec.5.2): voltmeter input ≥ 10 kΩ/V; voltage/current accuracy 0.5 mV / 0.5 mA; temperature ±0.5 °C.',
      '- Safety tests the cell passes (Sec.7) — over-charge to 1.5 × voltage or 1C for 1 h, external short < 100 mΩ for 10 min, 130 °C oven — are abuse tests, NOT operating limits; protection thresholds must stay inside 2.75–4.2 V and the current and temperature limits above.'
    ].join('\n'),
    byTheme: {}
  },
  {
    id: 'USABC',
    title: 'Battery Test Manual for Electric Vehicles — USABC / INL',
    file: 'USABC_new.pdf',
    themes: ['T5', 'T6'],
    why: 'the standard test procedures — how to measure capacity and resistance properly (rests, rates, pulse tests) so results are repeatable',
    common: [
      '- Purpose (Sec.1): standard characterisation and life tests for EV cells, modules and packs; targets in Table 1 (e.g. 1000 cycles, self-discharge < 1 % per month, −30 to +52 °C operation).',
      '- Rest at open circuit (at least 1 hour is the usual default) before measuring, so voltage and temperature settle (Sec.3.1).',
      '- Static capacity test (Sec.3.2): from full charge, discharge at constant C/3 to the manufacturer\'s minimum voltage; repeat until three consecutive results agree; re-rate the capacity if it differs a lot (about ±10 %) from the rating.',
      '- Hybrid Pulse Power Characterisation, HPPC (Sec.3.3): at each 10 % depth-of-discharge step apply a discharge pulse (30 s) and a regen/charge pulse (10 s) with rests, then rest 1 h; ΔV / ΔI at the start and end of each pulse gives ohmic and polarisation resistance versus SoC.',
      '- Never exceed the pulse voltage limits (Sec.3.1, App.C). Report results against depth of discharge (Sec.4).'
    ].join('\n'),
    byTheme: {}
  }
];
