create database candy;

use candy;

select * from product;

-- product detail view
create view view_product_detail
as
SELECT m.id, p.info, p.pid, c.cid, p.name, p.price, p.image, c.size, c.qty
FROM member m, product p, cart c
WHERE m.id = c.id
AND p.pid = c.pid;