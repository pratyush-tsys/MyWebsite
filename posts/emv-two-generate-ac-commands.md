---
title: "Two GENERATE AC Commands, One Online Leg"
date: "2026-10-11"
description: "Why EMV uses two local GENERATE AC commands even though online authorization normally involves one issuer round trip."
category: "EMV"
---

# Two GENERATE AC Commands, One Online Leg

A common EMV question is: if the terminal sends two GENERATE AC commands, why does authorization still happen in one online leg?

The key clarification is that GENERATE AC is a local interaction between the terminal and the chip card. It is not a command sent to the issuer.

## 1. First GENERATE AC: initiate the request

After performing its checks, the terminal sends the first GENERATE AC command to the card. If the card decides online authorization is required, it returns an **ARQC**, or Authorization Request Cryptogram.

The terminal forwards the relevant transaction data and ARQC to the issuer through the payment network.

## 2. One online leg: issuer authorization

The issuer validates the ARQC, performs authorization and risk checks, and sends an authorization response. This is the online round trip to the issuer.

## 3. Second GENERATE AC: complete the card interaction

The terminal passes the issuer response and applicable issuer-authentication data back to the card in the second GENERATE AC command. The card evaluates the outcome and may return a **TC**, a Transaction Certificate, or an **AAC**, an Application Authentication Cryptogram indicating decline.

So there are two card-terminal GENERATE AC exchanges, but normally only one online authorization round trip to the issuer. The first helps establish the online request. The second completes the card's transaction decision.

This distinction is useful when diagnosing EMV traces. The terminal-card dialogue and terminal-issuer dialogue are separate parts of the transaction.

**Have you seen a case where the issuer approved a valid ARQC, but the card returned an AAC after the second GENERATE AC?**

[View my LinkedIn profile](https://www.linkedin.com/in/pratyush-saxena-83ba65101/)
