import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://sci-fi-blogs.herokuapp.com/api"
  : "http://localhost:8080/api";
export const APP_NAME = "SCI-FI-BLOGS";

export const DOMAIN ="https://sci-fi-blogs.herokuapp.com/api"

export const FB_APP_ID = "705906193955759";

export const DISQUS_SHORTNAME ='sci-fi-blogs';
