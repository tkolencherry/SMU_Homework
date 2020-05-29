-- CREATE SOME TABLES
-- ORDER MATTERS - BEFORE YOU CAN FK SOMETHING, MUST EXIST
-- ALSO CAN'T DUPLICATE PKS SO WILL NEED ID COLUMNS FOR LAST THREE TABLES

create table "Departments"(
	dept_num VARCHAR(20) not null primary key, 
	dept_name VARCHAR(50) null, 
	last_updated TIMESTAMP default CURRENT_TIMESTAMP not null 
);

create table "Titles"(
	title_id VARCHAR(20) null primary key,
	title VARCHAR(50) null, 
	last_updated TIMESTAMP default CURRENT_TIMESTAMP not null
);
	
create table "Employees"(
	emp_num INT not null primary key, 
	title_id VARCHAR(20) not null references "Titles"(title_id),
	birth_date DATE not null, 
	first_name VARCHAR(40) not null, 
	last_name VARCHAR(40) not null, 
	sex VARCHAR(10) null, 
	hire_date DATE not null,
	last_updated TIMESTAMP default CURRENT_TIMESTAMP not null 
);

create table "Dept_Emp"(
	id SERIAL not null primary key,
	dept_num VARCHAR(20) not null references "Departments"(dept_num), 
	emp_num INT not null references "Employees"(emp_num), 
	last_updated TIMESTAMP default CURRENT_TIMESTAMP not null 
);

create table "Dept_Manager"(
	id SERIAL not null primary key,
	dept_num VARCHAR(20) not null references "Departments"(dept_num), 
	emp_num INT not null references "Employees"(emp_num), 
	last_updated TIMESTAMP default CURRENT_TIMESTAMP not null 
);

create table "Salaries"( 
	id SERIAL not null primary key, 
	emp_num INT not null references "Employees"(emp_num), 
	salary INT null,
	last_updated TIMESTAMP default CURRENT_TIMESTAMP not null 
);

-- RENAME SAID TABLES BECAUSE YOU REALIZE YOU DIDN'T NEED THE QUOTES 
alter table "Departments"
rename to Departments; 

alter table "Dept_Emp" 
rename to Dept_Emp; 

alter table "Dept_Manager" 
rename to Dept_Manager; 

alter table "Employees" 
rename to Employees; 

alter table "Salaries" 
rename to Salaries; 

alter table "Titles" 
rename to Titles;