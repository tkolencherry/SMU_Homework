--QUESTION ONE QUERY 

select 
	e.emp_num , 
	e.first_name , 
	e.last_name , 
	e.sex, 
	s.salary
from Employees as e
join Salaries as s on s.emp_num = e.emp_num; 

--QUESTION TWO QUERY 
--NOTE: NEED TO HAVE THE EXTRACT COLUMN SELECTED OTHERWISE CAN'T FILTER ON IT
select 
first_name , 
last_name , 
hire_date ,
extract(year from hire_date) as hire_year
from Employees
where extract(year from hire_date) = 1986;

--QUESTION THREE QUERY 
select 
	d.dept_num, 
	d.dept_name, 
	e.emp_num, 
	e.last_name, 
	e.first_name
from Employees as e 
join Dept_Manager as dm on dm.emp_num = e.emp_num
join Departments as d on d.dept_num = dm.dept_num; 

--QUESTION FOUR QUERY 
select 
	e.emp_num, 
	e.last_name, 
	e.first_name, 
	d.dept_name 
from Employees as e 
join Dept_Emp as de on de.emp_num = e.emp_num
join Departments as d on d.dept_num = de.dept_num;

--QUESTION FIVE QUERY
--NOTE: NEED TO USE SINGLE QUOTES FOR THE FILTERS
select 
	first_name,
	last_name, 
	sex
from employees
where first_name = 'Hercules' and last_name like 'B%';

--QUESTION SIX QUERY 
select 
	e.emp_num, 
	e.last_name, 
	e.first_name, 
	d.dept_name 
from Employees as e 
join Dept_Emp as de on de.emp_num = e.emp_num
join Departments as d on d.dept_num = de.dept_num
where dept_name = 'Sales';

--QUESTION SEVEN QUERY 
select 
	e.emp_num, 
	e.last_name, 
	e.first_name, 
	d.dept_name 
from Employees as e 
join Dept_Emp as de on de.emp_num = e.emp_num
join Departments as d on d.dept_num = de.dept_num
where dept_name = 'Sales' or dept_name = 'Development';

--QUESTION EIGHT QUERY
select 
	COUNT(emp_num) as frequency, 
	last_name
from Employees 
group by last_name
order by frequency desc; 