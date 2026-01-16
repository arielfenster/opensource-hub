[] add an option for a page title (like in about/profile) instead of repeating the same styles. maybe in Layout?

[@]. work on implementing the "add new" flow:
   see https://v0.app/chat/autocomplete-component-design-dYC6mzPKCwQ (v9) for the design of the empty state and example of a modal form

create a technologiesHandler class that has a "requestTechnology" function.
it creates an entry in the technologyRequests table, sends me an email and notifies the user that their request was submitted successfully.
also, need to create methods for approving and declining requests.
each of them should update the request's status and send an email to the requester (if email exists).
i need to create an admin dashboard in the navbar where i can see all the requests and click to approve/decline them. (NICE!)

2. rename CommonProps type to something like PropsWithClassName, ClassNameProps, etc. or just Props, GeneralProps
3. rename all index/view/hook files in pages to actual logic-specific name? i.e useLoginHook.ts, admin-page.tsx, etc.
4. see if need to add props to tech-autocomplete or autocomplete regarding showing this option for form ("didn't found what you were looking for? click _here_ to add/request an item")

5. add class-variance-authority. use it for buttons - regular, link. look at compoundVariants
6. create SelectField
7. add option to edit user-owned project
8. add tab in profile dropdown for projects?
9. search projects:
		- tech stack
		- position
		- keywords? Tags/keywords (beyond tech stack — e.g., "AI", "social impact", "climate").
		- Category/domain (web, mobile, ML, DevOps, education, games, etc.).
		- Last update
		- post-MVP: Recommendations ("similar to projects you viewed" or "based on your skills").
