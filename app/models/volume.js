import Ember from 'ember';
import Resource from 'ember-api-store/models/resource';
import { denormalizeIdArray } from 'ember-api-store/utils/denormalize';

var Volume = Resource.extend({
  type: 'volume',
  modalService: Ember.inject.service('modal'),

  mounts: denormalizeIdArray('mountIds'),

  isRoot: Ember.computed.notEmpty('instanceId'),

  availableActions: function() {
    var a = this.get('actionLinks');

    return [
      { label: 'action.remove',           icon: 'icon icon-trash',          action: 'promptDelete',      enabled: !!a.remove, altAction: 'delete' },
      { divider: true },
      { label: 'action.viewInApi',        icon: 'icon icon-external-link',  action: 'goToApi',           enabled: true },
    ];
  }.property('actionLinks.{remove}'),

  displayUri: function() {
    return (this.get('uri')||'').replace(/^file:\/\//,'');
  }.property('uri'),
});

Volume.reopenClass({
  stateMap: {
    'active':           {icon: 'icon icon-hdd',    color: 'text-success'},
  },
});

export default Volume;
