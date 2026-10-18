---

title: "Inside the ATM: The Hidden Logic That Controls Every Transaction"
slug: "inside-atm-hidden-logic-ndc-states"
date: 2026-10-18
category: "ATM and Card Payments"
description: "Explore how states and state tables in APTRA Advance NDC control ATM transaction flows, from card reading and PIN entry to host communication and cash dispensing."
---

🏧 Inside the ATM: The Hidden Logic That Controls Every Transaction

Imagine inserting your card into an ATM.

The ATM reads your card.
It asks for your PIN.
You enter your PIN.
You select Cash Withdrawal.
The ATM contacts the host.
And finally, cash comes out.

It looks like one continuous transaction to the customer.

But behind the screen, something interesting is happening.

The ATM is moving through a sequence of states.


Welcome to Part 1 of my NDC Enterprise Protocol Series, where we explore the internal workings of NCR Direct Connect, a proprietary message-based protocol used for communication between NCR ATMs and their host or switch systems.


Let's start with one of the fundamental concepts in APTRA Advance NDC: STATES.

🔹 What exactly is a State?

Think of a state as a defined step in the ATM's transaction flow.

Each state determines what the ATM should do, what information it should collect, what screen it should display, and where the transaction should go next.

For example:

- 💳 Card inserted → Card Read State
- 🔢 PIN requested → PIN Entry State
- 💰 Withdrawal selected → Transaction Request State
- 📡 Transaction sent → Host communication and response handling
- 💵 Transaction approved → Cash dispensing flow

The exact flow depends on the configured state tables, state types, and terminal application logic.

🔹 Anatomy of an NDC State Table

A state table defines the parameters associated with a particular state.

Here are the key components:

1️⃣ State Number

A unique identifier used to reference a state in the configured application.

In APTRA Advance NDC, state numbers fall within the defined ranges of 000 to 254 and 256 to 750.

2️⃣ State Type

A single character identifies the functional logic associated with the state.

For example:

- A: Card Read
- B: PIN Entry
- I: Transaction Request

Each state type has its own specific behaviour and configuration requirements.

3️⃣ Table Data and Parameters

This is where the configuration becomes particularly interesting.

Depending on the state type, parameters can include:

- 📺 Screen Number: Identifies the screen displayed when the state is entered.
- 🔀 Next State Numbers: Define the destination states for different outcomes, such as a successful card read, timeout, cancellation, or an invalid PIN.
- 🎛️ Masks and Buffer Settings: Control configured Function Display Keys, track-reading conditions, and general-purpose buffer usage where applicable.

These parameters work together to define how the ATM progresses through its transaction flow.

🔹 Why Should Payment Engineers Care?

Consider a simple scenario.

A customer enters an incorrect PIN.

What happens next?

Does the ATM display an error message?
Does it allow another attempt?
Does it return to PIN entry?
Does it eventually retain the card or terminate the transaction?

The answer depends on several factors, including the configured state transitions, application rules, host responses, and terminal capabilities.

A single configuration mistake can lead to unexpected transaction behaviour.

Understanding the state table is therefore essential when troubleshooting ATM transaction flows.

Because before investigating a switch timeout or blaming the host, you need to understand what the ATM was configured to do in the first place.


🚀 What's Next in This Series?

We'll explore more NDC Enterprise concepts, including state transitions, message flows, screen configuration, Function Display Keys, and ATM-to-host communication.


💬 Let's discuss:

When troubleshooting an ATM issue, what do you investigate first?

A. The NDC state table and state transitions

B. The ATM-to-host message flow

C. The host or switch logs

D. The electronic journal (EJ)

Share your approach in the comments. I'd love to hear from ATM engineers and payment professionals working with NDC in production environments.

#NDC #NCR #ATM #ATMTechnology #PaymentSystems #PaymentSwitch #ISO8583 #BankingTechnology #ATMSoftware #APTRA #PaymentEngineering #Fintech #CoreBanking #TransactionProcessing #PaymentInfrastructure #ATMOperations #PaymentTechnology #Banking #FinancialServices #SwitchingSystems #ATMNetworking #SoftwareEngineering #DigitalBanking #Payments
