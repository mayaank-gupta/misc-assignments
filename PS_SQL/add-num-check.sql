DECLARE
    value1 NUMBER(5);
    value2 NUMBER(5);
    ans NUMBER(5);
BEGIN
    value1:=&VALUE;
    value2:=&VALUE;
    ans:=value1*value2;
    IF (ans >= 100) THEN
    DBMS_OUTPUT.put_line('Yay! Value Is Greater Than 100');
    ELSE 
    DBMS_OUTPUT.put_line('Nuh!');
    END IF;
END;
/