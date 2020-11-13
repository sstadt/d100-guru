export default ({ app, store }) => {
  app.router.onReady(() => store.dispatch('lists/bind'));
};
