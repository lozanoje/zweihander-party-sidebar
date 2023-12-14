import prepareHandlebars from "../config/handlebars.mjs";
import PartySidebar from "../sheets/PartySidebar.mjs";

Hooks.once('init', async function() {
  libWrapper.register(
    'zweihander-party-sidebar',
    'ActorDirectory.prototype._getEntryContextOptions',
    (wrapped, ...args) =>
      [{
        name: 'zweihander.partytab.addToParty',
        icon: '<i class="fas fa-users-medical"></i>',
        condition: (node) => PartySidebar.isInParty(node.data('entry-id')) === false,
        callback: (node) => game.user.isGM && PartySidebar.addToParty(node.data('entry-id'))
      },
      {
        name: 'zweihander.partytab.removeFromParty',
        icon: '<i class="fa-light fa-users"></i>',
        condition: (node) => PartySidebar.isInParty(node.data('entry-id')) === true,
        callback: (node) => game.user.isGM && PartySidebar.removeFromParty(node.data('entry-id'))
      },
      ...wrapped(...args)],
  );

  // prepareSettings();
  prepareHandlebars();
});
