---
title: "RSA Authenticator Does Not Mean RSA Generates the OTP"
date: "2026-09-18"
description: "A reminder to distinguish a product name from the cryptographic mechanism behind a one-time password."
category: "Cryptography"
---

# RSA Authenticator Does Not Mean RSA Generates the OTP

I once opened the RSA SecurID Authenticator app to enter a one-time password and wondered whether the RSA algorithm itself was generating that code. The product name makes that assumption easy to make.

RSA is an asymmetric cryptographic algorithm. It is important in many security systems, but it is not the usual mechanism for generating a fresh short OTP every few seconds.

Time-based one-time passwords (TOTP) are typically generated using a shared secret and a keyed-hash message authentication code (HMAC), combined with a time counter. The authenticator and verifier use the same underlying secret and time step to calculate a code. The verifier checks the submitted code against the expected value within its allowed time window.

This approach is fast and practical for authenticators. It does not require performing an RSA public-key operation for every OTP.

The distinction is:
- **RSA** is an asymmetric cryptographic algorithm.
- **HMAC** is a message-authentication construction based on a secret key and a hash function.
- **TOTP** derives a time-based code from a shared secret and a moving time counter.

The exact implementation depends on the product and configuration, so consult vendor documentation rather than inferring behavior from the name alone.

Even after years of working with HSMs, card networks, and payment security, assumptions can sneak in. Staying curious is part of staying technically sharp.

**Have you ever found that a product's name led you to the wrong assumption about the technology underneath?**

[View my LinkedIn profile](https://www.linkedin.com/in/pratyush-saxena-83ba65101/)
