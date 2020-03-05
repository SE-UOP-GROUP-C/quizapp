CREATE DATABASE main;

\c main;

CREATE TABLE user_account (
        reg_uuid serial PRIMARY KEY NOT NULL,
        reg_email varchar(80) UNIQUE,
        reg_pass varchar(10),
        reg_username varchar(40),
        reg_admin boolean DEFAULT false,
        reg_social boolean DEFAULT false,
        reg_noti_email boolean DEFAULT true,
        reg_noti_push boolean DEFAULT true,
        reg_noti_time integer DEFAULT (3600),
        quiz_taken text,
        fact_taken text
);

CREATE TABLE fact_submission (
      fact_sub_id serial PRIMARY KEY NOT NULL,
      fact_sub_txt varchar(3000),
      reg_uuid serial references user_account(reg_uuid)
);

CREATE TABLE fact (
      fact_id serial PRIMARY KEY NOT NULL,
      fact_topic VARCHAR(30) UNIQUE,
      fact_txt VARCHAR(3000),
      fact_sub_id serial references fact_submission(fact_sub_id)
);


CREATE TABLE question(
      que_id serial PRIMARY KEY NOT NULL,
      que_score integer,
      que_taken boolean DEFAULT false,
      que_dum1 text,
      que_dum2 text,
      que_ans text,
      que_txt text,
      fact_topic varchar(30) references fact (fact_topic)

);

CREATE TABLE fact_quiz (
       PRIMARY KEY (quiz_id, fact_id),
       que_id serial references question (que_id),
       fact_id serial references fact (fact_id)
);

CREATE TABLE leaderboard(
      PRIMARY KEY (lead_id, reg_uuid),
      lead_id serial NOT NULL,
      reg_uuid serial references user_account (reg_uuid)
      overall_score integer
);
