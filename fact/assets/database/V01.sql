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
