---
title: "HSM Security Is Built on Trust, Not Just Technology"
date: "2026-09-18"
description: "Why M-of-N quorum, dual control, and key ceremony procedures are as important as cryptographic strength."
category: "HSM and Key Management"
---

# HSM Security Is Built on Trust, Not Just Technology

Early in my payments career, I visited a bank preparing for a ZCMK key-generation ceremony. I asked a Security Officer whether the keys had already been generated. The answer was simple: not yet, because the required quorum of Security Officers had to be present.

That conversation changed how I thought about HSM security. I had been focused on strong encryption, secure hardware, and complex cryptographic algorithms. But secure key management also depends on people, process, and governance.

## What is M-of-N quorum?

An organization defines that at least **M out of N** authorized Security Officers must participate before a critical operation can proceed.

For example, in a 3-of-5 arrangement:
- Five officers hold their own authentication shares or credentials.
- Any three authorized officers can satisfy the quorum.
- Two officers alone cannot complete the protected operation.

The exact mechanism varies by HSM and configuration, but the principle is that no single person should have unilateral control over critical key-management operations.

A well-designed process can reduce insider risk, make a single lost share insufficient by itself, and allow operations to continue when some officers are unavailable.

This is more than a technical feature. It is a governance control. HSMs protect cryptographic material, while key ceremonies, dual control, quorum rules, audit trails, and clear responsibilities protect the process around that material.

One lesson has stayed with me: the strongest security controls are not always cryptographic. Technology protects keys. The process protects trust.

**What security principle from your early payments, HSM, or cybersecurity work has stayed with you?**

[Read the original LinkedIn post](https://www.linkedin.com/posts/pratyush-saxena-83ba65101_payments-paymentsecurity-hsm-activity-7487901989826093056-ECjG)
