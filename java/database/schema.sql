BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	phone varchar(11),
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,

	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

INSERT INTO users (first_name, last_name, email, phone, username, password_hash, role) VALUES ('Denali', 'davis', 'ddavis@gmail.com', '7245545545', 'deno', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (first_name, last_name, email, phone, username, password_hash, role) VALUES ('Tyler', 'vicari', 'tvloc@yahoo.com', '7244120000', 'ty' , '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

CREATE TABLE goals (
	goal_id serial NOT NULL,
	user_id int NOT NULL,
	summary varchar(25) NOT NULL,
	description varchar(800) NOT NULL, 
	goal int NOT NULL,
	movement varchar(25) NOT NULL,
	units varchar(25) NOT NULL,
	start_date date NOT NULL, 
	end_date date NOT NULL,
	active boolean NOT NULL,

	CONSTRAINT PK_goals PRIMARY KEY (goal_id),
	CONSTRAINT FK_goals_users FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO goals (user_id, summary, description, goal, movement, units, start_date, end_date, active) VALUES 
(2, 'my weight', 'how much do I weigh each day when I wake up? I want to lose weight', 200, 'average down', 'pounds', '2021-10-01', '2021-11-01', true);
INSERT INTO goals (user_id, summary, description, goal, movement, units, start_date, end_date, active) VALUES 
(2, 'money', 'cash is king, I need to stack this paper', 20000, 'total up', 'dollars', '2021-09-01', '2021-10-01', true);
INSERT INTO goals (user_id, summary, description, goal, movement, units, start_date, end_date, active) VALUES
(2, 'student debt', 'I want to pay off all of this student debt', 0, 'total down', 'dollars', '2021-03-01', '2021-04-20', false);
INSERT INTO goals (user_id, summary, description, goal, movement, units, start_date, end_date, active) VALUES 
(2, 'Wake up time', 'the early bird gets the worm right?', 0545, 'average down', 'time', '2021-10-01', '2021-12-01', false);

CREATE TABLE goal_scores (
	score_id serial NOT NULL,
	goal_id int NOT NULL,
	date date NOT NULL,
	score int NOT NULL,

	CONSTRAINT PK_goal_scores PRIMARY KEY (score_id),
	CONSTRAINT FK_goal_scores_goal FOREIGN KEY (goal_id) REFERENCES goals (goal_id)
);

INSERT INTO goal_scores (goal_id, date, score) VALUES (1, '2021-10-02', 210);
INSERT INTO goal_scores (goal_id, date, score) VALUES (2, '2021-09-12', 150);
INSERT INTO goal_scores (goal_id, date, score) VALUES (2, '2021-09-19', 350);
INSERT INTO goal_scores (goal_id, date, score) VALUES (2, '2021-09-20', 75);
INSERT INTO goal_scores (goal_id, date, score) VALUES (3, '2021-03-23', 50);
INSERT INTO goal_scores (goal_id, date, score) VALUES (3, '2021-04-07', 1050);
INSERT INTO goal_scores (goal_id, date, score) VALUES (4, '2021-10-11', 0630);

COMMIT TRANSACTION;
