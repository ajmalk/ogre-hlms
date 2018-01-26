'use babel';

import OgreHlmsView from './ogre-hlms-view';
import { CompositeDisposable } from 'atom';

export default {

  ogreHlmsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ogreHlmsView = new OgreHlmsView(state.ogreHlmsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ogreHlmsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ogre-hlms:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ogreHlmsView.destroy();
  },

  serialize() {
    return {
      ogreHlmsViewState: this.ogreHlmsView.serialize()
    };
  },

  toggle() {
    console.log('OgreHlms was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
