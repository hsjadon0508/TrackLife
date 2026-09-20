LIFETRACK :
A digital life reconstructed from the moments left behind.

LIFETRACK is a frontend-only interactive data experience that transforms raw digital activity into patterns, connections, discoveries, and moments.
Instead of simply displaying thousands of records as tables or charts, the project explores how different traces—such as music listening and transactions—can appear together in time and turns those patterns into an interactive story.




🎯 Problem: 
Large datasets can contain thousands of individual records, but raw records alone don't communicate much meaning.

For example:
Spotify Record
2023-10-08 16:17
The Beatles

Transaction
2023-10-08 16:16
Entertainment
₹7,184

Looking at these as separate records doesn't tell much of a story.
LIFETRACK explores whether these traces can be connected through time, category, repetition, and other observable patterns.




🚀 FEATURES:
📊 Overview
A high-level view of the available datasets.

- Total music records
- Total transactions
- Household records
- Activity visualizations
- Transaction category breakdown
- Recent connected moments


🧩 Moments
The core storytelling feature.
The application identifies activities that occur within a defined temporal window and presents them together as a potential moment.

For example:
09:10 PM
🎵 Perfect — Ed Sheeran
09:14 PM
🎵 If Not for You — George Harrison
09:21 PM
🎵 Everything's Not Lost — Coldplay
09:39 PM
💳 Entertainment transaction
₹3,777

This becomes a connected Moment.
Connections are temporal patterns, not claims of causation.


🔍 Explore
Allows users to search and filter the available activity data.
Users can explore:
- Music
- Transactions
- Categories
- Artists
- Dates
- Activity records

💡 Discoveries
Transforms raw records into higher-level patterns.
Examples include:
🌙 The Night Owl
Shows recurring late-night listening activity.

🎵 Your Soundtrack
Shows frequently appearing artists.

💳 Where Attention Went
Shows how transaction activity is distributed across categories.




✨ What is the idea?
Digital activity leaves behind small traces:

-> A song was played
        ↓
-> A transaction happened
        ↓
-> Both happened around the same time
        ↓
-> A potential connection is detected
        ↓
-> The connection becomes a "Moment"
        ↓
-> Multiple moments reveal patterns

The goal is to move from:

Raw Data → Insights → Connections → Moments → Story






🔗 How Connections Work

The project uses rule-based pattern detection rather than AI-generated assumptions.
Temporal Connection
Activities occurring within a defined 30-minute window can be grouped into a potential moment.
Activity A
    │
    │ ≤ 30 minutes
    ▼
Activity B
    │
    ▼
Potential Connection
The system can then use these connections to construct moments.
Important limitation: 
The project does not claim that one activity caused another.

For example:
Music playing near a transaction does not mean the music caused the purchase.
It simply means the two traces occurred within the same observed time window.







🛠️ Technologies used?

- React.js
Used to build reusable UI components and pages.

- Vite
Provides a fast development and build environment.

- Tailwind CSS
Used for responsive styling and the dark data-dashboard interface.

- React Router
Handles navigation between Overview, Moments, Explore and Discoveries.

- GSAP
Adds page-entry and interaction animations.

- Recharts
Used for visualizing activity and category patterns.

- Lucide React
Provides consistent interface icons.