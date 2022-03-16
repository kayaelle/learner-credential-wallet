import type { RegistryRaw } from '../lib/registry';

export type IssuerDidEntry = {
  name: string;
  location: string;
  url: string;
}

// TODO: Import this from the DCC module once it is published
export const issuerDidRegistry: RegistryRaw<IssuerDidEntry> = {
  meta: {
    created: '2020-12-02T02:32:16+0000',
    updated: '2021-12-15T18:41:36+0000',
  },
  entries: {
    'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv': {
      name: 'Example University 1 (DCC test-only issuer)',
      location: 'Cambridge, MA, USA',
      url: 'https://openlearning.mit.edu',
    },
    'did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC': {
      name: 'DCC Playground',
      location: 'Cambridge, MA, USA',
      url: 'https://digitalcredentials.github.io/playground',
    },
    'did:web:digitalcredentials.odl.mit.edu': {
      name: 'MIT xPRO',
      location: 'Cambridge, MA, USA',
      url: 'https://xpro.mit.edu',
    },
    'did:web:digitalcredentials-rc.odl.mit.edu': {
      name: 'MIT xPRO (RC)',
      location: 'Cambridge, MA, USA',
      url: 'https://rc.xpro.mit.edu',
    },
    'did:web:digitalcredentials-rc.mit.edu': {
      name: 'MIT xPRO (RC)',
      location: 'Cambridge, MA, USA',
      url: 'https://rc.xpro.mit.edu',
    },
    'did:web:c21u.gatech.edu': {
      name: 'Georgia Tech Center for 21st Century Universities',
      location: 'Atlanta, GA, USA',
      url: 'https://c21u.gatech.edu',
    },
    'did:key:z6Mknx219amLmnD2dPDg4iDRsgERWhj2SoQxefv6XutdeQRh': {
      name: 'Badgr',
      location: 'Eugene, OR, USA',
      url: 'https://badgr.com',
    },
  },
};
