import donationRoutes from './donations';
import sponsorRoutes from './sponsors';

const routes = (app) => {
    app.use('/donations', donationRoutes);
    app.use('/sponsors', sponsorRoutes);
};

export default routes;
