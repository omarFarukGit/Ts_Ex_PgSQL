import "dotenv/config";

const config = {
  port: process.env.PORT as string,
  connectionString: process.env.CONNECTION_STRING as string,
};

export default config;
