---
title: "Inside an EMV Chip: What Really Gets Personalized?"
date: "2026-09-18"
description: "A practical look at BER-TLV data, application files, DOLs, and issuer-controlled updates in EMV card personalization."
category: "EMV"
---

# Inside an EMV Chip: What Really Gets Personalized?

An EMV chip is not just storage for card data. It is a structured application environment that defines how the card communicates with a terminal, exchanges data securely, and can receive certain updates after issuance.

## BER-TLV is the foundation

EMV data objects use the Tag-Length-Value structure. For example, tag 5A represents the Application PAN, while tag 5F24 represents the Application Expiration Date. Some objects contain simple values. Others are templates holding nested data objects.

## Data lives in application files

EMV data is organized into Application Elementary Files (AEFs), identified through Short File Identifiers (SFIs). The issuer and card profile determine how applicable records are organized. It is a misconception that every EMV tag must always live in one universally fixed file.

## Required data and DOLs

Data such as the Application PAN, expiration date, Application Interchange Profile, and card-risk-related objects support the transaction flow. Data Object Lists (DOLs) tell the terminal which data the card requests and the order in which that data should be supplied.

Instead of sending every possible data object, the terminal supplies the objects requested by the card for a particular command.

## Personalization can continue after issuance

Issuers can use authenticated issuer scripts during online transactions to update certain issuer-controlled data or perform supported application actions. Exact capabilities depend on the card profile and applicable EMV specifications.

Common Core Definitions (CCD) also help promote more consistent behavior across terminals and payment ecosystems.

An EMV chip stores more than card data. It also stores application structure and rules that make secure transactions possible.

**Which EMV data object do you think is most misunderstood: AIP, AFL, CDOL, CVR, IAD, or something else?**

[View my LinkedIn profile](https://www.linkedin.com/in/pratyush-saxena-83ba65101/)
