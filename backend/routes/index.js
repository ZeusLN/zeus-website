import sponsorRoutes from './sponsors';

const routes = (app) => {
    app.use('/sponsors', sponsorRoutes);
};

export default routes;
