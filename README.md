# MoviesRepo

The project imitates the basic structure of IMDB by creating a database storing all the movies, cast and other details of it.


Following are the functionalities that have been implemented so far:
--------------------------------------------------------------------
>Adding new movies
    >>Filling details like plot, cast, year of release,etc
>Editing existing movies
    >>Edit cast
    >>Edit basic details like description, release year, etc
    >>Add new actors, delete the existing ones
    
*This is how the page looks like*
![actors table](https://github.com/tanya65/moviesRepository/blob/master/images/screenshot.png)
   
 
    
 Functionalities yet to be implemented:
 --------------------------------------
 >Option to store poster of the movie
 >Taking care of all the variety of corner cases
 >Improveming UI
 
 Database structure:
 ---------------------
 
 *actor_movies table stores the actor's id corresponding to the movie he is in.*
 *No two actor+movie pair can repeat in the table*
 
 ![actor_movies table](https://github.com/tanya65/moviesRepository/blob/master/images/actor_movies.png)

*actor table stores the actor's details.*
![actors table](https://github.com/tanya65/moviesRepository/blob/master/images/actors.png)

*movies table stores the movies' details.*
![movies table](https://github.com/tanya65/moviesRepository/blob/master/images/movies.png)

 
