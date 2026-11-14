---
title: "Inside the ATM: What Happens When You Select a Transaction? | APTRA Advance NDC, Part 3"
date: "2026-11-14"
description: "Explore how APTRA Advance NDC States E, F, G, and H manage menu selections, amount entry, amount validation, and customer information."
category: "ATM"
slug: "inside-atm-ndc-states-e-f-g-h"
---

# 🏧 INSIDE THE ATM: What Happens When You Select a Transaction? | APTRA Advance NDC, Part 3

You insert your card, enter your PIN, and select Cash Withdrawal.

But have you ever wondered how the ATM processes your menu selection, captures the withdrawal amount, validates it, and collects additional customer information?

Welcome to another deep dive into **APTRA Advance NDC**.

In Part 1, we explored the fundamentals of ATM NDC.

In Part 2, we covered States A, B, C, and D, including card reading, PIN entry, envelope dispensing, and operation code buffer management.

Now, let's explore **States E, F, G, and H**, where customer interaction drives the transaction flow.

## 🔹 STATE E: Four FDK Selection Function

This state handles customer menu selections through the four Function Display Keys (FDKs).

Think of selecting:

- Savings or Current Account.
- Cash Withdrawal or Balance Enquiry.
- Different transaction options.

The selected keycode gets stored in a specific byte of the 8-byte Operation Code Buffer.

**Interesting detail:**

Native Mode Option Digit 7a can enable left-side FDKs, allowing keys I, H, G, and F to perform equivalent functions.

Touchscreen FDK emulation is also supported.

## 🔹 STATE F: Amount Entry

This is where the customer enters the transaction amount.

For example, during a cash withdrawal, the ATM captures the amount through the numeric keypad and stores it in the Amount Buffer.

**Key technical points:**

- Default Amount Buffer length is 8 digits.
- It can be configured for 12 digits.
- Amount Display Screen controls cursor position and currency formatting.
- Enter behaves like FDK A or I.
- Clear resets the entered amount.
- Timeout and Cancel can trigger separate next states.

## 🔹 STATE G: Amount Check

Here comes an interesting piece of transaction logic.

State G checks whether the entered amount represents a whole currency unit or includes fractional units.

For example:

- 100.00, Whole currency unit.
- 100.50, Non-whole currency unit.

Based on the result, NDC routes the transaction to different next states.

It can check the Amount Buffer or General Purpose Buffer B or C.

This becomes particularly relevant when handling currencies with fractional denominations.

## 🔹 STATE H: Information Entry

State H handles generic numeric data entered by the customer.

Examples include:

- Account numbers.
- Additional verification information.
- Other numeric inputs required by the transaction flow.

Here is where buffer management and data masking become important.

**Key technical points:**

- General Purpose Buffer B and C can store up to 32 bytes.
- Configuration determines which buffer stores the input.
- Data can appear as actual digits or masked characters (*).
- Enter behaves like FDK A or I.
- Clear resets the buffer and screen echo.

## 💡 The Bigger Picture

States E, F, G, and H demonstrate how NDC manages customer interaction and transaction decisions.

From selecting an account to entering an amount, validating currency values, and collecting additional information, each state controls a specific part of the ATM transaction journey.

For ATM developers, switch engineers, payment architects, and banking technology professionals, understanding these transitions is essential for troubleshooting and designing reliable ATM transaction flows.

**The interesting part is how these states connect with the host transaction processing layer, where the collected data eventually contributes to transaction message construction and processing.**

Follow the ATM NDC series for more technical deep dives.

## 💬 Let's Discuss

When an ATM captures the correct withdrawal amount, but the transaction follows an unexpected path, where would you start investigating?

Would you check the Amount Buffer, State G configuration, Operation Code Buffer, or the next-state routing logic?

Share your experience in the comments. Let's discuss!

#ATM #ATMTechnology #ATMEngineering #NDC #APTRA #APTRAAdvance #NCR #WincorNixdorf #BankingTechnology #Payments #PaymentProcessing #PaymentSwitch #ISO8583 #ISO20022 #HSM #CardPayments #ATMSoftware #ATMDevelopment #CoreBanking #DigitalBanking #FinTech #FinancialTechnology #PaymentSystems #TransactionProcessing #BankingInfrastructure #PaymentInnovation #SoftwareEngineering #TechnicalDeepDive
