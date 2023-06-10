DO $$BEGIN
  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'keycloak') THEN
    CREATE DATABASE keycloak;
  END IF;

  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'land') THEN
    CREATE DATABASE mooc;
  END IF;

  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mooc') THEN
    CREATE DATABASE mooc;
  END IF;

  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mooc-test') THEN
    CREATE DATABASE 'mooc-test';
  END IF;

  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mooc-test2') THEN
    CREATE DATABASE 'mooc-test2';
  END IF;
END$$;
