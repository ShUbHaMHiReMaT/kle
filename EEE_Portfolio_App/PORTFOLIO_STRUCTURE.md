# Department Mini Project Portfolio — Structure Derived from the Handbook

**Department:** Department of Electrical & Electronics Engineering (EEE), KLE Technological University, Belagavi
**Source:** *Foundation Integration Mini Project Handbook*, Semester V, AY 2026–27, Version 3 (revised July 2026)
**Backbone:** the Seven-Stage EEE Design Cycle (S1 → S7). No stage may be skipped, and no stage may be filled in afterwards ("back-filled").

## 1. Themes (Handbook Ch. 2–3) — teams are restricted to these six

| ID | Theme | Engineering artefacts | Minimum FRs |
|---|---|---|---|
| T1 | Switch-Mode Power Supply | Buck · Boost · Buck–Boost · Isolated Forward/Flyback | 5 |
| T2 | DC Motor Speed Controller | Analog PWM Drive · µC PID Speed Controller · Bidirectional Controller | 5 |
| T3 | Single-Phase Induction Motor Speed Control | TRIAC Phase-Angle · SCR Half-Wave | 5 |
| T4 | PFC Rectifier for EV Charging | Boost PFC · Average Current-Mode PFC | 5 |
| T5 | Battery Protection System | Single-Cell Analog BPS · Multi-Cell BPS | 6 |
| T6 | Battery Management Controller | Voltage-Sensing BMC with SoC · Full BMC with Balancing & Layered Protection | 6 |

For each theme the app stores the academic subtitle, focus areas, foundational courses, core concepts, the required Signal Flow Diagram (SFD) blocks and feedback path, the S3 measurements, a plant-model template, an FR example, a valid vs invalid debugging-log example, and the competency mapping for all 9 rubric components. These are shown in context and fed to the AI Mentor.

## 2. Portfolio stages, sections and interactive records (Handbook Ch. 4 & 8)

The "Sign-off" column marks sections that are signed, dated and locked. A "post" column stays editable after locking so measured results can be filled in. "Individual" sections are written separately by each student.

| Stage | Due / Review | Sections and records | Sign-off |
|---|---|---|---|
| **Profile** | Before R1 | Theme & artefact summary (info); project statement and application spec; member ownership of SFD blocks (table) | — |
| **S1** Need Definition & FRs | R1, Wk 4 | A: vague-vs-FR example · **B: FR table** (FR No, statement, target, measurement method, source; minimum 5 or 6 rows) · C: thinking prompts · D: reflection *(individual)* · FR change record | FR table frozen and dated |
| **S2** Functional Architecture & SFD | R1, Wk 4 | Theme flow (info) · **SFD block table** (6 required elements, pre-filled with the theme's blocks) · feedback path · SFD upload · interface table · course integration map · reflection *(individual)* | — |
| **S3** Plant Identification | R2, Wk 7 | Required measurements (info) · **plant characterisation record** (nominal vs measured, discrepancy, which calculation it feeds, date; pre-filled) · plant model statement · bench evidence · reflection *(individual)* | Record signed before S4 starts |
| **S4** Power Stage & Control Design | R2, Wk 7 | S4a calculation table (8 rows) · device stress-check table · **B-1 design targets** · B-2 control-type selection · B-3 derivation · evidence · reflection *(individual)* | Targets signed before values are derived |
| **S5-PRE** Predicted Performance | Before first power-on, Wk 8 | **Open-loop predictions** (6) · **closed-loop predictions** (10) — measured / gap / pass are post columns · reflection *(individual)* | **Every member signs and is timestamped** |
| **S5-BUILD** Sensing & Open-Loop Build | R3, Wk 9–10 (hard gate) | Sensing verification table · first power-on record · open-loop verification vs S5-PRE · evidence | — |
| **S6** Closed-Loop Integration | R4, Wk 11–13 · **needs R3 cleared** | Loop model and predictions (T(s), crossover, phase margin, gains, rise/overshoot/settling) · Bode plot upload · closed-loop verification table · step-load capture · reflection *(individual)* | All members sign before closed-loop power-on |
| **Debugging & Failure Log** | ≥1 cycle by R3 · ≥2 by R4 · ≥3 by Final | Theme example (info) · log table (date, symptom, suspected block, test, root cause, stage that missed it, correction, learning, status) · evidence | — |
| **S7** Validation & Improvement | Final, Wk 15 · **needs R3 cleared** | **FR verification table** (pre-filled from the S1 FRs) · mandatory documented improvement · thermal table · heatsink calculation · final documentation package | — |
| **S7-VIVA** Individual Reflection | Final, Wk 14 | Individual course integration map *(individual)* · Q1–Q5 reflections *(individual, at least 5 sentences, with a counter)* | — |

## 3. Review and assessment requirements (Handbook Ch. 5 & 7)

| Review | Marks | Timing | What is checked |
|---|---|---|---|
| R1 — S1 & S2 | 10 | Wk 3–4 | Gate checklist (4 items) + rubric component: SFD & Integration |
| R2 — S3 & S4 | 15 | Wk 5–7 | Gate (3) + Plant Characterisation, Power Stage & Control |
| R3 — S5 (**hard gate**) | 20 | Wk 8–10 | Gate (4) + Sensing & Predictions, Embedded. Students cannot record S6/S7 until R3 is "Cleared". |
| R4 — S6 | 20 | Wk 11–13 | Gate (4) + Closed-Loop Validation, Embedded |
| Final — S7 | 20 | Wk 15 | Gate (5) + Testing/Debugging, Artefact, Viva |
| Individual Viva | 10 | Wk 15 | Marked per student |
| Final Working Artefact | 5 | Wk 15 | — |

- **Rubric bands** (Exemplary / Competent / Developing / Inadequate) are recorded per component. Each component has theme-specific descriptors, and the app suggests marks from the chosen bands.
- **The Reviewer's Five Lenses** are shown on every review form, and faculty record notes against them.
- **Automatic checks** on each review: stage completion, debugging-cycle count, FR table frozen, S5-PRE signed, plus integrity flags (S5-PRE signed after first power-on; S4 started before S3).
- **Faculty comments** can be attached to every section. Unlocking a signed section requires a written reason, which is logged.
- **Calibration note:** a team that cannot answer the Five Lenses should not score above 50 / 100.
