-- This is just for inserting test data into the DB until I figure out how to load the csv file.

insert into project_types (type)
  values ('Office building');

insert into rating_systems (rating_system, version)
  values ('LEED Canada for Commercial Interiors', '1');

insert into rating_systems (rating_system, version)
  values ('LEED Canada for Existing Buildings: Operations and Maintenance', '2009');

insert into projects (number, name, address, city, province, reg_date, cert_date,
                      size, project_type_id, owner_type_id, certification_level_id, rating_system_id)
  values ('17107', '800 5th Ave', '800 5th Avenue SW', 'Calgary', 'Alberta', '2014-08-08', '2014-12-15',
          '28586', '1', '1', '3', '2');

insert into projects (number, name, address, city, province, reg_date, cert_date,
                      size, project_type_id, owner_type_id, certification_level_id, rating_system_id)
  values ('17271', '520 5th Ave SW', '520 5th Ave SW', 'Calgary', 'Alberta', '2014-10-16', '2016-02-19',
          '20837', '1', '4', '3', '2');

insert into projects (number, name, address, city, province, reg_date, cert_date,
                      size, project_type_id, owner_type_id, certification_level_id, rating_system_id)
  values ('15017', 'Citi - Suite 4000, 525 8th Ave. S.W.', '4000 - 525 8th Avenue SW', 'Calgary', 'Alberta', '2011-07-05',
          '2013-08-19', '788', '1', '3', '2', '1');

insert into projects (number, name, address, city, province, reg_date, cert_date,
                      size, project_type_id, owner_type_id, certification_level_id, rating_system_id)
  values ('12018', 'Borden Ladner Gervais LLP – Calgary Office', '520 - 3rd Avenue SW', 'Calgary', 'Alberta', '2009-03-10',
          '2013-04-09', '8490', '1', '6', '2', '1');

