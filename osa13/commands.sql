CREATE TABLE blogit (
    id SERIAL PRIMARY KEY,
	author text,
    url text NOT NULL,
	title text NOT NULL,
	likes integer DEFAULT 0
);

postgres=# \d
postgres=# \d blogit
postgres=# \c

insert into blogit (author, url, title, likes) values ('Uncle Bob', 'uncle.bob@gmail.com', 'The Single Responsibility', 10);
insert into blogit (author, url, title, likes) values ('Roni Back', 'roni.back@gmail.com', 'Matkani somen huipulle', 15);

postgres=# \x
SELECT * FROM blogit;
