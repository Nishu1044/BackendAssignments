Instructions
Problem Statement: Movie Store API

Create an entire Movie Store API using Express and Mongoose.
The objective is to support all 4 CRUD operations, with a specific focus on multiple types of GET operations.
You need to decide the endpoints yourself.
For GET requests on the list of movies, support multiple filtering criteria:
Filter by title
Filter by rating
Search a movie by name. For example, if we make a query like /movies?q=dho, all movies that have Dho in their title should be returned: Dhoom, Dhoni: Untold Story, etc.
sortBy query parameter, which will sort the movies by a specified field.
Pagination: Implement pagination to limit the number of movies returned per request. Use page and limit query parameters to define the pagination.
Hint: MongoDB and Express application can be connected using Mongoose when you start running the server. Please explore.





<!-- for filter by title  -->
1> the url should be (http://localhost:8787/get-movie?title=Dilwale Dulhania Le Jayenge)

  <!-- const { title, rating, search } = req.query;
        const filterQuery = {};

        if (search) {
            // Case-insensitive search
            filterQuery.name = new RegExp(search, 'i');
        } else if (title) {
            // Exact match search
            filterQuery.name = title;
        } -->


2> GET http://localhost:8787/get-movie?sortBy=rating:desc <!-- for sorting --> 

        