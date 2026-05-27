# Manual Candidate Entry — Design

## Problem

The Google Civic Information API often returns no contests, especially between elections or for hyperlocal races. Users who want to research a known set of candidates currently have no way to use the app at all when Civic comes back empty.

## Goal

Add a second input mode where the user manually builds a ballot (contest → candidates). Address mode and manual mode are separate views; the user toggles between them, and each persists independently.

## Entry Points

- **Landing screen:** existing address form, with a secondary button below labeled "Or enter candidates manually →"
- **After empty/failed address search:** the "no contests found" / error state gets an "Enter candidates manually" CTA
- **From the results view:** a small mode toggle ("Address ballot | Manual ballot") so the user can switch without losing either set of data

## Manual Entry UI

Contest-at-a-time form. Each contest contains:

- **Office dropdown** with the following options:
  - President
  - U.S. Senate
  - U.S. House
  - Governor
  - State Senate
  - State Assembly / House
  - Mayor
  - City Council
  - School Board
  - Ballot Measure
  - Other… (selecting this reveals a free-text input)
- **Contest name** (optional free text, e.g. "California U.S. Senate")
- **Candidates:** repeatable rows, one name field each, with a "+ Add candidate" button
- **State:** pulled from the saved address if present; otherwise asked once at the top of the manual form and stored alongside the manual ballot

Form controls:
- "+ Add another contest" appends a new empty contest block
- "Done — view ballot" renders the manual ballot in the existing results layout
- Each contest block has a remove (×) control; each candidate row has a remove control

## Enrichment Rules

The office dropdown value determines enrichment when rendering:

- **President, U.S. Senate, U.S. House** → run the existing FEC candidate search and GovTrack person lookup, exactly as Civic-sourced candidates do today
- **All other offices, including "Other"** → render only the research links (Ballotpedia, Wikipedia, OpenSecrets, Google News)

The manual ballot is transformed into the same in-memory shape that Civic contests use, so the existing render pipeline can be reused without branching.

## Persistence

- New localStorage key: `ready_set_vote_manual_ballot`
- Stored shape:
  ```json
  {
    "state": "CA",
    "contests": [
      {
        "office": "U.S. Senate",
        "officeOther": null,
        "contestName": "California U.S. Senate",
        "candidates": [ { "name": "Jane Smith" } ]
      }
    ]
  }
  ```
- Existing `ready_set_vote_address` key is untouched
- A **"Clear manual ballot"** button on the manual view wipes the key and resets the form

## Mode Toggle Behavior

- App tracks `currentMode: 'address' | 'manual'` in memory only (not persisted)
- On load, the mode defaults to whichever has stored data; if both exist, address mode wins
- The toggle is visible on the results view header
- Switching modes re-renders from the stored data for that mode
- Address mode does not re-fetch when toggled back if results are still cached in memory; if the page was reloaded, address mode re-runs the search using the saved address

## Out of Scope

- Parsing of pasted ballot text
- Mixing manual and Civic contests in a single view
- Editing of Civic-returned contests
- Saving multiple named manual ballots (only one slot)

## Files Affected

- `index.html` — all changes live here (single-file app)
