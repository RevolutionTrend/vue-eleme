drop database if exists eleme;
create database eleme;
use eleme;
create table restaurants (
	id varchar(64) not null,
  act_tag int(10),
  name varchar(256) not null,
  description varchar(512),
  address varchar(256) not null,
  authentic_id bigint(20),
  business_info varchar(2048),
  delivery_fee_discount int(5),
  distance int(10),
  favored bit(1),
  float_delivery_fee float(2,1),
  float_minimum_order_amount int(2),
  has_story bit(1),
  image_path varchar(128),
  is_new bit(1),
  is_premium bit(1),
  is_star bit(1),
  latitude double(9,6),
  longitude double(9,6),
  order_lead_time int(3),
  out_of_range bit(1),
  phone varchar(128),
  promotion_info varchar(512),
  rating float(2,1),
  rating_count int(10),
  recent_order_num int(10),
  primary key(id)
);


create table flavors (
	flavor_id int(10) auto_increment,
  restaurant_id varchar(64) not null,
  id int(10),
  name varchar(512),
  primary key(flavor_id)
);

commit;