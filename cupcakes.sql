--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.cupcakes DROP CONSTRAINT cupcakes_pkey;
ALTER TABLE public.cupcakes ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.cupcakes_id_seq;
DROP TABLE public.cupcakes;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cupcakes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cupcakes (
    id integer NOT NULL,
    flavor character varying(50) NOT NULL,
    size character varying(15) NOT NULL,
    rating integer NOT NULL,
    image_url character varying(500) NOT NULL
);


--
-- Name: cupcakes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cupcakes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cupcakes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cupcakes_id_seq OWNED BY public.cupcakes.id;


--
-- Name: cupcakes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cupcakes ALTER COLUMN id SET DEFAULT nextval('public.cupcakes_id_seq'::regclass);


--
-- Data for Name: cupcakes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cupcakes (id, flavor, size, rating, image_url) FROM stdin;
1	cherry	large	5	https://tinyurl.com/demo-cupcake
2	chocolate	small	9	https://www.bakedbyrachel.com/wp-content/uploads/2018/01/chocolatecupcakesccfrosting1_bakedbyrachel.jpg
3	strawberry	large	10	hello.jpeg
4	strawberry	large	10	https://tinyurl.com/demo-cupcake
\.


--
-- Name: cupcakes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cupcakes_id_seq', 4, true);


--
-- Name: cupcakes cupcakes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cupcakes
    ADD CONSTRAINT cupcakes_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

