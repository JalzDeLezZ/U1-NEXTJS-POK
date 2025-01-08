export const EnvConfigurations = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  defaultPagination: +process.env.DEFAULT_PAGINATION || 10,
});
