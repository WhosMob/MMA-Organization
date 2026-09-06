read the /AGENTS.md before starting.

Update and extend the existing mock fighter database only.

Context:
The project currently uses `mock-database/fighters.ts` as the source of truth for fighter data during the UI development phase.

We have finalized additional fighter fields that will be needed later for the Fighter Profile page.

Your task is ONLY to update `mock-database/fighters.ts`.

Do NOT build or modify the Fighter Profile page yet.

Requirements:

1. Inspect the existing `mock-database/fighters.ts` before making changes.

2. Keep all existing fighters and their current data unless a change is explicitly required below.

3. Add these fields to every fighter:

   - nationality
   - dateOfBirth
   - height
   - reach
   - championships

4. Use this format for `dateOfBirth`:

   `YYYY-MM-DD`

   Example:

   `dateOfBirth: "1990-05-10"`

5. Do NOT add an `age` field.

   Age will be calculated dynamically later from `dateOfBirth`.

6. Use this exact format for height:

   `height: "6'4 / 193 cm"`

   The first value is feet/inches and the second value is centimeters.

7. Use the same format for reach:

   `reach: "6'6 / 198 cm"`

   Do NOT use inches-only values such as `"78 inches"`.

8. `championships` should be an array.

   Example:

   championships: [
     {
       title: "Heavyweight Championship",
     },
   ]

9. Do NOT add a `status` field to championship objects.

   Current championship status is already represented by the existing `isChampion` field.

10. Keep the existing ranking structure exactly as it is:

   rankings: {
     p4p: number | null,
     division: number | null,
   }

11. Keep the existing `isChampion` field and its current meaning.

12. Keep the existing movement-related fields:

   - movement
   - p4pMovementChange
   - divisionMovementChange

13. Do NOT add fight history, recent fights, fight IDs, event IDs, or fight data to `fighters.ts`.

   Fight data will be handled separately later in:

   `mock-database/fights.ts`

14. Do NOT create `fights.ts` yet.

15. Do NOT create any new database, Prisma model, PostgreSQL schema, API, or backend logic.

16. Do NOT modify any UI components or pages.

17. Do NOT change the existing fighter IDs/slugs.

18. Use realistic and internally coherent fictional MMA data for the new fields.

19. Make sure every fighter has valid values for all newly added fields.

20. Maintain the existing TypeScript style and formatting conventions in the file.

21. Do not introduce unnecessary abstractions or dependencies.

Before finishing:

- Verify TypeScript.
- Check that every fighter contains all required fields.
- Check that no `age` field was added.
- Check that no `status` field was added to championships.
- Check that existing ranking data and champion data were not accidentally changed.
- Check that no UI files were modified.

This task is ONLY a data update to `mock-database/fighters.ts`.

Do not proceed to building the Fighter Profile page.
