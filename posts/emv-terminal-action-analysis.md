---
title: "Terminal Action Analysis: Who Decides Online or Offline?"
date: "2026-09-18"
description: "How TVR, IAC, TAC, and EMV Tag 9F27 influence terminal decisions during card transactions."
category: "EMV"
---

# Terminal Action Analysis: Who Decides Online or Offline?

When you tap a contactless card, one transaction may be approved offline while another is sent online for issuer authorization. It is tempting to assume the issuer makes that first decision. In EMV, the terminal plays an important role in deciding what action to request from the card.

After risk-management checks and cardholder verification, the terminal builds the **Terminal Verification Results (TVR)**. The TVR is a five-byte data object recording the results of the terminal's checks.

The terminal evaluates those results against two sets of rules:
- **Issuer Action Codes (IAC)** stored on the card
- **Terminal Action Codes (TAC)** configured for the terminal

The simplified decision sequence is:

1. **Denial check:** if the TVR matches denial rules, the terminal requests an AAC and the transaction is declined offline.
2. **Online check:** if denial rules do not match and online rules do, the terminal requests an ARQC and sends the transaction to the issuer.
3. **Default check:** if the terminal cannot go online, default rules help determine whether to decline or approve offline.

The card's cryptogram outcome is reflected in **Tag 9F27**, the Cryptogram Information Data (CID):
- **TC:** Transaction Certificate, commonly associated with offline approval
- **ARQC:** Authorization Request Cryptogram, requesting online authorization
- **AAC:** Application Authentication Cryptogram, indicating decline

When troubleshooting an EMV transaction, do not stop at the ISO 8583 response code. Inspect TVR, IAC, TAC, and Tag 9F27 together. They help explain the terminal's decision and the card's response.

**How often has Tag 9F27 helped you identify an EMV root cause faster than looking at the response code alone?**

[View my LinkedIn profile](https://www.linkedin.com/in/pratyush-saxena-83ba65101/)
