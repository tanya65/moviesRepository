# MoviesRepo

The project imitates the basic structure of IMDB by creating a database storing all the movies, cast and other details of it.

**How to run:**

* clone the repo
* npm install in both server and client folder
* polymer serve (to run client)
* node . (to run the server)

**Database creation:**
* There are 3 tables (actors, movies, actor_movies)
* create actors table:

 CREATE TABLE actors 
 ( id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL, 
 sex VARCHAR(100), 
 DoB DATE, 
 Bio VARCHAR(600), 
 PRIMARY KEY(id) );
 
 * create movies table:
 
 CREATE TABLE movies 
 ( id INT NOT NULL AUTO_INCREMENT, 
 name VARCHAR(100) NOT NULL, 
 year YEAR,
 plot VARCHAR(600), 
 poster BLOB, 
 PRIMARY KEY(id) );
 
 * create actor_movies table:
 
 CREATE TABLE actor_movies
 ( actor_id INT NOT NULL, 
 movie_id INT NOT NULL,
 PRIMARY KEY(actor_id,movie_id), 
 FOREIGN KEY(actor_id) REFERENCES actors(id), 
 FOREIGN KEY(movie_id) REFERENCES movies(id) )
 
 
 Database structure:
 ---------------------
 
*actor_movies table stores the actor's id corresponding to the movie he is in.*
*No two actor+movie pair can repeat in the table*
 
 ![actor_movies table](https://github.com/tanya65/moviesRepository/blob/master/images/actor_movies.png)

*actor table stores the actor's details.*
![actors table](https://github.com/tanya65/moviesRepository/blob/master/images/actors.png)

*movies table stores the movies' details.*
![movies table](https://github.com/tanya65/moviesRepository/blob/master/images/movies.png)



**Following are the functionalities that have been implemented so far:**

* Adding new movies
 * Filling details like plot, cast, year of release,etc*Editing existing movies
* Edit cast
 * Edit basic details like description, release year, etc
 * Add new actors, delete the existing ones
    
*This is how the page looks like*
![movies](https://github.com/tanya65/moviesRepository/blob/master/images/screenshot%20of%20page%20part-1.png)
![edit movie](https://github.com/tanya65/moviesRepository/blob/master/images/EditMovieDetails.png)
![add movie](https://github.com/tanya65/moviesRepository/blob/master/images/AddMovie.png)

    
**Functionalities yet to be implemented:**
 
* Option to store poster of the movie
* Taking care of all the variety of corner cases
* Improving UI
 
 
 
