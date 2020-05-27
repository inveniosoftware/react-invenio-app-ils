const adminConfig = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/admin'
      : `${process.env.REACT_APP_BACKEND_DEV_BASE_URL}/admin`,
};

export const adminRoutes = {
  admin: adminConfig.baseURL,
  staticPages: `${adminConfig.baseURL}/pages`,
};
