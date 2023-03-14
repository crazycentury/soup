create database soupcoursefinalproject;

/*
drop database soupcoursefinalproject;
*/

create table course(
	course_id int identity primary key,
	[name] varchar(100) not null,
	[description] varchar(max),
	image_content varchar(max),
	price int not null,

	fk_category_id int not null
);

create table category(
	category_id int identity primary key,
	[name] varchar(100) not null,
	[description] varchar(max),
	[image] varchar(max)
);


create table [user](
	[user_id] int identity primary key,
	email varchar(100) unique not null,
	[name] varchar(100) not null,
	password_hash varbinary(256) not null,
	password_salt varbinary(265) not null,
	active BIT,

	fk_role_id int not null
);


create table [role](
	role_id int primary key identity,
	[name] varchar(100)
);


create table cart(
	fk_user_id int not null,
	fk_course_id int not null
	-- schedule
);


create table payment_method(
	payment_method_id int primary key identity,
	[name] varchar(100) not null,
	[image] varchar(max) not null
);

alter table payment_method 
add active BIT;

create table invoice(
	invoice_id int primary key identity,
	fk_user_id int not null,
	fk_payment_method_id int,
	no_invoice varchar(225) not null,
	[date] date
	/*
	total_course int not null,
	total_price int not null
	*/
);



create table detail_invoice(
	fk_invoice_id int not null,
	fk_course_id int not null,
	schedule date not null
);


CREATE table token(
	token_id int primary key identity,
	token VARCHAR(255) UNIQUE NOT NULL,
	expire_date DATETIME,
    usage_type VARCHAR(64),
	email VARCHAR(255) UNIQUE NOT NULL
);


create table reset_password_token(
	token_id int primary key identity,
	token varchar(255) unique not null,
	expire_time datetime not null,
	email varchar(255) unique not null
);
SELECT * FROM reset_password_token rpt ;

-- Add foreign keys

alter table course
add constraint fk_category_id
foreign key(fk_category_id)
references category(category_id)
on update cascade
on delete cascade;

alter table [user]
add constraint fk_role_id
foreign key(fk_role_id)
references [role](role_id)
on update cascade
on delete cascade;

alter table cart
add constraint fk_user_id_cart
foreign key(fk_user_id)
references [user]([user_id])
on update cascade
on delete cascade;

alter table cart
add constraint fk_course_id_cart
foreign key(fk_course_id)
references course(course_id)
on update cascade
on delete cascade;

alter table invoice
add constraint fk_user_id_invoice
foreign key(fk_user_id)
references [user]([user_id])
on update cascade
on delete cascade;

alter table detail_invoice
add constraint fk_invoice_id
foreign key(fk_invoice_id)
references invoice(invoice_id)
on update cascade
on delete cascade;

alter table detail_invoice
add constraint fk_course_id_detail
foreign key(fk_course_id)
references course(course_id)
on update cascade
on delete cascade;

alter table invoice
add constraint fk_payment_method_id
foreign key(fk_payment_method_id)
references payment_method(payment_method_id)
on update cascade;

alter table invoice 
add constraint fk_payment_method_id
foreign key(fk_payment_method_id)
references payment_method(payment_method_id)
on update cascade
on delete cascade;