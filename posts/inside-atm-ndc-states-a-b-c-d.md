---
title: "Inside the ATM: What Happens After You Insert Your Card? NDC States A, B, C & D, Part 2"
date: "2026-10-20"
description: "Explore how APTRA Advance NDC States A, B, C, and D manage card reading, PIN entry, envelope dispensing, and operation code buffers."
category: "ATM"
slug: "inside-atm-ndc-states-a-b-c-d"
---

# 🏧 Inside the ATM: What Happens After You Insert Your Card? | NDC States A, B, C & D | Part 2

You insert your card.  
You enter your PIN.  
You select Cash Withdrawal.

Within seconds, the ATM moves towards processing your request.

But have you ever wondered what happens inside the ATM before it even sends a transaction request to the host?

Welcome to the world of **APTRA Advance NDC**.

In Part 1, we explored the hidden logic behind ATM NDC states.

Today, let's look at four important states that help prepare the ATM for transaction processing.

## 🔹 STATE A: Card Read State

Everything starts here.

The ATM reads the card's magnetic stripe or chip data and initializes the relevant transaction buffers.

But there is more to it.

- Which card data should the ATM read?
- What happens if the card cannot be read?
- What if the card's institution does not match any configured Financial Institution Table entry?
- Should the ATM eject the card immediately or retain it until the host responds?

State A handles these decisions through parameters such as Read Conditions, Good Read Next State, No FIT Match Next State, and Card Return Flag.

**The key insight:** A card read is not simply a hardware operation. It is also a decision point in the ATM's transaction flow.

## 🔹 STATE B: PIN Entry State

The card has been read. Now the ATM needs to establish that the cardholder can authenticate.

Enter State B.

The ATM prompts the customer to enter their PIN.

Depending on the terminal configuration, PIN verification may happen locally or remotely.

In a typical online PIN flow:

- The PIN is captured through the secure Encryptor Keyboard.
- The PIN is encrypted and formatted according to the configured process.
- The resulting protected PIN data is made available for transaction processing.
- The ATM follows the configured state transition to continue the transaction.

What happens if the customer presses Cancel?

What if the PIN entry times out?

What if the customer exceeds the permitted number of attempts?

These are not random exceptions. They are explicitly handled through state-transition parameters.

**The key insight:** PIN entry is both a security boundary and a transaction-control decision.

## 🔹 STATE C: Envelope Dispenser State

This state reveals something interesting about NDC.

Not every state performs an action on every ATM.

State C manages envelope presentation for terminals configured with an envelope dispenser.

If the terminal does not have this hardware, the state can proceed without performing the envelope-dispensing action.

And what happens if the customer never collects the envelope?

The configured transaction flow can take the ATM to Close State J, where an uncollected envelope is retracted.

**The key insight:** NDC supports different terminal capabilities through configurable transaction flows. The same state can behave differently depending on the hardware available.

## 🔹 STATE D: Pre-Set Operation Code Buffer

Now we move from cardholder interaction to transaction preparation.

State D manages the Operation Code buffer, an 8-byte buffer used to hold transaction-selection information.

It can clear selected positions or pre-set them with configured function-key characters.

Why does this matter?

Because the ATM needs to maintain the correct transaction context as the customer moves through different screens and selections.

State D uses parameters such as Clear Mask and A, B, C, D Pre-Set Masks. Extension State Z supports the relevant F, G, H, and I pre-set masks.

**The key insight:** Buffer management is an important part of controlling the transaction path. Incorrect configuration can affect how the ATM interprets transaction selections.

---

## 🧠 THE BIGGER PICTURE

Consider what these four states accomplish:

- ✅ State A reads the card and determines the next path.
- ✅ State B manages PIN entry and authentication-related branching.
- ✅ State C handles envelope presentation where supported.
- ✅ State D prepares the operation code buffer for the next stage.

These states demonstrate an important principle of ATM engineering.

**An ATM transaction is not a single request. It is a sequence of controlled state transitions, buffer operations, hardware interactions, and exception-handling decisions.**

Understanding this logic helps when troubleshooting unexpected screen flows, card-retention issues, PIN-entry failures, and transaction-selection problems.

And remember, the exact behavior depends on the NDC implementation, terminal capabilities, and configured state tables.

## 💬 Let's discuss

If you were troubleshooting an ATM that reads the card successfully but follows the wrong transaction path, where would you start investigating?

Would you check the state-transition configuration, the FIT parameters, the Operation Code buffer, or the host communication flow?

Share your approach in the comments. I'd love to hear from fellow ATM and payments professionals.

#ATM #NDC #APTRA #ATMTechnology #ATMSoftware #ATMEngineering #Payments #PaymentSystems #BankingTechnology #ISO8583 #PaymentSwitch #ATMTransactions #CashWithdrawal #PINSecurity #HSM #FinTech #Banking #PaymentProcessing #CoreBanking #FinancialTechnology #ATMOperations #PaymentInfrastructure #CyberSecurity #SoftwareEngineering #DigitalBanking #PaymentProfessionals
