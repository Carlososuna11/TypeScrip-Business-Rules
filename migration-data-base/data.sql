CREATE TABLE IF NOT EXISTS public.migracion(
    id integer NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    description character varying(255) COLLATE pg_catalog."default",
    file character varying(255) COLLATE pg_catalog."default",
    createdat character varying(255) COLLATE pg_catalog."default",
    updatedat character varying(255) COLLATE pg_catalog."default",
    code character varying(255) COLLATE pg_catalog."default"
)