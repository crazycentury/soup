select * from category;
select * from course;
SELECT * FROM [user];
SELECT * FROM  token;
SELECT * FROM [role];
SELECT * FROM payment_method;
select * from invoice;
select * from detail_invoice;

DELETE FROM [user];
DELETE FROM token;
DELETE FROM payment_method ;

UPDATE [user] set fk_role_id = 1
WHERE user_id = 57;