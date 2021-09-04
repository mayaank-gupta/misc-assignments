CREATE OR REPLACE FUNCTION CalculateAreaRect(LENGTH NUMBER, breadth NUMBER)
RETURN NUMBER
IS
area NUMBER(5),
perimeter NUMBER(5)
BEGIN
  area:=2*(LENGTH*breadth);
  perimeter:=2*(LENGTH+breadth);
  DBMS_OUTPUT.put_line('Area Calculated = '|| area);
  DBMS_OUTPUT.put_line('Perimeter Calculated = '|| perimeter);
END;
/