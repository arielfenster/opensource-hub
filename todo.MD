[] create a function (config/build-config directory) that takes as input page name and outputs a unified string - this will be used in vite config and in the Html component in the server to get the correct page script file with the hash.
[] create a .env.production for production values
[] add an option for a page title (like in about/profile) instead of repeating the same styles. maybe in Layout?
[] create a TagsInput/TagsInputFilter which is an input field that auto-completes to the various tech tags - frameworks, libs, DBs, etc.
   when typing, it should display a list of filtered tags that match it by substring (ignore case)
   when the user selects a tag, it should display it below the input field, color-coded:
    - blue for backend frameworks
    - red for frontend frameworks \* green for DBs
    - etc.	
	^^ this will be used in the root projects page where a user can filter by specific tags, and it will also be used in project creation page, where the creator can apply tags to the project
