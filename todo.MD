1. create a function (config/build-config directory) that takes as input page name and outputs a unified string - this will be used in vite config and in the Html component in the server to get the correct page script file with the hash.
2. create a function that receives AppPage type and returns the correct static file to use (with the hash), from inside static/js
3. create a .env.production for production values
4. add an option for a page title (like in about/profile) instead of repeating the same styles. maybe in Layout?
5. remove container components
6. move RpcQueryProvider to the server. each api endpoint should prefetch relevant queries and pass it to the query client (provider)
