

Why?

Often pages will have a bunch of resources they need to fetch before rendering
properly. The easy way to do this is add all your fetching logic to the 
`componentDidMount` method. However this offers a poor experience for the user as 
they'll end up waiting longer to view the final page. The best way is to have
everything that's needed already loaded into the initial state of the redux
store so that the page loads instantly.



