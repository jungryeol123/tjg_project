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

-- 가격, 원산지, 브랜드 이름, 상품명
-- 배송정보 => 테이블 나누기
-- product테이블에 delivery type 추가 json으로 관리.
-- delivery table 생성
-- id delivery name, delivery desciption
-- 판매자 => userId? 이름?
--

select * from orders;
select * from cart;

desc cart;