---
title: "How a Banking App Can Detect a Phone Call During a Payment"
date: "2026-10-11"
description: "How device and contextual signals can complement transaction data in detecting social-engineering fraud."
category: "Fraud Prevention"
---

# How a Banking App Can Detect a Phone Call During a Payment

I once initiated a transfer from my primary bank account to the account I use for UPI while I was speaking to my mother. My banking app displayed a warning that the transfer was being initiated during a call and could be associated with fraud, cybercrime, or a digital-arrest scam.

My first question was simple: how did the app know I was on a call?

The answer may not be inside the payment message itself. Depending on the operating system, available APIs, permissions, and platform restrictions, an app may be able to obtain certain telephony or device-state signals. An active-call signal can become one input into a bank's risk decisioning engine.

A simplified flow looks like this:

1. A phone call is active.
2. The customer initiates a potentially risky transaction.
3. An available device-context signal is detected.
4. The risk engine evaluates the transaction alongside other indicators.
5. The bank may show a warning, introduce friction, or request stronger authentication.

This is especially relevant to social-engineering scams. A fraudster may keep a victim on a call while persuading them to transfer money. A transaction that looks normal in isolation may look different when its surrounding context is considered.

Fraud detection can combine transaction data, device signals, behavioural patterns, account history, and contextual indicators. These signals should be used responsibly, with attention to privacy, platform limitations, and false positives.

The question is changing from **“Is this transaction unusual?”** to **“What is happening around this transaction?”**

**What other device-level signals could help banks detect fraud before the money leaves the account?**

[Read the original LinkedIn post](https://www.linkedin.com/posts/pratyush-saxena-83ba65101_payments-upi-fintech-activity-7493722935195541505-I-th)
