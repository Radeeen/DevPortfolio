---
title: License Plate Recognition at a Parliament Vehicle Gate
summary: A YOLOv8 and OCR pipeline reading Indonesian plates from a live camera feed at a DPR RI entrance, writing each vehicle to a database automatically.
date: 2024-05
tags: [data-ml]
role: Solo — internship project
team: DPR RI Secretariat General, MSIB internship programme
stack: [Python, YOLOv8, Ultralytics, OCR, MySQL, OpenCV]
metrics:
  - value: "256ms"
    label: Inference per frame
  - value: "0.95"
    label: OCR confidence, sampled plate
featured: true
confidential: false
---

## Context

Vehicles entering the DPR RI Secretariat General complex were logged by hand.
Manual logging is slow at the gate, inconsistent in what it records, and close
to useless for retrospective search — if you need to know when a particular
vehicle arrived, someone has to read a paper book.

I built a prototype that watches the gate camera and does the recording itself.

## My role

Solo, as an IT Programmer intern in the MSIB programme: model selection,
detection and OCR pipeline, database schema, and the integration between them.

## Approach

The pipeline runs in three stages on a live video feed.

1. **Detection.** YOLOv8 via Ultralytics locates vehicles and plate regions in
   each frame, and classifies the vehicle type.
2. **Recognition.** The cropped plate region goes through OCR to extract the
   plate text, with a confidence score attached to each read so low-confidence
   results can be identified rather than silently trusted.
3. **Persistence.** Each vehicle is written to a MySQL table recording plate
   number, vehicle type, and entry and exit timestamps — which is what makes
   the log searchable afterwards.

![Live gate footage with vehicles in orange bounding boxes and the recognised plate rendered above the tracked car](/img/projects/plate-detection.webp)

Detection runs at roughly **256ms per frame**, fast enough to track vehicles
approaching a gate at entry speed. On the sampled plate, OCR returned a
confidence of **0.95**.

A database row nobody reads is not much better than a paper book, so the
records surface in a dashboard — each vehicle listed with its plate, type,
entry and exit times, and the captured frame it was read from.

![Dashboard listing logged vehicles with plate number, vehicle type, entry and exit times, and the capture photo](/img/projects/plate-dashboard.webp)

## Result

A working prototype: it detects vehicles on a live feed, reads plates, writes
structured records to the database without manual entry, and presents them in
a searchable dashboard.

**It was not finished.** My internship period ended before the system could be
hardened for continuous operation, so it was never deployed as the gate's
production logging system. What exists is a demonstrated pipeline, not a
delivered product, and I would rather describe it accurately than imply
otherwise.

## What I'd do differently

> The prototype was evaluated on sampled frames
> rather than a labelled test set, so I can quote confidence on individual reads
> but not an end-to-end accuracy figure across varied conditions — which is
> exactly the number anyone deploying it would want. I would build a labelled
> evaluation set covering night, rain and low-angle plates first, and add a
> confidence threshold that routes uncertain reads to human review instead of
> writing them to the database as though they were certain.
