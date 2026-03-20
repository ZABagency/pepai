# Pep AI — Project Memory

## What this app is
Peptide consulting app. Users take a 6-question quiz, get a personalized peptide stack recommendation, and get directed to vetted vendors via affiliate links.

## Project location
/Users/zakarieamedia/Projects/peptideiq

## Current build status
- Home screen: COMPLETE
- Quiz Q1–Q6: COMPLETE AND APPROVED
- Results page: IN PROGRESS — visual polish pass
- Peptide directory: exists, needs polish
- Peptide profile pages: exist, need polish

## Design system
- Fonts: Inter globally, Syne only on hero headlines
- Primary color: navy #1A1A2E
- Background: white #FFFFFF
- Card background: #F9F9F9
- Borders: #EBEBEB
- No green anywhere — removed from design system
- Amber #B45309 for Best Value badge
- Card border radius: 8px
- Left border accent on cards: 3px navy #1A1A2E
- Mobile-first, designed for 390px width

## Quiz logic
- Q1 multi-select goals → drives which peptides are recommended
- Q2 ranked worries → changes reassurance copy on results page
- Q3 experience level → gates stack complexity (beginner = 1 peptide, experienced = 3)
- Q4 injection comfort → hard no removes all SubQ peptides, shows oral/nasal only
- Q5 budget → filters vendor tier and stack size
- Q6 learning style → changes how result cards render (minimal/science/social/walkthrough)

## Revenue model
- Affiliate links on all vendor Best Source buttons
- UTM format: ?ref=pepai&utm_source=pepai&utm_medium=referral&utm_campaign=protocol
- Display ads as secondary revenue
- Email capture via Save My Protocol button

## Key decisions made
- No green in the color system — clashes with navy
- Emojis hardcoded as Unicode with font-family "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"
- No Directory link in nav during quiz or results — only show on home screen
- Cards use flex:1 to fill screen height — no fixed heights
- Drag to rank on Q2 — not arrow buttons

## What NOT to do
- Never use fixed heights on quiz cards — breaks equal height layout
- Never use icon libraries for emojis — always Unicode direct
- Never add green buttons or badges
- Never show Directory nav during quiz flow
- Never add heavy drop shadows — 1px borders only
