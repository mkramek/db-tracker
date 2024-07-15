DO
$$
    DECLARE
        rec TEXT;
    BEGIN
        FOR rec IN
            SELECT 'CREATE TRIGGER '
                       || table_name
                       || '_trigger BEFORE INSERT OR UPDATE OR DELETE ON '
                       || table_schema || '.' || quote_ident(table_name)
                       || ' FOR EACH ROW EXECUTE FUNCTION notify_trigger();' AS trigger_creation_query
            FROM information_schema.tables
            WHERE table_schema IN ('public')
        LOOP
            EXECUTE rec;
        END LOOP;
    END
$$;
