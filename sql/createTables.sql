create table if not exists "developers" (
"id" SERIAL primary key,
"name" VARCHAR(50) not null,
"email" VARCHAR(50) not null UNIQUE
);
create type "OS" as enum ('Windows', 'Linux', 'MacOS');

create table if not exists "developerInfos" (
"id" SERIAL primary key,
"developerSince" DATE not null,
"preferredOS" "OS" not null,
"developerId" INTEGER unique not null,
foreign key ("developerId") references developers("id") on delete CASCADE
);

create table if not exists "projects" (
"id" SERIAL primary key,
"name" VARCHAR(50) not null,
"description" text,
"repository" VARCHAR(120) not null,
"startDate" DATE not null,
"endDate" DATE,
"developerId" INTEGER,
foreign key ("developerId") references developers("id") on delete set null 
);