---
title: "Inside the ATM: What Happens After the ATM Sends Your Transaction to the Host? | APTRA Advance NDC, Part 4"
date: "2026-11-14"
description: "Explore how APTRA Advance NDC States I, J, K, and L manage host communication, transaction closure, FIT routing, and magnetic stripe writing."
category: "ATM"
slug: "inside-atm-ndc-states-i-j-k-l"
---

# 🏧 INSIDE THE ATM: What Happens After the ATM Sends Your Transaction to the Host? | APTRA Advance NDC, Part 4

You insert your card, enter your PIN, select a transaction, and enter the amount.

But what happens when the ATM finally communicates with the host?

How does it send transaction data, process the host response, close the customer session, route transactions based on card institution, and even write updated data back to the magnetic stripe?

Welcome to **Part 4 of the APTRA Advance NDC series.**

In Part 1, we explored the fundamentals of ATM NDC.

In Part 2, we covered States A, B, C, and D.

In Part 3, we explored States E, F, G, and H.

Now, let's understand **States I, J, K, and L**, which control host communication, transaction termination, card-based routing, and magnetic stripe writing.

## 🔹 STATE I: Transaction Request State

This is where the ATM communicates with Central, the host.

State I compiles transaction data gathered from previous states, sends the Transaction Request message, and waits for Central's Transaction Reply command.

**Key technical points:**

- Displays a designated waiting screen, typically "Please Wait".
- Sends Track 1, Track 2, and Track 3 data based on configured parameters.
- Transmits the 8-byte Operation Code Buffer.
- Sends the transaction amount.
- Transmits encrypted PIN data through Buffer A for remote verification.
- Can transmit additional customer inputs through General Purpose Buffers B and C.
- Extension State Z can include additional user-defined or device-specific data.
- Central Response Time-Out determines the next state if the host does not respond before Timer 03 expires.

## 🔹 STATE J: Close State

Every transaction needs a proper closure.

State J safely terminates the cardholder session and manages card, cash, receipt, and statement disposition.

**Key technical points:**

- Displays the appropriate receipt-delivered or no-receipt screen.
- Handles card retention when instructed by Central or when the cardholder leaves the card behind.
- Displays statement-related information when a statement is delivered.
- Clears document data, CPM data, and BNA cash deposit data.
- Extension State Z handles CPM cheque recovery and BNA escrow note disposition.

The displayed screen depends on the transaction outcome and the card or receipt disposition.

## 🔹 STATE K: FIT Switch State

How does an ATM decide which transaction path to follow based on the card's institution ID?

State K handles this routing.

**Key technical points:**

- During card reading in State A or T, the card's Financial Institution ID (FIID) is matched against configured Financial Institution Tables (FITs).
- The matching FIT entry contains an Indirect Next State Index (PSTDX).
- State K maps indices 0 through 7 to configured Next State Numbers.

**Interesting detail:**

The expanded FIT Switch State (`_`) uses Extension State Z and supports up to 15 target state exits, with indices 0 through 14.

This supports more complex card-type routing.

## 🔹 STATE L: Card Write State

Here is another interesting capability.

State L writes updated track data from the terminal's track buffers back onto the card's magnetic stripe.

**Key technical points:**

- The card must remain inside the reader.
- The terminal must support a track-writing card reader module.
- Valid track data must exist in the relevant buffers.
- Tracks are written sequentially: Track 1 → Track 2 → Track 3.
- If a track write fails or contains invalid data, the operation aborts immediately.

State L has three possible exits:

1. **Good Write:** Track writing completes successfully.
2. **Bad Write:** A track write attempt fails.
3. **No Write Attempted:** Buffers are empty, data is invalid, or sentinels are missing or too long.

## 💡 THE BIGGER PICTURE

States I, J, K, and L demonstrate how APTRA Advance NDC manages the critical stages of ATM transaction processing.

From compiling transaction data and communicating with the host to closing sessions, routing transactions through FIT configurations, and updating magnetic stripe data, these states play an important role in the ATM transaction lifecycle.

Understanding these states is essential for anyone working with ATM software, transaction processing, and banking infrastructure.

## 💬 LET'S DISCUSS

When an ATM successfully reads a card and captures the transaction details, but the transaction does not reach the expected host processing path, where would you start investigating?

**State I host request configuration, State K FIT routing, or the transaction data and buffer selection?**

Share your experience in the comments. Let's discuss!

#ATM #ATMTechnology #ATMEngineering #NDC #APTRA #APTRAAdvance #ATMSoftware #ATMDevelopment #BankingTechnology #Payments #PaymentProcessing #PaymentSwitch #ISO8583 #ISO20022 #HSM #CardPayments #CardIssuing #CardAcquiring #FinancialInstitution #FIT #HostCommunication #TransactionProcessing #MagneticStripe #CardReader #BankingInfrastructure #CoreBanking #DigitalBanking #FinTech #FinancialTechnology #PaymentSystems #SoftwareEngineering #TechnicalDeepDive
