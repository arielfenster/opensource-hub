[] create a function (config/build-config directory) that takes as input page name and outputs a unified string - this will be used in vite config and in the Html component in the server to get the correct page script file with the hash.
[] create a .env.production for production values
[] add an option for a page title (like in about/profile) instead of repeating the same styles. maybe in Layout?

3. work on implementing the "add new" flow:
see https://v0.app/chat/autocomplete-component-design-dYC6mzPKCwQ (v9) for the design of the empty state and example of a modal form

export const technologyRequestEnum = pgEnum('technologyRequestEnum', [
	'pending',
	'approved',
	'rejected',
]);

export const technologyRequests = pgTable('technologyRequests', {
	id: id,
	name: varchar('name').notNull(),
	requestedBy: varchar('requestedBy').notNull(),
	status: technologyRequestEnum('status').notNull().default('pending'),
	createdAt: createdAt,
	updatedAt: updatedAt,
});

created a technologiesHandler class that has a "requestTechnology" function.
it creates an entry in the technologyRequests table, sends me an email and notifies the user that their request was submitted successfully.
also, need to created methods for approving and declining requests.
each of them should update the request's status and send an email to the requester (if email exists).
i need to create an admin dashboard in the navbar where i can see all the requests and click to approve/decline them. (NICE!)

4. see if need to add props to tech-autocomplete or autocomplete regarding showing this option for form.
   4.1. maybe a container for tech-auto is needed, to be able to render the component in different places with different behaviors
