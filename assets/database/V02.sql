CREATE DATABASE main;

\c main;
/*
  --[ Version 2 ]--
  fact_topic changed from varchar to integer so topics can be referenced
  by index within code rather than using strings.
  reg_pass removed due to forced google sign in.
  leaderboard table removed as this can be generated with the current data
  from user_account
  que_score & que_taken removed as "score" is handled in code and "taken" is
  not relevant
*/

CREATE TABLE user_account (
        reg_uuid serial PRIMARY KEY NOT NULL,
        reg_email varchar(80) UNIQUE,
        reg_username varchar(40),
        reg_admin boolean DEFAULT false,
        reg_noti_email boolean DEFAULT true,
        reg_noti_push boolean DEFAULT true,
        reg_noti_time integer DEFAULT (3600),
        reg_score integer DEFAULT (0)
);

CREATE TABLE fact_submission (
      fact_sub_id serial PRIMARY KEY NOT NULL,
      fact_sub_txt varchar(3000),
      reg_uuid serial references user_account(reg_uuid)
);

CREATE TABLE fact (
      fact_id serial PRIMARY KEY NOT NULL,
      fact_topic integer UNIQUE,
      fact_txt VARCHAR(3000),
      fact_sub_id serial references fact_submission(fact_sub_id)
);


CREATE TABLE question(
      que_id serial PRIMARY KEY NOT NULL,
      que_dum1 text,
      que_dum2 text,
      que_ans text,
      que_txt text,
      fact_topic integer references fact(fact_topic)
);


CREATE TABLE fact_quiz (
       PRIMARY KEY (que_id, fact_id),
       que_id serial references question(que_id),
       fact_id serial references fact(fact_id)
);
